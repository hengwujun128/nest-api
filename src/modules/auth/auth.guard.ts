import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from './public.decorator'

/**
 * 请求先经过守卫,然后经过 controller;
 * 这里完成登录token 的验证,login 不需要验证
 * Refactor:
 * 如何在 守卫canActivate方法中访问自定义装饰器(公共方法)
 *
 * ExecutionContext 是 guard 和 middleware 的一个重要区别
 * canActivate(ExecutionContext) 返回值: boolean | Promise<boolean> | Observable<boolean>
 *
 *
 */

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private refactor: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('auth guard')
    //   这里完成登录token 的验证,login 不需要验证

    // const request = context.switchToHttp().getRequest()
    // return validateRequest(request)

    // use @setMetadata() approach to determine which role can access this route
    const isPublic = this.refactor.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass])
    //
    if (isPublic) {
      return true
    }

    return undefined
  }
}
