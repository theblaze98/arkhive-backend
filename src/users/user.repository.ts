import { Inject } from '@nestjs/common'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { eq, or } from 'drizzle-orm'
import { DRIZZLE_PROVIDER } from '@/helpers/const'
import { IRepository } from '@/interfaces/repository.interface'
import { IUser } from './interfaces'
import * as schemas from '@/drizzle/schemas'

export class UserRepository implements IRepository<IUser> {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private db: NeonHttpDatabase<typeof schemas>,
  ) {}

  async create(entity: Omit<IUser, 'createdAt'>): Promise<IUser> {
    const user = await this.db
      .insert(schemas.userTable)
      .values(entity)
      .returning()
    return user[0]
  }

  async update(id: string, entity: Partial<IUser>): Promise<IUser> {
    const user = await this.db.update(schemas.userTable).set(entity).returning()
    return user[0]
  }

  async delete(id: string): Promise<IUser> {
    const user = await this.db
      .delete(schemas.userTable)
      .where(eq(schemas.userTable.id, id))
      .returning()
    return user[0]
  }

  async find(): Promise<IUser[]> {
    return await this.db.select().from(schemas.userTable)
  }

  async findOne(params: { id?: string; email?: string }): Promise<IUser> {
    return await this.db.query.userTable.findFirst({
      where: or(
        eq(schemas.userTable.id, params.id),
        eq(schemas.userTable.email, params.email),
      ),
    })
  }
}
