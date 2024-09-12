/**
 * 1. 就是定义数据表, 映射数据表
 * 2. TypeOrm.Entity 建立和表绑定关系,TypeOrm.Column 建立和字段的绑定关系
 * 3. PrimaryGeneratedColumn 主键自增; Unique 唯一
 * 4. 和 java 类似
 */

import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('admin_user') // 和 admin_user 表建立映射关系
export class User {
  @PrimaryGeneratedColumn() // 主键自增, 不能是普通的@Column
  id: number

  @Column() // 和数据表字段 username 建立映射关系
  @Unique(['username']) // 数据表字段username 是唯一性的
  username: string

  @Column()
  password: string

  @Column()
  roles: string

  @Column()
  nickname: string

  @Column({ default: '' })
  avatar: string

  @Column({ default: 1 })
  active: number
}
