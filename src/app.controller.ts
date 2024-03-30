import { TestService } from './test.service'
import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseFilters } from '@nestjs/common'
import { AppService } from './app.service'
import { HttpExceptionFilter } from './exception/http-exception.filter'

// 控制器使用了类和装饰器

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly testService: TestService, // 定义它是只读对象
  ) {}

  //装饰器: 做path 映射
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  //装饰器: 做path 映射
  @Get('/test')
  // getTest方法的名称不重要,重要的是上面的@Get()装饰器
  getTest(): string {
    // return 'this is test:方法的名称不重要,重要的是上面的@Get()装饰器 '
    return this.testService.getTest()
  }

  /**
   * 使用 nest 编写restAPI 接口文档
   * Get: 查询数据 | 查询全部数据 | 查询全部数据
   * Post:新增数据
   * PUT: 更新
   * Delete: 删除
   */

  // @Get('/data/:id/get/:subId')
  @Get('/data/:id/:subId')
  @UseFilters(new HttpExceptionFilter())
  getData(@Param() params): any {
    // @Param() 和 @Get(), @Post() 一样,也是
    console.log(params)
    // 业务下层到 service
    return this.testService.getData(params)
  }

  @Get('/data/')
  getAllData(): string {
    // 业务下层到 service
    return this.testService.getAllData()
  }

  @Post('/data/')
  addData(@Body() body, @Query() query): string {
    return this.testService.addData(body, query)
  }

  @Delete('/data/:id')
  deleteData(@Param() param): string {
    return this.testService.deleteData(param)
  }

  @Put('/data/')
  updateData(@Body() body): string {
    return this.testService.updateData(body)
  }

  /**
   * 三种参数形式: Param: restful API 参数; query: url 参数; Body: Post 参数
   *
   */
}
