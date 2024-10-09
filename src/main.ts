/*
 * @Author: 张泽全 hengwujun128@gmail.com
 * @Date: 2024-03-30 16:14:58
 * @LastEditors: 张泽全 hengwujun128@gmail.com
 * @LastEditTime: 2024-10-09 09:18:49
 * @FilePath: /nest-vben-admin/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  // 创建 nest 实例
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })

  // app.setGlobalPrefix('api/v1/')

  // 生成 swagger 文档
  const config = new DocumentBuilder()
    .setTitle('Nest Admin API')
    .setDescription('通用管理系统API')
    .setVersion('1.0')
    .addTag('api')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document) // localhost:3000/api
  // 监听端口 3000
  await app.listen(3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
