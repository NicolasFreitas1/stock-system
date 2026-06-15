import { CreateProductWithTagsUseCase } from '@/domain/stock/application/use-cases/product/create-product-with-tags'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import {
  bodyValidationPipe,
  CreateProductWithTagsDTO,
} from './dto/create-product-with-tags.dto'
import { ProductAlreadyExistsError } from '@/domain/stock/application/use-cases/__errors/product-already-exists'

@ApiTags('Product')
@ApiBearerAuth()
@Controller('/product')
export class CreateProductWithTagsController {
  constructor(
    private createProductWithTagsUseCase: CreateProductWithTagsUseCase,
  ) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateProductWithTagsDTO) {
    const { name, barcode, quantity, tagNames, value } = body

    const result = await this.createProductWithTagsUseCase.execute({
      name,
      barcode,
      quantity,
      tagNames,
      value,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ProductAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
