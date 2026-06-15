import { Product } from '@/domain/stock/enterprise/entities/product'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { EditProductUseCase } from '../edit-product'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: EditProductUseCase

describe('Edit Product', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new EditProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to edit a product', async () => {
    const product = Product.create({
      name: 'Old name',
      barcode: '1234567890123',
      quantity: 10,
      value: 25,
    })

    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({
      productId: product.id.toString(),
      name: 'New name',
      barcode: '9876543210987',
      quantity: 30,
      value: 50,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items[0]).toMatchObject({
      name: 'New name',
      barcode: '9876543210987',
      quantity: 30,
      value: 50,
    })
  })

  it('should return ResourceNotFoundError when product does not exist', async () => {
    const result = await sut.execute({
      productId: 'missing-id',
      name: 'New name',
      barcode: '9876543210987',
      quantity: 30,
      value: 50,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not persist invalid changes when value is zero or negative', async () => {
    const product = Product.create({
      name: 'Original',
      barcode: '1234567890123',
      quantity: 10,
      value: 25,
    })

    await inMemoryProductsRepository.create(product)

    await expect(
      sut.execute({
        productId: product.id.toString(),
        name: 'Updated',
        barcode: '1234567890123',
        quantity: 5,
        value: 0,
      }),
    ).rejects.toThrow('Product value must be a positive number.')

    expect(inMemoryProductsRepository.items[0]).toMatchObject({
      name: 'Original',
      value: 25,
    })
  })
})
