import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'

import { AppService } from './app.service'
import { TestService } from './test.service'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { BookModule } from './modules/book/book.module'

import { getMySqlUserNameAndPassword } from './utils'

const { userName, password } = getMySqlUserNameAndPassword()

// console.log(userName)

/*
 * 整个应用的注册中心
 *
 * @export
 * @class AppModule
 *
 * */
// 应用程序的根模块
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '120.24.7.205',
      port: 3306,
      username: userName,
      password: password,
      database: 'nest-book-dev',
      entities: [],
      synchronize: true,
      autoLoadEntities: true, //自动加载 entity
    }),
    UserModule,
    AuthModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestService], // all services
})
export class AppModule {}
