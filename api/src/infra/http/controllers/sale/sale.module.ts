import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateSaleController } from './create-sale.controller'
import { DeleteSaleController } from './delete-sale.controller'
import { EditSaleController } from './edit-sale.controller'
import { GetSaleByIdController } from './get-sale-by-id.controller'
import { ListSalesController } from './list-sales.controller'
import { CreateSaleUseCase } from '@/domain/stock/application/use-cases/sale/create-sale'
import { DeleteSaleUseCase } from '@/domain/stock/application/use-cases/sale/delete-sale'
import { EditSaleUseCase } from '@/domain/stock/application/use-cases/sale/edit-sale'
import { GetSaleByIdUseCase } from '@/domain/stock/application/use-cases/sale/get-sale-by-id'
import { ListSalesUseCase } from '@/domain/stock/application/use-cases/sale/list-sales'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateSaleController,
    ListSalesController,
    GetSaleByIdController,
    EditSaleController,
    DeleteSaleController,
  ],
  providers: [
    CreateSaleUseCase,
    ListSalesUseCase,
    GetSaleByIdUseCase,
    EditSaleUseCase,
    DeleteSaleUseCase,
  ],
})
export class SaleModule {}
