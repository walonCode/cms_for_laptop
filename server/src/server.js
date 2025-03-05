import express from 'express'
import { errorMiddleware } from './middlewares/error.middleware.js'
import {config} from 'dotenv'

//for the .env file to work 
config()

export const app = express()



//route

//error middleware
app.use(errorMiddleware)