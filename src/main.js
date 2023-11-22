import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

/** el-icon */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus)

app.mount('#app')

/** 全局守卫配置 */
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('userInfo')
  if (to.path !== '/login' && to.path !== '/signup') {
    if (!user) {
      ElMessage({
        message: '您还没有登录，请先登录',
        type: 'error',
      })
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
