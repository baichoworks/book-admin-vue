<template>
  <div class="container">
    <el-table
      class="table"
      :data="tableData.value"
      table-layout="fixed"
      style="width: 100%"
      stripe
    >
      <el-table-column
        label="ID"
        prop="id"
      />
      <el-table-column
        label="用户名"
        prop="username"
      />
      <el-table-column align="right">
        <template #header>
          <div class="table-header">
            <el-input
              v-model="search"
              placeholder="请输入搜索的用户名"
            />
            <el-button
              class="search-btn"
              type="primary"
              @click="searchData"
            >
              搜索
            </el-button>
          </div>
        </template>
        <template #default="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
  import { reactive, ref, computed, onMounted } from 'vue'
  import { userStore } from '@/store/modules/userStore'

  const store = userStore()

  /** 获取所有用户数据 */
  const tableData = reactive([])

  const getAllUser = () => {
    store.getAllUser()
    tableData.value = store.userData
  }

  /** 过滤器 */
  const search = ref('')

  const searchData = () => {
    const filterData = computed(() =>
      store.userData.filter(
        data =>
          !search.value ||
          data.username.toLowerCase().includes(search.value.toLowerCase())
      )
    )
    tableData.value = filterData.value
  }

  /** 编辑 */
  const handleEdit = (index, row) => {
    console.log(index, row)
  }

  /** 删除 */
  const handleDelete = (index, row) => {
    console.log(index, row)
  }

  /** 挂在完成后加载 */
  onMounted(() => {
    getAllUser()
  })
</script>

<style scoped>
  .table {
    width: 100%;
    height: 100%;
  }

  .table-header {
    display: flex;
    flex-direction: row;
  }

  .search-btn {
    margin-left: 10px;
  }
</style>
