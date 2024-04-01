import { Module } from '@nestjs/common'

import { AppController } from './app.controller'

import { AppService } from './app.service'
import { TestService } from './test.service'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { BookModule } from './modules/book/book.module'

/*
 * 整个应用的注册中心
 *
 * @export
 * @class AppModule
 *
 * */
// 应用程序的根模块
@Module({
  imports: [UserModule, AuthModule, BookModule],
  controllers: [AppController],
  providers: [AppService, TestService], // all services
})
export class AppModule {}
