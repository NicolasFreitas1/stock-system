import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { ProductModule } from './controllers/product/product.module'
import { TagModule } from './controllers/tag/tag.module'
import { UserModule } from './controllers/user/user.module'
import { SaleModule } from './controllers/sale/sale.module'
import { DashboardModule } from './controllers/dashboard/dashboard.module'

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    UserModule,
    TagModule,
    ProductModule,
    SaleModule,
    DashboardModule,
  ],
})
export class HttpModule {}
