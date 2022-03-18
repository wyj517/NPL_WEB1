import request from '@/utils/request'

// 返回数据集清单
export function setList(data) {
  return request({
    url: '/datas/get_datas',
    method: 'post',
    data
  })
}

// 获取数据集详情
export function setDetail(data) {
  return request({
    url: '/datas/get_datas_detail',
    method: 'post',
    data
  })
}

// 编辑数据集
export function setEditor(data) {
  return request({
    url: '/datas/update_datas_detail',
    method: 'post',
    data
  })
}

// 新增数据集
export function setCreate(data) {
  return request({
    url: '/datas/create_datas',
    method: 'post',
    data
  })
}

// 删除数据集
export function setRemove(data) {
  return request({
    url: '/datas/delete_datas',
    method: 'post',
    data
  })
}

// 新增数据集时返回数据集清单
export function setDsList() {
  return request({
    url: '/datas/get_datas_ds',
    method: 'post'
  })
}

// 新增数据集时返回schema清单
export function setSchema(data) {
  return request({
    url: '/datas/get_datas_schema',
    method: 'post',
    data
  })
}

// 新增数据集时返回table清单
export function setTable(data) {
  return request({
    url: '/datas/get_datas_table',
    method: 'post',
    data
  })
}

// 新增数据集时返回field清单
export function setField(data) {
  return request({
    url: '/datas/get_datas_field',
    method: 'post',
    data
  })
}
