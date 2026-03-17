"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableSalles = exports.getAvailableSlots = exports.deleteSalle = exports.updateSalle = exports.createSalle = exports.getSalleById = exports.getAllSalles = void 0;
const prisma_1 = require("../prisma");
const errors_1 = require("../errors");
const getAllSalles = async (filters) => {
    const where = { isActive: true };
    if (filters?.type)
        where.type = filters.type;
    if (filters?.building)
        where.building = filters.building;
    return prisma_1.prisma.salle.findMany({ where, orderBy: { label: 'asc' } });
};
exports.getAllSalles = getAllSalles;
const getSalleById = async (id) => {
    const salle = await prisma_1.prisma.salle.findUnique({ where: { id } });
    if (!salle || !salle.isActive) {
        throw new errors_1.NotFoundError('Salle not found');
    }
    return salle;
};
exports.getSalleById = getSalleById;
const createSalle = async (data) => {
    return prisma_1.prisma.salle.create({ data });
};
exports.createSalle = createSalle;
const updateSalle = async (id, data) => {
    await (0, exports.getSalleById)(id);
    return prisma_1.prisma.salle.update({ where: { id }, data });
};
exports.updateSalle = updateSalle;
const deleteSalle = async (id) => {
    await (0, exports.getSalleById)(id);
    // Soft delete
    return prisma_1.prisma.salle.update({
        where: { id },
        data: { isActive: false },
    });
};
exports.deleteSalle = deleteSalle;
const getAvailableSlots = async (salleId, date) => {
    await (0, exports.getSalleById)(salleId);
    const dayStart = new Date(`${date}T00:00:00.000Z`);
    const dayEnd = new Date(`${date}T23:59:59.999Z`);
    const reservations = await prisma_1.prisma.reservation.findMany({
        where: {
            salleId,
            status: 'CONFIRMED',
            startTime: { lt: dayEnd },
            endTime: { gt: dayStart },
        },
        orderBy: { startTime: 'asc' },
        select: { startTime: true, endTime: true },
    });
    return {
        date,
        salleId,
        reservations: reservations.map(r => ({
            start: r.startTime.toISOString(),
            end: r.endTime.toISOString(),
        })),
    };
};
exports.getAvailableSlots = getAvailableSlots;
const getAvailableSalles = async (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    // Find salles that have NO conflicting reservation
    const sallesWithConflict = await prisma_1.prisma.reservation.findMany({
        where: {
            status: 'CONFIRMED',
            startTime: { lt: end },
            endTime: { gt: start },
        },
        select: { salleId: true },
        distinct: ['salleId'],
    });
    const conflictIds = sallesWithConflict.map(r => r.salleId);
    return prisma_1.prisma.salle.findMany({
        where: {
            isActive: true,
            id: { notIn: conflictIds },
        },
        orderBy: { label: 'asc' },
    });
};
exports.getAvailableSalles = getAvailableSalles;
