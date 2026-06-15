import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { ListProductsUseCase } from '../list-products'
import { Product } from '@/domain/stock/enterprise/entities/product'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: ListProductsUseCase

describe('List Products', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new ListProductsUseCase(inMemoryProductsRepository)
  })

  it('should return a list of products', async () => {
    const product1 = Product.create({
      name: 'product 1',
      quantity: 10,
      value: 99.99,
      barcode: '1234567890123',
    })
    const product2 = Product.create({
      name: 'product 2',
      quantity: 5,
      value: 49.99,
      barcode: '9876543210987',
    })

    await inMemoryProductsRepository.create(product1)
    await inMemoryProductsRepository.create(product2)

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      products: [product1, product2],
    })
  })

  it('should return an empty list if no products exist', async () => {
    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      products: [],
    })
  })
})
