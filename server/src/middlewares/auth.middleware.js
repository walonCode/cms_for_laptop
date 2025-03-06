import jwt from 'jsonwebtoken';
import { errorHandler} from '../helpers/errorHandler.js'

export const authMiddleware = (req,res,next) => {
    const token = req.headers['authorization']
    if(!token){
        return errorHandler(res, 401, 'Access denied')
    }
    const tokenValue = token.replace('Bearer ', '').trim()
    try{
        const decoded = jwt.verify(tokenValue, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next() 
    }catch(error){
        console.log(error)
        return errorHandler(res, 500, 'server error')
    }
}

export const authorize = (roles) => (req,res,next) => {
    if(!roles.includes(req.user.role)){
        return errorHandler(res, 403 , 'Access forbidden')
    }
    next()
}