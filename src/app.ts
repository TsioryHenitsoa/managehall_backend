import express from 'express'
import userRoutes from './routes/user.routes'

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'Hello World!' }))
app.use('/users', userRoutes)

export default app