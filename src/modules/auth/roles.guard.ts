import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'

import { Role } from '../../enums/role.enum'
import { ROLES_KEY } from './roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} // 向 gard 中注入 Reflector

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('roles gard---')
    //  获取用户自定义的 SetMetaData
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // 用户没有定义(控制器中定义),则直接返回 true
    if (!requiredRoles) {
      return true
    }
    // 用户定义了,就要从请求中获取当用户角色,如果有一个角色满足就放行(注: 控制器中的方法可以定义多个角色)
    const { user } = context.switchToHttp().getRequest()
    return requiredRoles.some((role) => user.roles?.includes(role))
  }
}
