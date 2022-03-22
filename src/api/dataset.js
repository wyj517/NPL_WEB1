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

// 新增编辑数据集 type0 新增，type1 编辑
export function setAddEditor(data,type) {
  let modeUrl = !type?"create_datas":"update_datas_detail"
  return request({
    url: '/datas/'+modeUrl,
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

//创建任务
export function createTask(data) {
  return request({
    url: '/task/create_task',
    method: 'post',
    data
  })
}
//任务类型下拉拦
export function getType(data) {
  return request({
    url: '/task/get_task_type',
    method: 'post',
    data
  })
}
