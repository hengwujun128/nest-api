import { Injectable } from '@nestjs/common'
// import { MENU_LIST } from './menu.data'
import * as MENUS from './menu.data.json'

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

@Injectable()
export class MenuService {
  constructor() {}
  async findAll(): Promise<JSON> {
    // return await this.userRepository.find()
    // return MENU_LIST

    return MENUS
  }
}
