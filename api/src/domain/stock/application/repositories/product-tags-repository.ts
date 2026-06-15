import { PaginationParams } from '@/core/repositories/pagination-params'
import { ProductTag } from '../../enterprise/entities/product-tag'

export abstract class ProductTagsRepository {
  abstract findMany(params: PaginationParams): Promise<ProductTag[]>
  abstract findById(id: string): Promise<ProductTag | null>
  abstract create(productTag: ProductTag): Promise<void>
  abstract save(productTag: ProductTag): Promise<void>
  abstract delete(productTag: ProductTag): Promise<void>
}
