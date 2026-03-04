import express from 'express'
import { prisma } from './prisma'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.post('/users', async (req, res) => {
  const { email, name } = req.body

  const user = await prisma.user.create({
    data: { email, name }
  })

  res.json(user)
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})