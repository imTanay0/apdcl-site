import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/ConnectDB.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import userRoutes from './routes/userRoutes.js'
import circleRoutes from './routes/circleRoutes.js'
import divisionRoutes from './routes/divisionRoutes.js'
import subDivisionRoutes from './routes/subDivisionRoutes.js'

// Config
dotenv.config({ path: 'database/.env' })

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URI],
//     methods: ['GET', 'POST', 'PUT'],
//     credentials: true,
//   })
// )

// routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/circle', circleRoutes)
app.use('/api/v1/division', divisionRoutes)
app.use('/api/v1/subdivision', subDivisionRoutes)

// connect to database
connectDB()

app.get('/', (req, res) => res.send(`Hello Users`))
app.listen(process.env.PORT, () =>
  console.log(`App listening on port http://localhost:${process.env.PORT}`)
)
