export enum WalletType {
  SAVING = 'saving',
  NORMAL = 'normal',
}

export interface IWallet {
  id: string
  userId: string
  name: string
  type: string
  balance: number
  createdAt: Date
}
