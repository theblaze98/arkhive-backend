import { z } from 'zod'

export const createWalletSchema = z.object({
  name: z.string(),
  type: z.string(),
  balance: z.number(),
})

export type CreateWalletDto = Required<z.infer<typeof createWalletSchema>>
