import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

// 控制器使用了类和装饰器

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  //装饰器: 做path 映射
  @Get('/test')
  getTest(): string {
    return 'this is test'
  }
}
