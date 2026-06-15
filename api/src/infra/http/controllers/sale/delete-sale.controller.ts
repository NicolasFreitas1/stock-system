import { DeleteSaleUseCase } from '@/domain/stock/application/use-cases/sale/delete-sale'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Sale')
@ApiBearerAuth()
@Controller('sale/:id')
export class DeleteSaleController {
  constructor(private deleteSale: DeleteSaleUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id', ParseUUIDPipe) saleId: string) {
    const result = await this.deleteSale.execute({
      saleId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
