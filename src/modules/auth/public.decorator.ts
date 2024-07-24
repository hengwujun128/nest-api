import { SetMetadata } from '@nestjs/common'

/**
 * 定义元数据(供 route handler 使用)
 *
 */

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => {
  return SetMetadata(IS_PUBLIC_KEY, true)
}
