/**
 * 1. 中间表 ,两个主键 roleId,menuId ;
 * 2. 多对多关系
 */

import { Entity, PrimaryColumn } from 'typeorm'

@Entity('role_menu') // 和 admin_role 表建立映射关系
export class RoleMenu {
  // @PrimaryGeneratedColumn() // 主键自增, 不能是普通的@Column
  @PrimaryColumn() // @PrimaryColumn() 主键, 但不是自增
  roleId: number

  @PrimaryColumn()
  menuId: number
}
