import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

export interface SalesBySellerProps {
  sellerId: UniqueEntityId
  totalSales: number
  percentageOfTotal: number
}

export class SalesBySeller extends ValueObject<SalesBySellerProps> {
  get sellerId() {
    return this.props.sellerId
  }

  get totalSales() {
    return this.props.totalSales
  }

  get percentageOfTotal() {
    return this.props.percentageOfTotal
  }

  static create(props: SalesBySellerProps) {
    return new SalesBySeller(props)
  }
}
