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
        @closed="closeDialog"
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
        @closed="closeDialog"
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
    // 遍历赋值
    Object.keys(addUserForm).forEach(key => {
      addUserForm[key] = ''
    })
    isShowEditDialog.value = false
    isEdit.value = Boolean
  }

  /** 获取用户信息 */
  const getUserData = () => {
    // 遍历赋值
    Object.keys(props.editData).forEach(key => {
      if (editUserForm.hasOwnProperty(key)) {
        editUserForm[key] = props.editData[key]
      }
    })
  }

  /** 更新用户 */
  const onUpdate = async () => {
    editUserFormRef.value.validate(async validate => {
      if (validate) {
        await store.updateUser(editUserForm)
        await store.getAllUser()
        isShowEditDialog.value = false
      }
    })
  }

  /** 添加用户 */
  const onAddUser = async () => {
    addUserFormRef.value.validate(async validate => {
      if (validate) {
        await store.addUser(addUserForm)
        await store.getAllUser()
      }
    })
  }
</script>
<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
