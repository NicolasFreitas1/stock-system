import { Either, right } from '@/core/either'
import { Product } from '@/domain/stock/enterprise/entities/product'
import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '../../repositories/products-repository'

interface CreateProductUseCaseRequest {
  name: string
  quantity: number
  value: number
  barcode: string
}

type CreateProductUseCaseResponse = Either<
  null,
  {
    product: Product
  }
>

@Injectable()
export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    barcode,
    name,
    quantity,
    value,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = Product.create({
      barcode,
      name,
      quantity,
      value,
    })

    await this.productsRepository.create(product)

    return right({ product })
  }
}
