import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { HttpModule } from './http/http.module'
import { EnvService } from './env/env.service'
import { AuthModule } from './auth/auth.module'
import { RequestLoggerMiddleware } from './http/middlewares/request-logger.middleware'

@Module({
  imports: [
    EnvModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
  providers: [EnvService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}
