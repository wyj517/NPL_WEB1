import request from '@/utils/request'

export function getApi(url,data,method ="post"){
  return request({
    url,
    method,
    data
  })
}

// 返回数据源清单
export function sourceList(data) {
  return request({
    url: '/ds/get_ds',
    method: 'post',
    data
  })
}

// 新增数据源
export function sourceCreate(data) {
  return request({
    url: '/ds/create_ds',
    method: 'post',
    data
  })
}

// 获取数据源详情
export function sourceDetail(data) {
  return request({
    url: '/ds/get_ds_detail',
    method: 'post',
    data
  })
}

// 编辑数据源
export function sourceUpdate(data) {
  return request({
    url: '/ds/update_ds_detail',
    method: 'post',
    data
  })
}

// 删除数据源
export function sourceRemove(data) {
  return request({
    url: '/ds/delete_ds',
    method: 'post',
    data
  })
}

// 测试数据源连接
export function sourceTest(data) {
  return request({
    url: '/ds/test_ds',
    method: 'post',
    data
  })
}
