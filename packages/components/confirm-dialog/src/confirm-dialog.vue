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

