<template>
  <vs-button @click="showAsync = true">异步确认</vs-button>

  <vs-confirm-dialog
    v-model="showAsync"
    type="info"
    title="提交数据"
    description="确认提交数据到服务器？"
    await-confirm
    @confirm="handleAsyncConfirm"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

type Done = (close?: boolean) => void

const showAsync = ref(false)

const handleAsyncConfirm = (done?: Done) => {
  setTimeout(() => {
    console.log('数据提交成功')
    done?.(true)
  }, 2000)
}
</script>
