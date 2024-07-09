import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'

/**
 * 守卫: 如何在auth module 中的 providers 中实现 AuthGard
 * 通过 Module.providers[] 注册 gard, AuthGard 具有全局作用域
 *
 *
 */

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD, // token 使用APP_GUARD ,代表是全局token, 对全局模块都默认起作用
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
