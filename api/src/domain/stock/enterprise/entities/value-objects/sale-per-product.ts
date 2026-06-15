import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

interface SalePerProductProps {
  productId: UniqueEntityId
  totalSales: number
}

export class SalePerProduct extends ValueObject<SalePerProductProps> {
  get productId() {
    return this.props.productId
  }

  get totalSales() {
    return this.props.totalSales
  }

  static create(props: SalePerProductProps) {
    return new SalePerProduct(props)
  }
}
