import express from 'express'
import { errorMiddleware } from './middlewares/error.middleware.js'
import { config } from 'dotenv'
import laptopRouter from './routes/laptop.route.js'
import userRouter from './routes/user.route.js'
import cors from 'cors'
import { corsOptions } from './configs/corsOptions.js'
import connectDB from './configs/connectDB.js'
import session from 'express-session'
import passport from './configs/passport.js'


//for the .env file to work 
config()

export const app = express()

//connection to the database
connectDB()

//common middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(session({secret:process.env.EXPRESS_SESSION_SECRET, resave:false, saveUninitialized:false}))
app.use(passport.initialize())
app.use(passport.session())

//route
app.use('/api/v1/users',userRouter)
app.use('/api/v1/laptop',laptopRouter)

//error middleware
app.use(errorMiddleware)