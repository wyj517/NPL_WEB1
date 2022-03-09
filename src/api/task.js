import request from '@/utils/request'

// 任务列表
export function taskList(data) {
  return request({
    url: '/nlp/task/get_task',
    method: 'post',
    data
  })
}

// 返回任务细节
export function detail(data) {
  return request({
    url: '/nlp/task/get_task_detail',
    method: 'post',
    data
  })
}

// 创建任务
export function create(data) {
  return request({
    url: '/nlp/task/create_task',
    method: 'post',
    data
  })
}
