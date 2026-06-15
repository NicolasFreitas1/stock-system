import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Sale } from '@/domain/stock/enterprise/entities/sale'
import { Injectable } from '@nestjs/common'
import { SalesRepository } from '../../repositories/sales-repository'

interface GetSaleByIdUseCaseRequest {
  saleId: string
}

type GetSaleByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    sale: Sale
  }
>

@Injectable()
export class GetSaleByIdUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({
    saleId,
  }: GetSaleByIdUseCaseRequest): Promise<GetSaleByIdUseCaseResponse> {
    const sale = await this.salesRepository.findById(saleId)

    if (!sale) {
      return left(new ResourceNotFoundError())
    }

    return right({ sale })
  }
}
