import { Either, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { SalesRepository } from '../../repositories/sales-repository'

interface DeleteSaleUseCaseRequest {
  saleId: string
}

type DeleteSaleUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteSaleUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({
    saleId,
  }: DeleteSaleUseCaseRequest): Promise<DeleteSaleUseCaseResponse> {
    const sale = await this.salesRepository.findById(saleId)

    if (!sale) {
      throw new ResourceNotFoundError()
    }

    await this.salesRepository.delete(sale)

    return right(null)
  }
}
