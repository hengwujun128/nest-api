/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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

  findAll(): Promise<Menu[]> {
    return this.menuRepository.findBy({ active: 1 })
  }
}
