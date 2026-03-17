import { Body, Controller, Get, Patch, Path, Post, Put, Query, Request, Route, Security, Tags } from 'tsoa'
import { Request as ExpressRequest } from 'express'
import * as reservationService from '../services/reservation.service'

interface CreateReservationBody {
  salleId: string
  startTime: string
  endTime: string
  note?: string
  customPricePerHour?: number
}

interface UpdateReservationBody {
  startTime?: string
  endTime?: string
  note?: string
  customPricePerHour?: number
}

interface RecalibrateSnapshotsBody {
  strategy?: 'from-total' | 'from-salle'
  dryRun?: boolean
  limit?: number
}

@Route('reservations')
@Tags('Reservation')
export class ReservationController extends Controller {

  @Get('/')
  @Security('jwt')
  public async getReservations(@Request() req: ExpressRequest): Promise<any[]> {
    const user = (req as any).user
    return reservationService.getAllReservations(user.sub, user.role)
  }

  @Get('{id}')
  @Security('jwt')
  public async getReservationById(@Path() id: string): Promise<any> {
    return reservationService.getReservationById(id)
  }

  @Post('/')
  @Security('jwt')
  public async createReservation(
    @Request() req: ExpressRequest,
    @Body() body: CreateReservationBody
  ): Promise<any> {
    const user = (req as any).user
    this.setStatus(201)
    return reservationService.createReservation({
      userId: user.sub,
      role: user.role,
      salleId: body.salleId,
      startTime: body.startTime,
      endTime: body.endTime,
      note: body.note,
      customPricePerHour: body.customPricePerHour,
    })
  }

  @Put('{id}')
  @Security('jwt')
  public async updateReservation(
    @Request() req: ExpressRequest,
    @Path() id: string,
    @Body() body: UpdateReservationBody
  ): Promise<any> {
    const user = (req as any).user
    return reservationService.updateReservation(id, user.sub, user.role, body)
  }

  @Patch('{id}/cancel')
  @Security('jwt')
  public async cancelReservation(
    @Request() req: ExpressRequest,
    @Path() id: string
  ): Promise<any> {
    const user = (req as any).user
    return reservationService.cancelReservation(id, user.sub, user.role)
  }

  @Post('admin/recalibrate-price-snapshots')
  @Security('jwt', ['ADMIN'])
  public async recalibratePriceSnapshots(
    @Request() req: ExpressRequest,
    @Body() body: RecalibrateSnapshotsBody
  ): Promise<any> {
    const user = (req as any).user
    return reservationService.recalibrateReservationPriceSnapshots({
      actorUserId: user.sub,
      strategy: body.strategy,
      dryRun: body.dryRun,
      limit: body.limit,
    })
  }
}
