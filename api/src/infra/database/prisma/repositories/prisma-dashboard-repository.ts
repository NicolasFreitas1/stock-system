import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DashboardRepository } from '@/domain/stock/application/repositories/dashboard-repository'
import { SalePerProduct } from '@/domain/stock/enterprise/entities/value-objects/sale-per-product'
import { SalesBySeller } from '@/domain/stock/enterprise/entities/value-objects/sales-by-seller'
import { StockMetrics } from '@/domain/stock/enterprise/entities/value-objects/stock-metrics'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaDashboardRepository implements DashboardRepository {
  constructor(private prisma: PrismaService) {}

  async salesPerProduct(): Promise<SalePerProduct[]> {
    const salesPerProduct = await this.prisma.sale.groupBy({
      by: ['productId'],
      _count: true,
    })

    return salesPerProduct.map((sale) =>
      SalePerProduct.create({
        productId: new UniqueEntityId(sale.productId),
        totalSales: sale._count,
      }),
    )
  }

  async salesBySeller(): Promise<SalesBySeller[]> {
    const salesBySeller = await this.prisma.sale.groupBy({
      by: ['sellerId'],
      _count: true,
    })

    const totalSales = await this.prisma.sale.count()

    return salesBySeller.map((sale) =>
      SalesBySeller.create({
        sellerId: new UniqueEntityId(sale.sellerId),
        totalSales: sale._count,
        percentageOfTotal: Math.round(
          (Number(sale._count) / Number(totalSales)) * 100,
        ),
      }),
    )
  }

  async findStockMetrics(): Promise<StockMetrics> {
    const revenueGenerated = await this.prisma.sale.aggregate({
      _sum: {
        value: true,
      },
    })

    const totalStock = await this.prisma.product.count()

    const totalMissing = await this.prisma.product.count({
      where: {
        quantity: 0,
      },
    })

    const totalInRisk = await this.prisma.product.count({
      where: {
        quantity: {
          gt: 0,
          lte: 10,
        },
      },
    })

    return StockMetrics.create({
      revenueGenerated: revenueGenerated._sum.value ?? 0,
      totalInRisk,
      totalMissing,
      totalStock,
    })
  }
}
