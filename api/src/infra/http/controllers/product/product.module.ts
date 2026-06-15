import { Module } from '@nestjs/common'
import { CreateProductWithTagsController } from './create-product-with-tags.controller'
import { CreateProductWithTagsUseCase } from '@/domain/stock/application/use-cases/product/create-product-with-tags'
import { DatabaseModule } from '@/infra/database/database.module'
import { DeleteProductController } from './delete-product.controller'
import { DeleteProductUseCase } from '@/domain/stock/application/use-cases/product/delete-product'
import { ListProductsController } from './list-products.controller'
import { ListProductsUseCase } from '@/domain/stock/application/use-cases/product/list-products'
import { GetProductByIdController } from './get-product-by-id.controller'
import { GetProductByIdUseCase } from '@/domain/stock/application/use-cases/product/get-product-by-id'
import { EditProductController } from './edit-product.controller'
import { EditProductUseCase } from '@/domain/stock/application/use-cases/product/edit-product'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateProductWithTagsController,
    ListProductsController,
    GetProductByIdController,
    EditProductController,
    DeleteProductController,
  ],
  providers: [
    CreateProductWithTagsUseCase,
    ListProductsUseCase,
    GetProductByIdUseCase,
    EditProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductModule {}
