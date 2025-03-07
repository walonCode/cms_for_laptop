import express from 'express'
import { errorMiddleware } from './middlewares/error.middleware.js'
import { config } from 'dotenv'
import laptopRouter from './routes/laptop.route.js'
import userRouter from './routes/user.route.js'
import cors from 'cors'
import { corsOptions } from './configs/corsOptions.js'
import connectDB from './configs/connectDB.js'
import allocationRouter from './routes/allocation.route.js'
import cookieParser from 'cookie-parser'


//for the .env file to work 
config()

export const app = express()

//connection to the database
connectDB()

//common middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))


//route
app.use('/api/v1/users',userRouter)
app.use('/api/v1/laptop',laptopRouter)
app.use('/api/v1/allocation', allocationRouter)

//error middleware
app.use(errorMiddleware)