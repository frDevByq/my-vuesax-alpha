<template>
  <vs-button @click="showLoading = true">加载状态</vs-button>

  <vs-confirm-dialog
    v-model="showLoading"
    type="info"
    title="加载中"
    description="正在获取数据..."
    :loading="isLoading"
    @confirm="handleLoadingConfirm"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showLoading = ref(false)
const isLoading = ref(false)

const handleLoadingConfirm = () => {
  console.log('已确认')
}
</script>
