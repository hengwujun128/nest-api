import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common'

import { MenuService } from './menu.service'
import { wrapperResponse } from '../../utils'

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('') // 此处 '/' 和 '' 是一样的
  getAllMenus() {
    return wrapperResponse(this.menuService.findAll(), '获取菜单成功')
    // return this.menuService.findAll()
  }

  @Get('active')
  getActiveMenus() {
    return wrapperResponse(this.menuService.findActive(), '获取菜单成功')
  }

  @Get(':id') // 此处 /:id 和 :id 是一样的
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id)
  }

  // 如何对参数的类型进行转换? ParseIntPipe
  @Post()
  create(@Body() menu) {
    console.log('接口数据', menu)
    return wrapperResponse(this.menuService.create(menu), '创建菜单成功')
  }

  @Put()
  update(@Body() menu) {
    return wrapperResponse(this.menuService.update(menu), '更新菜单成功')
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id)
    return wrapperResponse(this.menuService.remove(id), '删除菜单成功')
  }
}
