import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export const LOW_STOCK_THRESHOLD = 10

export interface ProductProps {
  name: string
  quantity: number
  value: number
  barcode: string
  createdAt: Date
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get quantity() {
    return this.props.quantity
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity
  }

  get value() {
    return this.props.value
  }

  set value(value: number) {
    this.props.value = value
  }

  get barcode() {
    return this.props.barcode
  }

  set barcode(barcode: string) {
    this.props.barcode = barcode
  }

  get createdAt() {
    return this.props.createdAt
  }

  hasAvailableStock(quantity: number) {
    return this.quantity >= quantity
  }

  decreaseStock(quantity: number) {
    this.quantity = this.quantity - quantity
  }

  increaseStock(quantity: number) {
    this.quantity = this.quantity + quantity
  }

  static create(
    props: Optional<ProductProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const product = new Product(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return product
  }
}
