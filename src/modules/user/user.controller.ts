import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'

@Controller('user')
export class UserController {
  @Get('') // 此处 '/' 和 '' 是一样的
  getUsers() {
    return 'get all users list---'
  }

  @Get(':id') // 此处 /:id 和 :id 是一样的
  // getUserById(@Param() params): string {
  //   return 'get user by id---' + params.id
  // }
  //  单个参数获取简便方法?
  getUserById(@Param('id', ParseIntPipe) id: number): string {
    console.log(typeof id)
    return 'get user by id---' + id
  }
  // 如何对参数的类型进行转换? ParseIntPipe
}
