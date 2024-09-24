import { Get, Controller } from '@nestjs/common'

import { PermissionService } from './permission.service'
import { Public } from './../auth/public.decorator'

import { wrapperResponse } from '../../utils'
@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Public()
  @Get()
  getAllMenus() {
    return wrapperResponse(this.permissionService.findAll(), '获取权限成功')
    // return this.menuService.findAll()
  }
}
