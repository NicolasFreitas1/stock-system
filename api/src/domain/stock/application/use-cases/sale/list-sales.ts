import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { SalesRepository } from '../../repositories/sales-repository'
import { Sale } from '@/domain/stock/enterprise/entities/sale'

interface ListSalesUseCaseRequest {
  page: number
}

type ListSalesUseCaseResponse = Either<
  null,
  {
    sales: Sale[]
  }
>

@Injectable()
export class ListSalesUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({
    page,
  }: ListSalesUseCaseRequest): Promise<ListSalesUseCaseResponse> {
    const sales = await this.salesRepository.findMany({ page })

    return right({
      sales,
    })
  }
}
