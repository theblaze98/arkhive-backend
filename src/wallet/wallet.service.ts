import { Injectable } from '@nestjs/common'
import { IWalletService } from './interfaces/wallet_service.interface'
import { WalletRepository } from './wallet.repository'
import { IWallet } from './interfaces/wallet.interface'

@Injectable()
export class WalletService implements IWalletService {
  constructor(private readonly repository: WalletRepository) {}

  create(entity: Omit<IWallet, 'createdAt'>): Promise<IWallet> {
    return this.repository.create(entity)
  }

  update(id: string, entity: Partial<IWallet>): Promise<IWallet> {
    return this.repository.update(id, entity)
  }

  delete(id: string): Promise<IWallet> {
    return this.repository.delete(id)
  }

  find({ userId }: { userId: string }): Promise<IWallet[]> {
    return this.repository.find({ userId })
  }

  findOne(params: { id?: string; name?: string }): Promise<IWallet | null> {
    return this.repository.findOne(params)
  }

  updateBalance(id: string, balance: number): Promise<IWallet> {
    return this.repository.update(id, { balance })
  }
}
