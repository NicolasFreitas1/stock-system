import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export const LOW_STOCK_THRESHOLD = 10

export const LOW_STOCK_LIST_LIMIT = 15

export interface ProductProps {
  name: string
  quantity: number
  value: number
  barcode: string
  createdAt: Date
}

export interface ProductDetailsUpdate {
  name: string
  quantity: number
  value: number
  barcode: string
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
    if (quantity <= 0) {
      throw new Error('Quantity to decrease must be positive.')
    }

    if (!this.hasAvailableStock(quantity)) {
      throw new Error('Cannot decrease stock below zero.')
    }

    this.props.quantity = this.props.quantity - quantity
  }

  increaseStock(quantity: number) {
    if (quantity <= 0) {
      throw new Error('Quantity to increase must be positive.')
    }

    this.props.quantity = this.props.quantity + quantity
  }

  updateDetails({ name, quantity, value, barcode }: ProductDetailsUpdate) {
    Product.assertValidName(name)
    Product.assertValidBarcode(barcode)
    Product.assertValidQuantity(quantity)
    Product.assertValidValue(value)

    this.props.name = name
    this.props.barcode = barcode
    this.props.quantity = quantity
    this.props.value = value
  }

  private static assertValidName(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error('Product name cannot be empty.')
    }
  }

  private static assertValidBarcode(barcode: string) {
    if (!barcode || barcode.trim().length === 0) {
      throw new Error('Product barcode cannot be empty.')
    }
  }

  private static assertValidQuantity(quantity: number) {
    if (quantity < 0 || !Number.isFinite(quantity)) {
      throw new Error('Product quantity must be zero or a positive number.')
    }
  }

  private static assertValidValue(value: number) {
    if (value <= 0 || !Number.isFinite(value)) {
      throw new Error('Product value must be a positive number.')
    }
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
