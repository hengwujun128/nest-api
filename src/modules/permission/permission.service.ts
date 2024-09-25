/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Permission } from './permission.entity'

/* -------------------------------------------------------------------------- */
/*         How to create a type for complex JSON object in TypeScript?        */
/* -------------------------------------------------------------------------- */
type JSONValue = string | number | boolean | JSONObject | JSONArray

interface JSONObject {
  [x: string]: JSONValue
}
interface JSONArray extends Array<JSONValue> {}

//
// These kind of type is known as Recursive Type Aliases.After TypeScript 3.7 we can also define it in a confined way:
type JSON = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>
// Promise<JSON>

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    readonly permissionRepository: Repository<Permission>,
  ) {}

  findAll(query): Promise<Permission[]> {
    const { key } = query
    let page = +query.page || 1
    let pageSize = +query.pageSize || 10
    let where = `where 1=1`

    if (key) {
      where += ` AND \`key\` LIKE '%${key}%'`
    }
    if (page <= 0) {
      page = 1
    }
    if (pageSize <= 0) {
      pageSize = 10
    }

    const SQL = `select * from admin_permission ${where} 
     order by id desc  limit ${pageSize} offset ${(page - 1) * pageSize}`

    return this.permissionRepository.query(SQL)
  }
  findActive(): Promise<any[]> {
    const SQL = `select * from admin_permission where active = 1 order by id asc`
    return this.permissionRepository.query(SQL)
  }

  create(body) {
    return this.permissionRepository.save(body)
  }
  update(body) {
    const id = body.id
    return this.permissionRepository.update(id, body)
  }

  async remove(id: number) {
    // 1. 删除权限本身;2. 删除角色权限绑定关系 | 查看是否有绑定关系,如果有则不允许删除
    const deleteRolePermissionSql = `DELETE FROM role_permission WHERE permissionId = ${id}`
    const deletePermissionSql = `DELETE FROM admin_permission WHERE id = ${id}`

    const querySql = `SELECT * FROM role_permission WHERE permissionId = ${id}`

    const res = await this.permissionRepository.query(querySql)
    if (res.length > 0) {
      throw new Error('该权限已被角色绑定，不允许删除,请先解除角色权限绑定关系')
    } else {
      return this.permissionRepository.query(deletePermissionSql)
    }

    // const res = await this.permissionRepository.query(deletePermissionSql)
    // return this.permissionRepository.query(deleteRolePermissionSql)
  }
}
