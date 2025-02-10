import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { TransactionRepository } from './transaction.repository'
import {
  ITransaction,
  TransactionType,
} from './interfaces/transaction.interface'
import { WalletService } from '@/wallet/wallet.service'

@Injectable()
export class TransactionService {
  constructor(
    private readonly repository: TransactionRepository,
    private readonly walletService: WalletService,
  ) {}

  async create(
    transaction: Omit<ITransaction, 'createdAt'>,
  ): Promise<ITransaction> {
    const { walletId, amount, type } = transaction

    if (amount <= 0)
      throw new BadRequestException('El monto debe ser mayor a 0')

    const wallet = await this.walletService.findOne({ id: walletId })
    if (!wallet) throw new NotFoundException('WALLET_NOT_FOUND')

    const updatedBalance =
      type === TransactionType.INCOME
        ? wallet.balance + amount
        : wallet.balance - amount

    if (updatedBalance < 0)
      throw new BadRequestException('WALLET_INSUFFICIENT_FUNDS')

    const createdTransaction = await this.repository.create(transaction)

    return createdTransaction
  }

  async delete(id: string): Promise<ITransaction> {
    const transaction = await this.repository.findOne({ id })
    if (!transaction) throw new NotFoundException('Transacción no encontrada')

    const wallet = await this.walletService.findOne({
      id: transaction.walletId,
    })
    if (wallet) {
      const updatedBalance =
        transaction.type === TransactionType.INCOME
          ? wallet.balance - transaction.amount
          : wallet.balance + transaction.amount

      await this.walletService.updateBalance(wallet.id, updatedBalance)
    }

    return transaction
  }

  async update(
    id: string,
    transactionData: Partial<ITransaction>,
  ): Promise<ITransaction> {
    const existingTransaction = await this.repository.findOne({ id })
    if (!existingTransaction)
      throw new NotFoundException('Transacción no encontrada')

    const wallet = await this.walletService.findOne({
      id: existingTransaction.walletId,
    })
    if (!wallet) throw new NotFoundException('Wallet no encontrada')

    let updatedBalance =
      existingTransaction.type === TransactionType.INCOME
        ? wallet.balance - existingTransaction.amount
        : wallet.balance + existingTransaction.amount

    if (
      transactionData.amount !== undefined ||
      transactionData.type !== undefined
    ) {
      const newType = transactionData.type ?? existingTransaction.type
      const newAmount = transactionData.amount ?? existingTransaction.amount

      updatedBalance =
        newType === TransactionType.INCOME
          ? updatedBalance + newAmount
          : updatedBalance - newAmount

      if (updatedBalance < 0)
        throw new BadRequestException('Fondos insuficientes')

      await this.walletService.updateBalance(wallet.id, updatedBalance)
    }

    const updatedTransaction = await this.repository.update(id, transactionData)

    return updatedTransaction
  }

  async find({ walletId }: { walletId: string }): Promise<ITransaction[]> {
    return this.repository.find({ walletId })
  }

  async findOne({ id }: { id: string }): Promise<ITransaction> {
    return this.repository.findOne({ id })
  }
}
