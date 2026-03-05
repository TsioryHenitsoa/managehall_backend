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
