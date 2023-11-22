import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/layouts/Home.vue'
import Login from '@/views/common/Login.vue'
import Signup from '@/views/common/Signup.vue'
import UserManage from '@/views/admin/UserManage.vue'
import BookManage from '@/views/admin/BookManage.vue'
import OrderManage from '@/views/admin/OrderManage.vue'
import ChangePwd from '@/components/ChangePwd.vue'
import NotFound from '@/views/common/404.vue'

const routes = [
  {
    path: '/',
    // 重定向
    redirect: '/admin',
  },
  {
    path: '/admin',
    name: 'admin',
    component: Home,
    children: [
      {
        path: 'user',
        component: UserManage,
        name: 'user',
        meta: {
          title: '用户管理',
        },
      },
      {
        path: 'book',
        component: BookManage,
        name: 'book',
        meta: {
          title: '图书管理',
        },
      },
      {
        path: 'order',
        component: OrderManage,
        name: 'order',
        meta: {
          title: '图书预定',
        },
      },
      {
        path: 'changepass',
        component: ChangePwd,
        name: 'changepass',
        meta: {
          title: '修改密码',
        },
      },
    ],
    // 重定向
    redirect: '/admin/user',
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
