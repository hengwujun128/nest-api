import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username, password) {
    // TODO: 需要使用到 UserService
    const user = await this.userService.findByUserName(username)

    const hashPassword = user.password
    const isMatch = await bcrypt.compare(password, hashPassword)
    console.log({ user, password })

    if (isMatch) {
      console.log('登录成功')
      // jwt 生成 token
      const payload = { username: user.username, sub: user.id }
      return {
        access_token: await this.jwtService.signAsync(payload),
      }
    } else {
      // nest 内置抛出异常
      throw new UnauthorizedException()
      //  使用自定义 异常
    }
  }
}
