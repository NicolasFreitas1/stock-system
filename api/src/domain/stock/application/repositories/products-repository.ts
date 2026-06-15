import { PaginationParams } from '@/core/repositories/pagination-params'
import { Product } from '../../enterprise/entities/product'
import { ProductWithTags } from '../../enterprise/entities/value-objects/product-with-tags'

export abstract class ProductsRepository {
  abstract findMany(params: PaginationParams): Promise<Product[]>
  abstract findManyWithLowQuantity(): Promise<Product[]>
  abstract findManyWithTags(
    params: PaginationParams,
  ): Promise<ProductWithTags[]>

  abstract findById(id: string): Promise<Product | null>
  abstract create(product: Product): Promise<void>
  abstract findByBarcode(barcode: string): Promise<Product | null>
  abstract save(product: Product): Promise<void>
  abstract delete(product: Product): Promise<void>
}
