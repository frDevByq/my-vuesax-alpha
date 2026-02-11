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

