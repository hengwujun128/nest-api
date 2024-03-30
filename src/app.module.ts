import { Module } from '@nestjs/common'

import { AppController } from './app.controller'

import { AppService } from './app.service'
import { TestService } from './test.service'

/*
 * 整个应用的注册中心
 *
 * @export
 * @class AppModule
 *
 * */
// 应用程序的根模块
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TestService],
})
export class AppModule {}
