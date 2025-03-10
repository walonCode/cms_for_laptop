import { asyncHandler } from '../helpers/asyncHandler.js'
import { ApiResponse } from '../helpers/responseHandler.js'
import { errorHandler } from '../helpers/errorHandler.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';


config()

export const register = asyncHandler(async (req,res) => {
    const result = registerSchema.safeParse(req.body)
    if(!result.success){
        return errorHandler(res, 400, "invalid input")
    }
    const { username, email, fullname, password,role} = result.data

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

export const login = asyncHandler(async (req, res) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return errorHandler(res, 400, 'invalid input', 'invalid fields');
    }

    const { password, email} = result.data;
    const user = await User.findOne({email})
    if(!user){
        return errorHandler(res,400,'User not found')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        return errorHandler(res, 401, 'Invalid password')
    }

    const accessToken = jwt.sign({id:user._id, role:user.role},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'1d'
    })

    const userResponse = user.toObject()
    delete userResponse.password;

    const userToken = jwt.sign(userResponse,process.env.USER_TOKEN_SECRET,{expiresIn:'1d'})

    return ApiResponse(res, 200, 'user logged in', {userToken, accessToken})
});

export const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
        return errorHandler(res, 404, 'User not found');
    }

    const userResponse = user.toObject();
    delete userResponse.password; 

    return ApiResponse(res, 200, 'User profile retrieved successfully', userResponse);
});