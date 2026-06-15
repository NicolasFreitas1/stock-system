import { PaginationParams } from '@/core/repositories/pagination-params'
import { Sale } from '../../enterprise/entities/sale'

export abstract class SalesRepository {
  abstract findMany(params: PaginationParams): Promise<Sale[]>
  abstract findById(id: string): Promise<Sale | null>
  abstract create(sale: Sale): Promise<void>
  abstract save(sale: Sale): Promise<void>
  abstract delete(sale: Sale): Promise<void>
}
