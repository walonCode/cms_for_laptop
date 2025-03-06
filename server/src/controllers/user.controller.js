import { asyncHandler } from '../helpers/asyncHandler.js'
import { ApiResponse } from '../helpers/responseHandler.js'
import { errorHandler } from '../helpers/errorHandler.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv'

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

    const accessToken = jwt.sign({id:user._id, role:user.role}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '2hr'
    })

    const refreshToken = jwt.sign({id:user._id, role:user.role}, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: '1d'
    })

    res.cookie("refreshToken",refreshToken , {
        httpOnly:true,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000
    })

    user.refreshToken = refreshToken;
    await user.save()

    const userResponse = user.toObject()
    delete userResponse.password

    return ApiResponse(res, 200, 'login successful', {userResponse, accessToken})
})

export const refreshToken = asyncHandler(async (req, res) => {
    const refreshToken  = req.cookies.refreshToken;

    if (!refreshToken) {
        return errorHandler(res, 401, "Refresh token required");
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
        return errorHandler(res, 403, "Invalid refresh token");
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) return errorHandler(res, 403, "Invalid or expired refresh token");

        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "2hr" }
        );

        return ApiResponse(res, 200, "Access token refreshed successfully", { accessToken });
    });
});

export const logout = asyncHandler(async (req, res) => {

    //passportjs logout function
    req.logout((err) => {
        if(err){
            return errorHandler(res, 500, 'Error logging out of session')
        }
    })

    const user = await User.findOne({ refreshToken: req.cookies.refreshToken });

    if (!user) {
        return errorHandler(res, 400, "User not found");
    }

    user.refreshToken = null; 
    await user.save();

    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "Strict"
    });

    return ApiResponse(res, 200, "Logged out successfully");
});
