<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <vs-button @click="openEditDialog">编辑资料</vs-button>
  </div>

  <vs-edit-dialog
    v-model="showEdit"
    mode="edit"
    :data="userData"
    @confirm="handleEditConfirm"
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
import { ref } from 'vue'

type UserForm = {
  name: string
  email: string
}

const showEdit = ref(false)
const userData = ref<UserForm>({
  name: '张三',
  email: 'zhangsan@example.com',
})

const openEditDialog = () => {
  showEdit.value = true
}

const handleEditConfirm = (mode: 'create' | 'edit', data: UserForm) => {
  console.log('模式:', mode)
  console.log('数据:', data)
}
</script>
