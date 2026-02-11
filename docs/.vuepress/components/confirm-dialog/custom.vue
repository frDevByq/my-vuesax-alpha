<template>
  <vs-button @click="showCustom = true">自定义内容</vs-button>

  <vs-confirm-dialog v-model="showCustom" type="warning">
    <template #title>
      <span style="color: #f59e0b;">⚠️ 重要提示</span>
    </template>
    <template #default>
      <div style="text-align: left;">
        <p style="margin: 0 0 8px 0;">请注意以下事项：</p>
        <ul style="margin: 0; padding-left: 20px;">
          <li>此操作不可撤销</li>
          <li>可能影响其他关联数据</li>
          <li>建议先备份重要数据</li>
        </ul>
      </div>
    </template>
  </vs-confirm-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCustom = ref(false)
</script>
