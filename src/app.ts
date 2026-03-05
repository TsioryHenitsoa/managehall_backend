import express from 'express'
import userRoutes from './routes/user.routes'
import salleRoutes from './routes/salle.routes'
import authRoutes from './routes/auth.routes'

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'Hello World!' }))
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/salles', salleRoutes)

export default app