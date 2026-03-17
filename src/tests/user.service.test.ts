import { createUser, getAllUsers } from '../services/user.service'
import { prisma } from '../prisma'

jest.mock('../prisma', () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}))

describe('User Service', () => {
  it('should create a user with hashed password', async () => {
    const mockUser: any = { id: '1', email: 'test@example.com', name: 'Test User', role: 'USER' };
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser)

    const result = await createUser('test@example.com', 'Test User', 'plain-password')

    expect(result).toEqual(mockUser)
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: expect.any(String),
        role: 'USER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })
  })

  it('should get all users', async () => {
    const mockUsers: any = [
      { id: '1', email: 'test1@example.com', name: 'Test User 1', role: 'USER' },
      { id: '2', email: 'test2@example.com', name: 'Test User 2', role: 'ADMIN' },
    ];
    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers)

    const result = await getAllUsers()

    expect(result).toEqual(mockUsers)
    expect(prisma.user.findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })
  })
})
