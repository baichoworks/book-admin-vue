import axios from 'axios'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

export const authStore = defineStore('authStore', {
  state: () => ({
    // 用户信息
    user: null,
  }),
  getters: {
    isAuthenticated: state => !!state.user,
    isAdministrator: state => state.user.role === 'admin',
  },
  actions: {
    /** 登录 */
    async login(params) {
      try {
        const record = await axios.post('/api/user/login', params)
        const response = record.data
        if (response.success) {
          this.user = response.data
          ElMessage.success(response.message)
        } else {
          ElMessage.error(response.message)
        }
        return response.success
      } catch (error) {
        ElMessage.error(error)
        return false
      }
    },
  },
  /** 数据持久化 */
  persist: true,
})
