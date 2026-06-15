import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { SaleNotValidError } from '@/domain/stock/application/use-cases/__errors/sale-not-valid-error'
import { CreateSaleUseCase } from '@/domain/stock/application/use-cases/sale/create-sale'
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { bodyValidationPipe, CreateSaleDTO } from './dto/create-sale.dto'
@ApiTags('Sale')
@ApiBearerAuth()
@Controller('/sale')
export class CreateSaleController {
  constructor(private createSaleUseCase: CreateSaleUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateSaleDTO) {
    const { productId, quantity, sellerId, soldAt, paymentMethod } = body

    const result = await this.createSaleUseCase.execute({
      productId,
      quantity,
      sellerId,
      soldAt,
      paymentMethod,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case SaleNotValidError:
          throw new UnprocessableEntityException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
