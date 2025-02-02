import { Injectable } from '@nestjs/common'
import { IUser, IUserServices } from './interfaces'
import { UserRepository } from './user.repository'

@Injectable()
export class UsersService implements IUserServices {
  constructor(private readonly repository: UserRepository) {}

  create(entity: Omit<IUser, 'createdAt'>): Promise<IUser> {
    return this.repository.create(entity)
  }

  update(entity: Partial<IUser>): Promise<IUser> {
    return this.repository.update(entity)
  }

  delete(id: string): Promise<IUser> {
    return this.repository.delete(id)
  }

  find(): Promise<IUser[]> {
    return this.repository.find()
  }

  findOne(params: { id: string; email: string }): Promise<IUser> {
    return this.repository.findOne(params)
  }
}
