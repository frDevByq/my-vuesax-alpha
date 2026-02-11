<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <vs-button @click="showConfirm = true">打开确认对话框</vs-button>
  </div>

  <vs-confirm-dialog
    v-model="showConfirm"
    title="确认操作"
    description="您确定要执行此操作吗？此操作无法撤销。"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showConfirm = ref(false)

const handleConfirm = () => {
  console.log('已确认')
}

const handleCancel = () => {
  console.log('已取消')
}
</script>
