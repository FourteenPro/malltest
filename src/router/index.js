import Vue from 'vue'
import VueRouter from 'vue-router'


const originalPush = VueRouter.prototype.push   // 解决路由重复点击报错的方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const Home = () => import("views/home/Home")
const Category = () => import("views/category/Category")
const Cart = () => import("views/cart/Cart")
const Profile = () => import("views/profile/Profile")

const routes = [
    {
        path: '/',
        redirect: 'home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router