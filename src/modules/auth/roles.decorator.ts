import { SetMetadata } from '@nestjs/common'

import { Role } from '../../enums/role.enum'

export const ROLES_KEY = 'roles'

// Rest parameters 接收不定参数, 参数roles是个数组
export const Roles = (...roles: Role[]) => {
  return SetMetadata(ROLES_KEY, roles)
}
