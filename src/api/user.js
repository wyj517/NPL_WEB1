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

//注册账号
export function register(data){
  return request({
    url: '/account/register',
    method: 'post',
    data
  })
}

//获取角色列表
export function getRole(){
  return request({
    url: '/system/get_role_list',
    method: 'post'
  })
}
//获取用户信息列表
export function getUser(data){
  return request({
    url: '/system/get_user_list',
    method: 'post',
    data
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
//修改用户密码
export function changePassword(data){
  return request({
    url:'/system/change_user_password',
    method:'post',
    data
  })
}
//获取组织列表
export function getOrg(data){
  return request({
    url: '/system/get_org_list',
    method: 'post',
    data
  })
}
//获取组织树
export function getOrgTree(data){
  return request({
    url: '/system/get_org_tree',
    method: 'post',
    data
  })
}

//更新用户的角色清单
export function updateUserRole(data){
  return request({
    url:'/system/update_user_roles',
    method: 'post',
    data
  })
}

