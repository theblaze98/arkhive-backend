import { Inject } from '@nestjs/common'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { eq } from 'drizzle-orm'
import { DRIZZLE_PROVIDER } from '@/helpers/const'
import { IRepository } from '@/interfaces/repository.interface'
import * as schemas from '@/drizzle/schemas'
import { ITransaction } from './interfaces/transaction.interface'

export class TransactionRepository implements IRepository<ITransaction> {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private db: NeonHttpDatabase<typeof schemas>,
  ) {}

  async find({ walletId }: { walletId: string }): Promise<ITransaction[]> {
    const transaction = await this.db.query.transactionTable.findMany({
      where: eq(schemas.transactionTable.walletId, walletId),
    })
    return transaction.map(transformTransaction)
  }

  async findOne({ id }: { id: string }): Promise<ITransaction> {
    const transaction = await this.db.query.transactionTable.findFirst({
      where: eq(schemas.transactionTable.id, id),
    })
    return transformTransaction(transaction)
  }

  async create(
    transaction: Omit<ITransaction, 'createdAt'>,
  ): Promise<ITransaction> {
    const createdTransaction = await this.db
      .insert(schemas.transactionTable)
      .values({ ...transaction, amount: transaction.amount.toString() })
      .returning()
    return transformTransaction(createdTransaction)
  }

  async update(
    id: string,
    transaction: Partial<ITransaction>,
  ): Promise<ITransaction> {
    const updatedTransaction = await this.db
      .update(schemas.transactionTable)
      .set({ ...transaction, amount: transaction.amount?.toString() })
      .where(eq(schemas.transactionTable.id, id))
      .returning()
    return transformTransaction(updatedTransaction)
  }

  async delete(id: string): Promise<ITransaction> {
    const deletedTransaction = await this.db
      .delete(schemas.transactionTable)
      .where(eq(schemas.transactionTable.id, id))
      .returning()
    return transformTransaction(deletedTransaction)
  }
}

function transformTransaction(transaction): ITransaction {
  return {
    ...transaction,
    amount: parseFloat(transaction.amount),
  }
}
