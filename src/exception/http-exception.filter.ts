//  based on https://docs.nestjs.com/exception-filters

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // 捕获 httpException
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    // 并对返回结果做处理
    response.status(status).json({
      statusCode: status, // 获取自定义错误状态码
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message || exception.getResponse(), // 获取自定义错误信息
    })
  }
}
