//封装所有用户相关的网络请求
import request from '@/utils/request'

//用户登录
function userLogin({ username, password }) {
  return request({
    url: 'login',
    method: 'post',
    data: {
      username: username,
      password: password
    }
  })
}

//获取用户左侧菜单权限的列表
function getMenus() {
  return request({
    url: 'menus',
    method: 'get'
  })
}

//用户列表数据
function getUsers({ query, pagenum, pagesize }) {
  return request({
    url: 'users',
    method: 'get',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

//修改用户状态
function changeStatus(uId, type) {
  return request({
    url: `users/${uId}/state/${type}`,
    method: 'put'
  })
}

//删除用户
function delUser(id) {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}

//新增用户
function addUser({ username, password, email, mobile }) {
  return request({
    url: 'users',
    method: 'post',
    data: {
      username,
      password,
      email: '' || email,
      mobile: '' || mobile
    }
  })
}

//根据id获取用户信息
function getUserInfo(id) {
  return request({
    url: `users/${id}`,
    method: 'get'
  })
}

//编辑用户提交
function updateUserInfo({ id, email, mobile }) {
  return request({
    url: `users/${id}`,
    method: 'put',
    data: {
      email: '' || email,
      mobile: '' || mobile
    }
  })
}

//分配用户角色
function assignRole(id, { rid }) {
  return request({
    url: `users/${id}/role`,
    method: 'put',
    data: {
      rid
    }
  })
}

//根据角色id查询角色信息
function getRoleInfo(roleId) {
  return request({
    url: `roles/${roleId}`,
    method: 'get'
  })
}

//用户角色列表
function getUserRole() {
  return request({
    url: 'roles',
    method: 'get'
  })
}

//添加用户角色
function addRole({ roleName, roleDesc }) {
  return request({
    url: 'roles',
    method: 'post',
    data: {
      roleName,
      roleDesc: '' || roleDesc
    }
  })
}

//编辑提交角色
function updateRoles(rid, { roleName, roleDesc }) {
  return request({
    url: `roles/${rid}`,
    method: 'put',
    data: {
      roleName,
      roleDesc: '' || roleDesc
    }
  })
}

//删除角色
function deleteRole(rid) {
  return request({
    url: `roles/${rid}`,
    method: 'delete'
  })
}

//所有权限列表
function getAllRoles(type) {
  return request({
    url: `rights/${type}`,
    method: 'get'
  })
}

//角色授权
// function setRoles({ rid, rids }) {
//   return request.post(`roles/${rid}/rights`, {
//     rids
//   })
// }
function setRoles(rid, rids) {
  return request({
    url: `roles/${rid}/rights`,
    method: 'post',
    data: {
      rids
    }
  })
}

//删除角色指定权限
function delUserRole(roleId, rightId) {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

//暴露pai
export {
  userLogin,
  getMenus,
  getUsers,
  changeStatus,
  delUser,
  addUser,
  getUserInfo,
  updateUserInfo,
  getUserRole,
  assignRole,
  getRoleInfo,
  addRole,
  updateRoles,
  deleteRole,
  getAllRoles,
  setRoles,
  delUserRole
}
