<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <vs-button @click="openCreateDialog">创建用户</vs-button>
    <vs-button @click="openEditDialog">编辑用户</vs-button>
  </div>

  <vs-edit-dialog
    v-model="showCreate"
    mode="create"
    :data="newUser"
    @confirm="handleCreateConfirm"
  >
    <template #default="{ data }">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <vs-input v-model="data.name" label="姓名" placeholder="请输入姓名" />
        <vs-input v-model="data.email" label="邮箱" placeholder="请输入邮箱" />
        <vs-input v-model="data.role" label="角色" placeholder="请输入角色" />
      </div>
    </template>
  </vs-edit-dialog>

  <vs-edit-dialog
    v-model="showEdit"
    mode="edit"
    :data="existingUser"
    @confirm="handleEditConfirm"
  >
    <template #default="{ data }">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <vs-input v-model="data.name" label="姓名" placeholder="请输入姓名" />
        <vs-input v-model="data.email" label="邮箱" placeholder="请输入邮箱" />
        <vs-input v-model="data.role" label="角色" placeholder="请输入角色" />
      </div>
    </template>
  </vs-edit-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

type UserForm = {
  name: string
  email: string
  role: string
}

const showCreate = ref(false)
const showEdit = ref(false)

const newUser = ref<UserForm>({
  name: '',
  email: '',
  role: '',
})

const existingUser = ref<UserForm>({
  name: '李四',
  email: 'lisi@example.com',
  role: '管理员',
})

const openCreateDialog = () => {
  showCreate.value = true
}

const openEditDialog = () => {
  showEdit.value = true
}

const handleCreateConfirm = (mode: 'create' | 'edit', data: UserForm) => {
  console.log('创建用户:', mode, data)
}

const handleEditConfirm = (mode: 'create' | 'edit', data: UserForm) => {
  console.log('更新用户:', mode, data)
}
</script>
