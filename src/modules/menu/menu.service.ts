import { Injectable } from '@nestjs/common'
import { MENU_LIST } from './menu.data'
@Injectable()
export class MenuService {
  constructor() {}
  async findAll(): Promise<string> {
    // return await this.userRepository.find()
    return MENU_LIST
  }
}
