import axios from 'axios'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
  state: () => {
    return {
      userData: [],
    }
  },
  getters: {
    getUserData: state => {
      return state.userData
    },
  },
  actions: {
    /** 获取所有用户信息 */
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
    /** 修改用户信息 */
    async updateUser(params) {
      try {
        await axios
          .post('/api/user/updateUser', params)
          .then(record => {
            const res = record.data
            if (res.success) {
              ElMessage.success(res.message)
            } else {
              ElMessage.error(res.message)
            }
          })
          .catch(error => {
            return error
          })
      } catch (error) {
        return error
      }
    },
    /** 添加用户 */
    async addUser(params) {
      try {
        await axios
          .post('/api/user/signup', params)
          .then(record => {
            const res = record.data
            if (res.success) {
              ElMessage.success('添加成功')
            } else {
              ElMessage.error(res.message)
            }
          })
          .catch(error => {
            return error
          })
      } catch (error) {
        return error
      }
    },
    /** 删除用户 */
    async deleteUser(params) {
      try {
        await axios
          .post('/api/user/deleteUser', params)
          .then(record => {
            const res = record.data
            if (res.success) {
              ElMessage.success(res.message)
            } else {
              ElMessage.error(res.message)
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
})
