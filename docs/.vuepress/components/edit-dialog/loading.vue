<template>
  <vs-button @click="showLoading = true">加载状态</vs-button>

  <vs-edit-dialog
    v-model="showLoading"
    :data="loadingData"
    :loading="isLoading"
  >
    <template #default="{ data }">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <vs-input v-model="data.name" label="姓名" placeholder="请输入姓名" />
        <vs-input v-model="data.email" label="邮箱" placeholder="请输入邮箱" />
      </div>
    </template>
  </vs-edit-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

type LoadingForm = {
  name: string
  email: string
}

const showLoading = ref(false)
const isLoading = ref(false)
const loadingData = ref<LoadingForm>({
  name: '',
  email: '',
})

watch(showLoading, (val) => {
  if (val) {
    isLoading.value = true
    setTimeout(() => {
      loadingData.value = {
        name: '王五',
        email: 'wangwu@example.com',
      }
      isLoading.value = false
    }, 1500)
  }
})
</script>
