import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './create-user.dto'

/**
 * 如何在 service 中 注入 Entity? InjectRepository
 * 如何对构造函数中的参数使用装饰器? @InjectRepository(User)
 * 如何对构造函数参数 中的repository 进行类型注解
 * 在 service 中通过InjectRepository装饰器 + Entity 实例, 使用 entity, 不仅仅做 user 表查询,可以做所有表查询
 */

@Injectable()
export class UserService {
  /**
   *
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

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  /**
   * Create a new user with the provided information.
   *
   * @param {CreateUserDto} createUserDto - the data transfer object containing user information
   * @return {Promise<User>} the newly created user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User()
    user.username = createUserDto.username + Math.floor(Math.random() * 10000)
    user.password = createUserDto.password
    user.role = createUserDto.role
    user.avatar = createUserDto.avatar
    user.nickname = createUserDto.nickname

    user.active = true // 设置默认值
    return await this.userRepository.save(user)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id)
  }
  findByUserName(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username })
  }
}
