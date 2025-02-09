import { ITransaction } from './transaction.interface'

export interface ITransactionServices {
  create(transaction: ITransaction): Promise<ITransaction>
  update(id: string, transaction: Partial<ITransaction>): Promise<ITransaction>
  delete(id: string): Promise<ITransaction>
  find({ walletId }: { walletId: string }): Promise<ITransaction[]>
  findOne({ id }: { id: string }): Promise<ITransaction>
}
