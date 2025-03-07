import { Router } from "express";
import { register, login, getUserProfile} from '../controllers/user.controller.js'
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.route('/login').post(login)
userRouter.route('/register').post(register)
userRouter.route('/profile').get(authMiddleware,getUserProfile)

export default userRouter