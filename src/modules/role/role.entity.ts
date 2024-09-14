/**
 * 1. 就是定义数据表, 映射数据表
 * 2. TypeOrm.Entity 建立和表绑定关系,TypeOrm.Column 建立和字段的绑定关系
 * 3. PrimaryGeneratedColumn 主键自增; Unique 唯一
 * 4. 和 java 类似
 */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('admin_role') // 和 admin_role 表建立映射关系
export class Role {
  @PrimaryGeneratedColumn() // 主键自增, 不能是普通的@Column
  id: number

  @Column() // 和数据表字段 name 建立映射关系
  name: string

  @Column()
  remark: string
}
