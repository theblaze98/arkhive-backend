export interface IRepository<T> {
  create(entity: Partial<T>): Promise<T>
  update(entity: Partial<T>): Promise<T>
  delete(id: string): Promise<T>
  find(): Promise<T[]>
  findOne(params: { [key: string]: any }): Promise<T>
}
