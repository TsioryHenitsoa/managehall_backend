import { prisma } from '../prisma'
import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  })
}

export const createUser = async (email: string, name: string, password: string, role = 'USER') => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  return prisma.user.create({
    data: { email, name, password: hashedPassword, role },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  })
}

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } })
}

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  })
}
