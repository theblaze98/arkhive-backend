import { Injectable } from '@nestjs/common'
import { TransactionRepository } from './transaction.repository'
import { ITransaction } from './interfaces/transaction.interface'

@Injectable()
export class TransactionService {
  constructor(private readonly repository: TransactionRepository) {}

  async create(transaction: ITransaction): Promise<ITransaction> {
    return this.repository.create(transaction)
  }

  async update(
    id: string,
    transaction: Partial<ITransaction>,
  ): Promise<ITransaction> {
    return this.repository.update(id, transaction)
  }

  async delete(id: string): Promise<ITransaction> {
    return this.repository.delete(id)
  }

  async find({ walletId }: { walletId: string }): Promise<ITransaction[]> {
    return this.repository.find({ walletId })
  }

  async findOne({ id }: { id: string }): Promise<ITransaction> {
    return this.repository.findOne({ id })
  }
}
