<template>
  <el-container class="layout">
    <el-aside width="240px">
      <el-menu
        class="aside-menu"
        mode="vertical"
        active-text-color="#ffd04b"
        background-color="#282c34"
        text-color="#fff"
        :default-active="$route.path"
        router
      >
        <el-menu-item
          index="/admin/user"
          v-if="isAdministrator"
        >
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item
          index="/admin/book"
          v-if="isAdministrator"
        >
          <el-icon><Setting /></el-icon>
          <span>图书管理</span>
        </el-menu-item>
        <el-menu-item
          index="/order"
          v-else
        >
          <el-icon><Notebook /></el-icon>
          <span>预定图书</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="layout-main">
      <el-header class="header">
        <el-text size="large">图书管理系统</el-text>
        <el-dropdown>
          <span class="dropdown-link">
            {{ username }}
            <el-icon class="dropdown-link-icon">
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changePwd">修改密码</el-dropdown-item>
              <el-dropdown-item
                divided
                @click="logOut"
              >
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <div class="main-layout">
          <router-view class="main-view"></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
  import router from '@/router'
  import { authStore } from '@/store/modules/authStore'
  import { User, Notebook, Setting } from '@element-plus/icons-vue'

  /** 菜单授权 */
  const store = authStore()
  const isAdministrator = store.isAdministrator

  /** 获取用户名 */
  const username = store.user.username

  /** 修改密码 */
  const changePwd = () => {
    router.push('/changepass')
  }

  /** 退出登录 */
  const logOut = () => {
    store.user = null
    router.push('/login')
  }
</script>

<style scoped>
  .layout {
    width: 100%;
    height: 100%;
  }

  .layout-main {
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .aside-menu {
    width: 100%;
    height: 100%;
  }

  .header {
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dcdfe6;
  }

  .main {
    width: 100%;
    height: 95%;
    background-color: #f0f2f5;
  }

  .main-layout {
    height: 100%;
    width: 100%;
    border-radius: 15px;
    background-color: #ffffff;
  }

  .main-view {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
  }

  .dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .dropdown-link:focus {
    outline: none;
  }

  .dropdown-link-icon {
    margin-left: 8px;
  }

  .el-icon {
    margin-right: 15px !important;
  }
</style>
