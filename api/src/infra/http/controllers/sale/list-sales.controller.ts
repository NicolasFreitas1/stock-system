import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { ListSalesUseCase } from '@/domain/stock/application/use-cases/sale/list-sales'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import { SalePresenter } from '../../presenters/sale-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type pageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@ApiTags('Sale')
@ApiBearerAuth()
@Controller('/sale')
export class ListSalesController {
  constructor(private listSalesUseCase: ListSalesUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: pageQueryParamSchema) {
    const result = await this.listSalesUseCase.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const sales = result.value.sales

    return sales.map(SalePresenter.toHTTP)
  }
}
