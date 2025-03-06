import passport from 'passport'
import { Strategy as JwtStrategy,ExtractJwt } from 'passport-jwt'
import  { Strategy as LocalStrategy } from "passport-local"
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
import { config } from 'dotenv'

config()

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.ACCESS_TOKEN_SECRET
}

// Jwt strategy
passport.use(
    new JwtStrategy(jwtOptions, asyncHandler(async(jwt_payload, done) => {
        const user = await User.findById(jwt_payload.id)
        if(user){
            return done(null, user)
        }
        return done(null, false)
    }))
)

//local strategy
passport.use(
    new LocalStrategy({ usernameField: 'email'}, asyncHandler(async (email,password, done) => {
        const user = await User.findOne({email})
        if(!user){
            return done(null, false, {message:'user not found'})
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return done(null, false, {message:'password is incorrect'})
        }
        return done(null, user)
    }))
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(asyncHandler(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
}))

export default passport