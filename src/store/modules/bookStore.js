import axios from 'axios'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

export const bookStore = defineStore('bookStore', {
  state: () => {
    return {
      bookData: [],
    }
  },
  getters: {
    getBookData: state => {
      return state.bookData
    },
  },
  actions: {
    /** 获取所有图书信息 */
    async getAllBook() {
      try {
        this.bookData = await axios
          .get('/api/book/getAllBook')
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
    /** 修改图书信息 */
    async updateBook(params) {
      try {
        await axios
          .post('/api/book/updateBook', params)
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
    /** 添加图书 */
    async addBook(params) {
      try {
        await axios
          .post('/api/book/addBook', params)
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
    async deleteBook(params) {
      try {
        await axios
          .post('/api/book/deleteBook', params)
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
  /** 数据持久化 */
  persist: true,
})
