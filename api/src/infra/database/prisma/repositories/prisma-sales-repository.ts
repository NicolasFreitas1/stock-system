import { PaginationParams } from '@/core/repositories/pagination-params'
import { SalesRepository } from '@/domain/stock/application/repositories/sales-repository'
import { Sale } from '@/domain/stock/enterprise/entities/sale'
import { Injectable } from '@nestjs/common'
import { PrismaSaleMapper } from '../mappers/prisma-sale-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaSalesRepository implements SalesRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({ page }: PaginationParams): Promise<Sale[]> {
    const sales = await this.prisma.sale.findMany({
      skip: (page - 1) * 20,
      take: 20,
    })

    return sales.map(PrismaSaleMapper.toDomain)
  }

  async findById(id: string): Promise<Sale | null> {
    const sale = await this.prisma.sale.findUnique({
      where: {
        id,
      },
    })

    if (!sale) {
      return null
    }

    return PrismaSaleMapper.toDomain(sale)
  }

  async create(sale: Sale): Promise<void> {
    const data = PrismaSaleMapper.toPrisma(sale)

    await this.prisma.sale.create({ data })
  }

  async save(sale: Sale): Promise<void> {
    const data = PrismaSaleMapper.toPrisma(sale)

    await this.prisma.sale.update({ where: { id: data.id }, data })
  }

  async delete(sale: Sale): Promise<void> {
    const data = PrismaSaleMapper.toPrisma(sale)

    await this.prisma.sale.delete({ where: { id: data.id } })
  }
}
