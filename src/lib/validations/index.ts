import { z } from 'zod'

export const registerValidation = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    email: z.string().email(),
    name: z
        .string()
        .min(2, { message: 'name must be at least two characters' })
        .max(20, { message: 'name must be less than 20 characters' }),
    password: z
        .string()
        .min(8, { message: 'password must be at least 8 characters' }),
})
export const loginValidation = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: 'password must be at least 8 characters' }),
})
