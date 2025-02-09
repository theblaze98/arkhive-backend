import { z } from 'zod'

export const createWalletSchema = z
  .object({
    name: z.string(),
    type: z.string(),
    balance: z.number(),
  })
  .required()

export type CreateWalletDto = {
  name: string
  type: string
  balance: number
}
