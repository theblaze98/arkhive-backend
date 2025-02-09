import { Injectable } from '@nestjs/common'
import { IWalletService } from './interfaces/wallet_service.interface'
import { WalletRepositoy } from './wallet.repository'
import { IWallet } from './interfaces/wallet.interface'

@Injectable()
export class WalletService implements IWalletService {
  constructor(private readonly repository: WalletRepositoy) {}

  create(entity: Omit<IWallet, 'createdAt'>): Promise<IWallet> {
    return this.repository.create(entity)
  }

  update(id: string, entity: Partial<IWallet>): Promise<IWallet> {
    return this.repository.update(id, entity)
  }

  delete(id: string): Promise<IWallet> {
    return this.repository.delete(id)
  }

  find(): Promise<IWallet[]> {
    return this.repository.find()
  }

  findOne(params: { id: string; name: string }): Promise<IWallet> {
    return this.repository.findOne(params)
  }

  updateBalance(id: string, balance: string): Promise<IWallet> {
    return this.repository.update(id, { balance })
  }
}
