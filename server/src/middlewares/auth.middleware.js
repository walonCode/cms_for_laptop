import jwt from 'jsonwebtoken';
import { asyncHandler } from '../helpers/asyncHandler.js'
import { errorHandler} from '../helpers/errorHandler.js'

export const authMiddleware = (req,res,next) => {
    const token = req.headers['authorization']
    console.log(req.headers['authorization'])
    console.log(token)
    // console.log(process.env.JWT_SECRET)
    const tokenValue = token.replace('Bearer ', '').trim()
    console.log(tokenValue)
    if(!token){
        return errorHandler(res, 401, 'Access denied')
    }
    const decoded = jwt.verify(tokenValue ,process.env.JWT_SECRET)
    console.log(decoded)
    req.user = decoded
    next()  
}

export const authorize = (roles) => (req,res,next) => {
    if(!roles.includes(req.user.role)){
        return errorHandler(res, 403 , 'Access forbidden')
    }
    next()
}