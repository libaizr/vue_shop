import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/Login.vue'


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: () => import('../views/Home/Home.vue')
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// 判断是否携带token访问下一个路由
router.beforeEach((to, from, next) => {
  if (to.path === '/login')
    return next();
  const tokenStr = sessionStorage.getItem('token')
  // 若无token，则强制跳转登陆页
  if (!tokenStr) return next('/login')
  next()
})

export default router
