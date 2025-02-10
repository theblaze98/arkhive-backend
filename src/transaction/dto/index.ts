import { z } from 'zod'
import { TransactionType } from '../interfaces/transaction.interface'

export const createTransactionSchema = z.object({
  walletId: z.string().uuid(),
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSES]),
  amount: z.number(),
  description: z.string(),
})

export type CreateTransactionDto = Required<
  z.infer<typeof createTransactionSchema>
>
