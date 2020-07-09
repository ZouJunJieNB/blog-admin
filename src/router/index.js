import Vue from 'vue'
import VueRouter from 'vue-router'


// 登陆界面
const Login = () => import('@/views/login')
// 主页
const Home = () => import('@/views/home')
// 首页
const blogIndex = () => import('@/components/main/blogIndex')
// 发布文章
const pushArticle = () => import('@/components/main/pushArticle')
// 分类管理
const blogClassify = () => import('@/components/main/blogClassify')
// 标签管理
const blogLabel = () => import('@/components/main/blogLabel')
// 个人资料
const personal = () => import('@/components/main/personal')


// 挂载vue
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    path: '/',
    name: 'login',
    component: Login
}, {
    path: '/home',
    name: 'home',
    component: Home,
    children:[
        {
            // 进入父路由触发子路由
            path: '/home',
            name: 'blogIndex',
            component: blogIndex
        },{
            path: '/blogClassify',
            name: 'blogClassify',
            component: blogClassify
        },{
            path: '/pushArticle',
            name: 'pushArticle',
            component: pushArticle
        },{
            path: '/blogLabel',
            name: 'blogLabel',
            component: blogLabel
        },{
            path: '/personal',
            name: 'personal',
            component: personal
        }
    ]
}]




export default new VueRouter({
    mode: 'history',
    base: '/',
    routes
})