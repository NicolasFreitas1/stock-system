import { SalesBySeller } from '@/domain/stock/enterprise/entities/value-objects/sales-by-seller'

export class SalesBySellerPresenter {
  static toHTTP(salesBySeller: SalesBySeller) {
    return {
      sellerId: salesBySeller.sellerId.toString(),
      totalSales: salesBySeller.totalSales,
      percentageOfTotal: salesBySeller.percentageOfTotal,
    }
  }
}
