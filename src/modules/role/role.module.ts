import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RoleController } from './role.controller'
import { Role } from './role.entity'
import { RoleService } from './role.service'

import { MenuModule } from '../menu/menu.module'

@Module({
  imports: [MenuModule, TypeOrmModule.forFeature([Role])],

  controllers: [RoleController],
  providers: [
    {
      useClass: RoleService,
      provide: RoleService,
    },
  ],
  exports: [RoleService], // 被其他模块引入使用
})
export class RoleModule {}
