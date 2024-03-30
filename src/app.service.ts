import { Injectable } from '@nestjs/common'

/*
 * @injectable 表示当前 service 可以被注入 到其他控制器
 * 其中,app.module 中的 providers 是个数组,放置所有的 services, 如果希望其他 controller 中能够访问 service, 必须要先放置到此处
 *
 * @export
 * @class AppService
 * */

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}
