import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

/**
 * 如何在 service 中 注入 Entity? InjectRepository
 * 如何对构造函数中的参数使用装饰器? @InjectRepository(User)
 * 如何对构造函数参数 中的repository 进行类型注解
 * 在 service 中通过InjectRepository装饰器 + Entity 实例, 使用 entity, 不仅仅做 user 表查询,可以做所有表查询
 */

@Injectable()
export class UserService {
  /**
   * Constructor for UserService
   * @param userRepository The repository for User entity
   */
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id })
  }
}
