<template>
  <div class="container">
    <el-table
      class="table"
      :data="filterTableData"
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
          <el-input
            v-model="search"
            placeholder="输入以搜索(用户名)"
          />
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
  import { computed, ref } from 'vue'

  const search = ref('')

  const filterTableData = computed(() =>
    tableData.filter(
      data =>
        !search.value ||
        data.username.toLowerCase().includes(search.value.toLowerCase())
    )
  )

  /** 编辑 */
  const handleEdit = (index, row) => {
    console.log(index, row)
  }

  /** 删除 */
  const handleDelete = (index, row) => {
    console.log(index, row)
  }

  const tableData = [
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },

    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },

    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
    {
      id: '1',
      username: 'admin',
    },
  ]
</script>

<style scoped>
  .table {
    width: 100%;
    height: 100%;
  }
</style>
