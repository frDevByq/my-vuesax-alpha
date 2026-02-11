<template>
  <div class="play-container">
    <!-- Select 演示区域 -->
    <div class="demo-section select-demo">
      <h2 class="section-title">Select 组件演示</h2>
      <div class="select-grid">

        <vs-button >
          Hello
        </vs-button>

        <vs-select
          v-model="selectValue1"
          placeholder="选择一个选项"
          label="基础选择器"
          block
          color="primary"
        >
          <vs-option value="option1" label="选项 1" />
          <vs-option value="option2" label="选项 2" />
          <vs-option value="option3" label="选项 3" />
          <vs-option value="option4" label="选项 4" />
        </vs-select>

        <vs-select
          v-model="selectValue2"
          placeholder="可搜索选择器"
          label="可搜索"
          block
          filter
          color="success"
        >
          <vs-option value="apple" label="苹果" />
          <vs-option value="banana" label="香蕉" />
          <vs-option value="orange" label="橙子" />
          <vs-option value="grape" label="葡萄" />
          <vs-option value="watermelon" label="西瓜" />
        </vs-select>

        <vs-select
          v-model="selectValue3"
          placeholder="选择多个"
          label="多选"
          block
          multiple
          color="warn"
        >
          <vs-option value="tag1" label="标签 1" />
          <vs-option value="tag2" label="标签 2" />
          <vs-option value="tag3" label="标签 3" />
          <vs-option value="tag4" label="标签 4" />
          <vs-option value="tag5" label="标签 5" />
        </vs-select>

        <vs-select
          v-model="selectValue4"
          placeholder="带状态的选择器"
          label="状态选择器"
          block
          state="danger"
          color="danger"
        >
          <vs-option value="error1" label="错误选项 1" />
          <vs-option value="error2" label="错误选项 2" />
          <vs-option value="error3" label="错误选项 3" />
        </vs-select>

        <vs-select
          v-model="selectValue5"
          placeholder="选择状态"
          label="自定义插槽选项"
          block
          color="primary"
        >
          <vs-option value="success">
            <div style="display: flex; align-items: center; gap: 8px">
              <icon-lucide-check-circle
                style="width: 16px; height: 16px; color: #10b981"
              />
              <span>成功状态</span>
            </div>
          </vs-option>
          <vs-option value="error">
            <div style="display: flex; align-items: center; gap: 8px">
              <icon-lucide-alert-circle
                style="width: 16px; height: 16px; color: #ef4444"
              />
              <span>错误状态</span>
            </div>
          </vs-option>
          <vs-option value="info">
            <div style="display: flex; align-items: center; gap: 8px">
              <icon-lucide-info
                style="width: 16px; height: 16px; color: #3b82f6"
              />
              <span>信息状态</span>
            </div>
          </vs-option>
        </vs-select>

        <vs-select
          v-model="selectValue6"
          placeholder="选择你的角色"
          block
          color="success"
        >
          <template #label>
            <div style="display: flex; align-items: center; gap: 6px">
              <icon-lucide-user style="width: 12px; height: 12px" />
              <span>自定义 Label 插槽</span>
            </div>
          </template>
          <template #selected="{ value, label }">
            <div style="display: flex; align-items: center; gap: 8px">
              <span style="font-size: 16px">
                {{
                  value === 'developer'
                    ? '👨‍💻'
                    : value === 'designer'
                    ? '🎨'
                    : '📊'
                }}
              </span>
              <span>{{ label }}</span>
            </div>
          </template>
          <vs-option value="developer" label="开发者">
            <div style="display: flex; align-items: center; gap: 8px">
              <span style="font-size: 16px">👨‍💻</span>
              <span>开发者</span>
            </div>
          </vs-option>
          <vs-option value="designer" label="设计师">
            <div style="display: flex; align-items: center; gap: 8px">
              <span style="font-size: 16px">🎨</span>
              <span>设计师</span>
            </div>
          </vs-option>
          <vs-option value="manager" label="项目经理">
            <div style="display: flex; align-items: center; gap: 8px">
              <span style="font-size: 16px">📊</span>
              <span>项目经理</span>
            </div>
          </vs-option>
        </vs-select>
      </div>
    </div>

    <div class="demo-section">
      <h1 class="demo-title">现代异形弹窗</h1>
      <p class="demo-subtitle">Shape Innovation</p>

      <div class="button-grid">
        <button
          v-for="config in modalConfigs"
          :key="config.type"
          class="demo-button"
          :class="`demo-button--${config.type}`"
          @click="openDialog(config.type)"
        >
          <span
            class="demo-button-indicator"
            :class="`demo-button-indicator--${config.type}`"
          ></span>
          <span class="demo-button-text">{{ config.label }}</span>
          <svg
            class="demo-button-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>

    <!-- Inner Loading 测试 -->
    <div style="margin-top: 40px; text-align: center">
      <h2
        style="
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 20px;
        "
      >
        Inner Loading 测试
      </h2>
      <div style="display: flex; gap: 16px; justify-content: center">
        <vs-button color="primary" @click="toggleInnerLoading">
          切换 Inner Loading
        </vs-button>
        <vs-inner-loading
          :loading="innerLoading"
          min-height="120px"
          color="success"
          style="
            width: 300px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
          "
        >
          <template #description>
            <div>正在加载数据...</div>
          </template>
          <div style="text-align: left">
            <h3 style="margin: 0 0 8px 0; color: #0f172a">内容标题</h3>
            <p style="margin: 0; color: #64748b; line-height: 1.6">
              这是一段示例内容，只有在加载完成后才会显示。可以包含任意复杂的内容结构。
            </p>
          </div>
        </vs-inner-loading>
      </div>
    </div>

    <!-- Loading 测试 -->
    <div style="margin-top: 40px; text-align: center">
      <h2
        style="
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 20px;
        "
      >
        Loading 测试（验证 corners 类型）
      </h2>
      <div style="display: flex; gap: 16px; justify-content: center">
        <vs-button color="primary" @click="showLoading">显示 Loading</vs-button>
        <div
          ref="loadingTarget"
          style="
            position: relative;
            width: 200px;
            height: 100px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          内容区域
        </div>
      </div>
    </div>

    <!-- Confirm Dialog 组件 -->
    <vs-confirm-dialog
      v-model="dialogVisible"
      :type="currentConfig.type"
      :title="currentConfig.title"
      :description="currentConfig.description"
      :confirm-text="currentConfig.btnText"
      :loading="dialogLoading"
      await-confirm
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />

    <!-- Edit Dialog 测试 -->
    <div style="margin-top: 40px; text-align: center">
      <h2
        style="
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 20px;
        "
      >
        Edit Dialog 测试
      </h2>
      <div style="display: flex; gap: 16px; justify-content: center">
        <vs-button color="primary" @click="openEditDialog('edit')">
          打开编辑弹窗
        </vs-button>
        <vs-button color="success" @click="openEditDialog('create')">
          打开创建弹窗
        </vs-button>
      </div>
    </div>

    <!-- Edit Dialog 组件 -->
    <vs-edit-dialog
      v-model="editDialogVisible"
      :mode="editDialogMode"
      :data="editDialogData"
      width="600px"
      await-confirm
      @confirm="handleEditConfirm"
      @cancel="handleEditCancel"
    >
      <template #default="{ data }">
        <!-- 输入项 1 -->
        <div class="edit-form-item">
          <vs-input
            v-model="data.name"
            label="用户姓名"
            placeholder="输入姓名"
            label-float
            block
            input-style="border"
            color="primary"
          >
            <template #icon>
              <icon-lucide-user />
            </template>
          </vs-input>
        </div>

        <!-- 输入项 2 -->
        <div class="edit-form-item">
          <vs-input
            v-model="data.email"
            type="email"
            label="电子邮件"
            placeholder="email@example.com"
            label-float
            block
            color="success"
          >
            <template #icon>
              <icon-lucide-mail />
            </template>
          </vs-input>
        </div>

        <!-- 输入项 3 -->
        <div class="edit-form-item">
          <vs-input
            v-model="data.position"
            label="工作岗位"
            placeholder="输入岗位"
            label-float-nospace
            block
            color="warn"
          >
            <template #icon>
              <icon-lucide-briefcase />
            </template>
          </vs-input>
        </div>
      </template>
    </vs-edit-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VsConfirmDialog } from '@vuesax-alpha/components/confirm-dialog'
import { VsEditDialog } from '@vuesax-alpha/components/edit-dialog'
import { VsLoadingFn } from '@vuesax-alpha/components/loading'
import { VsInnerLoading } from '@vuesax-alpha/components/inner-loading'
import IconLucideUser from '~icons/lucide/user'
import IconLucideMail from '~icons/lucide/mail'
import IconLucideBriefcase from '~icons/lucide/briefcase'
import IconLucideCheckCircle from '~icons/lucide/check-circle'
import IconLucideAlertCircle from '~icons/lucide/alert-circle'
import IconLucideInfo from '~icons/lucide/info'

type DialogType = 'success' | 'error' | 'warning' | 'info' | 'danger'

interface ModalConfig {
  type: DialogType
  label: string
  title: string
  description: string
  btnText: string
}

interface FormData {
  name: string
  email: string
  position: string
}

const modalConfigs: ModalConfig[] = [
  {
    type: 'success',
    label: 'Success',
    title: '操作成功',
    description: '所有更改已实时同步到您的工作空间。',
    btnText: '明白了',
  },
  {
    type: 'error',
    label: 'Error',
    title: '同步失败',
    description: '请检查您的网络连接后重试。',
    btnText: '重试操作',
  },
  {
    type: 'warning',
    label: 'Warning',
    title: '谨慎处理',
    description: '修改该项配置可能会导致现有流程中断。',
    btnText: '确认修改',
  },
  {
    type: 'info',
    label: 'Info',
    title: '系统更新',
    description: '我们的服务条款已于今日完成更新。',
    btnText: '查看详情',
  },
  {
    type: 'danger',
    label: 'Delete',
    title: '彻底删除',
    description: '该项目一旦删除将无法从回收站找回。',
    btnText: '执行删除',
  },
]

const dialogVisible = ref(false)
const currentConfig = ref<ModalConfig>(modalConfigs[0])
const dialogLoading = ref(false)
const loadingTarget = ref<HTMLElement>()
const innerLoading = ref(false)

// Select values
const selectValue1 = ref('')
const selectValue2 = ref('')
const selectValue3 = ref<string[]>([])
const selectValue4 = ref('')
const selectValue5 = ref('')
const selectValue6 = ref('')

// Edit Dialog
const editDialogVisible = ref(false)
const editDialogMode = ref<'create' | 'edit'>('edit')
const editDialogData = ref<FormData>({
  name: 'Alex Morgan',
  email: 'alex.m@design.com',
  position: '高级产品设计师',
})

const openDialog = (type: DialogType) => {
  const config = modalConfigs.find((c) => c.type === type)
  if (config) {
    currentConfig.value = config
    dialogVisible.value = true

    // 模拟加载数据
    dialogLoading.value = true
    setTimeout(() => {
      dialogLoading.value = false
    }, 2000)
  }
}

const handleConfirm = (done: () => void) => {
  console.log('确认操作:', currentConfig.value.type)
  // 模拟异步操作
  setTimeout(() => {
    console.log('异步操作完成')
    done()
  }, 2000)
}

const handleCancel = () => {
  console.log('取消操作')
}

const showLoading = () => {
  const loadingInstance = VsLoadingFn({
    target: loadingTarget.value,
    type: 'corners',
  })
}

const toggleInnerLoading = () => {
  innerLoading.value = !innerLoading.value
  if (innerLoading.value) {
  }
}

// Edit Dialog 方法
const openEditDialog = (mode: 'create' | 'edit') => {
  editDialogMode.value = mode
  if (mode === 'create') {
    editDialogData.value = {
      name: '',
      email: '',
      position: '',
    }
  } else {
    editDialogData.value = {
      name: 'Alex Morgan',
      email: 'alex.m@design.com',
      position: '高级产品设计师',
    }
  }
  editDialogVisible.value = true
}

const handleEditConfirm = (
  mode: 'create' | 'edit',
  data: Record<string, any>,
  done: (success: boolean) => void
) => {
  console.log('确认操作:', mode, data)
  // 模拟异步操作
  setTimeout(() => {
    console.log('异步操作完成')
    done(true)
  }, 2000)
}

const handleEditCancel = () => {
  console.log('取消编辑')
}
</script>

<style lang="scss">
.play-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px;
  background: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  gap: 60px;
}

.demo-section {
  max-width: 800px;
  width: 100%;

  &.select-demo {
    margin-bottom: 20px;
  }
}

.section-title {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 24px 0;
  text-align: center;
}

.select-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  // 让最后一个选项跨两列
  > :last-child {
    grid-column: 1 / -1;
    max-width: 50%;
    margin: 0 auto;

    @media (max-width: 768px) {
      max-width: 100%;
    }
  }
}

.demo-title {
  font-size: 32px;
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 8px 0;
  text-align: center;
}

.demo-subtitle {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  text-align: center;
  margin: 0 0 48px 0;
}

.button-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #f8fafc;
  border: 1px solid transparent;
  border-radius: 16px 64px 16px 64px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: white;
    border-color: #e2e8f0;
    transform: translateX(4px);

    .demo-button-icon {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &:active {
    transform: translateX(4px) scale(0.98);
  }
}

.demo-button-indicator {
  width: 6px;
  height: 24px;
  border-radius: 9999px;
  margin-right: 16px;

  &--success {
    background: #10b981;
  }

  &--error {
    background: #f43f5e;
  }

  &--warning {
    background: #f59e0b;
  }

  &--info {
    background: #3b82f6;
  }

  &--danger {
    background: #ef4444;
  }
}

.demo-button-text {
  flex: 1;
  font-size: 15px;
  font-weight: 700;
  color: #64748b;
  text-align: left;
  text-transform: capitalize;
  letter-spacing: 0.05em;
}

.demo-button-icon {
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: #cbd5e1;
  padding: 8px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

@media (max-width: 640px) {
  .demo-title {
    font-size: 24px;
  }

  .demo-subtitle {
    font-size: 10px;
    margin-bottom: 32px;
  }

  .demo-button {
    padding: 14px 20px;
  }
}

// Edit Dialog 表单样式
.edit-form-item {
  margin-bottom: 0;
}
</style>
