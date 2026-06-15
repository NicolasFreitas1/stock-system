import { EditSaleUseCase } from '@/domain/stock/application/use-cases/sale/edit-sale'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { bodyValidationPipe, EditSaleDTO } from './dto/edit-sale.dto'

@ApiTags('Sale')
@ApiBearerAuth()
@Controller('/sale/:id')
export class EditSaleController {
  constructor(private editSale: EditSaleUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditSaleDTO,
    @Param('id', ParseUUIDPipe) saleId: string,
  ) {
    const { productId, quantity, sellerId, soldAt, paymentMethod } = body

    const result = await this.editSale.execute({
      saleId,
      productId,
      quantity,
      sellerId,
      soldAt,
      paymentMethod,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
