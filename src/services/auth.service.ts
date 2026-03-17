import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as userService from './user.service'
import { ConflictError, UnauthorizedError } from '../errors'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'
const JWT_EXPIRES_IN = '1d'

const buildToken = (user: { id: string; email: string; name: string; role: string }) => {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

export const signup = async (email: string, name: string, password: string) => {
  const existing = await userService.getUserByEmail(email)
  if (existing) {
    throw new ConflictError('Email already exists')
  }

  const user = await userService.createUser(email, name, password)
  const token = buildToken(user)
  return { user, token }
}

export const login = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new UnauthorizedError('Invalid credentials')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new UnauthorizedError('Invalid credentials')
  }

  const safeUser = { id: user.id, email: user.email, name: user.name, role: user.role }
  const token = buildToken(safeUser)
  return { user: safeUser, token }
}
