import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { errorHandler } from '@/middlewares/errorHandler'

const app = express()

// Middlewares
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Todo: Register routes

// Error handling 
app.use(errorHandler)

export default app
