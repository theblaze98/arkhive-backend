import { Inject } from '@nestjs/common'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { DRIZZLE_PROVIDER } from '@/helpers/const'
import { IRepository } from '@/interfaces/repository.interface'
import * as schemas from '@/drizzle/schemas'
import { IWallet } from './interfaces/wallet.interface'
import { eq } from 'drizzle-orm'

export class WalletRepositoy implements IRepository<IWallet> {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: NeonHttpDatabase<typeof schemas>,
  ) {}

  async create(entity: Omit<IWallet, 'createdAt'>): Promise<IWallet> {
    const wallet = await this.db
      .insert(schemas.walletTable)
      .values({ ...entity, balance: entity.balance.toString() })
      .returning()
    return wallet[0]
  }

  async update(id: string, entity: Partial<IWallet>): Promise<IWallet> {
    const wallet = await this.db
      .update(schemas.walletTable)
      .set({ ...entity, balance: entity.balance?.toString() })
      .returning()
    return wallet[0]
  }

  async delete(id: string): Promise<IWallet> {
    const wallet = await this.db
      .delete(schemas.walletTable)
      .where(eq(schemas.walletTable.id, id))
      .returning()
    return wallet[0]
  }

  async find(): Promise<IWallet[]> {
    return await this.db.select().from(schemas.walletTable).execute()
  }

  async findOne(params: { id: string; name: string }): Promise<IWallet> {
    return this.db.query.walletTable.findFirst({
      where: eq(schemas.walletTable.id, params.id),
    })
  }
}
