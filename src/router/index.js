import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Cart = () => import('views/cart/Cart.vue')
const CateGory = () => import('views/category/CateGory.vue')
const ProFile = () => import('views/profile/ProFile.vue')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/shopcart', component: Cart },
  { path: '/category', component: CateGory },
  { path: '/profile', component: ProFile },

  // 详情页
  { path: '/detail/:id', component: Detail }
]

const router = new VueRouter({
  routes
  // mode: 'history'
})

export default router
