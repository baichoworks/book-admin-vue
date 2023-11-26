<template>
  <div class="container">
    <el-form
      ref="changePwdFormRef"
      label-position="right"
      label-width="70"
      :model="changePwdForm"
      :rules="rules"
      hide-required-asterisk
      size="large"
      class="changePass-form"
    >
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="changePwdForm.password"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="confirmPass"
      >
        <el-input
          type="password"
          placeholder="请确认密码"
          v-model="changePwdForm.confirmPass"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onChangePass"
        >
          确认修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import router from '@/router'
  import { authStore } from '@/store/modules/authStore'
  import axios from 'axios'
  import { ElMessage } from 'element-plus'
  import { ref, reactive } from 'vue'

  const changePwdFormRef = ref('')

  const useAuthStore = authStore()

  const changePwdForm = reactive({
    password: '',
    confirmPass: '',
  })

  // 校验密码是否一致
  const equalToPassword = (rule, value, callback) => {
    if (changePwdForm.password !== value) {
      callback(new Error('两次输入的密码不一致'))
    } else {
      callback()
    }
  }

  const rules = reactive({
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
    confirmPass: [
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
      {
        required: true,
        validator: equalToPassword,
        trigger: 'blur',
      },
    ],
  })

  /** 修改密码 */
  const onChangePass = () => {
    changePwdFormRef.value.validate(validate => {
      if (validate) {
        /** 获取用户ID */
        const userID = useAuthStore.user.id
        const submitForm = {
          id: userID,
          password: changePwdForm.password,
        }
        axios
          .post('/api/user/changePass', submitForm)
          .then(record => {
            const res = record.data
            if (res.success) {
              ElMessage.success(res.message)
              useAuthStore.user = null
              router.push('/login')
            } else {
              ElMessage.error(res.message)
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    })
  }
</script>

<style scoped>
  .container {
    max-width: 500px;
  }

  .changePass-form {
    margin-top: 20px;
  }
</style>
