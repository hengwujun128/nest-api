import { Module } from '@nestjs/common'
import { PermissionController } from './permission.controller'
import { PermissionService } from './permission.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from './permission.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Permission])], // only import Permissions entities, can synchronized

  controllers: [PermissionController],
  providers: [
    {
      useClass: PermissionService, // class name
      provide: PermissionService, // token
    },
  ],
})
export class PermissionModule {}
