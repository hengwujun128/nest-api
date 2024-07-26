import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from '../user/user.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

import { AuthGuard } from './auth.guard'

import { jwtConstants } from './constants'

/**
 * 守卫: 如何在auth module 中的 providers 中实现 AuthGard
 * 通过 Module.providers[] 注册 gard, AuthGard 具有全局作用域
 * auth module 既依赖内部其它 module, 又依赖内部第三方 module
 *
 */

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }, // 24*60*60 +'s'
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [],
})
export class AuthModule {}
