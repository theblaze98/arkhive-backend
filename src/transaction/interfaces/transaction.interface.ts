export enum TransactionType {
  INCOME = 'income',
  EXPENSES = 'expenses',
}

export interface ITransaction {
  id: string
  walletId: string
  type: TransactionType
  amount: number
  description: string
  createdAt: Date
}
