import { SetMetadata } from '@nestjs/common'

/**
 * 公共装饰器 解决路由守卫,跳过验证使用
 *
 */

export const IS_PUBLIC_KEY = 'isPublic'
export const PublicDecorator = () => {
  SetMetadata(PublicDecorator, true)
}
