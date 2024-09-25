/**
 * TODO:  和 entity 并不是保持一致的,id 是自增的,active 有个默认值
 */

import type { CreatePermissionDto } from '../permission/permission.dto'
export class CreateUserDto {
  id: number
  username: string
  password: string
  roles: string // roles 应该是是个
  nickname: string
  avatar: string
  active: number
  permissions?: CreatePermissionDto[]
}
