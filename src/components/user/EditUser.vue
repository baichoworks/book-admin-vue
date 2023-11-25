<template>
  <div class="container">
    <!-- 编辑 -->
    <template v-if="isEdit">
      <el-dialog
        v-model="isShowEditDialog"
        title="修改用户信息"
        width="25%"
        center
        align-center
        @open="getUserData"
        @close="closeDialog"
      >
        <el-form
          ref="editUserFormRef"
          label-position="right"
          :model="editUserForm"
          :rules="editRules"
          hide-required-asterisk
          size="large"
        >
          <el-form-item
            label="修改用户名"
            prop="username"
          >
            <el-input
              v-model="editUserForm.username"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="closeDialog">返回</el-button>
            <el-button
              type="primary"
              @click="onUpdate"
            >
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
    </template>
    <!-- 添加 -->
    <template v-else>
      <el-dialog
        v-model="isShowEditDialog"
        title="添加用户"
        width="25%"
        center
        align-center
        @close="closeDialog"
      >
        <el-form
          ref="addUserFormRef"
          label-position="right"
          label-width="70"
          :model="addUserForm"
          :rules="addRules"
          hide-required-asterisk
          size="large"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input
              v-model="addUserForm.username"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="addUserForm.password"
              clearable
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="closeDialog">返回</el-button>
            <el-button
              type="primary"
              @click="onAddUser"
            >
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
    </template>
  </div>
</template>
<script setup>
  import { userStore } from '@/store/modules/userStore'
  import { ref, reactive } from 'vue'

  /** 判断是否为编辑面板 */
  const isEdit = ref(Boolean)

  const store = userStore()

  /** 是否显示组件 */
  const isShowEditDialog = ref(false)

  /** 接收父组件 */
  const props = defineProps({
    editData: {
      id: String,
      username: String,
    },
  })

  /** 暴露子组件 */
  defineExpose({ isShowEditDialog, isEdit })

  /** 表单项 */
  const editUserFormRef = ref('')
  const addUserFormRef = ref('')

  const editUserForm = reactive({
    id: '',
    username: '',
  })

  const addUserForm = reactive({
    id: '',
    username: '',
    password: '',
  })

  const editRules = reactive({
    username: {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  })

  const addRules = reactive({
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

  /** 关闭窗口 */
  const closeDialog = () => {
    addUserForm.id = ''
    addUserForm.username = ''
    addUserForm.password = ''
    isShowEditDialog.value = false
  }

  /** 获取用户信息 */
  const getUserData = () => {
    editUserForm.id = props.editData.id
    editUserForm.username = props.editData.username
  }

  /** 更新用户 */
  const onUpdate = async () => {
    await store.updateUser(editUserForm)
    await store.getAllUser()
    isShowEditDialog.value = false
  }

  /** 添加用户 */
  const onAddUser = async () => {
    await store.addUser(addUserForm)
    await store.getAllUser()
    isShowEditDialog.value = false
  }
</script>
<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
