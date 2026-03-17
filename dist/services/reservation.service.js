"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recalibrateReservationPriceSnapshots = exports.getReservationsBySalle = exports.getAllReservations = exports.getReservationById = exports.cancelReservation = exports.updateReservation = exports.createReservation = void 0;
const prisma_1 = require("../prisma");
const errors_1 = require("../errors");
const salle_service_1 = require("./salle.service");
const checkConflict = async (salleId, startTime, endTime, excludeId) => {
    const where = {
        salleId,
        status: 'CONFIRMED',
        startTime: { lt: endTime },
        endTime: { gt: startTime },
    };
    if (excludeId) {
        where.id = { not: excludeId };
    }
    const conflict = await prisma_1.prisma.reservation.findFirst({ where });
    if (conflict) {
        throw new errors_1.ConflictError(`Time slot conflicts with an existing reservation (${conflict.startTime.toISOString()} - ${conflict.endTime.toISOString()})`);
    }
};
const calculateAmount = (startTime, endTime, pricePerHour) => {
    const hours = (endTime.getTime() - startTime.getTime()) / 3_600_000;
    return Math.round(hours * pricePerHour * 100) / 100;
};
const roundCurrency = (value) => Math.round(value * 100) / 100;
const buildHistoryDetails = (data) => JSON.stringify(data);
const createReservation = async (data) => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    if (end <= start) {
        throw new errors_1.ValidationError('endTime must be after startTime');
    }
    const salle = await (0, salle_service_1.getSalleById)(data.salleId);
    await checkConflict(data.salleId, start, end);
    if (data.customPricePerHour !== undefined && data.role !== 'ADMIN') {
        throw new errors_1.ValidationError('Only admin can manually set pricePerHourSnapshot');
    }
    const appliedPricePerHour = data.customPricePerHour ?? salle.pricePerHour;
    if (appliedPricePerHour <= 0) {
        throw new errors_1.ValidationError('customPricePerHour must be positive');
    }
    const totalAmount = calculateAmount(start, end, appliedPricePerHour);
    const reservation = await prisma_1.prisma.reservation.create({
        data: {
            userId: data.userId,
            salleId: data.salleId,
            startTime: start,
            endTime: end,
            pricePerHourSnapshot: appliedPricePerHour,
            totalAmount,
            note: data.note,
        },
        include: { salle: true, user: { select: { id: true, name: true, email: true } } },
    });
    await prisma_1.prisma.reservationHistory.create({
        data: {
            reservationId: reservation.id,
            action: 'CREATED',
            actorUserId: data.userId,
            details: buildHistoryDetails({
                startTime: reservation.startTime,
                endTime: reservation.endTime,
                pricePerHourSnapshot: reservation.pricePerHourSnapshot,
                totalAmount: reservation.totalAmount,
                status: reservation.status,
            }),
        },
    });
    return reservation;
};
exports.createReservation = createReservation;
const updateReservation = async (id, userId, role, data) => {
    const reservation = await (0, exports.getReservationById)(id);
    if (role !== 'ADMIN' && reservation.userId !== userId) {
        throw new errors_1.ValidationError('You can only modify your own reservations');
    }
    if (reservation.status === 'CANCELLED') {
        throw new errors_1.ValidationError('Cannot modify a cancelled reservation');
    }
    if (data.customPricePerHour !== undefined && role !== 'ADMIN') {
        throw new errors_1.ValidationError('Only admin can manually change pricePerHourSnapshot');
    }
    const start = data.startTime ? new Date(data.startTime) : reservation.startTime;
    const end = data.endTime ? new Date(data.endTime) : reservation.endTime;
    if (end <= start) {
        throw new errors_1.ValidationError('endTime must be after startTime');
    }
    // Re-check conflicts if times changed
    if (data.startTime || data.endTime) {
        await checkConflict(reservation.salleId, start, end, id);
    }
    const fallbackPricePerHour = reservation.pricePerHourSnapshot > 0
        ? reservation.pricePerHourSnapshot
        : (await (0, salle_service_1.getSalleById)(reservation.salleId)).pricePerHour;
    const nextPricePerHourSnapshot = data.customPricePerHour ?? fallbackPricePerHour;
    if (nextPricePerHourSnapshot <= 0) {
        throw new errors_1.ValidationError('customPricePerHour must be positive');
    }
    const totalAmount = calculateAmount(start, end, nextPricePerHourSnapshot);
    const updatedReservation = await prisma_1.prisma.reservation.update({
        where: { id },
        data: {
            startTime: start,
            endTime: end,
            pricePerHourSnapshot: nextPricePerHourSnapshot,
            totalAmount,
            note: data.note ?? reservation.note,
        },
        include: { salle: true, user: { select: { id: true, name: true, email: true } } },
    });
    await prisma_1.prisma.reservationHistory.create({
        data: {
            reservationId: id,
            action: 'UPDATED',
            actorUserId: userId,
            details: buildHistoryDetails({
                previous: {
                    startTime: reservation.startTime,
                    endTime: reservation.endTime,
                    note: reservation.note,
                    pricePerHourSnapshot: reservation.pricePerHourSnapshot,
                    totalAmount: reservation.totalAmount,
                },
                next: {
                    startTime: updatedReservation.startTime,
                    endTime: updatedReservation.endTime,
                    note: updatedReservation.note,
                    pricePerHourSnapshot: updatedReservation.pricePerHourSnapshot,
                    totalAmount: updatedReservation.totalAmount,
                },
            }),
        },
    });
    return updatedReservation;
};
exports.updateReservation = updateReservation;
const cancelReservation = async (id, userId, role) => {
    const reservation = await (0, exports.getReservationById)(id);
    if (role !== 'ADMIN' && reservation.userId !== userId) {
        throw new errors_1.ValidationError('You can only cancel your own reservations');
    }
    if (reservation.status === 'CANCELLED') {
        throw new errors_1.ValidationError('Reservation is already cancelled');
    }
    const cancelledReservation = await prisma_1.prisma.reservation.update({
        where: { id },
        data: { status: 'CANCELLED' },
        include: { salle: true },
    });
    await prisma_1.prisma.reservationHistory.create({
        data: {
            reservationId: id,
            action: 'CANCELLED',
            actorUserId: userId,
            details: buildHistoryDetails({
                previousStatus: reservation.status,
                nextStatus: 'CANCELLED',
            }),
        },
    });
    return cancelledReservation;
};
exports.cancelReservation = cancelReservation;
const getReservationById = async (id) => {
    const reservation = await prisma_1.prisma.reservation.findUnique({
        where: { id },
        include: {
            salle: true,
            user: { select: { id: true, name: true, email: true } },
            payments: { orderBy: { createdAt: 'desc' } },
            histories: { orderBy: { createdAt: 'desc' } },
        },
    });
    if (!reservation) {
        throw new errors_1.NotFoundError('Reservation not found');
    }
    return reservation;
};
exports.getReservationById = getReservationById;
const getAllReservations = async (userId, role) => {
    const where = role === 'ADMIN' ? {} : { userId };
    return prisma_1.prisma.reservation.findMany({
        where,
        include: {
            salle: true,
            user: { select: { id: true, name: true, email: true } },
        },
        orderBy: { startTime: 'desc' },
    });
};
exports.getAllReservations = getAllReservations;
const getReservationsBySalle = async (salleId, date) => {
    const where = { salleId, status: 'CONFIRMED' };
    if (date) {
        const dayStart = new Date(`${date}T00:00:00.000Z`);
        const dayEnd = new Date(`${date}T23:59:59.999Z`);
        where.startTime = { lt: dayEnd };
        where.endTime = { gt: dayStart };
    }
    return prisma_1.prisma.reservation.findMany({
        where,
        include: { user: { select: { id: true, name: true, email: true } } },
        orderBy: { startTime: 'asc' },
    });
};
exports.getReservationsBySalle = getReservationsBySalle;
const recalibrateReservationPriceSnapshots = async (options) => {
    const strategy = options.strategy || 'from-total';
    const dryRun = options.dryRun || false;
    const limit = options.limit || 200;
    if (!['from-total', 'from-salle'].includes(strategy)) {
        throw new errors_1.ValidationError('strategy must be one of: from-total, from-salle');
    }
    if (!Number.isInteger(limit) || limit <= 0 || limit > 1000) {
        throw new errors_1.ValidationError('limit must be an integer between 1 and 1000');
    }
    const reservations = await prisma_1.prisma.reservation.findMany({
        where: { pricePerHourSnapshot: { lte: 0 } },
        include: { salle: true },
        orderBy: { createdAt: 'asc' },
        take: limit,
    });
    const updates = reservations.map((reservation) => {
        const hours = (reservation.endTime.getTime() - reservation.startTime.getTime()) / 3_600_000;
        const computedFromTotal = hours > 0 && reservation.totalAmount > 0
            ? roundCurrency(reservation.totalAmount / hours)
            : reservation.salle.pricePerHour;
        const snapshot = strategy === 'from-total' ? computedFromTotal : reservation.salle.pricePerHour;
        return {
            reservationId: reservation.id,
            snapshot: roundCurrency(snapshot),
            strategy,
            previousSnapshot: reservation.pricePerHourSnapshot,
            totalAmount: reservation.totalAmount,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
        };
    });
    if (!dryRun && updates.length > 0) {
        await prisma_1.prisma.$transaction(updates.flatMap((update) => [
            prisma_1.prisma.reservation.update({
                where: { id: update.reservationId },
                data: {
                    pricePerHourSnapshot: update.snapshot,
                    totalAmount: calculateAmount(update.startTime, update.endTime, update.snapshot),
                },
            }),
            prisma_1.prisma.reservationHistory.create({
                data: {
                    reservationId: update.reservationId,
                    action: 'SNAPSHOT_RECALIBRATED',
                    actorUserId: options.actorUserId,
                    details: buildHistoryDetails({
                        strategy,
                        previousSnapshot: update.previousSnapshot,
                        nextSnapshot: update.snapshot,
                    }),
                },
            }),
        ]));
    }
    return {
        dryRun,
        strategy,
        scanned: reservations.length,
        updated: dryRun ? 0 : updates.length,
        pending: dryRun ? updates.length : 0,
        items: updates,
    };
};
exports.recalibrateReservationPriceSnapshots = recalibrateReservationPriceSnapshots;
