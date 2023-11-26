import axios from 'axios'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

export const orderStore = defineStore('orderStore', {
  state: () => {
    return {
      availableBook: [],
      orderBook: [],
    }
  },
  getters: {},
  actions: {
    /** 获取所有可用图书数据 */
    async getAvailableBook() {
      try {
        this.availableBook = await axios
          .get('/api/order/getAvailableBook')
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
    /** 获取用户所有订阅图书数据 */
    async getOrderBookByUser(params) {
      try {
        this.orderBook = await axios
          .post('/api/order/getOrderBookByUser', params)
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
    /** 添加图书 */
    async addOrderBookWithUser(params) {
      try {
        await axios
          .post('/api/order/addOrderBookWithUser', params)
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
    /** 删除图书 */
    async deleteOrderBook(params) {
      try {
        await axios
          .post('/api/order/deleteOrderBook', params)
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
