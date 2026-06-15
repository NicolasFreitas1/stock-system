import {
  PaginationParams,
  toSkipTake,
} from '@/core/repositories/pagination-params'
import { ProductsRepository } from '@/domain/stock/application/repositories/products-repository'
import {
  LOW_STOCK_LIST_LIMIT,
  LOW_STOCK_THRESHOLD,
  Product,
} from '@/domain/stock/enterprise/entities/product'
import { Injectable } from '@nestjs/common'
import { PrismaProductMapper } from '../mappers/prisma-product-mapper'
import { PrismaService } from '../prisma.service'
import { ProductWithTags } from '@/domain/stock/enterprise/entities/value-objects/product-with-tags'
import { PrismaProductWithTagsMapper } from '../mappers/prisma-product-with-tags-mapper'

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({ page }: PaginationParams): Promise<Product[]> {
    const products = await this.prisma.product.findMany(toSkipTake(page))

    return products.map(PrismaProductMapper.toDomain)
  }

  async findManyWithLowQuantity(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        quantity: {
          lte: LOW_STOCK_THRESHOLD,
        },
      },
      orderBy: {
        quantity: 'asc',
      },
      take: LOW_STOCK_LIST_LIMIT,
    })

    return products.map(PrismaProductMapper.toDomain)
  }

  async findManyWithTags({
    page,
  }: PaginationParams): Promise<ProductWithTags[]> {
    const products = await this.prisma.product.findMany({
      ...toSkipTake(page),
      include: {
        productTags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return products.map(PrismaProductWithTagsMapper.toDomain)
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    })

    if (!product) {
      return null
    }

    return PrismaProductMapper.toDomain(product)
  }

  async findByBarcode(barcode: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        barcode,
      },
    })

    if (!product) {
      return null
    }

    return PrismaProductMapper.toDomain(product)
  }

  async create(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product)

    await this.prisma.product.create({ data })
  }

  async save(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product)

    await this.prisma.product.update({ where: { id: data.id }, data })
  }

  async delete(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product)

    await this.prisma.product.delete({ where: { id: data.id } })
  }
}
