import { PaginationParams } from '@/core/repositories/pagination-params'
import { UsersRepository } from '@/domain/stock/application/repositories/users-repository'
import { User } from '@/domain/stock/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findMany({ page }: PaginationParams): Promise<User[]> {
    const users = this.items.slice((page - 1) * 20, page * 20)

    return users
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByLogin(login: string): Promise<User | null> {
    const user = this.items.find((item) => item.login === login)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async save(user: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items[itemIndex] = user
  }

  async delete(user: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items.splice(itemIndex, 1)
  }
}
