<template>
  <div class="container">
    <!-- 编辑 -->
    <template v-if="isEdit">
      <el-dialog
        v-model="isShowEditDialog"
        title="修改图书信息"
        width="25%"
        center
        align-center
        @open="getBookData"
        @closed="closeDialog"
      >
        <el-form
          ref="editBookFormRef"
          label-position="right"
          label-width="70"
          :model="editBookForm"
          :rules="rules"
          hide-required-asterisk
          size="large"
        >
          <el-form-item
            label="书名"
            prop="bname"
          >
            <el-input
              v-model="editBookForm.bname"
              placeholder="请输入书名"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="作者"
            prop="bauthor"
          >
            <el-input
              v-model="editBookForm.bauthor"
              placeholder="请输入作者"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="出版社"
            prop="bpublisher"
          >
            <el-input
              v-model="editBookForm.bpublisher"
              placeholder="请输入出版社"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="是否可用"
            prop="available"
          >
            <el-select
              v-model="editBookForm.available"
              placeholder="请选择是否可用"
            >
              <el-option
                v-for="item in editOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
        title="添加图书"
        width="25%"
        center
        align-center
        @closed="closeDialog"
      >
        <el-form
          ref="addBookFormRef"
          label-position="right"
          label-width="70"
          :model="addBookForm"
          :rules="rules"
          hide-required-asterisk
          size="large"
        >
          <el-form-item
            label="书名"
            prop="bname"
          >
            <el-input
              v-model="addBookForm.bname"
              placeholder="请输入书名"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="作者"
            prop="bauthor"
          >
            <el-input
              v-model="addBookForm.bauthor"
              placeholder="请输入作者"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="出版社"
            prop="bpublisher"
          >
            <el-input
              v-model="addBookForm.bpublisher"
              placeholder="请输入出版社"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="是否可用"
            prop="available"
          >
            <el-select
              v-model="addBookForm.available"
              placeholder="请选择是否可用"
            >
              <el-option
                v-for="item in addOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="closeDialog">返回</el-button>
            <el-button
              type="primary"
              @click="onAddBook"
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
  import { bookStore } from '@/store/modules/bookStore'
  import { ref, reactive, toRefs } from 'vue'

  /** 判断是否为编辑面板 */
  const isEdit = ref(Boolean)

  const store = bookStore()

  /** 是否显示组件 */
  const isShowEditDialog = ref(false)

  /** 接收父组件 */
  const props = defineProps({
    editData: {
      id: Number,
      bname: String,
      bauthor: String,
      bpublisher: String,
      available: Number,
    },
  })

  /** 暴露子组件 */
  defineExpose({ isShowEditDialog, isEdit })

  /** 表单项 */
  const editBookFormRef = ref('')
  const addBookFormRef = ref('')

  const editBookForm = reactive({
    id: '',
    bname: '',
    bauthor: '',
    bpublisher: '',
    available: '',
  })

  const addBookForm = reactive({
    id: '',
    bname: '',
    bauthor: '',
    bpublisher: '',
    available: '',
  })

  const rules = reactive({
    bname: {
      required: true,
      message: '书名不能为空',
      trigger: 'blur',
    },
    bauthor: {
      required: true,
      message: '作者不能为空',
      trigger: 'blur',
    },
    bpublisher: {
      required: true,
      message: '出版社不能为空',
      trigger: 'blur',
    },
    available: {
      required: true,
      message: '请选择是否可用',
      trigger: 'change',
    },
  })

  /** 选择框 */
  const editOptions = ref([
    {
      value: 0,
      label: '否',
    },
    {
      value: 1,
      label: '是',
    },
  ])

  const addOptions = ref([
    {
      value: 0,
      label: '否',
    },
    {
      value: 1,
      label: '是',
    },
  ])

  /** 关闭窗口 */
  const closeDialog = () => {
    // 遍历赋值
    Object.keys(addBookForm).forEach(key => {
      addBookForm[key] = ''
    })
    isShowEditDialog.value = false
    isEdit.value = Boolean
  }

  /** 获取图书信息 */
  const getBookData = () => {
    // 遍历赋值
    Object.keys(props.editData).forEach(key => {
      if (editBookForm.hasOwnProperty(key)) {
        editBookForm[key] = props.editData[key]
      }
    })
  }

  /** 更新图书 */
  const onUpdate = async () => {
    editBookFormRef.value.validate(async validate => {
      if (validate) {
        await store.updateBook(editBookForm)
        await store.getAllBook()
        isShowEditDialog.value = false
      }
    })
  }

  /** 添加图书 */
  const onAddBook = async () => {
    addBookFormRef.value.validate(async validate => {
      if (validate) {
        await store.addBook(addBookForm)
        await store.getAllBook()
      }
    })
  }
</script>
<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
