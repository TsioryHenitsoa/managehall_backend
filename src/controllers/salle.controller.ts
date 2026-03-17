import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Query, Security } from 'tsoa'
import * as salleService from '../services/salle.service'

interface SalleResponse {
  id: string
  label: string
  description: string | null
  capacity: number
  pricePerHour: number
  building: string
  type: string
  isActive: boolean
  createdAt: Date
}

interface CreateSalleBody {
  label: string
  description?: string
  capacity: number
  pricePerHour: number
  building?: string
  type?: string
}

interface UpdateSalleBody {
  label?: string
  description?: string
  capacity?: number
  pricePerHour?: number
  building?: string
  type?: string
}

interface AvailabilityResponse {
  date: string
  salleId: string
  reservations: { start: string; end: string }[]
}

@Route('salles')
@Tags('Salle')
export class SalleController extends Controller {

  @Get('/')
  public async getSalles(
    @Query() type?: string,
    @Query() building?: string
  ): Promise<SalleResponse[]> {
    return salleService.getAllSalles({ type, building })
  }

  @Get('disponibles')
  public async getAvailableSalles(
    @Query() start: string,
    @Query() end: string
  ): Promise<SalleResponse[]> {
    return salleService.getAvailableSalles(start, end)
  }

  @Get('{id}')
  public async getSalleById(@Path() id: string): Promise<SalleResponse> {
    return salleService.getSalleById(id)
  }

  @Get('{id}/disponibilites')
  public async getAvailability(
    @Path() id: string,
    @Query() date: string
  ): Promise<AvailabilityResponse> {
    return salleService.getAvailableSlots(id, date)
  }

  @Post('/')
  @Security('jwt', ['ADMIN'])
  public async createSalle(@Body() body: CreateSalleBody): Promise<SalleResponse> {
    this.setStatus(201)
    return salleService.createSalle(body)
  }

  @Put('{id}')
  @Security('jwt', ['ADMIN'])
  public async updateSalle(
    @Path() id: string,
    @Body() body: UpdateSalleBody
  ): Promise<SalleResponse> {
    return salleService.updateSalle(id, body)
  }

  @Delete('{id}')
  @Security('jwt', ['ADMIN'])
  public async deleteSalle(@Path() id: string): Promise<void> {
    await salleService.deleteSalle(id)
    this.setStatus(204)
  }
}
