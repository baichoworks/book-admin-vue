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
              添加用户
            </el-button>
          </div>
        </template>
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
    <!-- 编辑用户 -->
    <EditUser
      ref="editDialogRef"
      :editData="editData"
    ></EditUser>
  </div>
</template>

<script setup>
  import { reactive, ref, computed, watch, onMounted } from 'vue'
  import { userStore } from '@/store/modules/userStore'
  import EditUser from '@/components/user/EditUser.vue'
  import { InfoFilled } from '@element-plus/icons-vue'

  /** 组件Ref */
  const editDialogRef = ref(Boolean)

  const store = userStore()

  const tableData = reactive([])

  /** 获取所有用户数据 */
  const getAllUserData = async () => {
    await store.getAllUser()
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
    await store.deleteUser(row)
    store.getAllUser()
  }

  /** 挂载后事件 */
  onMounted(() => {
    getAllUserData()
  })

  /** 监听事件 */
  watch(
    () => store.userData,
    (newVal, oldVal) => {
      tableData.value = newVal
    },
    {
      immediate: true,
    }
  )
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

  .header-btn {
    margin-left: 10px;
  }

  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
