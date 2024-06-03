import { Controller, Get, Post } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  @Get()
  auth() {
    return 'auth'
  }

  @Post('login')
  login() {
    return 'auth'
  }
}
