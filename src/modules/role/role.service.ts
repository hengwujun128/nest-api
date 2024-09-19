import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, InsertResult, QueryResult, Repository } from 'typeorm'
import { Role } from './role.entity'
import { CreateRoleDto } from './create-role.dto'

/**
 * 如何在 service 中 注入 Entity? InjectRepository
 * 如何对构造函数中的参数使用装饰器? @InjectRepository(Role)
 * 如何对构造函数参数 中的repository 进行类型注解
 * 在 service 中通过InjectRepository装饰器 + Entity 实例, 使用 entity, 不仅仅做 user 表查询,可以做所有表查询
 */

@Injectable()
export class RoleService {
  /**
   *
   * Constructor for UserService
   * @param roleRepository The repository for User entity
   */
  constructor(@InjectRepository(Role) readonly roleRepository: Repository<Role>) {}

  async findOne(id: number): Promise<Role> {
    return await this.roleRepository.findOneBy({ id })
  }

  async findAll(query): Promise<Role[]> {
    const { id, name, active } = query
    let page = +query.page || 1
    let pageSize = +query.pageSize || 10
    let where = `where 1=1`

    if (name) {
      where += ` AND name='${name}'`
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

    const sql = `select id,name,remark from admin_role
      ${where}
      order by id desc
      limit ${pageSize} offset ${(page - 1) * pageSize}`

    return await this.roleRepository.query(sql)
  }

  /**
   * Create a new role with the provided information.
   *
   * @param {CreateRoleDto} createRoleDto - the data transfer object containing role information
   * @return {Promise<Role>} the newly created role
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = new Role()
    role.name = createRoleDto.name
    role.remark = createRoleDto.remark
    console.log('role', role)
    return await this.roleRepository.save(role)
  }

  /**
   * 创建角色菜单
   * - 创建 roleId 和 menuId 的绑定关系
   * - 查询 menu 表中的 meta 字段
   */
  createRoleMenu(params): Promise<InsertResult> {
    const { roleId, menuId } = params
    console.log('createRoleMenu', params)
    // 插入 roleId 和 menuId 的绑定关系
    const insertSql = `INSERT INTO role_menu (role_id, menu_id) VALUES (${roleId}, ${menuId})`
    return this.roleRepository.query(insertSql)
  }

  /*
   * 获取角色菜单-根据 roleId获取角色的菜单
   */
  getRoleMenu(roleId: number): Promise<QueryResult> {
    const sql = `SELECT roleId,menuId from role_menu WHERE roleId = ${roleId}`
    return this.roleRepository.query(sql)
  }

  /**
   * 删除角色菜单
   */
  removeRoleMenu(roleId: number): Promise<DeleteResult> {
    if (!roleId) {
      return
    }
    const sql = `DELETE FROM role_menu WHERE roleId = ${roleId}`
    return this.roleRepository.query(sql)
  }
  /*
   * 更新角色 - 更新角色,更新角色菜单绑定关系,更新 menu 表中的 meta 字段
   *
   * @param {any} body
   * @returns
   *
   * @memberOf RoleService
   * */
  update(body) {
    const id = body.id
    return this.roleRepository.update(id, body)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.roleRepository.delete(id)
  }
  findByRoleName(name: string): Promise<Role> {
    return this.roleRepository.findOneBy({ name })
  }
}
