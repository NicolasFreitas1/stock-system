import {
  DEFAULT_PAGE_SIZE,
  PaginationParams,
} from '@/core/repositories/pagination-params'
import { ProductsRepository } from '@/domain/stock/application/repositories/products-repository'
import {
  LOW_STOCK_THRESHOLD,
  Product,
} from '@/domain/stock/enterprise/entities/product'
import { ProductWithTags } from '@/domain/stock/enterprise/entities/value-objects/product-with-tags'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async findMany({ page }: PaginationParams): Promise<Product[]> {
    const products = this.items.slice(
      (page - 1) * DEFAULT_PAGE_SIZE,
      page * DEFAULT_PAGE_SIZE,
    )
    return products
  }

  async findManyWithLowQuantity(): Promise<Product[]> {
    return this.items.filter((item) => item.quantity <= LOW_STOCK_THRESHOLD)
  }

  async findManyWithTags(): Promise<ProductWithTags[]> {
    return this.items as unknown as ProductWithTags[]
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id)
    return product || null
  }

  async findByBarcode(barcode: string): Promise<Product | null> {
    const product = this.items.find((item) => item.barcode === barcode)
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
