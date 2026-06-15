import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface ProductTagProps {
  tagId: UniqueEntityId
  productId: UniqueEntityId
}

export class ProductTag extends Entity<ProductTagProps> {
  get tagId() {
    return this.props.tagId
  }

  set tagId(tagId: UniqueEntityId) {
    this.props.tagId = tagId
  }

  get productId() {
    return this.props.productId
  }

  set productId(productId: UniqueEntityId) {
    this.props.productId = productId
  }

  static create(props: ProductTagProps, id?: UniqueEntityId) {
    const productTag = new ProductTag(props, id)

    return productTag
  }
}
