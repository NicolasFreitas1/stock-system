import { Either, right } from '@/core/either'
import { SalesBySeller } from '@/domain/stock/enterprise/entities/value-objects/sales-by-seller'
import { Injectable } from '@nestjs/common'
import { DashboardRepository } from '../../repositories/dashboard-repository'

type ListSalesBySellerUseCaseResponse = Either<
  null,
  {
    salesBySeller: SalesBySeller[]
  }
>

@Injectable()
export class ListSalesBySellerUseCase {
  constructor(private dashboardRepository: DashboardRepository) {}

  async execute(): Promise<ListSalesBySellerUseCaseResponse> {
    const salesBySeller = await this.dashboardRepository.salesBySeller()

    return right({
      salesBySeller,
    })
  }
}
