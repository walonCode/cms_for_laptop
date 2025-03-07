import { asyncHandler } from '../helpers/asyncHandler.js'
import { ApiResponse } from '../helpers/responseHandler.js'
import { errorHandler } from '../helpers/errorHandler.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';


config()

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

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return errorHandler(res, 400, 'All fields required', 'invalid fields');
    }

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

    return ApiResponse(res, 200, 'user logged in', {userResponse, accessToken})
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