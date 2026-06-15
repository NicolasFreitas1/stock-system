import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetProductByIdUseCase } from '@/domain/stock/application/use-cases/product/get-product-by-id'
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ProductPresenter } from '../../presenters/product-presenter'

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product/:id')
export class GetProductByIdController {
  constructor(private getProductByIdUseCase: GetProductByIdUseCase) {}

  @Get()
  async handle(@Param('id', ParseUUIDPipe) productId: string) {
    const response = await this.getProductByIdUseCase.execute({ productId })

    if (response.isLeft()) {
      const error = response.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new Error(error.message)
      }
    }

    const product = response.value.product

    return ProductPresenter.toHTTP(product)
  }
}
