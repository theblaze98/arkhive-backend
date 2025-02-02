export interface IRepository<T> {
  create(entity: Partial<T>): Promise<T>
  update(id: string, entity: Partial<T>): Promise<T>
  delete(id: string): Promise<T>
  find(): Promise<T[]>
  findOne(params: { [key: string]: any }): Promise<T>
}
