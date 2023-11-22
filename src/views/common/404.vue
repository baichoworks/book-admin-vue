<template>
  <div class="layout">
    <div class="container">
      <el-empty class="notFound" description="您访问的页面不存在">
        <el-button class="back-btn" type="primary" size="large" @click="back">
          返&nbsp;&nbsp;回
        </el-button>
      </el-empty>
    </div>
  </div>
</template>

<script setup>
  import router from '@/router'

  /** 返回 */
  const back = () => {
    router.back(-1)
  }
</script>

<style scoped>
  .layout {
    width: 100%;
    height: 100%;
    background-color: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    width: 60%;
    height: 80%;
    background-color: #ffffff;
    border-radius: 25px;
  }

  .notFound {
    width: 100%;
    height: 100%;
  }

  .back-btn {
    width: 200px;
  }
</style>
