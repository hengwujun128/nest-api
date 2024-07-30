import { JwtService } from '@nestjs/jwt'
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from './public.decorator'
import { jwtConstants } from './constants'

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
  constructor(
    private refactor: Reflector,
    private JwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //   这里完成登录token 的验证,login 不需要验证

    // const request = context.switchToHttp().getRequest()
    // return validateRequest(request)

    // use @setMetadata() approach to determine which role can access this route
    const isPublic = this.refactor.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass])
    console.log({
      'auth guard': 'auth guard',
      isPublic: isPublic,
    })

    if (isPublic) {
      return true
    }

    // 校验 token 是在  authGard 中进行, 生成 token 是在authService 中进行
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException('token 不存在')
    }

    try {
      const payload = await this.JwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      })
      console.log({ payload })
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : ''
  }
}
