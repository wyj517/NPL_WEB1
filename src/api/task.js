import request from '@/utils/request'

// 任务列表
export function taskList(data) {
  return request({
    url: '/task/get_task',
    method: 'post',
    data
  })
}

// 返回任务细节
export function detail(data) {
  return request({
    url: '/task/get_task_detail',
    method: 'post',
    data
  })
}

// 创建任务
export function createTask(data) {
  return request({
    url: '/task/create_task',
    method: 'post',
    data
  })
}

//获取执行结果
export function getTaskResult(data) {
  return request({
    url: '/task/get_label',
    method: 'post',
    data
  })
}

//获取下拉classid列表
export function getClassID(data) {
  return request({
    url: '/task/get_class_ids',
    method: 'post',
    data
  })
}

//更新数据标签
export function updateLabel(data) {
  return request({
    url: '/task/update_label',
    method: 'post',
    data
  })
}
// 获取最终标签下拉列表

export function manualTags(data) {
  return request({
    url: 'task/get_manual_tags',
    method: 'post',
    data
  })
}

export function getTaskLog(data){
  return request({
    url:"/task/get_task_log",
    method:"post",
    data
  })
}
//更新任务流
export function updateTaskFlow(data){
  return request({
    url:"task/updateTaskFlow",
    method:"post",
    data
  })
}
