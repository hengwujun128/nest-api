import { Controller, Post, Body, UseFilters } from '@nestjs/common'
import { Public } from './public.decorator'
import { AuthService } from './auth.service'

import { HttpExceptionFilter } from '../../exception/http-exception.filter'

import { success, error } from '../../utils'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  async login(@Body() params) {
    return await this.authService
      .login(params.username, params.password)
      .then((data) => success(data, '登录成功'))
      .catch((err) => error(err.message))
  }
}
