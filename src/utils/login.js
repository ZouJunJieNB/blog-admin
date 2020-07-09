import request from '@/utils/request'


// 登录
export function loginForm(username, userPassword) {
  return request({
    url: '/blog-user/login',
    method: 'post',
    params:{"username":username,"userPassword":userPassword}
  })
}

// 退出
export function logout(token) {
  return request({
    url: '/blog-user/logout',
    method: 'post',
    params:{"token":token}
  })
}