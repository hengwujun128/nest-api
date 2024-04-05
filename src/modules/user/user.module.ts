import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'

@Module({
  // 在每个 module 中 引入所需要的数据表实体,以数组的形式传入[User, Book,...]
  imports: [TypeOrmModule.forFeature([User])],

  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
