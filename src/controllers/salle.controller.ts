import { Request, Response } from 'express'
import * as salleService from '../services/salle.service'

export const getSalles = async (req: Request, res: Response) => {
  try {
    const salles = await salleService.getAllSalles()
    res.json(salles)
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createSalle = async (req: Request, res: Response) => {
  try {
    const { label, description, capacity, locationPrice } = req.body
    const salle = await salleService.createSalle(label, description, capacity, locationPrice)
    res.status(201).json(salle)
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getSalleById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params
    const salle = await salleService.getSalleById(id)
    res.json(salle)
  } catch (err) {
    res.status(404).json({ error: 'Salle not found' })
  }
}

export const deleteSalle = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params
    await salleService.deleteSalle(id)
    res.status(204).send()
  } catch (err) {
    res.status(404).json({ error: 'Salle not found' })
  }
}

export const updateSalle = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params
    const { label, description, capacity, locationPrice } = req.body
    const salle = await salleService.updateSalle(id, label, description, capacity, locationPrice)
    res.json(salle)
  } catch (err) {
    res.status(404).json({ error: 'Salle not found' })
  }
}