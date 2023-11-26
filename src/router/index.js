import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/layouts/Home.vue'
import Login from '@/views/common/Login.vue'
import Signup from '@/views/common/Signup.vue'
import UserManage from '@/views/admin/UserManage.vue'
import BookManage from '@/views/admin/BookManage.vue'
import ChangePwd from '@/components/ChangePwd.vue'
import Order from '@/views/common/Order.vue'
import NotFound from '@/views/common/404.vue'
import { authStore } from '@/store/modules/authStore'
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      requiresAuth: true,
    },
    redirect: '/order',
    children: [
      {
        path: 'order',
        component: Order,
        name: 'order',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: Home,
    meta: {
      title: '后台管理',
      requiresAuth: true,
      requiresAdmin: true,
    },
    redirect: '/admin/user',
    children: [
      {
        path: 'user',
        component: UserManage,
        name: 'userManage',
      },
      {
        path: 'book',
        component: BookManage,
        name: 'bookManage',
      },
    ],
  },
  {
    path: '/changepass',
    component: Home,
    children: [
      {
        path: '',
        component: ChangePwd,
        name: 'changePassword',
        meta: {
          title: '修改密码',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      title: '注册',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error404',
    component: NotFound,
    meta: {
      title: '404',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

/** 全局守卫配置 */
router.beforeEach((to, from, next) => {
  const store = authStore()
  // 用户未认证且尝试访问需要认证的页面
  if (
    to.matched.some(
      record => record.meta.requiresAuth && !store.isAuthenticated
    )
  ) {
    ElMessage.error('您还没有登录，请先登录')
    next('/login')
    return
  }
  // 用户不是管理员但尝试访问需要管理员权限的页面
  if (
    to.matched.some(
      record => record.meta.requiresAdmin && !store.isAdministrator
    )
  ) {
    ElMessage.error('无权访问该页面')
    next('/')
    return
  }
  // 已认证的管理员尝试访问普通用户页面
  if (
    store.isAuthenticated &&
    store.isAdministrator &&
    to.path === '/subscribe'
  ) {
    next('/admin')
    return
  }
  // 动态标题
  document.title = to.meta.title || '图书管理系统'
  // 其他情况，继续路由导航
  next()
})
