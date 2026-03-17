import 'dotenv/config'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger/swagger.json'
import { RegisterRoutes } from './routes_generated/routes'
import cors from 'cors'
import { errorHandler } from './middleware/error.middleware'

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)

app.use(express.json())

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }
      callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
  })
)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

RegisterRoutes(app)

app.get('/', (_req, res) => res.json({ message: 'Hall Backend API' }))

// Global error handler — must be registered after routes
app.use(errorHandler)

export default app
