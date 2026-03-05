import { prisma } from '../prisma'
import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true
    }
  })
}

export const signup = async (email: string, name: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  return await prisma.user.create({
    data: { email, name, password: hashedPassword },
    select: {
      id: true,
      email: true,
      name: true
    }
  })
}

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email }
  })
}
