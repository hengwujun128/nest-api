import { Public } from './../auth/public.decorator'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './create-user.dto'
import { wrapperResponse } from '../../utils'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get('') // 此处 '/' 和 '' 是一样的
  getUsers(@Query() query) {
    // console.log(query)
    return wrapperResponse(this.userService.findAll(query), '获取用户列表成功')
  }

  // 获取用户信息(登录成功之后)
  // TODO: @Public() 添加到此处,authGard 还是undefined
  @Get('info')
  getUserByToken(@Req() request) {
    return wrapperResponse(this.userService.findByUserName(request.user.username), '获取用户信息成功')
  }

  @Get(':id') // 此处 /:id 和 :id 是一样的
  // getUserById(@Param() params): string {
  //   return 'get user by id---' + params.id
  // }
  //  单个参数获取简便方法?
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id)
    return this.userService.findOne(id)
  }

  // 如何对参数的类型进行转换? ParseIntPipe
  // TODO: 没有对 userData 进行校验 ,可以使用 validationPipe 进行校验
  @Post()
  async create(@Body() userData: CreateUserDto) {
    // return await this.userService.create(userData)
    return wrapperResponse(this.userService.create(userData), '创建用户成功')
  }

  @Put('')
  update(@Body() userData: CreateUserDto) {
    return wrapperResponse(this.userService.update(userData), '更新用户成功')
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return wrapperResponse(this.userService.remove(id), '删除用户成功')
  }
}
