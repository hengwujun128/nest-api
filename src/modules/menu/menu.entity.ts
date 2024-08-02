import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('admin_menu') // 和 admin_menu 表建立映射关系
export class Menu {
  @PrimaryGeneratedColumn() // 主键自增, 不能是普通的@Column
  id: number
  // @Column() // 和数据表字段 username 建立映射关系
  // @Unique(['username']) // 数据表字段username 是唯一性的
  // username: string
  // @Column()
  // password: string
  // @Column()
  // role: string
  // @Column()
  // nickname: string
  // @Column()
  // avatar: string
  // @Column()
  // active: boolean
}
