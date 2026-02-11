<template>
  <vs-button @click="showAsync = true">异步提交</vs-button>

  <vs-edit-dialog
    v-model="showAsync"
    mode="create"
    :data="asyncData"
    await-confirm
    @confirm="handleAsyncConfirm"
  >
    <template #default="{ data }">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <vs-input v-model="data.title" label="标题" placeholder="请输入标题" />
        <vs-input v-model="data.content" label="内容" placeholder="请输入内容" />
      </div>
    </template>
  </vs-edit-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

type Done = (close?: boolean) => void

type AsyncForm = {
  title: string
  content: string
}

const showAsync = ref(false)
const asyncData = ref<AsyncForm>({
  title: '',
  content: '',
})

const handleAsyncConfirm = (
  mode: 'create' | 'edit',
  data: AsyncForm,
  done?: Done,
) => {
  setTimeout(() => {
    console.log('提交数据:', mode, data)
    done?.(true)
  }, 2000)
}
</script>
