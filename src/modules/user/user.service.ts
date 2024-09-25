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
  constructor(@InjectRepository(User) readonly userRepository: Repository<User>) {}

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id })
  }

  async findAll(query): Promise<User[]> {
    const { id, username, active } = query
    let page = +query.page || 1
    let pageSize = +query.pageSize || 10
    let where = `where 1=1`

    if (username) {
      where += ` AND username='${username}'`
    }
    if (id) {
      where += ` AND id='${id}'`
    }
    if (active) {
      where += ` AND active= '${active}'`
    }
    if (page <= 0) {
      page = 1
    }
    if (pageSize <= 0) {
      pageSize = 10
    }

    const sql = `select id,username,roles,nickname,avatar,active from admin_user
      ${where}
      order by id desc
      limit ${pageSize} offset ${(page - 1) * pageSize}`

    return await this.userRepository.query(sql)
  }

  /**
   * Create a new user with the provided information.
   *
   * @param {CreateUserDto} createUserDto - the data transfer object containing user information
   * @return {Promise<User>} the newly created user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User()
    user.username = createUserDto.username
    user.password = createUserDto.password
    user.roles = createUserDto.roles
    user.avatar = createUserDto.avatar
    user.nickname = createUserDto.nickname || createUserDto.username

    user.active = createUserDto.active
    return await this.userRepository.save(user)
  }

  update(body) {
    const id = body.id
    return this.userRepository.update(id, body)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id)
  }
  async findByUserName(username: string): Promise<CreateUserDto> {
    // 获取用户信息后,还要获取用户权限(根据角色或者权限)
    const userInfo = await this.userRepository.findOneBy({ username })
    console.log('---userInfo---', userInfo)
    const userRoles = JSON.parse(userInfo.roles)
    const userRolesStr = userRoles.map((item) => {
      return `'${item}'`
    })

    const ROLE_SQL = `SELECT id FROM admin_role WHERE name IN (${userRolesStr})`
    const ROLE_PERMISSION_SQL = `SELECT permissionId FROM role_permission WHERE roleId IN (${ROLE_SQL})`
    const PERMISSION_SQL = `SELECT * FROM admin_permission WHERE id in (${ROLE_PERMISSION_SQL})`

    const userPermissions = await this.userRepository.query(PERMISSION_SQL)
    console.log({
      ROLE_PERMISSION_SQL,
      PERMISSION_SQL,
      userPermissions,
    })
    return { ...userInfo, permissions: userPermissions }
  }
}
