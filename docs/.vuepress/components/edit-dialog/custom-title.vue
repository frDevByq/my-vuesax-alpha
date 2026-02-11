<template>
  <vs-button @click="showCustom = true">自定义标题</vs-button>

  <vs-edit-dialog v-model="showCustom" :data="customData">
    <template #title>
      <span style="color: #0066ff;">✨ 个性化设置</span>
    </template>
    <template #subtitle>
      <span style="color: #64748b;">自定义您的个人偏好和显示选项</span>
    </template>
    <template #default="{ data }">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <vs-input v-model="data.theme" label="主题" placeholder="请选择主题" />
        <vs-input v-model="data.language" label="语言" placeholder="请选择语言" />
      </div>
    </template>
  </vs-edit-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

type CustomForm = {
  theme: string
  language: string
}

const showCustom = ref(false)
const customData = ref<CustomForm>({
  theme: '',
  language: '',
})
</script>
