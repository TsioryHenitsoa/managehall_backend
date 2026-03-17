import { prisma } from '../prisma'
import { NotFoundError, ValidationError } from '../errors'

interface CreatePaymentData {
  reservationId: string
  amount: number
  method?: string
}

export const addPayment = async (data: CreatePaymentData) => {
  const reservation = await prisma.reservation.findUnique({
    where: { id: data.reservationId },
  })

  if (!reservation) {
    throw new NotFoundError('Reservation not found')
  }

  if (reservation.status === 'CANCELLED') {
    throw new ValidationError('Cannot add payment to a cancelled reservation')
  }

  const remaining = reservation.totalAmount - reservation.paidAmount
  if (data.amount <= 0) {
    throw new ValidationError('Payment amount must be positive')
  }
  if (data.amount > remaining) {
    throw new ValidationError(`Payment amount exceeds remaining balance (${remaining.toFixed(2)})`)
  }

  const paymentMethod = data.method || 'CASH'

  const payment = await prisma.$transaction(async (tx) => {
    const createdPayment = await tx.payment.create({
      data: {
        reservationId: data.reservationId,
        amount: data.amount,
        method: paymentMethod,
      },
    })

    await tx.reservation.update({
      where: { id: data.reservationId },
      data: { paidAmount: { increment: data.amount } },
    })

    await tx.paymentEvent.create({
      data: {
        reservationId: data.reservationId,
        paymentId: createdPayment.id,
        eventType: 'PAYMENT_CREATED',
        amount: data.amount,
        method: paymentMethod,
      },
    })

    return createdPayment
  })

  return payment
}

export const getPaymentsByReservation = async (reservationId: string) => {
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
  })

  if (!reservation) {
    throw new NotFoundError('Reservation not found')
  }

  const payments = await prisma.payment.findMany({
    where: { reservationId },
    orderBy: { createdAt: 'desc' },
  })

  const events = await prisma.paymentEvent.findMany({
    where: { reservationId },
    orderBy: { createdAt: 'desc' },
  })

  return {
    reservationId,
    totalAmount: reservation.totalAmount,
    paidAmount: reservation.paidAmount,
    remainingAmount: Math.round((reservation.totalAmount - reservation.paidAmount) * 100) / 100,
    payments,
    events,
  }
}
