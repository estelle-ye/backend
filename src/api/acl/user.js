import request from '@/utils/request'

const userList = '/admin/acl/user'

// 登录
export function login({ username, password }) {
  return request({
    url: 'admin/acl/index/login',
    method: 'post',
    data: { username, password }
  })
}

// 获取(登陆者)用户信息
export function getInfo() {
  return request({
    url: '/admin/acl/index/info',
    method: 'get'
  })
}

// 获取后台用户分页列表(带搜索)
export function getPageList(page, limit, searchObj) {
  return request({
    url: `${userList}/${page}/${limit}`,
    method: 'get',
    params: searchObj
  })
}

// 添加新用户
export function add(form) {
  return request({
    url: `${userList}/save`,
    method: 'post',
    data: form

  })
}

// 更新用户信息
export function update(form) {
  return request({
    url: `${userList}/update`,
    method: 'put',
    data: form
  })
}

// 删除用户
export function removeById(id) {
  return request({
    url: `${userList}/remove/${id}`,
    method: 'delete'
  })
}

/*
批量删除多个用户
ids的结构: ids是包含n个id的数组
*/
export function removeUsers(ids) {
  return request({
    url: `${userList}/batchRemove`,
    method: 'delete',
    data: ids
  })
}

/*
获取某个用户的所有角色
*/
export function getRoles(userId) {
  return request({
    url: `${userList}/toAssign/${userId}`,
    method: 'get'
  })
}

/*
给某个用户分配角色
roleId的结构: 字符串, 'rId1,rId2,rId3'
*/

export function assignRoles(userId, roleId) {
  return request({
    url: `${userList}/doAssign`,
    method: 'post',
    params: {
      userId,
      roleId
    }
  })
}

