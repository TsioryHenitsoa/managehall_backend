import { Body, Controller, Post, Route, Tags } from 'tsoa'
import { PaymentStatus } from '../generated/prisma/enums'
import * as reservationService from '../services/reservation.service'

interface Reservation {
	id: string
	userId: string
	salleId: string
	startDate: Date | null
	endDate: Date | null
	startHour: string | null
	endHour: string | null
	isPaid: PaymentStatus
	remainingAmount: number
}

@Route('reservations')
@Tags('Reservation')
export class ReservationController extends Controller {
	@Post('/')
	public async createReservation(
		@Body()
		body: {
			userId: string
			salleId: string
			startDate: string
			endDate: string
			startHour: string
			endHour: string
			isPaid?: PaymentStatus
			remainingAmount?: number
		}
	): Promise<Reservation> {
		return await reservationService.makeReservation(body)
	}
}
