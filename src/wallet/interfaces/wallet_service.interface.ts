import { IWallet } from './wallet.interface'

export interface IWalletService {
  create(wallet: Omit<IWallet, 'createdAt'>): Promise<IWallet>
  update(id: string, wallet: Partial<IWallet>): Promise<IWallet>
  delete(id: string): Promise<IWallet>
  find({ userId }: { userId?: string }): Promise<IWallet[]>
  findOne(params: { id?: string; name?: string }): Promise<IWallet | null>
  updateBalance(id: string, balance: number): Promise<IWallet>
}
