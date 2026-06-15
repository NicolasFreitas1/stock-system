import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { GetProductByIdUseCase } from '../get-product-by-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Product } from '@/domain/stock/enterprise/entities/product'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: GetProductByIdUseCase

describe('Get Product By Id', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new GetProductByIdUseCase(inMemoryProductsRepository)
  })

  it('should return a product when it exists', async () => {
    const product = Product.create({
      name: 'example product',
      quantity: 10,
      value: 99.99,
      barcode: '1234567890123',
    })
    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({ productId: product.id.toString() })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ product })
  })

  it('should return a ResourceNotFoundError when product does not exist', async () => {
    const result = await sut.execute({ productId: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
