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

  create(entity: Omit<IUser, 'createdAt'>): Promise<IUser> {
    return this.db.insert(schemas.userTable).values(entity).returning()[0]
  }

  update(entity: Partial<IUser>): Promise<IUser> {
    return this.db.update(schemas.userTable).set(entity).returning()[0]
  }

  delete(id: string): Promise<IUser> {
    return this.db
      .delete(schemas.userTable)
      .where(eq(schemas.userTable.id, id))
      .returning()[0]
  }

  find(): Promise<IUser[]> {
    return this.db.select().from(schemas.userTable)
  }

  findOne(params: { id: string; email: string }): Promise<IUser> {
    return this.db.query.userTable.findFirst({
      where: or(
        eq(schemas.userTable.id, params.id),
        eq(schemas.userTable.email, params.email),
      ),
    })
  }
}
