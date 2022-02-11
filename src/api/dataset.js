import request from '@/utils/request'

// 返回数据集清单
export function setList(params) {
  return request({
    url: '/nlp/datas/get_datas',
    params
  })
}

// 编辑数据集
export function detail(params) {
  return request({
    url: '/nlp/datas/update_datas_detail',
    params
  })
}

// 新增数据集
export function create(params) {
  return request({
    url: '/nlp/datas/create_datas',
    params
  })
}

// 删除数据集
export function remove(params) {
  return request({
    url: '/nlp/datas/delete_datas',
    params
  })
}

// 新增数据集时返回数据集清单
export function setlist(params) {
  return request({
    url: '/nlp/datas/get_datas_ds',
    params
  })
}

// 新增数据集时返回schema清单
export function schema(params) {
  return request({
    url: '/nlp/datas/get_datas_schema',
    params
  })
}

// 新增数据集时返回table清单
export function table(params) {
  return request({
    url: '/nlp/datas/get_datas_table',
    params
  })
}

// 新增数据集时返回field清单
export function field(params) {
  return request({
    url: '/nlp/datas/get_datas_field',
    params
  })
}
