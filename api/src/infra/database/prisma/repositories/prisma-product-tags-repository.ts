import { PaginationParams } from '@/core/repositories/pagination-params'
import { ProductTagsRepository } from '@/domain/stock/application/repositories/product-tags-repository'
import { ProductTag } from '@/domain/stock/enterprise/entities/product-tag'
import { Injectable } from '@nestjs/common'
import { PrismaProductTagMapper } from '../mappers/prisma-product-tag-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaProductTagsRepository implements ProductTagsRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({ page }: PaginationParams): Promise<ProductTag[]> {
    const productTags = await this.prisma.productTag.findMany({
      skip: (page - 1) * 20,
      take: 20,
    })

    return productTags.map(PrismaProductTagMapper.toDomain)
  }

  async findById(id: string): Promise<ProductTag | null> {
    const productTag = await this.prisma.productTag.findUnique({
      where: {
        id,
      },
    })

    if (!productTag) {
      return null
    }

    return PrismaProductTagMapper.toDomain(productTag)
  }

  async create(productTag: ProductTag): Promise<void> {
    const data = PrismaProductTagMapper.toPrisma(productTag)

    await this.prisma.productTag.create({ data })
  }

  async save(productTag: ProductTag): Promise<void> {
    const data = PrismaProductTagMapper.toPrisma(productTag)

    await this.prisma.productTag.update({ where: { id: data.id }, data })
  }

  async delete(productTag: ProductTag): Promise<void> {
    const data = PrismaProductTagMapper.toPrisma(productTag)

    await this.prisma.productTag.delete({ where: { id: data.id } })
  }
}
