import { Either, right } from '@/core/either'
import { SalePerProduct } from '@/domain/stock/enterprise/entities/value-objects/sale-per-product'
import { Injectable } from '@nestjs/common'
import { DashboardRepository } from '../../repositories/dashboard-repository'

type ListSalesPerProductUseCaseResponse = Either<
  null,
  {
    salesPerProduct: SalePerProduct[]
  }
>

@Injectable()
export class ListSalesPerProductUseCase {
  constructor(private dashboardRepository: DashboardRepository) {}

  async execute(): Promise<ListSalesPerProductUseCaseResponse> {
    const salesPerProduct = await this.dashboardRepository.salesPerProduct()

    return right({ salesPerProduct })
  }
}
