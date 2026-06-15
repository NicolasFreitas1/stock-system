import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { ListProductsUseCase } from '@/domain/stock/application/use-cases/product/list-products'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import { ProductWithTagsPresenter } from '../../presenters/product-with-tags-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type pageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@ApiTags('Product')
@ApiBearerAuth()
@Controller('/product')
export class ListProductsController {
  constructor(private listProductsUseCase: ListProductsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: pageQueryParamSchema) {
    const result = await this.listProductsUseCase.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const products = result.value.products

    return products.map(ProductWithTagsPresenter.toHTTP)
  }
}
