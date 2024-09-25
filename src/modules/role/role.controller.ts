import { Public } from './../auth/public.decorator'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
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

  @Post()
  async create(@Body() roleData: CreateRoleDto) {
    // TODO: 参数校验?在什么时候开始做?
    return wrapperResponse(this.roleService.create(roleData), '创建角色成功')
  }

  @Put()
  update(@Body() userData: CreateRoleDto) {
    return wrapperResponse(this.roleService.update(userData), '更新角色成功')
  }

  @Get('role_menu')
  getRoleMenu(@Query('roleId', ParseIntPipe) roleId: number) {
    return wrapperResponse(this.roleService.getRoleMenu(roleId), '获取角色菜单成功')
  }

  @Post('role_menu')
  createRoleMenu(@Body() body) {
    return wrapperResponse(this.roleService.createRoleMenu(body), '关联角色菜单成功')
  }

  @Delete('role_menu')
  deleteRoleMenu(@Query('roleId', ParseIntPipe) roleId: number) {
    return wrapperResponse(this.roleService.removeRoleMenu(roleId), '删除角色菜单成功')
  }

  @Get('role_permission')
  getRolePermission(@Query('roleId', ParseIntPipe) roleId: number) {
    return wrapperResponse(this.roleService.getRolePermission(roleId), '获取角色权限成功')
  }

  /* -------------------------------------------------------------------------- */
  /* controller 中路由命中优先级 静态路由大于动态路由 /role/role_menu > /role/:id     */
  /* -------------------------------------------------------------------------- */
  @Get(':id') // 此处 /:id 和 :id 是一样的
  getRolesById(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id)
    return this.roleService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return wrapperResponse(this.roleService.remove(id), '删除角色成功')
  }
}
