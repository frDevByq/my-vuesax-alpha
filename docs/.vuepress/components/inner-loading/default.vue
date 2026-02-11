<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <vs-button @click="toggleLoading">切换加载状态</vs-button>
  </div>

  <vs-inner-loading :loading="isLoading" min-height="200px">
    <div style="padding: 20px; text-align: center;">
      <h3 style="margin: 0 0 12px 0;">内容已加载</h3>
      <p style="margin: 0; color: #64748b;">这是加载完成后显示的内容</p>
    </div>
  </vs-inner-loading>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isLoading = ref(true)

const toggleLoading = () => {
  isLoading.value = !isLoading.value
}
</script>
