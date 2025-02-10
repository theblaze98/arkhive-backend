import { z } from 'zod'

export const registerUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type registerUserDto = Required<z.infer<typeof registerUserSchema>>
export type loginUserDtop = Required<z.infer<typeof loginUserSchema>>
