/*
 * @Author: 张泽全 hengwujun128@gmail.com
 * @Date: 2024-10-08 17:28:22
 * @LastEditors: 张泽全 hengwujun128@gmail.com
 * @LastEditTime: 2024-10-28 19:31:48
 * @FilePath: /nest-vben-admin/src/common/entities/base.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Column, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

export class BaseEntity {
  /* 创建时间 */
  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  @ApiHideProperty()
  createTime: Date | string

  /* 更新时间 */
  @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
  @ApiHideProperty()
  updateTime: Date | string

  /* 创建人 */
  @Column({ name: 'create_by', comment: '创建人', length: 30, default: '' })
  @ApiHideProperty()
  createBy: string

  /* 更新人 */
  @Column({ name: 'update_by', comment: '更新人', length: 30, default: '' })
  @ApiHideProperty()
  updateBy: string

  /* 备注 */
  @Column({ name: 'remark', comment: '备注', default: '' })
  remark?: string

  /* 版本号（首次插入或更新时会自增） */
  @VersionColumn({ name: 'version', comment: '版本号', select: false })
  @ApiHideProperty()
  version?: number

  //0正常 1停用
  @ApiProperty({ type: Number, description: '状态' })
  @Column({ type: 'number', name: 'status', default: 0, length: 1, comment: '状态' })
  public status: number

  //0代表存在 1代表删除
  @ApiProperty({ type: Number, description: '删除标志' })
  @Column({ type: 'number', name: 'del_flag', default: 0, length: 1, comment: '删除标志' })
  public delFlag: number
}
