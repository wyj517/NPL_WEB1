import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/nlp/account/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/nlp/account/get_my_info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/nlp/account/logout',
    method: 'post'
  })
}
