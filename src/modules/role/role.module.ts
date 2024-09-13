import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RoleController } from './role.controller'
import { Role } from './role.entity'
import { RoleService } from './role.service'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],

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
