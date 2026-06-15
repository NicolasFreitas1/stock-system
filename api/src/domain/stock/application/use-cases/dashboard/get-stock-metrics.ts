import { Either, right } from '@/core/either'
import { StockMetrics } from '@/domain/stock/enterprise/entities/value-objects/stock-metrics'
import { Injectable } from '@nestjs/common'
import { DashboardRepository } from '../../repositories/dashboard-repository'

type GetStockMetricsUseCaseResponse = Either<
  null,
  {
    stockMetrics: StockMetrics
  }
>

@Injectable()
export class GetStockMetricsUseCase {
  constructor(private dashboardRepository: DashboardRepository) {}

  async execute(): Promise<GetStockMetricsUseCaseResponse> {
    const stockMetrics = await this.dashboardRepository.findStockMetrics()

    return right({
      stockMetrics,
    })
  }
}
