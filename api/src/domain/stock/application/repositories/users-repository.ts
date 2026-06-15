import { PaginationParams } from '@/core/repositories/pagination-params'
import { User } from '../../enterprise/entities/user'

export abstract class UsersRepository {
  abstract findMany(params: PaginationParams): Promise<User[]>
  abstract findById(id: string): Promise<User | null>
  abstract findByLogin(login: string): Promise<User | null>
  abstract create(user: User): Promise<void>
  abstract save(user: User): Promise<void>
  abstract delete(user: User): Promise<void>
}
