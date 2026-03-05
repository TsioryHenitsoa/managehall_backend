import { Request, Response } from 'express'
import * as authService from '../services/auth.service'

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body

    if (!email || !name || !password) {
      return res.status(400).json({ error: 'email, name and password are required' })
    }

    const result = await authService.signup(email, name, password)
    return res.status(201).json(result)
  } catch (err) {
    if (err instanceof Error && err.message === 'EMAIL_ALREADY_EXISTS') {
      return res.status(409).json({ error: 'Email already exists' })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' })
    }

    const result = await authService.login(email, password)
    return res.status(200).json(result)
  } catch (err) {
    if (err instanceof Error && err.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
