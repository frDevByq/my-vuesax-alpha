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

<style lang="scss" scoped>
.vs-inner-loading {
  position: relative;
  width: 100%;
  transition: min-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.vs-inner-loading__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.95);
  z-index: 1;
}

.vs-inner-loading__spinner {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-inner-loading__spinner--ring {
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  border-radius: 50%;
  border: 3px solid var(--inner-loading-color, #5b3cc4);
  animation: inner-loading-corners 1s ease infinite;
  box-sizing: border-box;
}

@keyframes inner-loading-corners {
  0% {
    border-radius: 50%;
    transform: rotate(0deg);
  }
  25% {
    border-radius: 50% 50% 50% 15%;
  }
  50% {
    border-radius: 50% 50% 15% 30%;
  }
  75% {
    border-radius: 50% 15% 30% 30%;
  }
  100% {
    border-radius: 50%;
    transform: rotate(-180deg);
  }
}

.vs-inner-loading__description {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  text-align: center;
}

.vs-inner-loading__content {
  width: 100%;
}

// Loading 淡入淡出动画
.inner-loading-fade-enter-active,
.inner-loading-fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.inner-loading-fade-enter-from,
.inner-loading-fade-leave-to {
  opacity: 0;
}

// 内容淡入淡出动画
.inner-loading-content-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.inner-loading-content-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.inner-loading-content-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.inner-loading-content-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
