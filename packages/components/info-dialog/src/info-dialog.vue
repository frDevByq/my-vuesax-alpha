<template>
  <teleport to="body">
    <transition
      name="info-dialog"
      appear
      @after-leave="afterLeave"
    >
      <div
        v-if="visible"
        class="info-dialog-overlay"
        :style="{ zIndex }"
        @click.self="handleOverlayClick"
      >
        <div
          class="info-dialog-container"
          :style="{ '--info-dialog-min-width': minWidth }"
        >
          <div class="info-dialog-icon-wrapper">
            <div class="info-dialog-icon" :style="iconStyle">
              <slot name="icon">
                <icon-lucide-info />
              </slot>
            </div>
          </div>

          <vs-inner-loading
            :loading="loading"
            :color="color"
            min-height="72px"
            class="info-dialog-content"
          >
            <template #description>
              <div class="info-dialog-loading-text">加载中...</div>
            </template>

            <h2 v-if="$slots.title || title" class="info-dialog-title">
              <slot name="title">{{ title }}</slot>
            </h2>

            <div
              v-if="$slots.default || description"
              class="info-dialog-description"
            >
              <slot>{{ description }}</slot>
            </div>
          </vs-inner-loading>

          <div v-if="showCancel || showConfirm" class="info-dialog-actions">
            <vs-button
              v-if="showCancel"
              type="flat"
              color="#64748b"
              size="large"
              class="info-dialog-btn-cancel"
              @click="handleCancel"
            >
              {{ cancelText }}
            </vs-button>
            <vs-button
              v-if="showConfirm"
              :color="color"
              size="large"
              class="info-dialog-btn-confirm"
              @click="handleConfirm"
            >
              {{ confirmText }}
            </vs-button>
          </div>

          <vs-button
            v-if="showClose"
            type="transparent"
            icon
            shape="circle"
            class="info-dialog-close"
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
import { infoDialogEmits, infoDialogProps } from './info-dialog'
import IconLucideInfo from '~icons/lucide/info'
import IconLucideX from '~icons/lucide/x'

defineOptions({
  name: 'VsInfoDialog',
})

const props = defineProps(infoDialogProps)
const emit = defineEmits(infoDialogEmits)

const visible = ref(false)
const { nextZIndex } = useZIndex()
const zIndex = ref(nextZIndex())

const iconStyle = computed(() => ({
  backgroundColor: props.color,
}))

const close = () => {
  visible.value = false
}

const handleCancel = () => {
  emit('cancel')
  close()
}

const handleConfirm = () => {
  emit('confirm')
  close()
}

const handleOverlayClick = () => {
  if (!props.preventClose) {
    handleCancel()
  }
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
      return
    }
    if (visible.value) {
      close()
    }
  },
  { immediate: true }
)
</script>
