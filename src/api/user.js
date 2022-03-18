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
