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
        @click="handleAdd"
      >
        添加图书
      </el-button>
    </div>
    <el-table
      class="table"
      :data="tableData.value"
      table-layout="fixed"
      highlight-current-row
    >
      <el-table-column
        label="ID"
        prop="id"
      />
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
      <el-table-column label="是否可用">
        <template #default="scope">
          <el-tag
            v-if="scope.row.available === 0"
            type="danger"
            size="large"
          >
            否
          </el-tag>
          <el-tag
            v-else
            type="success"
            size="large"
          >
            是
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #default="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确定删除吗?"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑图书 -->
    <EditBook
      ref="editDialogRef"
      :editData="editData"
    ></EditBook>
  </div>
</template>

<script setup>
  import EditBook from '@/components/book/EditBook.vue'
  import { reactive, ref, computed, watch, onMounted } from 'vue'
  import { InfoFilled } from '@element-plus/icons-vue'
  import { bookStore } from '@/store/modules/bookStore'

  /** 组件Ref */
  const editDialogRef = ref(Boolean)

  const store = bookStore()

  const tableData = reactive([])

  /** 获取所有图书数据 */
  const getAllBookData = async () => {
    await store.getAllBook()
    tableData.value = store.bookData
  }

  /** 过滤器 */
  const search = ref('')

  const searchData = () => {
    const filterData = computed(() =>
      store.bookData.filter(
        data =>
          !search.value ||
          data.bname.toLowerCase().includes(search.value.toLowerCase())
      )
    )
    tableData.value = filterData.value
  }

  /** 添加 */
  const handleAdd = () => {
    editDialogRef.value.isEdit = false
    editDialogRef.value.isShowEditDialog = true
  }

  /** 编辑 */
  const editData = ref(Object)

  const handleEdit = (index, row) => {
    editData.value = row
    editDialogRef.value.isEdit = true
    editDialogRef.value.isShowEditDialog = true
  }

  /** 删除 */
  const handleDelete = async (index, row) => {
    await store.deleteBook(row)
    store.getAllBook()
  }

  /** 挂载后事件 */
  onMounted(() => {
    getAllBookData()
  })

  /** 监听事件 */
  watch(
    () => store.bookData,
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
</style>
