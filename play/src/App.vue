<template>
  <div class="play-container">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VsConfirmDialog } from '@vuesax-alpha/components/confirm-dialog'
import { VsLoadingFn } from '@vuesax-alpha/components/loading'
import { VsInnerLoading } from '@vuesax-alpha/components/inner-loading'

type DialogType = 'success' | 'error' | 'warning' | 'info' | 'danger'

interface ModalConfig {
  type: DialogType
  label: string
  title: string
  description: string
  btnText: string
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
</script>

<style lang="scss">
.play-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
}

.demo-section {
  max-width: 480px;
  width: 100%;
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
</style>
