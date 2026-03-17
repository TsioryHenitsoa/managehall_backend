import { prisma } from '../prisma'
import { NotFoundError } from '../errors'

interface CreateSalleData {
  label: string
  description?: string
  capacity: number
  pricePerHour: number
  building?: string
  type?: string
}

interface UpdateSalleData {
  label?: string
  description?: string
  capacity?: number
  pricePerHour?: number
  building?: string
  type?: string
}

export const getAllSalles = async (filters?: { type?: string; building?: string }) => {
  const where: any = { isActive: true }
  if (filters?.type) where.type = filters.type
  if (filters?.building) where.building = filters.building

  return prisma.salle.findMany({ where, orderBy: { label: 'asc' } })
}

export const getSalleById = async (id: string) => {
  const salle = await prisma.salle.findUnique({ where: { id } })
  if (!salle || !salle.isActive) {
    throw new NotFoundError('Salle not found')
  }
  return salle
}

export const createSalle = async (data: CreateSalleData) => {
  return prisma.salle.create({ data })
}

export const updateSalle = async (id: string, data: UpdateSalleData) => {
  await getSalleById(id)
  return prisma.salle.update({ where: { id }, data })
}

export const deleteSalle = async (id: string) => {
  await getSalleById(id)
  // Soft delete
  return prisma.salle.update({
    where: { id },
    data: { isActive: false },
  })
}

export const getAvailableSlots = async (salleId: string, date: string) => {
  await getSalleById(salleId)

  const dayStart = new Date(`${date}T00:00:00.000Z`)
  const dayEnd = new Date(`${date}T23:59:59.999Z`)

  const reservations = await prisma.reservation.findMany({
    where: {
      salleId,
      status: 'CONFIRMED',
      startTime: { lt: dayEnd },
      endTime: { gt: dayStart },
    },
    orderBy: { startTime: 'asc' },
    select: { startTime: true, endTime: true },
  })

  return {
    date,
    salleId,
    reservations: reservations.map(r => ({
      start: r.startTime.toISOString(),
      end: r.endTime.toISOString(),
    })),
  }
}

export const getAvailableSalles = async (startTime: string, endTime: string) => {
  const start = new Date(startTime)
  const end = new Date(endTime)

  // Find salles that have NO conflicting reservation
  const sallesWithConflict = await prisma.reservation.findMany({
    where: {
      status: 'CONFIRMED',
      startTime: { lt: end },
      endTime: { gt: start },
    },
    select: { salleId: true },
    distinct: ['salleId'],
  })

  const conflictIds = sallesWithConflict.map(r => r.salleId)

  return prisma.salle.findMany({
    where: {
      isActive: true,
      id: { notIn: conflictIds },
    },
    orderBy: { label: 'asc' },
  })
}
