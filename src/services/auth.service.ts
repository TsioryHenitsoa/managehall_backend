import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as userService from './user.service'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'
const JWT_EXPIRES_IN = '1d'

const buildToken = (user: { id: string; email: string; name: string }) => {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

export const signup = async (email: string, name: string, password: string) => {
  const existingUser = await userService.getUserByEmail(email)

  if (existingUser) {
    throw new Error('EMAIL_ALREADY_EXISTS')
  }

  const user = await userService.signup(email, name, password)
  const token = buildToken(user)

  return { user, token }
}

export const login = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email)

  if (!user) {
    throw new Error('INVALID_CREDENTIALS')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error('INVALID_CREDENTIALS')
  }

  const token = buildToken({ id: user.id, email: user.email, name: user.name })

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    },
    token
  }
}
