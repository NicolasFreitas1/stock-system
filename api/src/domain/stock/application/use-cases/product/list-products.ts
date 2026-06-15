import { Either, right } from '@/core/either'
import { ProductWithTags } from '@/domain/stock/enterprise/entities/value-objects/product-with-tags'
import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '../../repositories/products-repository'

interface ListProductsUseCaseRequest {
  page: number
}

type ListProductsUseCaseResponse = Either<
  null,
  {
    products: ProductWithTags[]
  }
>

@Injectable()
export class ListProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    page,
  }: ListProductsUseCaseRequest): Promise<ListProductsUseCaseResponse> {
    const products = await this.productsRepository.findManyWithTags({ page })

    return right({
      products,
    })
  }
}
