import request from '@/utils/request'

// 返回数据集清单
export function setList(data) {
  return request({
    url: '/nlp/datas/get_datas',
    method: 'post',
    data
  })
}

// 获取数据集详情
export function setDetail(data) {
  return request({
    url: '/nlp/datas/get_datas_detail',
    method: 'post',
    data
  })
}

// 编辑数据集
export function editor(params) {
  return request({
    url: '/nlp/datas/update_datas_detail',
    method: 'post',
    params
  })
}

// 新增数据集
export function setCreate(params) {
  return request({
    url: '/nlp/datas/create_datas',
    method: 'post',
    params
  })
}

// 删除数据集
export function setRemove(params) {
  return request({
    url: '/nlp/datas/delete_datas',
    method: 'post',
    params
  })
}

// 新增数据集时返回数据集清单
export function setDsList(params) {
  return request({
    url: '/nlp/datas/get_datas_ds',
    method: 'post',
    params
  })
}

// 新增数据集时返回schema清单
export function setSchema(params) {
  return request({
    url: '/nlp/datas/get_datas_schema',
    method: 'post',
    params
  })
}

// 新增数据集时返回table清单
export function setTable(params) {
  return request({
    url: '/nlp/datas/get_datas_table',
    method: 'post',
    params
  })
}

// 新增数据集时返回field清单
export function setField(params) {
  return request({
    url: '/nlp/datas/get_datas_field',
    method: 'post',
    params
  })
}
