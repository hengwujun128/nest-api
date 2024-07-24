import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      useClass: UserService,
      provide: UserService,
    },
  ],
  exports: [UserService], // 被其他模块引入使用
})
export class UserModule {}
