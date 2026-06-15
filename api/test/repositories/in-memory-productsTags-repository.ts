import { PaginationParams } from '@/core/repositories/pagination-params'
import { ProductTagsRepository } from '@/domain/stock/application/repositories/product-tags-repository'
import { ProductTag } from '@/domain/stock/enterprise/entities/product-tag'

export class InMemoryProductTagsRepository implements ProductTagsRepository {
  public items: ProductTag[] = []

  async findMany({ page }: PaginationParams): Promise<ProductTag[]> {
    const start = (page - 1) * 20
    const end = page * 20
    return this.items.slice(start, end)
  }

  async findById(id: string): Promise<ProductTag | null> {
    return this.items.find((item) => item.id.toString() === id) || null
  }

  async create(productTag: ProductTag): Promise<void> {
    this.items.push(productTag)
  }

  async save(productTag: ProductTag): Promise<void> {
    const index = this.items.findIndex((item) => item.id === productTag.id)
    if (index !== -1) {
      this.items[index] = productTag
    }
  }

  async delete(productTag: ProductTag): Promise<void> {
    const index = this.items.findIndex((item) => item.id === productTag.id)
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
