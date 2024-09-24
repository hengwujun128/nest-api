import { Get, Controller } from '@nestjs/common'

import { PermissionService } from './permission.service'
import { wrapperResponse } from '../../utils'
@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get('') // 此处 '/' 和 '' 是一样的
  getAllMenus() {
    return wrapperResponse(this.permissionService.findAll(), '获取权限成功')
    // return this.menuService.findAll()
  }
}
