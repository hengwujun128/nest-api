import * as fs from 'fs'
import * as os from 'os' // 读取用户主目录
import * as path from 'path'

export function getMySqlUserNameAndPassword() {
  const homeDir = os.homedir()
  const userNamePath = path.resolve(homeDir, '.my_config', 'userName')
  const passwordPath = path.resolve(homeDir, '.my_config', 'password')

  const userName = fs.readFileSync(userNamePath).toString().trim() // 必须 toString,否则它是 buffer 格式
  const password = fs.readFileSync(passwordPath).toString().trim() // 必须 toString,否则它是 buffer 格式

  console.log({ userName, password })
  return { userName, password }
}
