<template>
  <div class="layout">
    <div class="container">
      <div class="signup-text">
        <el-text class="signup-text-con">图书管理系统-注册</el-text>
      </div>
      <div class="signup-form">
        <el-form
          ref="userFormRef"
          label-position="right"
          label-width="70"
          :model="userForm"
          :rules="rules"
          hide-required-asterisk
          size="large"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="userForm.username"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="userForm.password"
              clearable
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="submit-btn">
        <el-button
          type="primary"
          size="large"
          class="btn"
          @click="$router.push('/login')"
        >
          登录
        </el-button>
        <el-button type="primary" size="large" class="btn" @click="onSignup">
          注册
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'

  const userFormRef = ref('')

  const userForm = reactive({
    username: '',
    password: '',
  })

  const rules = reactive({
    username: {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur',
      },
      {
        min: 4,
        message: '密码不能少于4位',
        trigger: 'blur',
      },
    ],
  })

  /** 注册 */
  const onSignup = () => {
    console.log(userForm)
  }
</script>

<style scoped>
  .layout {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #b0c4de;
  }

  .container {
    width: 450px;
    height: 400px;
    background-color: #ffffff;
    border-radius: 25px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .signup-text-con {
    font-size: 24px;
  }

  .signup-form {
    width: 85%;
  }

  .el-form-item {
    margin: 40px auto;
  }

  .submit-btn {
    display: flex;
    justify-content: space-evenly;
  }

  .submit-btn .btn {
    width: 150px;
  }
</style>
