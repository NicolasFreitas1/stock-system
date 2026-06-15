import { PrismaClient, PaymentMethod, Tag, Product, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { faker } from '@faker-js/faker'
import { subMonths } from 'date-fns'

const prisma = new PrismaClient()

async function clearDatabase() {
  await prisma.sale.deleteMany()
  await prisma.productTag.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()
}

async function createUsers(): Promise<[User, User, User]> {
  const admin = await prisma.user.create({
    data: {
      name: 'admin',
      login: 'admin',
      password: await hash('12345', 8),
      isAdmin: true,
    },
  })

  const seller1 = await prisma.user.create({
    data: {
      name: 'Vendedor 1',
      login: 'vendedor1',
      password: await hash('12345', 8),
    },
  })

  const seller2 = await prisma.user.create({
    data: {
      name: 'Vendedor 2',
      login: 'vendedor2',
      password: await hash('12345', 8),
    },
  })

  return [admin, seller1, seller2]
}

async function createTags(): Promise<Tag[]> {
  const tagNames = ['Eletrônico', 'Roupas', 'Esporte', 'Livros', 'Beleza']
  const tags: Tag[] = []

  for (const name of tagNames) {
    const tag = await prisma.tag.create({
      data: {
        name,
      },
    })
    tags.push(tag)
  }

  return tags
}

async function createProducts(tags: Tag[]): Promise<Product[]> {
  const products: Product[] = []

  for (let i = 0; i < 10; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 10, max: 100 }),
        value: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
        barcode: faker.string.uuid(),
        createdAt: faker.date.past(),
      },
    })

    const usedTags = faker.helpers.arrayElements(
      tags,
      faker.number.int({ min: 1, max: 2 }),
    )
    for (const tag of usedTags) {
      await prisma.productTag.create({
        data: {
          productId: product.id,
          tagId: tag.id,
        },
      })
    }

    products.push(product)
  }

  return products
}

async function createSales(products: Product[], sellers: User[]) {
  for (let i = 0; i < 30; i++) {
    const product = faker.helpers.arrayElement(products)
    const seller = faker.helpers.arrayElement(sellers)

    const quantity = faker.number.int({ min: 1, max: 5 })

    await prisma.sale.create({
      data: {
        value: product.value * quantity,
        quantity,
        soldAt: faker.date.between({
          from: subMonths(new Date(), 3),
          to: new Date(),
        }),
        paymentMethod: faker.helpers.arrayElement(Object.values(PaymentMethod)),
        productId: product.id,
        sellerId: seller.id,
      },
    })
  }
}

async function main() {
  await clearDatabase()
  const [admin, seller1, seller2] = await createUsers()
  const tags = await createTags()
  const products = await createProducts(tags)
  await createSales(products, [seller1, seller2])
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
