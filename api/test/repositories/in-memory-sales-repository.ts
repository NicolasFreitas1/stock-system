import {
  DEFAULT_PAGE_SIZE,
  PaginationParams,
} from '@/core/repositories/pagination-params'
import { SalesRepository } from '@/domain/stock/application/repositories/sales-repository'
import { Sale } from '@/domain/stock/enterprise/entities/sale'

export class InMemorySalesRepository implements SalesRepository {
  public items: Sale[] = []

  async findMany({ page }: PaginationParams): Promise<Sale[]> {
    return this.items.slice(
      (page - 1) * DEFAULT_PAGE_SIZE,
      page * DEFAULT_PAGE_SIZE,
    )
  }

  async findById(id: string): Promise<Sale | null> {
    const sale = this.items.find((item) => item.id.toString() === id)

    return sale || null
  }

  async create(sale: Sale): Promise<void> {
    this.items.push(sale)
  }

  async save(sale: Sale): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === sale.id)

    this.items[itemIndex] = sale
  }

  async delete(sale: Sale): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === sale.id)

    this.items.splice(itemIndex, 1)
  }
}
