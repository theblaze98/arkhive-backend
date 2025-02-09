import { Inject } from '@nestjs/common'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { DRIZZLE_PROVIDER } from '@/helpers/const'
import { IRepository } from '@/interfaces/repository.interface'
import * as schemas from '@/drizzle/schemas'
import { IWallet } from './interfaces/wallet.interface'
import { eq } from 'drizzle-orm'

export class WalletRepository implements IRepository<IWallet> {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: NeonHttpDatabase<typeof schemas>,
  ) {}

  async create(entity: Omit<IWallet, 'createdAt'>): Promise<IWallet> {
    const wallet = await this.db
      .insert(schemas.walletTable)
      .values({ ...entity, balance: entity.balance.toString() })
      .returning()
    return transformWallet(wallet[0])
  }

  async findById(id: string): Promise<IWallet | null> {
    const wallet = await this.db
      .select()
      .from(schemas.walletTable)
      .where(eq(schemas.walletTable.id, id))
    return transformWallet(wallet[0])
  }

  async update(
    id: string,
    entity: Partial<Omit<IWallet, 'createdAt'>>,
  ): Promise<IWallet> {
    const wallet = await this.db
      .update(schemas.walletTable)
      .set({ ...entity, balance: entity.balance?.toString() })
      .where(eq(schemas.walletTable.id, id))
      .returning()
    return transformWallet(wallet[0])
  }

  async delete(id: string): Promise<IWallet> {
    const wallet = await this.db
      .delete(schemas.walletTable)
      .where(eq(schemas.walletTable.id, id))
      .returning()
    return transformWallet(wallet[0])
  }

  async find(): Promise<IWallet[]> {
    const wallet = await this.db.select().from(schemas.walletTable).execute()
    return wallet.map(transformWallet)
  }

  async findOne(params: { id: string; name: string }): Promise<IWallet> {
    const wallet = this.db.query.walletTable.findFirst({
      where: eq(schemas.walletTable.id, params.id),
    })

    return transformWallet(wallet[0])
  }
}

function transformWallet(wallet): IWallet {
  return {
    ...wallet,
    balance: parseFloat(wallet.balance),
  }
}
