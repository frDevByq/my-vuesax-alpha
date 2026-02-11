<template>
  <teleport to="body">
    <transition
      name="edit-dialog"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div
        v-if="visible"
        class="edit-dialog-overlay"
        :style="{ zIndex }"
        @click.self="handleOverlayClick"
      >
        <div
          class="edit-dialog-glow-border"
          :style="{ '--edit-dialog-width': width }"
        >
          <div class="edit-dialog-container">
            <!-- 头部 -->
            <div class="edit-dialog-header">
              <div>
                <h2 class="edit-dialog-title">
                  <slot name="title">{{ computedTitle }}</slot>
                </h2>
                <p
                  v-if="$slots.subtitle || computedSubtitle"
                  class="edit-dialog-subtitle"
                >
                  <slot name="subtitle">{{ computedSubtitle }}</slot>
                </p>
              </div>
              <div class="edit-dialog-icon-wrapper">
                <icon-lucide-pen-tool class="edit-dialog-icon" />
              </div>
            </div>

            <!-- 表单内容 -->
            <vs-inner-loading
              :loading="loading"
              color="#0066ff"
              min-height="120px"
              class="edit-dialog-content"
            >
              <template #description>
                <div style="font-size: 13px; color: #94a3b8">加载中...</div>
              </template>
              <div class="edit-dialog-form">
                <slot :data="internalData" :mode="mode"></slot>
              </div>
            </vs-inner-loading>

            <!-- 底部操作栏 -->
            <div class="edit-dialog-actions">
              <vs-button
                v-if="showCancel"
                type="flat"
                color="#64748b"
                size="large"
                :disabled="confirmLoadingNotClose && computedConfirmLoading"
                class="edit-dialog-btn-cancel"
                @click="handleCancel"
              >
                {{ cancelText }}
              </vs-button>
              <vs-button
                color="#0f172a"
                size="large"
                :loading="computedConfirmLoading"
                :disabled="showSuccess"
                class="edit-dialog-btn-confirm"
                @click="handleConfirm"
              >
                <transition name="success-fade" mode="out-in">
                  <span
                    v-if="showSuccess"
                    key="success"
                    class="success-content"
                  >
                    <icon-lucide-check-circle class="success-icon" />
                    操作成功
                  </span>
                  <span v-else key="normal">
                    {{ computedConfirmText }}
                  </span>
                </transition>
              </vs-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useZIndex } from '@vuesax-alpha/hooks'
import VsButton from '@vuesax-alpha/components/button'

import VsInnerLoading from '@vuesax-alpha/components/inner-loading'
import { editDialogEmits, editDialogProps } from './edit-dialog'
import IconLucidePenTool from '~icons/lucide/pen-tool'
import IconLucideCheckCircle from '~icons/lucide/check-circle'

defineOptions({
  name: 'VsEditDialog',
})

const props = defineProps(editDialogProps)
const emit = defineEmits(editDialogEmits)

const visible = ref(false)
const { nextZIndex } = useZIndex()
const zIndex = ref(nextZIndex())
const internalConfirmLoading = ref(false)
const internalData = ref<Record<string, any>>({})
const showSuccess = ref(false)

// 计算确认按钮的 loading 状态
const computedConfirmLoading = computed(() => {
  if (props.confirmLoading !== undefined) {
    return props.confirmLoading
  }
  return internalConfirmLoading.value
})

// 计算标题
const computedTitle = computed(() => {
  if (props.title) return props.title
  return props.mode === 'create' ? '创建' : '编辑资料'
})

// 计算副标题
const computedSubtitle = computed(() => {
  if (props.subtitle) return props.subtitle
  return props.mode === 'create'
    ? '填写信息创建新项目'
    : '更新您的个人信息与偏好设置'
})

// 计算确认按钮文本
const computedConfirmText = computed(() => {
  if (props.confirmText) return props.confirmText
  return props.mode === 'create' ? '创建' : '保存更改'
})

const handleConfirm = () => {
  if (props.awaitConfirm) {
    internalConfirmLoading.value = true

    const done = (success = true) => {
      internalConfirmLoading.value = false
      if (success) {
        // 显示成功状态
        showSuccess.value = true
        // 1秒后关闭弹窗
        setTimeout(() => {
          showSuccess.value = false
          close()
        }, 1000)
      }
    }

    try {
      const result: unknown = emit(
        'confirm',
        props.mode,
        internalData.value,
        done
      )
      if (result && typeof result === 'object' && 'then' in result) {
        ;(result as Promise<void>)
          .then(() => {
            done(true)
          })
          .catch(() => {
            internalConfirmLoading.value = false
          })
      }
    } catch {
      internalConfirmLoading.value = false
    }
  } else {
    emit('confirm', props.mode, internalData.value)
    close()
  }
}

const handleCancel = () => {
  if (props.confirmLoadingNotClose && computedConfirmLoading.value) {
    return
  }
  emit('cancel')
  close()
}

const handleOverlayClick = () => {
  if (props.confirmLoadingNotClose && computedConfirmLoading.value) {
    return
  }
  if (!props.preventClose) {
    handleCancel()
  }
}

const close = () => {
  visible.value = false
}

const afterEnter = () => {
  // 可以在这里添加打开后的回调
}

const afterLeave = () => {
  emit('update:modelValue', false)
  emit('close')
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      visible.value = true
      zIndex.value = nextZIndex()
      // 初始化数据
      internalData.value = { ...props.data }
    } else {
      if (visible.value) {
        close()
      }
    }
  },
  { immediate: true }
)

watch(
  () => props.data,
  (val) => {
    internalData.value = { ...val }
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
/* 动画定义 */
.edit-dialog-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  .edit-dialog-glow-border {
    animation: edit-dialog-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

.edit-dialog-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  .edit-dialog-glow-border {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.edit-dialog-enter-from,
.edit-dialog-leave-to {
  opacity: 0;

  .edit-dialog-glow-border {
    transform: scale(0.8) rotate(-2deg);
    opacity: 0;
  }
}

@keyframes edit-dialog-bounce {
  0% {
    transform: scale(0.5) rotate(-5deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.05) rotate(1deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

/* 遮罩层 */
.edit-dialog-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(12px);
}

/* 流光边框 */
.edit-dialog-glow-border {
  position: relative;
  width: 100%;
  max-width: var(--edit-dialog-width, 560px);
  border-radius: 24px;
  padding: 1px;
  background: rgba(0, 0, 0, 0.05);
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      transparent 120deg,
      rgba(0, 102, 255, 0.1) 180deg,
      transparent 240deg,
      transparent 360deg
    );
    animation: rotate 8s linear infinite;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 对话框容器 */
.edit-dialog-container {
  position: relative;
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: 23px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  padding: 32px;
  z-index: 1;
}

/* 头部 */
.edit-dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.edit-dialog-title {
  font-size: 20px;
  font-weight: 600;
  color: #0f172a;
  letter-spacing: -0.025em;
  margin: 0;
}

.edit-dialog-subtitle {
  font-size: 14px;
  color: #64748b;
  margin: 4px 0 0 0;
}

.edit-dialog-icon-wrapper {
  background: #f1f5f9;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-dialog-icon {
  width: 20px;
  height: 20px;
  color: #64748b;
}

/* 内容区域 */
.edit-dialog-content {
  margin-bottom: 32px;
}

.edit-dialog-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 按钮组 */
.edit-dialog-actions {
  display: flex;
  gap: 12px;
  width: 100%;
}

.edit-dialog-btn-cancel {
  flex: 1;
  border-radius: 9999px !important;
}

.edit-dialog-btn-confirm {
  flex: 1;
  border-radius: 9999px !important;

  :deep(.vs-button__content) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
}

.success-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: white;
  font-weight: 600;
}

.success-icon {
  font-size: 18px;
  animation: success-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes success-bounce {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-fade-enter-active,
.success-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.success-fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.success-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* 关闭按钮 */
.edit-dialog-close {
  position: absolute !important;
  top: 20px !important;
  right: 20px !important;
  color: #cbd5e1 !important;

  :deep(svg) {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: #0f172a !important;
  }
}

/* 响应式 */
@media (max-width: 640px) {
  .edit-dialog-container {
    max-width: calc(100vw - 32px);
    padding: 24px;
  }

  .edit-dialog-title {
    font-size: 18px;
  }

  .edit-dialog-subtitle {
    font-size: 13px;
  }

  .edit-dialog-actions {
    flex-direction: column;

    .edit-dialog-btn-confirm {
      flex: 1;
    }
  }
}
</style>
