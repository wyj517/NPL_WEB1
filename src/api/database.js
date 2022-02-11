import request from '@/utils/request'

// 返回数据源清单
export function sourceList(params) {
  return request({
    url: '/nlp/ds/get_ds',
    params
  })
}

// 新增数据源
export function sourceCreate(data) {
  return request({
    url: '/nlp/ds/create_ds',
    data
  })
}

// 获取数据源详情
export function sourceDetail(data) {
  return request({
    url: '/nlp/ds/get_ds_detail',
    data
  })
}

// 编辑数据源
export function sourceUpdate(data) {
  return request({
    url: '/nlp/ds/update_ds_detail',
    data
  })
}

// 删除数据源
export function sourceRemove(data) {
  return request({
    url: '/nlp/ds/delete_ds',
    data
  })
}

// 测试数据源连接
export function sourceTest(data) {
  return request({
    url: '/nlp/ds/test_ds',
    data
  })
}
