import { PaymentStatus } from "../generated/prisma/enums";
import { prisma } from "../prisma";
import { getSalleById } from "./salle.service";

export const makeReservation = async ({
    userId,
    salleId,
    startDate,
    endDate,
    startHour,
    endHour,
    isPaid = PaymentStatus.UNPAID,
    remainingAmount
}: {
    userId: string;
    salleId: string;
    startDate: string;
    endDate: string;
    startHour: string;
    endHour: string;
    isPaid?: PaymentStatus;
    remainingAmount?: number;
}) => {

    const startDateTime = new Date(`${startDate}T${startHour}:00:00Z`);
    const endDateTime = new Date(`${endDate}T${endHour}:00:00Z`);

    const finalRemainingAmount = remainingAmount
        ?? (await getSalleById(salleId)).locationPrice;

    return prisma.reservation.create({
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