import { Router } from "express";
import { register, login } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.route('/login').post(login)
userRouter.route('/register').post(register)

export default userRouter