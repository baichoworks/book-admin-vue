<template>
  <div class="container">
    <div class="table-header">
      <el-input
        v-model="search"
        placeholder="请输入搜索的书名"
      />
      <el-button
        class="header-btn"
        type="primary"
        @click="searchData"
      >
        搜索
      </el-button>
      <el-button
        class="header-btn"
        type="primary"
        @click="openDialog"
      >
        订阅图书
      </el-button>
    </div>
    <el-table
      class="table"
      :data="tableData.value"
      table-layout="fixed"
      highlight-current-row
    >
      <el-table-column
        label="书名"
        prop="bname"
      />
      <el-table-column
        label="作者"
        prop="bauthor"
      />
      <el-table-column
        label="出版社"
        prop="bpublisher"
      />
      <el-table-column label="是否订阅">
        <el-tag
          type="success"
          size="large"
        >
          是
        </el-tag>
      </el-table-column>
      <el-table-column align="right">
        <template #default="scope">
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确定退订吗?"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button type="danger">退订</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog
      v-model="isShowDialog"
      title="订阅图书"
      width="25%"
      center
      align-center
      @closed="closeDialog"
    >
      <el-form
        ref="addUserFormRef"
        label-position="right"
        :model="addOrderBookForm"
        :rules="rules"
        hide-required-asterisk
        size="large"
      >
        <el-form-item
          label="图书名称"
          prop="orderBookOption"
        >
          <el-select
            v-model="orderBookOptionID"
            placeholder="请选择图书"
            style="width: 100%"
          >
            <el-option
              v-for="item in orderBookOptions.value"
              :key="item.id"
              :label="item.bname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">返回</el-button>
          <el-button
            type="primary"
            @click="handleOrder"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { reactive, ref, computed, watch, onMounted } from 'vue'
  import { InfoFilled } from '@element-plus/icons-vue'
  import { orderStore } from '@/store/modules/orderStore'
  import { authStore } from '@/store/modules/authStore'

  const store = orderStore()
  const useAuthStore = authStore()

  const tableData = reactive([])

  /** 获取用户所有订阅图书数据 */
  const getOrderBookByUser = async () => {
    await store.getOrderBookByUser(useAuthStore.user)
    tableData.value = store.orderBook
  }

  /** 过滤器 */
  const search = ref('')

  const searchData = () => {
    const filterData = computed(() =>
      store.orderBook.filter(
        data =>
          !search.value ||
          data.bname.toLowerCase().includes(search.value.toLowerCase())
      )
    )
    tableData.value = filterData.value
  }

  /** 表单项 */
  const addOrderBookForm = reactive({
    uid: '',
    bid: '',
  })

  const rules = reactive({
    orderBookOption: {
      required: true,
      message: '请选择图书',
      trigger: 'blur',
    },
  })

  /** 对话框 */
  const isShowDialog = ref(false)
  const orderBookOptionID = ref('')
  const orderBookOptions = reactive([])

  /** 关闭对话框 */
  const closeDialog = () => {
    orderBookOptionID.value = ''
    isShowDialog.value = false
  }

  /** 打开对话框 */
  const openDialog = async () => {
    await store.getAvailableBook()
    orderBookOptions.value = store.availableBook
    isShowDialog.value = true
  }

  /** 添加订阅 */
  const handleOrder = async () => {
    addOrderBookForm.uid = useAuthStore.user.id
    addOrderBookForm.bid = orderBookOptionID.value
    await store.addOrderBookWithUser(addOrderBookForm)
    await store.getOrderBookByUser(useAuthStore.user)
    isShowDialog.value = false
  }

  /** 删除订阅 */
  const handleDelete = async (index, row) => {
    await store.deleteOrderBook(row)
    await store.getOrderBookByUser(useAuthStore.user)
  }

  /** 挂载后事件 */
  onMounted(() => {
    getOrderBookByUser()
  })

  /** 监听事件 */
  watch(
    () => store.orderBook,
    (newVal, oldVal) => {
      tableData.value = newVal
    },
    {
      immediate: true,
    }
  )
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
  }

  .table-header {
    width: 500px;
    display: flex;
    flex-direction: row;
  }

  .table {
    width: 100%;
  }

  .header-btn {
    margin-left: 10px;
  }

  .select-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
