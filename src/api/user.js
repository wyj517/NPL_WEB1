import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/account/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/account/get_my_info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/account/logout',
    method: 'post'
  })
}

//获取角色列表
export function getRole(){
  return request({
    url: '/system/get_role_list',
    method: 'post'
  })
}
//修改或新建用户
export function addUser(data){
  return request({
    url: '/system/user_info_manage',
    method: 'post',
    data
  })
}
//新增修改角色配置信息
export function updateRole(data){
  return request({
    url: '/system/update_role_info',
    method: 'post',
    data
  })
}
//删除角色配置
export function deleteRole(data){
  return request({
    url: '/system/delete_role',
    method: 'post',
    data
  })
}
