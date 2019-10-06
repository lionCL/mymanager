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

//暴露pai
export { userLogin, getMenus, getUsers, delUser, addUser, getUserInfo, updateUserInfo }
