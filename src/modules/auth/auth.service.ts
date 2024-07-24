import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(username, password) {
    // TODO: 需要使用到 UserService
    const user = await this.userService.findByUserName(username)
    console.log(user)
  }
}
