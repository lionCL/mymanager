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

//暴露pai
export { userLogin, getMenus, getUsers }
