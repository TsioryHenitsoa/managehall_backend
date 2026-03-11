import 'dotenv/config'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger/swagger.json'
import { RegisterRoutes } from './routes_generated/routes'
import cors from 'cors'

const app = express()
const allowedOrigins = (process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:3000')
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

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

RegisterRoutes(app)

app.get('/', (req, res) => res.json({ message: 'Hello World!' }))

export default app