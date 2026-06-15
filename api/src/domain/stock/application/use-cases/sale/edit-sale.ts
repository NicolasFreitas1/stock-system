import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { PaymentMethod, Sale } from '@/domain/stock/enterprise/entities/sale'
import { SalesRepository } from '../../repositories/sales-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ProductsRepository } from '../../repositories/products-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface EditSaleUseCaseRequest {
  saleId: string
  quantity: number
  soldAt: Date
  productId: string
  sellerId: string
  paymentMethod: PaymentMethod
}

type EditSaleUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    sale: Sale
  }
>

@Injectable()
export class EditSaleUseCase {
  constructor(
    private salesRepository: SalesRepository,
    private productsRepository: ProductsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    saleId,
    productId,
    quantity,
    sellerId,
    soldAt,
    paymentMethod,
  }: EditSaleUseCaseRequest): Promise<EditSaleUseCaseResponse> {
    const sale = await this.salesRepository.findById(saleId)

    if (!sale) {
      return left(new ResourceNotFoundError())
    }

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    const seller = await this.usersRepository.findById(sellerId)

    if (!seller) {
      return left(new ResourceNotFoundError())
    }

    const productChanged = productId !== sale.productId.toString()

    if (productChanged) {
      const previousProduct = await this.productsRepository.findById(
        sale.productId.toString(),
      )

      if (!previousProduct) {
        return left(new ResourceNotFoundError())
      }

      previousProduct.increaseStock(sale.quantity)
      product.decreaseStock(quantity)

      await this.productsRepository.save(previousProduct)
    } else {
      product.increaseStock(sale.quantity)
      product.decreaseStock(quantity)
    }

    sale.updateDetails({
      productId: product.id,
      sellerId: seller.id,
      quantity,
      value: product.value * quantity,
      soldAt,
      paymentMethod,
    })

    await this.salesRepository.save(sale)
    await this.productsRepository.save(product)

    return right({ sale })
  }
}
