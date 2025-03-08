import { z } from 'zod'

export const addLaptopSchema = z.object({
    serialNo: z.string().min(5, "serial no must be at least 5 characters long"),
    brand: z.string().min(5, "brand must be at least 5 characters long"),
    model: z.string().min(5, "model must be at least 5 characters long"),
})

export const updateLaptopSchema = z.object({
    serialNo: z.string().min(5, "serial no must be at least 5 characters long").optional(),
    brand: z.string().min(5, "brand must be at least 5 characters long").optional(),
    model: z.string().min(5, "model must be at least 5 characters long").optional(),
    status: z.enum(['AVAILABLE', 'ASSIGNED', 'FAULTY', 'RETURNED']).optional(),
})