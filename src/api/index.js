// 四个模块接口的请求函数统一暴露，并在main.js中挂在载到全局，方面在任意组件中使用
import * as trademark from './product/tradeMark'
import * as attr from './product/attr'
import * as spu from './product/spu'
import * as sku from './product/sku'

// 引入权限相关的接口文件
import * as user from './acl/user'
import * as role from './acl/role'
import permission from './acl/permission'

// 对外暴露
export default {
  trademark,
  attr,
  sku,
  spu,
  user,
  role,
  permission
}
