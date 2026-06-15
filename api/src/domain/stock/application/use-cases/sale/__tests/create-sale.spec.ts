import { Product } from '@/domain/stock/enterprise/entities/product'
import { User } from '@/domain/stock/enterprise/entities/user'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { InMemorySalesRepository } from 'test/repositories/in-memory-sales-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { SaleNotValidError } from '../../__errors/sale-not-valid-error'
import { CreateSaleUseCase } from '../create-sale'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let inMemorySalesRepository: InMemorySalesRepository
let sut: CreateSaleUseCase

describe('Create Sale', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository()
    inMemorySalesRepository = new InMemorySalesRepository()

    sut = new CreateSaleUseCase(
      inMemoryUsersRepository,
      inMemoryProductsRepository,
      inMemorySalesRepository,
    )
  })

  it('should register a sale and decrease product stock', async () => {
    const seller = User.create({
      name: 'Seller',
      login: 'seller',
      password: '123456',
    })
    const product = Product.create({
      name: 'Product',
      barcode: '1234567890123',
      quantity: 10,
      value: 25,
    })

    await inMemoryUsersRepository.create(seller)
    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({
      productId: product.id.toString(),
      sellerId: seller.id.toString(),
      quantity: 3,
      soldAt: new Date('2026-01-01'),
      paymentMethod: 'PIX',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySalesRepository.items).toHaveLength(1)
    expect(inMemoryProductsRepository.items[0].quantity).toBe(7)
  })

  it('should not register a sale when product stock is insufficient', async () => {
    const seller = User.create({
      name: 'Seller',
      login: 'seller',
      password: '123456',
    })
    const product = Product.create({
      name: 'Product',
      barcode: '1234567890123',
      quantity: 2,
      value: 25,
    })

    await inMemoryUsersRepository.create(seller)
    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({
      productId: product.id.toString(),
      sellerId: seller.id.toString(),
      quantity: 3,
      soldAt: new Date('2026-01-01'),
      paymentMethod: 'PIX',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SaleNotValidError)
    expect(inMemorySalesRepository.items).toHaveLength(0)
    expect(inMemoryProductsRepository.items[0].quantity).toBe(2)
  })
})
