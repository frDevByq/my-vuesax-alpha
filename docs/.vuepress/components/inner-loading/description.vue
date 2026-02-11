<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <vs-button @click="loadData">加载数据</vs-button>
  </div>

  <vs-inner-loading :loading="dataLoading" color="#0066ff" min-height="200px">
    <template #description>
      <div style="font-size: 14px; color: #64748b; font-weight: 500;">
        正在加载数据，请稍候...
      </div>
    </template>
    <div style="padding: 20px;">
      <h3 style="margin: 0 0 12px 0;">数据列表</h3>
      <ul style="margin: 0; padding-left: 20px; color: #64748b;">
        <li>数据项 1</li>
        <li>数据项 2</li>
        <li>数据项 3</li>
      </ul>
    </div>
  </vs-inner-loading>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dataLoading = ref(false)

const loadData = () => {
  dataLoading.value = true
  setTimeout(() => {
    dataLoading.value = false
  }, 2000)
}
</script>
