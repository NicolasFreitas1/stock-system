import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'
import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Stock System API')
    .setDescription('API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const envService = app.get(EnvService)
  const port = envService.get('PORT')

  configSwagger(app)

  await app.listen(port)
}
bootstrap()
