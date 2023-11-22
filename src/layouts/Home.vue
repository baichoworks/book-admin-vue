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
        <el-menu-item index="/admin/user">
          <el-icon><user /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/book">
          <el-icon><setting /></el-icon>
          <span>图书管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/order">
          <el-icon><search /></el-icon>
          <span>查询预约</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="layout-main">
      <el-header class="header">
        <el-text size="large">图书管理系统</el-text>
        <el-dropdown>
          <span class="dropdown-link">
            {{ userInfo.username }}
            <el-icon class="dropdown-link-icon">
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <div class="main-layout">
          <router-view class="main-view" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
  import { User, Search, Setting } from '@element-plus/icons-vue'

  const userInfo = {
    username: 'admin',
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f5;
  }

  .main-layout {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background-color: #ffffff;
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
