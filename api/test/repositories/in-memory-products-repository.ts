import { PaginationParams } from '@/core/repositories/pagination-params'
import { ProductsRepository } from '@/domain/stock/application/repositories/products-repository'
import { Product } from '@/domain/stock/enterprise/entities/product'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async findMany({ page }: PaginationParams): Promise<Product[]> {
    const products = this.items.slice((page - 1) * 20, page * 20)
    return products
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id)
    return product || null
  }

  async create(product: Product): Promise<void> {
    this.items.push(product)
  }

  async save(product: Product): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === product.id)
    this.items[itemIndex] = product
  }

  async delete(product: Product): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === product.id)
    this.items.splice(itemIndex, 1)
  }
}
