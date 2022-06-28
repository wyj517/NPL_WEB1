import request from '@/utils/request'
// 返回语料库结果列表
export function getData(data) {
  return request({
    url: '/corpus/get_corpus',
    method: 'post',
    data
  })
}
// 返回语料库结果列表
export function update(data) {
  return request({
    url: '/corpus/update_corpus',
    method: 'post',
    data
  })
}
// 获取最终标签下拉列表
export function getManual(data) {
  return request({
    url: '/corpus/get_manual_tags',
    method: 'post',
    data
  })
}
