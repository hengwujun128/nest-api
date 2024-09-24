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

  findAll(): Promise<any[]> {
    const SQL = `select * from admin_menu  order by id asc`
    // return this.permissionRepository.findBy({ active: 1 })
    return this.permissionRepository.query(SQL)
  }
  findActive(): Promise<any[]> {
    const SQL = `select * from admin_menu where active = 1 order by id asc`
    return this.permissionRepository.query(SQL)
  }

  create(body) {
    return this.permissionRepository.save(body)
  }
  update(body) {
    const id = body.id
    return this.permissionRepository.update(id, body)
  }
}
