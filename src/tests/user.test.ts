import request from 'supertest'
import app from '../app'
import { describe, it, expect } from '@jest/globals'
import { prisma } from '../prisma'

describe('User API', () => {
  it('GET /users should return 200', async () => {
    const res = await request(app).get('/users')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /users should create a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'test@example.com', name: 'Test User' })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('email', 'test@example.com')
  })

})

afterAll(async () => {
  await prisma.$disconnect()
})