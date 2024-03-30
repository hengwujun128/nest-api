import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  // 创建 nest 实例
  const app = await NestFactory.create(AppModule)
  // 监听端口 3000
  await app.listen(3000)
}

bootstrap()
