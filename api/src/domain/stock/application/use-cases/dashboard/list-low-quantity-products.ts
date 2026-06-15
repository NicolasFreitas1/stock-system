import { Either, right } from '@/core/either'
import { Product } from '@/domain/stock/enterprise/entities/product'
import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '../../repositories/products-repository'

type ListLowQuantityProductsUseCaseResponse = Either<
  null,
  {
    products: Product[]
  }
>

@Injectable()
export class ListLowQuantityProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<ListLowQuantityProductsUseCaseResponse> {
    const products = await this.productsRepository.findManyWithLowQuantity()

    return right({
      products,
    })
  }
}
