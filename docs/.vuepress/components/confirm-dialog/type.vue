<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <vs-button color="success" @click="showSuccess = true">Success</vs-button>
    <vs-button color="danger" @click="showError = true">Error</vs-button>
    <vs-button color="warning" @click="showWarning = true">Warning</vs-button>
    <vs-button color="primary" @click="showInfo = true">Info</vs-button>
    <vs-button color="danger" @click="showDanger = true">Danger</vs-button>
  </div>

  <vs-confirm-dialog
    v-model="showSuccess"
    type="success"
    title="操作成功"
    description="您的操作已成功完成！"
  />

  <vs-confirm-dialog
    v-model="showError"
    type="error"
    title="操作失败"
    description="抱歉，操作执行失败，请稍后重试。"
  />

  <vs-confirm-dialog
    v-model="showWarning"
    type="warning"
    title="警告"
    description="此操作可能会影响系统性能，请谨慎操作。"
  />

  <vs-confirm-dialog
    v-model="showInfo"
    type="info"
    title="提示信息"
    description="这是一条重要的提示信息。"
  />

  <vs-confirm-dialog
    v-model="showDanger"
    type="danger"
    title="删除确认"
    description="您确定要删除此项吗？删除后无法恢复。"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showSuccess = ref(false)
const showError = ref(false)
const showWarning = ref(false)
const showInfo = ref(false)
const showDanger = ref(false)
</script>
