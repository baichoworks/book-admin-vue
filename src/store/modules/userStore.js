import axios from 'axios'
import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
  state: () => {
    return {
      userData: [],
    }
  },
  getters: {},
  actions: {
    async getAllUser() {
      try {
        this.userData = await axios
          .get('/api/user/getAllUser')
          .then(record => {
            const res = record.data
            if (res.success) {
              return res.data
            }
          })
          .catch(error => {
            return error
          })
      } catch (error) {
        return error
      }
    },
  },
  /** 数据持久化 */
  persist: true,
})
