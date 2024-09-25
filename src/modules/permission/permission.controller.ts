import { Get, Query, Param, Post, Put, Delete, Body, Controller, ParseIntPipe } from '@nestjs/common'

import { PermissionService } from './permission.service'
import { Public } from './../auth/public.decorator'
import { CreatePermissionDto } from './permission.dto'
import { wrapperResponse } from '../../utils'
@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Public()
  @Get()
  getPermissions(@Query() query) {
    return wrapperResponse(this.permissionService.findAll(query), '获取权限成功')
  }

  @Post()
  create(@Body() permissionData: CreatePermissionDto) {
    return wrapperResponse(this.permissionService.create(permissionData), '创建权限成功')
  }

  @Put()
  update(@Body() permissionData: CreatePermissionDto) {
    return wrapperResponse(this.permissionService.update(permissionData), '更新权限成功')
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return wrapperResponse(this.permissionService.remove(id), '删除权限成功')
  }
}
