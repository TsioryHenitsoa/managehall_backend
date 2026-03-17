import { Body, Controller, Get, Path, Post, Route, Security, Tags } from 'tsoa'
import * as paymentService from '../services/payment.service'

interface CreatePaymentBody {
  amount: number
  method?: string
}

interface PaymentResponse {
  id: string
  reservationId: string
  amount: number
  method: string
  createdAt: Date
}

interface PaymentSummary {
  reservationId: string
  totalAmount: number
  paidAmount: number
  remainingAmount: number
  payments: PaymentResponse[]
}

@Route('reservations')
@Tags('Payment')
export class PaymentController extends Controller {

  @Post('{reservationId}/payments')
  @Security('jwt')
  public async addPayment(
    @Path() reservationId: string,
    @Body() body: CreatePaymentBody
  ): Promise<PaymentResponse> {
    this.setStatus(201)
    return paymentService.addPayment({
      reservationId,
      amount: body.amount,
      method: body.method,
    })
  }

  @Get('{reservationId}/payments')
  @Security('jwt')
  public async getPayments(
    @Path() reservationId: string
  ): Promise<PaymentSummary> {
    return paymentService.getPaymentsByReservation(reservationId)
  }
}
