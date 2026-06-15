import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetSaleByIdUseCase } from '@/domain/stock/application/use-cases/sale/get-sale-by-id'
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { SalePresenter } from '../../presenters/sale-presenter'

@ApiTags('Sale')
@ApiBearerAuth()
@Controller('sale/:id')
export class GetSaleByIdController {
  constructor(private getSaleByIdUseCase: GetSaleByIdUseCase) {}

  @Get()
  async handle(@Param('id', ParseUUIDPipe) saleId: string) {
    const response = await this.getSaleByIdUseCase.execute({ saleId })

    if (response.isLeft()) {
      const error = response.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new Error(error.message)
      }
    }

    const sale = response.value.sale

    return SalePresenter.toHTTP(sale)
  }
}
