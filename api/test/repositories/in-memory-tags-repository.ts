import { PaginationParams } from '@/core/repositories/pagination-params'
import { TagsRepository } from '@/domain/stock/application/repositories/tags-repository'
import { Tag } from '@/domain/stock/enterprise/entities/tag'

export class InMemoryTagsRepository implements TagsRepository {
  public items: Tag[] = []

  async findMany({ page }: PaginationParams): Promise<Tag[]> {
    const products = this.items.slice((page - 1) * 20, page * 20)
    return products
  }

  async findById(id: string): Promise<Tag | null> {
    const product = this.items.find((item) => item.id.toString() === id)
    return product || null
  }

  async findByName(id: string): Promise<Tag | null> {
    const product = this.items.find((item) => item.id.toString() === id)
    return product || null
  }

  async create(product: Tag): Promise<void> {
    this.items.push(product)
  }

  async save(product: Tag): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === product.id)
    this.items[itemIndex] = product
  }

  async delete(product: Tag): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === product.id)
    this.items.splice(itemIndex, 1)
  }
}
