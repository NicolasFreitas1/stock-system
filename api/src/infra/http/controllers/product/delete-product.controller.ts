import { DeleteProductUseCase } from '@/domain/stock/application/use-cases/product/delete-product'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product/:id')
export class DeleteProductController {
  constructor(private deleteProduct: DeleteProductUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id', ParseUUIDPipe) productId: string) {
    const result = await this.deleteProduct.execute({
      productId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
