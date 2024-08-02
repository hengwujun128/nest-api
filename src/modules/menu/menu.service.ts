import { Injectable } from '@nestjs/common'

@Injectable()
export class MenuService {
  constructor() {}
  async findAll(): Promise<string> {
    // return await this.userRepository.find()
    return 'hello world'
  }
}
