/*
 * @Author: 张泽全 hengwujun128@gmail.com
 * @Date: 2024-10-28 19:50:52
 * @LastEditors: 张泽全 hengwujun128@gmail.com
 * @LastEditTime: 2024-10-28 19:51:11
 * @Description:
 * @FilePath: /nest-vben-admin/src/common/constant/index.ts
 */
/**
 * 登录用户 redis key 过期时间
 * 24h
 */
export const LOGIN_TOKEN_EXPIRESIN = 1000 * 60 * 60 * 24

/**
 * 用户类型
 * 00系统用户,10自定义用户
 */
export const enum SYS_USER_TYPE {
  SYS = '00',
  CUSTOM = '10',
}
