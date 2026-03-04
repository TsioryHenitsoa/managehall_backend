import { createUser, getAllUsers } from '../services/user.service'
import { prisma } from '../prisma'

// On dit à Jest de mocker Prisma
jest.mock('../prisma', () => ({
    prisma: {
        user: {
            create: jest.fn(),
            findMany: jest.fn()
        }
    }
}))

describe('User Service', () => {
    it('should create a user', async () => {
        // Arrange : ce que Prisma doit retourner
        const mockUser: any = { id: 1, email: 'test@example.com', name: 'Test User' };
        (prisma.user.create as jest.Mock).mockResolvedValue(mockUser)

        // Act : on appelle la fonction à tester
        const result = await createUser('test@example.com', 'Test User')

        // Assert : vérifier que le résultat est correct
        expect(result).toEqual(mockUser)
        expect(prisma.user.create).toHaveBeenCalledWith({
            data: { email: 'test@example.com', name: 'Test User' }
        })
    })

    it('should get all users', async () => {
        // Arrange : ce que Prisma doit retourner
        const mockUsers: any = [
            { id: 1, email: 'test1@example.com', name: 'Test User 1' },
            { id: 2, email: 'test2@example.com', name: 'Test User 2' }
        ];
        (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers)

        // Act : on appelle la fonction à tester
        const result = await getAllUsers()

        // Assert : vérifier que le résultat est correct
        expect(result).toEqual(mockUsers)
        expect(prisma.user.findMany).toHaveBeenCalled()
    })
})
