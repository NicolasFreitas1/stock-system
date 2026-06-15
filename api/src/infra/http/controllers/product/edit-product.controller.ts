import { EditProductUseCase } from '@/domain/stock/application/use-cases/product/edit-product'
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
import { bodyValidationPipe, EditProductDTO } from './dto/edit-product.dto'

@ApiTags('Product')
@ApiBearerAuth()
@Controller('/product/:id')
export class EditProductController {
  constructor(private editProduct: EditProductUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditProductDTO,
    @Param('id', ParseUUIDPipe) productId: string,
  ) {
    const { name, barcode, quantity, value } = body

    const result = await this.editProduct.execute({
      productId,
      name,
      barcode,
      quantity,
      value,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
