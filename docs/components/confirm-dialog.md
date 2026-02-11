---
PROPS:
  - name: v-model
    type: Boolean
    values: true, false
    description: 控制确认对话框的显示/隐藏状态
    default: false
    link: null
    usage: '#default'
    code: null

  - name: type
    type: String
    values: success, error, warning, info, danger
    description: 确认对话框的类型，决定图标和按钮颜色
    default: success
    link: null
    usage: '#type'
    code: null

  - name: title
    type: String
    values: String
    description: 对话框标题
    default: null
    link: null
    usage: '#default'
    code: null

  - name: description
    type: String
    values: String
    description: 对话框描述文本
    default: null
    link: null
    usage: '#default'
    code: null

  - name: confirm-text
    type: String
    values: String
    description: 确认按钮文本
    default: '确认'
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

  - name: show-close
    type: Boolean
    values: true, false
    description: 是否显示关闭按钮
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

  - name: default
    type: Slot
    values: null
    description: 自定义描述内容
    default: null
    link: null
    usage: '#default'

EVENTS:
  - name: confirm
    type: Event
    values: '(done?: Function) => void'
    description: 点击确认按钮时触发，如果 await-confirm 为 true，会传入 done 回调函数
    default: null
    link: null
    usage: '#async'

  - name: cancel
    type: Event
    values: '() => void'
    description: 点击取消按钮或关闭按钮时触发
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

# Confirm Dialog

<card>

## 默认

<docs-warn />

确认对话框组件用于需要用户确认的操作场景，提供了美观的动画效果和多种类型选择。

<template #example>
<confirm-dialog-default />
</template>

<template #template>
@[code vue](../.vuepress/components/confirm-dialog/default.vue)

</template>

</card>

<card>

## 类型

通过 `type` 属性可以设置不同类型的确认对话框，支持 `success`、`error`、`warning`、`info`、`danger` 五种类型。

<template #example>
<confirm-dialog-type />
</template>

<template #template>
@[code vue](../.vuepress/components/confirm-dialog/type.vue)

</template>

</card>

<card>

## 异步确认

使用 `await-confirm` 属性可以实现异步确认操作，确认按钮会显示加载状态，操作完成后自动关闭对话框。

<template #example>
<confirm-dialog-async />
</template>

<template #template>
@[code vue](../.vuepress/components/confirm-dialog/async.vue)

</template>

</card>

<card>

## 加载状态

使用 `loading` 属性可以在对话框内容区域显示加载动画。

<template #example>
<confirm-dialog-loading />
</template>

<template #template>
@[code vue](../.vuepress/components/confirm-dialog/loading.vue)

</template>

</card>

<card>

## 自定义内容

通过插槽可以自定义标题和描述内容。

<template #example>
<confirm-dialog-custom />
</template>

<template #template>
@[code vue](../.vuepress/components/confirm-dialog/custom.vue)

</template>

</card>

<card>

## API

</card>
