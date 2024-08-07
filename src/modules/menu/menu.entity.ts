import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm'

/*
 * 

 * {
    "path": "/permission",
    "name": "Permission",
    "redirect": "/permission/menu",
    "meta": {
      "orderNo": 15,
      "icon": "ion:key-outline",
      "title": "routes.demo.permission.permission"
    },
    "children": [
      {
        "path": "menu",
        "name": "PermissionMenu",
        "meta": {
          "title": "routes.demo.permission.menu"
        }
      }
    ]
}
 * @export
 * @class Menu
* */

@Entity('admin_menu') // 和 admin_menu 表建立映射关系
export class Menu {
  @PrimaryGeneratedColumn() // 主键自增, 不能是普通的@Column
  id: number

  @Column()
  // @Unique(['path'])
  path: string // path 可以重复

  @Column()
  @Unique(['name']) // 组件名称字段name 是唯一性的
  name: string

  @Column()
  redirect: string // 重定向

  @Column()
  meta: string // 路由的 meta 是个对象, mysql 则用 json 字符串存储

  @Column()
  pid: number // 父级菜单,解决路由的 children的问题

  @Column({ default: 1 }) //
  active: number //当前菜单是否可用 1-可用, 0-不可用
}
