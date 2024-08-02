/**
 * TODO:  和 entity 并不是保持一致的,id 是自增的,active 有个默认值
 */

export class CreateUserDto {
  username: string
  password: string
  roles: string // roles 应该是是个数组, mysql 不支持
  nickname: string
  avatar: string
}
