import request from '@/utils/request'

// 任务列表
export function taskList(params) {
  return request({
    url: '/nlp/task/get_task',
    params
  })
}

// 返回任务细节
export function detail(id) {
  return request({
    url: '/nlp/task/get_task_detail',
    id
  })
}

// 创建任务
export function create(data) {
  return request({
    url: '/nlp/task/create_task',
    data
  })
}

// 删除数据集
// export function list (params) {
//   return request({
//     url: '/nlp/task/get_task',
//     params
//   })
// }
