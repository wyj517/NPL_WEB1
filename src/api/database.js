import request from '@/utils/request'

//返回数据源清单
export function list (params) {
  return request({
    url: '/nlp/ds/get_ds',
    params
  })
}
//新增数据源
export function create (data) {
  return request({
    url: '/nlp/ds/create_ds',
    data,
    method: 'post'
  })
}

//获取数据源详情
export function detail (data) {
  return request({
    url: '/nlp/ds/get_ds_detail',
    data,
    method: 'post'
  })
}
//编辑数据源
export function update (data) {
  return request({
    url: '/nlp/ds/update_ds_detail',
    data,
    method: 'post'
  })
}
//删除数据源
export function remove (data) {
  return request({
    url: '/nlp/ds/delete_ds',
    data,
    method: 'POST'
  })
}
