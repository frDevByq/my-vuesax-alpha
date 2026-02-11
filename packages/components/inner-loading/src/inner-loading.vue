<template>
  <div :class="ns.b()" :style="{ minHeight: loading ? minHeight : 'auto' }">
    <!-- Loading 动画 -->
    <transition name="inner-loading-fade">
      <div v-if="loading" :class="ns.e('overlay')">
        <div :class="ns.e('spinner')" :style="spinnerStyle">
          <div :class="ns.em('spinner', 'ring')" />
        </div>
        <!-- 描述插槽 -->
        <div v-if="$slots.description" :class="ns.e('description')">
          <slot name="description" />
        </div>
      </div>
    </transition>

    <!-- 内容区域 -->
    <transition name="inner-loading-content">
      <div v-if="!loading" :class="ns.e('content')">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@vuesax-alpha/hooks'
import { innerLoadingProps } from './inner-loading'

defineOptions({
  name: 'VsInnerLoading',
})

const props = defineProps(innerLoadingProps)

const ns = useNamespace('inner-loading')

// 颜色映射
const colorMap: Record<string, string> = {
  primary: '#5b3cc4',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  dark: '#1e293b',
}

const spinnerStyle = computed(() => {
  const color = props.color || 'primary'
  const finalColor = colorMap[color] || color
  return {
    '--inner-loading-color': finalColor,
  }
})
</script>
