import request from '@/utils/request'


// 分页查询标签
export function findLabel(page, limit) {
  return request({
    url: '/blog-label/findLabel/' + page + "/" + limit,
    method: 'get'
  })
}

// 新增标签
export function addLabel(labelName) {
  return request({
    url: '/blog-label/addLabel',
    method: 'post',
    params: { "labelName": labelName }
  })
}

// 删除标签
export function deleteLabel(labelId) {
  return request({
    url: '/blog-label/deleteLabel/' + labelId,
    method: 'delete'
  })
}