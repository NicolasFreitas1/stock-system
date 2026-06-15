import { Either, left, right } from '@/core/either'
import { Product } from '@/domain/stock/enterprise/entities/product'
import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '../../repositories/products-repository'
import { TagsRepository } from '../../repositories/tags-repository'
import { ProductTagsRepository } from '../../repositories/product-tags-repository'
import { Tag } from '@/domain/stock/enterprise/entities/tag'
import { ProductTag } from '@/domain/stock/enterprise/entities/product-tag'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ProductAlreadyExistsError } from '../__errors/product-already-exists'

interface CreateProductWithTagsUseCaseRequest {
  name: string
  quantity: number
  value: number
  barcode: string
  tagNames: string[]
}

type CreateProductWithTagsUseCaseResponse = Either<
  ProductAlreadyExistsError,
  {
    product: Product
  }
>

@Injectable()
export class CreateProductWithTagsUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private tagsRepository: TagsRepository,
    private productTagsRepository: ProductTagsRepository,
  ) {}

  async execute({
    barcode,
    name,
    quantity,
    value,
    tagNames,
  }: CreateProductWithTagsUseCaseRequest): Promise<CreateProductWithTagsUseCaseResponse> {
    const productAlreadyExists =
      await this.productsRepository.findByBarcode(barcode)

    if (productAlreadyExists) {
      return left(new ProductAlreadyExistsError(barcode))
    }

    const tagsIds: string[] = []

    for (const tagName of tagNames) {
      const tag = await this.tagsRepository.findByName(tagName)

      if (!tag) {
        const newTag = Tag.create({
          name: tagName,
        })

        await this.tagsRepository.create(newTag)

        tagsIds.push(newTag.id.toString())

        continue
      }

      tagsIds.push(tag.id.toString())
    }

    const product = Product.create({
      barcode,
      name,
      quantity,
      value,
    })

    await this.productsRepository.create(product)

    for (const tagId of tagsIds) {
      const productTag = ProductTag.create({
        productId: product.id,
        tagId: new UniqueEntityId(tagId),
      })

      await this.productTagsRepository.create(productTag)
    }

    return right({ product })
  }
}
