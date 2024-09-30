/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Brackets } from 'typeorm'

// import { MENU_LIST } from './menu.data'
import * as MENUS from './menu.data.json'

import { Menu } from './menu.entity'

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
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    readonly menuRepository: Repository<Menu>,
  ) {}

  async find(data): Promise<any> {
    // let WHERE = `where 1=1`
    // if (data.active) {
    //   WHERE += ` AND active = ${data.active}`
    // }
    // if (data.name) {
    //   WHERE += ` AND name like '%${data.name}%' `
    // }
    // const SQL = `select * from admin_menu ${WHERE} order by id desc`
    // return this.menuRepository.query(SQL)

    const res = await this.menuRepository
      .createQueryBuilder('admin_menu')
      .where(
        new Brackets((qb) => {
          if (data.active) {
            return qb.andWhere('active = :active', { active: data.active })
          } else {
            return qb
          }
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          if (data.name) {
            return qb.andWhere('name like :name', { name: `%${data.name}%` })
          } else {
            return qb
          }
        }),
      )
      .skip((data.page - 1) * data.pageSize)
      .take(data.pageSize)
      .getManyAndCount()

    return {
      list: res[0],
      total: res[1],
      pageSize: data.pageSize,
      page: data.page,
      pages: Math.ceil(res[1] / data.pageSize),
    }
  }
  findActive(): Promise<Menu[]> {
    const SQL = `select * from admin_menu where active = 1 order by id asc`
    return this.menuRepository.query(SQL)
  }

  findAll(): Promise<Menu[]> {
    const SQL = `select * from admin_menu order by id asc`
    return this.menuRepository.query(SQL)
  }

  create(body) {
    return this.menuRepository.save(body)
  }
  update(body) {
    const id = body.id
    return this.menuRepository.update(id, body)
  }
  async remove(id: number) {
    // 1. 删除菜单本身;2. 删除角色菜单绑定关系 |亦或 查看是否有绑定关系,如果有则不允许删除
    const deleteMenuSql = `DELETE FROM admin_menu WHERE id = ${id}`

    const querySql = `SELECT * FROM role_menu WHERE menuId = ${id}`

    const res = await this.menuRepository.query(querySql)
    if (res.length > 0) {
      throw new Error('该菜单已被角色绑定，不允许删除,请先解除角色权限绑定关系')
    } else {
      return this.menuRepository.query(deleteMenuSql)
    }
  }
}
