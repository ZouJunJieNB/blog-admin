import request from '@/utils/request'


// 分页查询分类
export function findClassify(page,limit) {
    return request({
      url: '/blog-classify/findClassify/'+page+"/"+limit,
      method: 'get'
    })
}

// 新增分类
export function addClassify(classifyName) {
  return request({
    url: '/blog-classify/addClassify',
    method: 'post',
    params: {"classifyName":classifyName}
  })
}

// 删除分类
export function deleteClassify(classifyId) {
  return request({
    url: '/blog-classify/deleteClassify/'+classifyId,
    method: 'delete'
  })
}