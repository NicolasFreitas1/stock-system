import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { CreateProductUseCase } from '../create-product'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create Product', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to register a new product', async () => {
    const result = await sut.execute({
      name: 'example product',
      quantity: 10,
      value: 99.99,
      barcode: '1234567890123',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      product: inMemoryProductsRepository.items[0],
    })
  })

  it('should create a product with the correct attributes', async () => {
    const productData = {
      name: 'example product',
      quantity: 10,
      value: 99.99,
      barcode: '1234567890123',
    }

    const result = await sut.execute(productData)

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items[0]).toMatchObject(productData)
  })
})
