import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/layouts/Home.vue'
import Login from '@/views/common/Login.vue'
import Signup from '@/views/common/Signup.vue'
import UserManage from '@/views/admin/UserManage.vue'
import BookManage from '@/views/admin/BookManage.vue'
import OrderManage from '@/views/admin/OrderManage.vue'
import NotFound from '@/views/common/404.vue'

const routes = [
  {
    path: '/admin',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/admin/user',
        component: UserManage,
      },
      {
        path: '/admin/book',
        component: BookManage,
      },
      {
        path: '/admin/order',
        component: OrderManage,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error404',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
