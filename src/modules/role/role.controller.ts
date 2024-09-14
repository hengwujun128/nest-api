import { Public } from './../auth/public.decorator'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './create-role.dto'
import { wrapperResponse } from '../../utils'

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Public()
  @Get() // 此处 '/' 和 '' 是一样的
  getRoles(@Query() query) {
    // console.log(query)
    return wrapperResponse(this.roleService.findAll(query), '获取角色列表成功')
  }

  @Get(':id') // 此处 /:id 和 :id 是一样的
  getRolesById(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id)
    return this.roleService.findOne(id)
  }

  // 如何对参数的类型进行转换? ParseIntPipe
  @Post()
  async create(@Body() roleData: CreateRoleDto) {
    // return await this.roleService.create(userData)
    return wrapperResponse(this.roleService.create(roleData), '创建角色成功')
  }

  @Put()
  update(@Body() userData: CreateRoleDto) {
    return wrapperResponse(this.roleService.update(userData), '更新角色成功')
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return wrapperResponse(this.roleService.remove(id), '删除角色成功')
  }
}
