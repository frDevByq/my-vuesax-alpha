---
PROPS:
  - name: v-model
    type: Boolean
    values: true, false
    description: 控制信息弹窗的显示/隐藏状态
    default: false
    link: null
    usage: '#default'
    code: null

  - name: title
    type: String
    values: String
    description: 弹窗标题
    default: '提示信息'
    link: null
    usage: '#default'
    code: null

  - name: description
    type: String
    values: String
    description: 弹窗描述内容
    default: ''
    link: null
    usage: '#default'
    code: null

  - name: loading
    type: Boolean
    values: true, false
    description: 内容区域加载状态
    default: false
    link: null
    usage: '#loading'
    code: null

  - name: color
    type: String
    values: HEX / RGB / CSS Color
    description: 图标背景色与 loading 强调色
    default: '#3b82f6'
    link: null
    usage: '#color'
    code: null

  - name: min-width
    type: String
    values: CSS width value
    description: 弹窗最小宽度
    default: '360px'
    link: null
    usage: '#size'
    code: null

  - name: show-close
    type: Boolean
    values: true, false
    description: 是否显示右上角关闭按钮
    default: true
    link: null
    usage: '#actions'
    code: null

  - name: show-cancel
    type: Boolean
    values: true, false
    description: 是否显示取消按钮
    default: true
    link: null
    usage: '#actions'
    code: null

  - name: show-confirm
    type: Boolean
    values: true, false
    description: 是否显示确认按钮
    default: true
    link: null
    usage: '#actions'
    code: null

  - name: cancel-text
    type: String
    values: String
    description: 取消按钮文本
    default: '取消'
    link: null
    usage: '#actions'
    code: null

  - name: confirm-text
    type: String
    values: String
    description: 确认按钮文本
    default: '确认'
    link: null
    usage: '#actions'
    code: null

  - name: prevent-close
    type: Boolean
    values: true, false
    description: 是否阻止点击遮罩层关闭
    default: false
    link: null
    usage: '#default'
    code: null

SLOTS:
  - name: icon
    type: Slot
    values: null
    description: 自定义顶部圆形图标内容
    default: 内置信息图标
    link: null
    usage: '#slots'

  - name: title
    type: Slot
    values: null
    description: 自定义标题内容
    default: null
    link: null
    usage: '#slots'

  - name: default
    type: Slot
    values: null
    description: 自定义主体内容
    default: null
    link: null
    usage: '#slots'

EVENTS:
  - name: confirm
    type: Event
    values: '() => void'
    description: 点击确认按钮触发
    default: null
    link: null
    usage: '#events'

  - name: cancel
    type: Event
    values: '() => void'
    description: 点击取消按钮、关闭按钮或遮罩层触发
    default: null
    link: null
    usage: '#events'

  - name: close
    type: Event
    values: '() => void'
    description: 弹窗关闭动画结束后触发
    default: null
    link: null
    usage: '#events'
---

# Info Dialog

<card>

## Default

基础信息弹窗，支持顶部突出的圆形图标区域。

```vue
<template>
  <vs-button @click="visible = true">打开</vs-button>

  <vs-info-dialog
    v-model="visible"
    title="提示信息"
    description="这是一条默认信息提示"
  />
</template>
```

</card>

<card>

## Loading

通过 `loading` 控制内容区加载状态。

```vue
<vs-info-dialog
  v-model="visible"
  :loading="loading"
  title="正在处理"
  description="请稍候..."
/>
```

</card>

<card>

## Color

通过 `color` 指定图标背景色和 loading 主题色。

```vue
<vs-info-dialog
  v-model="visible"
  color="#10b981"
  title="维护通知"
  description="今晚 23:30 - 23:50 系统维护"
/>
```

</card>

<card>

## Size

通过 `min-width` 指定最小宽度。

```vue
<vs-info-dialog
  v-model="visible"
  min-width="480px"
  title="宽版提示"
/>
```

</card>

<card>

## Actions

可以控制确认/取消按钮显隐，并自定义按钮文案。

```vue
<vs-info-dialog
  v-model="visible"
  :show-cancel="false"
  :show-confirm="true"
  confirm-text="我知道了"
/>
```

</card>

<card>

## Slots

支持 `icon`、`title`、默认插槽。

```vue
<vs-info-dialog v-model="visible">
  <template #icon>
    <icon-lucide-alert-circle />
  </template>

  <template #title>
    系统公告
  </template>

  请先保存当前编辑内容，避免丢失。
</vs-info-dialog>
```

</card>

<card>

## Events

```vue
<vs-info-dialog
  v-model="visible"
  @confirm="onConfirm"
  @cancel="onCancel"
  @close="onClose"
/>
```

</card>
