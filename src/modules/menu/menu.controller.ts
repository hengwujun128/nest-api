import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common'

import { MenuService } from './menu.service'
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('') // 此处 '/' 和 '' 是一样的
  getAllMenus() {
    return this.menuService.findAll()
  }

  @Get(':id') // 此处 /:id 和 :id 是一样的
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id)
  }

  // 如何对参数的类型进行转换? ParseIntPipe
  @Post()
  async create(@Body() menu) {
    console.log(menu)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id)
  }
}
