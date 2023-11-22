import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

/*将axios注册为app的全局属性*/
app.config.globalProperties.$axios = axios

app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')

/** 路由权限配置 */
router.beforeEach((to) => {
  //to:到哪儿去
  //from:从哪儿来
  if (to.path.indexOf('login') < 0 && to.path.indexOf('signup') < 0) {
    var user = localStorage.getItem('userInfo')
    if (!user) {
      ElMessage({
        message: '您还没有登录，请先登录！',
        type: 'error',
      })
      return { path: '/login' }
    }
  }
})
