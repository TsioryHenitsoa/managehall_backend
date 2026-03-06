import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, Response } from 'tsoa'
import * as salleService from '../services/salle.service'

// Définir un type Salle pour Swagger
interface Salle {
  id: string
  label: string
  description: string | null
  capacity: number
  locationPrice: number
}

@Route('salles')
@Tags('Salle')
export class SalleController extends Controller {

  @Get('/')
  public async getSalles(): Promise<Salle[]> {
    return await salleService.getAllSalles()
  }

  @Post('/')
  public async createSalle(
    @Body() body: { label: string; description: string; capacity: number; locationPrice: number }
  ): Promise<Salle> {
    const { label, description, capacity, locationPrice } = body
    return await salleService.createSalle(label, description, capacity, locationPrice)
  }

  @Get('{id}')
  @Response(404, 'Salle not found')
  public async getSalleById(@Path() id: string): Promise<Salle> {
    const salle = await salleService.getSalleById(id)
    if (!salle) throw new Error('Salle not found')
    return salle
  }

  @Put('{id}')
  @Response(404, 'Salle not found')
  public async updateSalle(
    @Path() id: string,
    @Body() body: { label: string; description: string; capacity: number; locationPrice: number }
  ): Promise<Salle> {
    const { label, description, capacity, locationPrice } = body
    const salle = await salleService.updateSalle(id, label, description, capacity, locationPrice)
    if (!salle) throw new Error('Salle not found')
    return salle
  }

  @Delete('{id}')
  @Response(404, 'Salle not found')
  @Response(204, 'No Content')
  public async deleteSalle(@Path() id: string): Promise<void> {
    await salleService.deleteSalle(id)
  }
}