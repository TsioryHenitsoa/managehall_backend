import { Request, Response } from 'express'
import * as userService from '../services/user.service'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body
    const user = await userService.createUser(email, name)
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const testEndpoint = (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
}