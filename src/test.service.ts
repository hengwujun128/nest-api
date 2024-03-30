import { Injectable, HttpException, HttpStatus } from '@nestjs/common'

/*
 * @injectable 表示当前 service 可以被注入 到其他控制器
 * 其中,app.module 中的 providers 是个数组,放置所有的 services, 如果希望其他 controller 中能够访问 service, 必须要先放置到此处
 * provider的定位: 就是服务层,所有的业务应该聚合到此处, 虽然业务可以写到 controller 里面,但是controller 就做了两件事,
 * 处理用户的请求做出响应,同时又要处理业务逻辑查询数据库
 *
 * @export
 * @class AppService
 * */

@Injectable()
export class TestService {
  getHello(): string {
    return 'Hello World!'
  }
  getTest(): string {
    return 'this is a provider'
  }

  /* ------------------------------- // 业务下层到此处 ------------------------------- */
  getData(params): string {
    if (!params.id || !Number.isInteger(params.id)) {
      // 自定义如下异常错误,经过统一的异常过滤器,会对外输出错误结果
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
    return 'this is a single data ' + params.id + ' And ' + params.subId
  }
  getAllData(): string {
    return ' this is all data '
  }

  addData(body, query): string {
    console.log('body:', { body, query })
    return 'this is add data:' + JSON.stringify(body) + '---- id=' + query.id
  }

  updateData(body): string {
    console.log('put', body)
    return 'this is update data'
  }

  deleteData(param): string {
    console.log('===delete===', param.id)
    return 'this is delete data' + 'id =' + param.id
  }
}
