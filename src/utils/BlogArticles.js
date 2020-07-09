import request from '@/utils/request'


// 七牛云上传图片
export function uploadImg(file) {
  return request({
    url: '/blog-articles/uploadImg',
    method: 'post',
    params: file
  })
}

// 删除七牛云图片
export function deletePhoto(fileName) {
  return request({
    url: '/blog-articles/deletePhoto/'+fileName,
    method: 'delete',
  })
}


// 新增文章
export function addArticle(data) {
  return request({
    url: '/blog-articles/addArticle',
    method: 'post',
    data
  })
}

// 查询文章部分属性
export function findPart(page,limit) {
  return request({
    url: '/blog-articles/findPart/'+page+"/"+limit,
    method: 'get'
  })
}

// 查询文章内容
export function findContent(articleContentId) {
  return request({
    url: '/blog-articles/findContent/'+articleContentId,
    method: 'get'
  })
}

// 修改文章
export function updateArticle(data) {
  return request({
    url: '/blog-articles/updateArticle',
    method: 'put',
    data
  })
}
// 修改文章
export function deleteArticle(articlId,articleContentId) {
  return request({
    url: '/blog-articles/deleteArticle/'+articlId+"/"+articleContentId,
    method: 'delete'
  })
}

