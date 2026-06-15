import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { NameAlreadyInUseError } from '../__errors/name-already-in-use-error'
import { Product } from '@/domain/stock/enterprise/entities/product'
import { ProductsRepository } from '../../repositories/products-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface EditProductUseCaseRequest {
  productId: string
  name: string
  quantity: number
  value: number
  barcode: string
}

type EditProductUseCaseResponse = Either<
  ResourceNotFoundError | NameAlreadyInUseError,
  {
    product: Product
  }
>

@Injectable()
export class EditProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
    name,
    barcode,
    quantity,
    value,
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    product.name = name
    product.barcode = barcode
    product.quantity = quantity
    product.value = value

    await this.productsRepository.save(product)

    return right({ product })
  }
}
