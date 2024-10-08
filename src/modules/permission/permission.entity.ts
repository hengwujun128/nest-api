/**
 * 1. 就是定义数据表, 映射数据表
 * 2. TypeOrm.Entity 建立和表绑定关系,TypeOrm.Column 建立和字段的绑定关系
 * 3. PrimaryGeneratedColumn 主键自增; Unique 唯一
 * 4. 和 java 类似
 */

import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm'

@Entity('admin_permission') // 和 admin_permission 表建立映射关系
export class Permission {
  @PrimaryGeneratedColumn() // 主键自增, 不能是普通的@Column
  id: number

  @Column()
  @Unique(['key'])
  key: string

  @Column()
  name: string

  @Column()
  remark: string
}
