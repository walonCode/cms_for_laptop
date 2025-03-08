import { z } from "zod"

export const registerSchema = z.object({
    fullname: z.string().min(2, "Fullname must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    username: z.string().min(2, "Username must be at least 2 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(['ADMIN', 'FACILITATOR']).optional(),
})

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})