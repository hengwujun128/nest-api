import { Module } from '@nestjs/common'
import { MenuController } from './menu.controller'
import { Menu } from './menu.entity'
import { MenuService } from './menu.service'

import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],

  controllers: [MenuController],
  providers: [
    {
      useClass: MenuService, // class
      provide: MenuService, // token
    },
  ],
  // exports: [MenuService]
})
export class MenuModule {}
