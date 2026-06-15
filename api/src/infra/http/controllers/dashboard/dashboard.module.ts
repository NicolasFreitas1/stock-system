import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { GetDashboardController } from './get-dashboard.controller'
import { ListLowQuantityProductsUseCase } from '@/domain/stock/application/use-cases/dashboard/list-low-quantity-products'
import { ListSalesBySellerUseCase } from '@/domain/stock/application/use-cases/dashboard/list-sales-by-seller'
import { ListSalesPerProductUseCase } from '@/domain/stock/application/use-cases/dashboard/list-sales-per-product'
import { GetStockMetricsUseCase } from '@/domain/stock/application/use-cases/dashboard/get-stock-metrics'

@Module({
  imports: [DatabaseModule],
  controllers: [GetDashboardController],
  providers: [
    ListLowQuantityProductsUseCase,
    ListSalesBySellerUseCase,
    ListSalesPerProductUseCase,
    GetStockMetricsUseCase,
  ],
})
export class DashboardModule {}
