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
    console.log({ user, password })
    if (!user) {
      throw new UnauthorizedException('用户未注册,请先进行注册再登录')
    }
    const hashPassword = user.password
    // const isMatch = await bcrypt.compare(password, hashPassword)
    const isMatch = password === hashPassword

    if (isMatch) {
      console.log('登录成功')
      // jwt 生成 token
      const payload = { username: user.username, sub: user.id }
      return {
        token: await this.jwtService.signAsync(payload),
      }
    } else {
      // nest 内置抛出异常
      throw new UnauthorizedException()
      //  使用自定义 异常 捕捉
    }
  }
}
