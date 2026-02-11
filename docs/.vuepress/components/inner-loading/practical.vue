<template>
  <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
    <vs-inner-loading :loading="formLoading" color="success" min-height="300px">
      <template #description>
        <div style="font-size: 13px; color: #94a3b8;">正在提交表单...</div>
      </template>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <vs-input v-model="formData.name" label="姓名" placeholder="请输入姓名" />
        <vs-input v-model="formData.email" label="邮箱" placeholder="请输入邮箱" />
        <vs-input v-model="formData.phone" label="电话" placeholder="请输入电话" />
        <vs-button color="success" @click="submitForm">提交表单</vs-button>
      </div>
    </vs-inner-loading>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

type FormData = {
  name: string
  email: string
  phone: string
}

const formLoading = ref(false)
const formData = ref<FormData>({
  name: '',
  email: '',
  phone: '',
})

const submitForm = () => {
  formLoading.value = true
  setTimeout(() => {
    console.log('表单提交成功:', formData.value)
    formLoading.value = false
  }, 2000)
}
</script>
