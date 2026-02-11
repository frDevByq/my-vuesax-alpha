<template>
  <teleport to="body">
    <transition
      name="confirm-dialog"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div
        v-if="visible"
        class="confirm-dialog-overlay"
        :style="{ zIndex }"
        @click.self="handleOverlayClick"
      >
        <div
          :class="[
            'confirm-dialog-container',
            `confirm-dialog-container--${type}`,
          ]"
        >
          <!-- 半嵌入式图标背景 -->
          <div class="confirm-dialog-icon-wrapper">
            <div
              :class="['confirm-dialog-icon', `confirm-dialog-icon--${type}`]"
            >
              <component :is="iconComponent" />
            </div>
          </div>

          <!-- 内容区域 -->
          <vs-inner-loading
            :loading="loading"
            :color="buttonColor"
            min-height="80px"
            class="confirm-dialog-content"
          >
            <template #description>
              <div style="font-size: 13px; color: #94a3b8">加载中...</div>
            </template>
            <h2 v-if="$slots.title || title" class="confirm-dialog-title">
              <slot name="title">{{ title }}</slot>
            </h2>
            <div
              v-if="$slots.default || description"
              class="confirm-dialog-description"
            >
              <slot>{{ description }}</slot>
            </div>
          </vs-inner-loading>

          <!-- 按钮组 -->
          <div class="confirm-dialog-actions">
            <vs-button
              v-if="showCancel"
              type="flat"
              color="#64748b"
              size="large"
              :disabled="confirmLoadingNotClose && computedConfirmLoading"
              class="confirm-dialog-btn-cancel"
              @click="handleCancel"
            >
              {{ cancelText }}
            </vs-button>
            <vs-button
              :color="buttonColor"
              size="large"
              :loading="computedConfirmLoading"
              :disabled="showSuccess"
              class="confirm-dialog-btn-confirm"
              @click="handleConfirm"
            >
              <transition name="success-fade" mode="out-in">
                <span v-if="showSuccess" key="success" class="success-content">
                  <icon-lucide-check-circle class="success-icon" />
                  操作成功
                </span>
                <span v-else key="normal" class="normal-content">
                  {{ confirmText }}
                  <icon-lucide-chevron-right class="confirm-dialog-arrow" />
                </span>
              </transition>
            </vs-button>
          </div>

          <!-- 装饰元素 -->
          <div
            class="confirm-dialog-decoration confirm-dialog-decoration--tl"
          />
          <div
            class="confirm-dialog-decoration confirm-dialog-decoration--br"
          />

          <!-- 关闭按钮 -->
          <vs-button
            v-if="showClose"
            type="transparent"
            icon
            shape="circle"
            :disabled="confirmLoadingNotClose && computedConfirmLoading"
            class="confirm-dialog-close"
            @click="handleCancel"
          >
            <icon-lucide-x />
          </vs-button>
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
import { confirmDialogEmits, confirmDialogProps } from './confirm-dialog'
import IconLucideCheckCircle from '~icons/lucide/check-circle'
import IconLucideAlertCircle from '~icons/lucide/alert-circle'
import IconLucideAlertTriangle from '~icons/lucide/alert-triangle'
import IconLucideInfo from '~icons/lucide/info'
import IconLucideTrash2 from '~icons/lucide/trash-2'
import IconLucideChevronRight from '~icons/lucide/chevron-right'
import IconLucideX from '~icons/lucide/x'

defineOptions({
  name: 'VsConfirmDialog',
})

const props = defineProps(confirmDialogProps)
const emit = defineEmits(confirmDialogEmits)

const visible = ref(false)
const { nextZIndex } = useZIndex()
const zIndex = ref(nextZIndex())
const internalConfirmLoading = ref(false)
const showSuccess = ref(false)

// 计算确认按钮的 loading 状态
const computedConfirmLoading = computed(() => {
  // 如果 confirmLoading 不为 undefined，使用它的值
  if (props.confirmLoading !== undefined) {
    return props.confirmLoading
  }
  // 否则使用内部状态
  return internalConfirmLoading.value
})

// 按钮颜色映射
const buttonColor = computed(() => {
  const colors = {
    success: '#10b981',
    error: '#f43f5e',
    warning: '#f59e0b',
    info: '#3b82f6',
    danger: '#ef4444',
  }
  return colors[props.type]
})

// 图标组件映射
const iconComponent = computed(() => {
  const icons = {
    success: IconLucideCheckCircle,
    error: IconLucideAlertCircle,
    warning: IconLucideAlertTriangle,
    info: IconLucideInfo,
    danger: IconLucideTrash2,
  }
  return icons[props.type]
})

const handleConfirm = () => {
  if (props.awaitConfirm) {
    // 异步确认模式
    internalConfirmLoading.value = true

    const done = (success = true) => {
      internalConfirmLoading.value = false
      if (success) {
        // 显示成功状态
        showSuccess.value = true
        // 2秒后关闭弹窗
        setTimeout(() => {
          showSuccess.value = false
          close()
        }, 1000)
      } else {
        // 失败不关闭
      }
    }

    try {
      const result: unknown = emit('confirm', done)
      // 如果返回 Promise，处理它
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
    // 同步确认模式
    emit('confirm')
    close()
  }
}

const handleCancel = () => {
  // 如果正在确认加载中且不允许关闭，则阻止关闭
  if (props.confirmLoadingNotClose && computedConfirmLoading.value) {
    return
  }
  emit('cancel')
  close()
}

const handleOverlayClick = () => {
  // 如果正在确认加载中且不允许关闭，则阻止关闭
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
    } else {
      if (visible.value) {
        close()
      }
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
/* 动画定义 */
.confirm-dialog-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  .confirm-dialog-container {
    animation: confirm-dialog-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

.confirm-dialog-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  .confirm-dialog-container {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.confirm-dialog-enter-from,
.confirm-dialog-leave-to {
  opacity: 0;

  .confirm-dialog-container {
    transform: scale(0.8) rotate(-2deg);
    opacity: 0;
  }
}

@keyframes confirm-dialog-bounce {
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
.confirm-dialog-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(12px);
}

/* 对话框容器 - 非对称异形设计 */
.confirm-dialog-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.1);

  /* 非对称圆角 */
  border-radius: 100px 40px 100px 40px;

  padding: 40px;
  padding-top: 64px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* 图标包装器 */
.confirm-dialog-icon-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}

.confirm-dialog-icon {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  :deep(svg) {
    width: 48px;
    height: 48px;
    color: white;
    stroke-width: 2;
  }

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

/* 内容区域 */
.confirm-dialog-content {
  margin-top: 16px;
  margin-bottom: 40px;
}

.confirm-dialog-title {
  font-size: 24px;
  font-weight: 900;
  color: #1e293b;
  letter-spacing: -0.025em;
  margin: 0 0 12px 0;
}

.confirm-dialog-description {
  font-size: 15px;
  font-weight: 500;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  padding: 0 16px;
}

/* 按钮组 */
.confirm-dialog-actions {
  display: flex;
  gap: 12px;
  width: 100%;
}

.confirm-dialog-btn-cancel {
  flex: 1;
  border-radius: 9999px !important;
}

.confirm-dialog-btn-confirm {
  flex: 1;
  border-radius: 9999px !important;

  :deep(.vs-button__content) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
}

.normal-content,
.success-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.success-content {
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

.confirm-dialog-arrow {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 16px;
}

.confirm-dialog-btn-confirm:hover .confirm-dialog-arrow {
  transform: translateX(4px);
}

/* 装饰元素 */
.confirm-dialog-decoration {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid #f1f5f9;

  &--tl {
    top: 40px;
    left: 40px;
    border-right: none;
    border-bottom: none;
    border-radius: 12px 0 0 0;
  }

  &--br {
    bottom: 40px;
    right: 40px;
    border-left: none;
    border-top: none;
    border-radius: 0 0 12px 0;
  }
}

/* 关闭按钮 */
.confirm-dialog-close {
  position: absolute !important;
  top: 20px !important;
  right: 28px !important;
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
  .confirm-dialog-container {
    max-width: calc(100vw - 32px);
    padding: 32px 24px;
  }

  .confirm-dialog-title {
    font-size: 20px;
  }

  .confirm-dialog-description {
    font-size: 14px;
  }

  .confirm-dialog-actions {
    flex-direction: column;

    .confirm-dialog-btn-confirm {
      flex: 1;
    }
  }
}
</style>
