import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
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
  ResourceNotFoundError,
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

    product.updateDetails({ name, barcode, quantity, value })

    await this.productsRepository.save(product)

    return right({ product })
  }
}
