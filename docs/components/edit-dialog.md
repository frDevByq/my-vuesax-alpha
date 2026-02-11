---
PROPS:
  - name: v-model
    type: Boolean
    values: true, false
    description: 控制编辑对话框的显示/隐藏状态
    default: false
    link: null
    usage: '#default'
    code: null

  - name: mode
    type: String
    values: create, edit
    description: 对话框模式，决定标题和按钮文本
    default: edit
    link: null
    usage: '#mode'
    code: null

  - name: title
    type: String
    values: String
    description: 对话框标题（优先级高于 mode 自动标题）
    default: null
    link: null
    usage: '#default'
    code: null

  - name: subtitle
    type: String
    values: String
    description: 对话框副标题（优先级高于 mode 自动副标题）
    default: null
    link: null
    usage: '#default'
    code: null

  - name: width
    type: String
    values: CSS width value
    description: 对话框宽度
    default: '560px'
    link: null
    usage: '#default'
    code: null

  - name: data
    type: Object
    values: Record<string, any>
    description: 表单数据对象
    default: {}
    link: null
    usage: '#default'
    code: null

  - name: confirm-text
    type: String
    values: String
    description: 确认按钮文本（优先级高于 mode 自动文本）
    default: null
    link: null
    usage: '#default'
    code: null

  - name: cancel-text
    type: String
    values: String
    description: 取消按钮文本
    default: '取消'
    link: null
    usage: '#default'
    code: null

  - name: show-cancel
    type: Boolean
    values: true, false
    description: 是否显示取消按钮
    default: true
    link: null
    usage: '#default'
    code: null

  - name: prevent-close
    type: Boolean
    values: true, false
    description: 是否阻止点击遮罩层关闭对话框
    default: false
    link: null
    usage: '#default'
    code: null

  - name: await-confirm
    type: Boolean
    values: true, false
    description: 是否等待异步确认操作完成
    default: false
    link: null
    usage: '#async'
    code: null

  - name: confirm-loading
    type: Boolean
    values: true, false
    description: 确认按钮的加载状态（外部控制）
    default: undefined
    link: null
    usage: '#async'
    code: null

  - name: confirm-loading-not-close
    type: Boolean
    values: true, false
    description: 确认加载时是否禁止关闭对话框
    default: false
    link: null
    usage: '#async'
    code: null

  - name: loading
    type: Boolean
    values: true, false
    description: 对话框内容区域的加载状态
    default: false
    link: null
    usage: '#loading'
    code: null

SLOTS:
  - name: title
    type: Slot
    values: null
    description: 自定义标题内容
    default: null
    link: null
    usage: '#default'

  - name: subtitle
    type: Slot
    values: null
    description: 自定义副标题内容
    default: null
    link: null
    usage: '#default'

  - name: default
    type: Slot
    values: "{ data: Record<string, any>, mode: 'create' | 'edit' }"
    description: 表单内容插槽，接收 data 和 mode 作为插槽参数
    default: null
    link: null
    usage: '#default'

EVENTS:
  - name: confirm
    type: Event
    values: "(mode: 'create' | 'edit', data: Record<string, any>, done?: Function) => void"
    description: 点击确认按钮时触发，传入模式、数据和可选的 done 回调
    default: null
    link: null
    usage: '#async'

  - name: cancel
    type: Event
    values: '() => void'
    description: 点击取消按钮时触发
    default: null
    link: null
    usage: '#default'

  - name: close
    type: Event
    values: '() => void'
    description: 对话框关闭后触发
    default: null
    link: null
    usage: '#default'
---

# Edit Dialog

<card>

## 默认

<docs-warn />

编辑对话框组件用于创建和编辑数据的场景，提供了流光边框效果和毛玻璃背景。

<template #example>
<edit-dialog-default />
</template>

<template #template>
@[code vue](../.vuepress/components/edit-dialog/default.vue)

</template>

</card>

<card>

## 模式

通过 `mode` 属性可以设置对话框的模式，支持 `create` 和 `edit` 两种模式，会自动调整标题和按钮文本。

<template #example>
<edit-dialog-mode />
</template>

<template #template>
@[code vue](../.vuepress/components/edit-dialog/mode.vue)

</template>

</card>

<card>

## 异步确认

使用 `await-confirm` 属性可以实现异步确认操作，确认按钮会显示加载状态，操作完成后自动关闭对话框。

<template #example>
<edit-dialog-async />
</template>

<template #template>
@[code vue](../.vuepress/components/edit-dialog/async.vue)

</template>

</card>

<card>

## 自定义标题

通过插槽可以自定义标题和副标题内容。

<template #example>
<edit-dialog-custom-title />
</template>

<template #template>
@[code vue](../.vuepress/components/edit-dialog/custom-title.vue)

</template>

</card>

<card>

## 加载状态

使用 `loading` 属性可以在对话框内容区域显示加载动画。

<template #example>
<edit-dialog-loading />
</template>

<template #template>
@[code vue](../.vuepress/components/edit-dialog/loading.vue)

</template>

</card>

<card>

## API

</card>
