import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger/swagger.json'
import { RegisterRoutes } from './routes_generated/routes'

const app = express()
app.use(express.json())

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

RegisterRoutes(app)

app.get('/', (req, res) => res.json({ message: 'Hello World!' }))

export default app