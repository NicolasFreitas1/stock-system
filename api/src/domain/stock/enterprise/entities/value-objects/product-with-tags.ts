import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

export interface ProductWithTagsProps {
  productId: UniqueEntityId
  name: string
  quantity: number
  value: number
  barcode: string
  createdAt: Date
  tags: string[]
}

export class ProductWithTags extends ValueObject<ProductWithTagsProps> {
  get productId() {
    return this.props.productId
  }

  get name() {
    return this.props.name
  }

  get quantity() {
    return this.props.quantity
  }

  get value() {
    return this.props.value
  }

  get barcode() {
    return this.props.barcode
  }

  get createdAt() {
    return this.props.createdAt
  }

  get tags() {
    return this.props.tags
  }

  static create(props: ProductWithTagsProps) {
    return new ProductWithTags(props)
  }
}
