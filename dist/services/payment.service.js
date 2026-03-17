"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentsByReservation = exports.addPayment = void 0;
const prisma_1 = require("../prisma");
const errors_1 = require("../errors");
const addPayment = async (data) => {
    const reservation = await prisma_1.prisma.reservation.findUnique({
        where: { id: data.reservationId },
    });
    if (!reservation) {
        throw new errors_1.NotFoundError('Reservation not found');
    }
    if (reservation.status === 'CANCELLED') {
        throw new errors_1.ValidationError('Cannot add payment to a cancelled reservation');
    }
    const remaining = reservation.totalAmount - reservation.paidAmount;
    if (data.amount <= 0) {
        throw new errors_1.ValidationError('Payment amount must be positive');
    }
    if (data.amount > remaining) {
        throw new errors_1.ValidationError(`Payment amount exceeds remaining balance (${remaining.toFixed(2)})`);
    }
    const paymentMethod = data.method || 'CASH';
    const payment = await prisma_1.prisma.$transaction(async (tx) => {
        const createdPayment = await tx.payment.create({
            data: {
                reservationId: data.reservationId,
                amount: data.amount,
                method: paymentMethod,
            },
        });
        await tx.reservation.update({
            where: { id: data.reservationId },
            data: { paidAmount: { increment: data.amount } },
        });
        await tx.paymentEvent.create({
            data: {
                reservationId: data.reservationId,
                paymentId: createdPayment.id,
                eventType: 'PAYMENT_CREATED',
                amount: data.amount,
                method: paymentMethod,
            },
        });
        return createdPayment;
    });
    return payment;
};
exports.addPayment = addPayment;
const getPaymentsByReservation = async (reservationId) => {
    const reservation = await prisma_1.prisma.reservation.findUnique({
        where: { id: reservationId },
    });
    if (!reservation) {
        throw new errors_1.NotFoundError('Reservation not found');
    }
    const payments = await prisma_1.prisma.payment.findMany({
        where: { reservationId },
        orderBy: { createdAt: 'desc' },
    });
    const events = await prisma_1.prisma.paymentEvent.findMany({
        where: { reservationId },
        orderBy: { createdAt: 'desc' },
    });
    return {
        reservationId,
        totalAmount: reservation.totalAmount,
        paidAmount: reservation.paidAmount,
        remainingAmount: Math.round((reservation.totalAmount - reservation.paidAmount) * 100) / 100,
        payments,
        events,
    };
};
exports.getPaymentsByReservation = getPaymentsByReservation;
