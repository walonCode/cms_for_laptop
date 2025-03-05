import { asyncHandler } from '../helpers/asyncHandler.js'
import { ApiResponse } from '../helpers/responseHandler.js'
import { errorHandler } from '../helpers/errorHandler.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv'

export const register = asyncHandler(async (req,res) => {
    const { username, email,fullname, password,role} = req.body
    if(!username || !email || !fullname || !password){
        return errorHandler(res, 400, "All field required", 'invalid body')
    }
    const user = await User.findOne({ email })
    if(user){
        return errorHandler(res, 401, 'User already exist')
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
        fullname,
        username,
        role,
        password:passwordHash,
        email
    })
    await newUser.save()

    const userResponse = newUser.toObject()
    delete userResponse.password

    return ApiResponse(res, 200, 'User registered successfully', userResponse)
})

export const login = asyncHandler(async(req,res) => {
    const { email, password } = req.body
    if(!email || !password){
        return errorHandler(res, 400, 'All fields required','invalid fields')
    }
    const user = await User.findOne({ email })
    if(!user){
        return errorHandler(res, 400, 'invalid credentials', 'wrong email')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return errorHandler(res, 400, 'invalid credentails', 'wrong password')
    }

    const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET,{
        expiresIn: '1d'
    })

    const userResponse = user.toObject()
    delete userResponse.password

    return ApiResponse(res, 200, 'login successful', {userResponse, token})
})
