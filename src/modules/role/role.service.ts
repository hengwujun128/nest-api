import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, InsertResult, QueryResult, Repository } from 'typeorm'
import { Role } from './role.entity'
import { CreateRoleDto } from './create-role.dto'

import { MenuService } from '../menu/menu.service'

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
  constructor(
    @InjectRepository(Role) readonly roleRepository: Repository<Role>,
    private menuService: MenuService,
  ) {}

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
   * @desc 1. 先创建角色,在创建角色绑定关系,最后更新菜单中 meta 字段角色
   * @param {CreateRoleDto} createRoleDto - the data transfer object containing role information
   * @return {Promise<Role>} the newly created role
   */
  async create(createRoleDto: CreateRoleDto): Promise<any> {
    // const role = new Role()
    // role.name = createRoleDto.name
    // role.remark = createRoleDto.remark
    // return await this.roleRepository.save(role)
    // 1. 先创建角色
    const res = await this.createRole(createRoleDto)
    console.log('res', res)
    const { raw } = res
    const roleMenuRes = await this.createRoleMenu({ roleId: raw.insertId, menus: createRoleDto.menu })
    return roleMenuRes
    // 2. 创建角色菜单绑定关系(一个角色,多个菜单)- 批量插入(注意:这里和编辑有区别,现在批量删除在新增)

    // 3. 更新菜单中 meta 字段角色
  }

  // 创建角色
  async createRole(roleData: CreateRoleDto): Promise<InsertResult> {
    const role = new Role()
    role.name = roleData.name
    role.remark = roleData.remark
    console.log('role', role)
    return await this.roleRepository.insert(role)
  }

  // 更新角色
  async updateRole(role: CreateRoleDto) {
    const roleData = new Role()
    roleData.name = role.name
    roleData.remark = role.remark
    const id = role.id
    return await this.roleRepository.update(id, roleData)
  }

  /**
   * 创建角色菜单
   * - 创建 roleId 和 menuId 的绑定关系(批量插入)
   * - 三种批量插入方式: save、insert和createQueryBuilder方法
   */
  async createRoleMenu(params): Promise<InsertResult> {
    const { roleId, menus } = params
    console.log('createRoleMenu', params)
    // const insertSql = `INSERT INTO role_menu (role_id, menu_id) VALUES (${roleId}, ${menuId})`
    // const result = await this.roleRepository.query(insertSql)
    // return result

    const roleMenuData = menus.map((item) => {
      return { roleId, menuId: item }
    })
    const insertRes = await this.roleRepository
      .createQueryBuilder()
      .insert()
      .into('role_menu')
      .values(roleMenuData)
      .execute()
    return insertRes
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

  async updateRoleMenu(role) {
    const { roleId, menus } = role
    const roleMenuData = menus.map((item) => {
      return { roleId, menuId: item }
    })
    const insertRes = await this.roleRepository
      .createQueryBuilder()
      .insert()
      .into('role_menu')
      .values(roleMenuData)
      .execute()
    return insertRes
  }

  /**
   * @desccription 获取角色权限
   */
  async getRolePermission(roleId: number): Promise<QueryResult> {
    const sql = `SELECT roleId,menuId from role_permission WHERE roleId = ${roleId}`
    return this.roleRepository.query(sql)
  }

  /*
   * 更新角色
   * - 更新角色
   * - 更新角色菜单绑定关系(先批量删除再批量插入)
   * - 更新 menu 表中的 meta 字段
   * */
  async update(role: CreateRoleDto) {
    console.log('编辑角色', role)

    const result = await this.updateRole(role)
    const removeResult = await this.removeRoleMenu(role.id)
    const updatedResult = await this.updateRoleMenu({ roleId: role.id, menus: role.menu })
    // 菜单表中的 每条菜单的 meta 字段都要更新, 也是批量更新
    // 查询 被当前角色的所关联的所有菜单,取出 meta,role 添加当前角色, 然后批量更新 meta 字段
    //TIPS: Fixedbug, 对当前角色关联的菜单的 meta 中的 roles 进行处理, 但是以前关联了,当前取消了关联,要删除
    // const menuList = await this.roleRepository.query(`SELECT * FROM admin_menu WHERE id IN (${role.menu}) `)
    const menuList = await this.roleRepository.query(`SELECT * FROM admin_menu`)
    const updatedMenuList = menuList.map((menu) => {
      const { meta } = menu
      if (meta) {
        const metaData = JSON.parse(meta)
        if (metaData.roles && metaData.roles.length) {
          const roles = JSON.parse(metaData.roles)
          if (role.menu.includes(menu.id)) {
            if (!roles.includes(role.name)) {
              roles.push(role.name)
            }
          } else {
            // 不属于当前角色的菜单,且曾经已经关联了当前角色
            if (roles.includes(role.name)) {
              roles.splice(roles.indexOf(role.name), 1)
            }
          }
          metaData.roles = JSON.stringify(roles)
        } else {
          metaData.roles = JSON.stringify([role.name])
        }
        metaData.roles = metaData.roles.replaceAll('"', '\\"') // 将双引号, 替换成 \"
        // console.log(metaData)
        menu.meta = JSON.stringify(metaData)
      }
      return menu
    })
    // 批量更新 mate 字段(这里是做了全量更新 meta 字段了，不管是否关联了当前角色都要更新)
    const sqlArr = []
    updatedMenuList.forEach((menu) => {
      const sql = `UPDATE  admin_menu SET meta = '${menu.meta}' WHERE id = ${menu.id}`
      sqlArr.push(this.roleRepository.query(sql))
    })
    Promise.all(sqlArr)
      .then((values) => {
        console.log(values)
      })
      .catch((err) => {
        console.log('error', err)
      })

    console.log({
      result,
      removeResult,
      updatedResult,
      updatedMenuList,
    })
    return updatedResult
  }

  remove(id: number): Promise<DeleteResult> {
    return this.roleRepository.delete(id)
  }
  findByRoleName(name: string): Promise<Role> {
    return this.roleRepository.findOneBy({ name })
  }
}
