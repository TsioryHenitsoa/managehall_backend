"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeReservation = void 0;
const enums_1 = require("../generated/prisma/enums");
const prisma_1 = require("../prisma");
const salle_service_1 = require("./salle.service");
const makeReservation = async ({ userId, salleId, startDate, endDate, startHour, endHour, isPaid = enums_1.PaymentStatus.UNPAID, remainingAmount }) => {
    const startDateTime = new Date(`${startDate}T${startHour}:00:00Z`);
    const endDateTime = new Date(`${endDate}T${endHour}:00:00Z`);
    const finalRemainingAmount = remainingAmount
        ?? (await (0, salle_service_1.getSalleById)(salleId)).locationPrice;
    return prisma_1.prisma.reservation.create({
        data: {
            userId,
            salleId,
            startDate: startDateTime,
            endDate: endDateTime,
            startHour,
            endHour,
            isPaid,
            remainingAmount: finalRemainingAmount
        }
    });
};
exports.makeReservation = makeReservation;
