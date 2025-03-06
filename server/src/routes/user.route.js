import { Router } from "express";
import { register, login, refreshToken, logout } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.route('/login').post(login)
userRouter.route('/register').post(register)
userRouter.route('/refresh-token').post(refreshToken)
userRouter.route('/logout').post(logout)

export default userRouter