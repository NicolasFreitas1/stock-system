import { PaginationParams } from '@/core/repositories/pagination-params'
import { Tag } from '../../enterprise/entities/tag'

export abstract class TagsRepository {
  abstract findMany(params: PaginationParams): Promise<Tag[]>
  abstract findById(id: string): Promise<Tag | null>
  abstract findByName(name: string): Promise<Tag | null>
  abstract create(tag: Tag): Promise<void>
  abstract save(tag: Tag): Promise<void>
  abstract delete(tag: Tag): Promise<void>
}
