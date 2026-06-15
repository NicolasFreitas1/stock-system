import { GetStockMetricsUseCase } from '@/domain/stock/application/use-cases/dashboard/get-stock-metrics'
import { ListLowQuantityProductsUseCase } from '@/domain/stock/application/use-cases/dashboard/list-low-quantity-products'
import { ListSalesBySellerUseCase } from '@/domain/stock/application/use-cases/dashboard/list-sales-by-seller'
import { ListSalesPerProductUseCase } from '@/domain/stock/application/use-cases/dashboard/list-sales-per-product'
import { Controller, Get, InternalServerErrorException } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { DashboardPresenter } from '../../presenters/dashboard-presenter'

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class GetDashboardController {
  constructor(
    private listLowQuantityProductsUseCase: ListLowQuantityProductsUseCase,
    private listSalesBySellerUseCase: ListSalesBySellerUseCase,
    private listSalesPerProductUseCase: ListSalesPerProductUseCase,
    private getStockMetricsUseCase: GetStockMetricsUseCase,
  ) {}

  @Get()
  async handle() {
    const [
      lowQuantityProductsResponse,
      listSalesBySellerResponse,
      listSalesPerProductResponse,
      getStockMetricsResponse,
    ] = await Promise.all([
      this.listLowQuantityProductsUseCase.execute(),
      this.listSalesBySellerUseCase.execute(),
      this.listSalesPerProductUseCase.execute(),
      this.getStockMetricsUseCase.execute(),
    ])

    if (lowQuantityProductsResponse.isLeft()) {
      throw new InternalServerErrorException(
        'Algo inesperado aconteceu ao listar os produtos',
      )
    }

    if (listSalesBySellerResponse.isLeft()) {
      throw new InternalServerErrorException(
        'Algo inesperado aconteceu ao listar as vendas por vendedor',
      )
    }

    if (listSalesPerProductResponse.isLeft()) {
      throw new InternalServerErrorException(
        'Algo inesperado aconteceu ao listar as vendas por produto',
      )
    }

    if (getStockMetricsResponse.isLeft()) {
      throw new InternalServerErrorException(
        'Algo inesperado aconteceu ao retornar as métricas do estoque',
      )
    }
    const { products } = lowQuantityProductsResponse.value
    const { salesBySeller } = listSalesBySellerResponse.value
    const { salesPerProduct } = listSalesPerProductResponse.value
    const { stockMetrics } = getStockMetricsResponse.value

    return DashboardPresenter.toHTTP({
      lowQuantityProducts: products,
      salesBySeller,
      salesPerProduct,
      stockMetrics,
    })
  }
}
