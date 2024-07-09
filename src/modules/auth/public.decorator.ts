import { SetMetadata } from '@nestjs/common'

/**
 * 定义元数据(供 route handler 使用)
 *
 */

export const IS_PUBLIC_KEY = 'isPublic'
export const PublicDecorator = () => {
  SetMetadata(PublicDecorator, true)
}
