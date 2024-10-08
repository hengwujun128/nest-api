/*
 * @Author: 张泽全 hengwujun128@gmail.com
 * @Date: 2024-10-08 16:58:01
 * @LastEditors: 张泽全 hengwujun128@gmail.com
 * @LastEditTime: 2024-10-08 17:01:13
 * @FilePath: /nest-vben-admin/src/app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'

import { AppService } from './app.service'
import { TestService } from './test.service'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { BookModule } from './modules/book/book.module'

import { getMySqlUserNameAndPassword } from './utils'
import { MenuModule } from './modules/menu/menu.module'

import { RoleModule } from './modules/role/role.module'
import { PermissionModule } from './modules/permission/permission.module'

import { RolesModule } from './system/roles/roles.module'
import { MenusModule } from './system/menus/menus.module'
import { UsersModule } from './system/users/users.module'

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
      synchronize: true, //在开发环境中使用 synchronize: true 是非常方便的，因为它可以在你修改实体类后立即看到数据库模式的改变，无需手动运行迁移（migrations）。
      // 在生产环境中，更安全的做法是使用 TypeORM 的迁移系统。通过编写迁移脚本，你可以控制数据库模式的每一个更改，并确保这些更改是可追踪和可逆的
      autoLoadEntities: true, //自动加载 entity
      logging: true, // print sql logs
    }),
    UserModule,
    AuthModule,
    BookModule,
    MenuModule,
    RoleModule,
    PermissionModule,
    RolesModule,
    MenusModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestService], // all services
})
export class AppModule {}
