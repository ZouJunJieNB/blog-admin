import request from '@/utils/request'


// 分页查询标签
export function updateUser(data) {
  return request({
    url: '/blog-user/updateUser',
    method: 'put',
    data
  })
}
