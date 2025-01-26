import { IRepository } from '@/interfaces/repository.interface'
import { IUser } from './interfaces'
import { Inject } from '@nestjs/common'
import { DRIZZLE_PROVIDER } from '@/helpers/const'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import * as schemas from '@/drizzle/schemas'

export class UserRepository implements IRepository<IUser> {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private db: NeonHttpDatabase<typeof schemas>,
  ) {}

  create(entity: Partial<IUser>): Promise<IUser> {
    return this.db.insert(schemas.userTable).values(entity).returning()
  }
}
