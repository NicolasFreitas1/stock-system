import { Either, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '../../repositories/products-repository'

interface DeleteProductUseCaseRequest {
  productId: string
}

type DeleteProductUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
  }: DeleteProductUseCaseRequest): Promise<DeleteProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    await this.productsRepository.delete(product)

    return right(null)
  }
}
