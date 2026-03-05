import { prisma } from '../prisma'

export const getAllSalles = async () => {
    return await prisma.salle.findMany()
}

export const createSalle = async (label: string, description: string, capacity: number, locationPrice: number) => {
    return await prisma.salle.create({
        data: { label, description, capacity, locationPrice }
    })
}

export const getSalleById = async (id: string) => {
    return await prisma.salle.findUniqueOrThrow({
        where: { id }
    })
}

export const deleteSalle = async (id: string) => {
    return await prisma.salle.delete({
        where: { id }
    })
}

export const updateSalle = async (id: string, label?: string, description?: string, capacity?: number, locationPrice?: number) => {
    return await prisma.salle.update({
        where: { id },
        data: { label, description, capacity, locationPrice }
    })
}   
            