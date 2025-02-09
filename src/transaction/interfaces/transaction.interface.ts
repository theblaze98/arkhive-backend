export enum TransactionType {
  INCOME = 'income',
  EXPENSES = 'expenses',
}

export interface ITransaction {
  id: string
  walletId: string
  type: TransactionType
  amount: number
  decription: string
  createdAt: Date
}
