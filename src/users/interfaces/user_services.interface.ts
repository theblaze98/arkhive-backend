import { IUser } from './user.interface'

export interface IUserServices {
  create(entity: Omit<IUser, 'createdAt'>): Promise<IUser>
  update(id: string, entity: Partial<IUser>): Promise<IUser>
  delete(id: string): Promise<IUser>
  find(): Promise<IUser[]>
  findOne(params: { id: string; email: string }): Promise<IUser>
}
