import request from 'supertest'
import app from '../app'
import { describe, it, expect } from '@jest/globals'
import { prisma } from '../prisma'
import bcrypt from 'bcryptjs'

jest.mock('../prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    $disconnect: jest.fn(),
  },
}))

describe('Auth API', () => {
  it('POST /auth/signup should create a user and return a token', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
    ;(prisma.user.create as jest.Mock).mockResolvedValue({
      id: 'user-1',
      email: 'signup@example.com',
      name: 'Test User',
      role: 'USER',
      createdAt: new Date(),
    })

    const res = await request(app)
      .post('/auth/signup')
      .send({ email: 'signup@example.com', name: 'Test User', password: 'Secret123!' })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('user')
    expect(res.body.user).toHaveProperty('email')
    expect(res.body.user).not.toHaveProperty('password')
  })

  it('POST /auth/login should authenticate and return a token', async () => {
    const uniqueEmail = 'login@example.com'
    const password = 'Secret123!'
    const hashedPassword = bcrypt.hashSync(password, 10)

    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'user-2',
      email: uniqueEmail,
      name: 'Login User',
      role: 'USER',
      password: hashedPassword,
    })

    const res = await request(app)
      .post('/auth/login')
      .send({ email: uniqueEmail, password })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('user')
    expect(res.body.user).toHaveProperty('email', uniqueEmail)
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})
