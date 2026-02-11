---
PROPS:
  - name: title
    type: String, VNode
    values: String, VNode
    description: 对话框标题（支持字符串或 VNode）
    default: null
    link: null
    usage: '#default'
    code: null

  - name: content
    type: String, VNode
    values: String, VNode
    description: 对话框内容（支持字符串或 VNode）
    default: null
    link: null
    usage: '#default'
    code: null

  - name: type
    type: String
    values: success, error, warning, info, danger
    description: 对话框类型，决定图标和按钮颜色
    default: info
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
    default: true
    link: null
    usage: '#async'
    code: null

  - name: loading
    type: Boolean
    values: true, false
    description: 对话框内容区域的加载状态
    default: false
    link: null
    usage: '#default'
    code: null

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

# Confirm Dialog Service

<card>

## 注册

支持全局注册和按需调用，两种方式都可用。

<command>

```ts
// 全局注册，可通过 this.$confirmDialog 使用
import { createApp } from 'vue'
import { VsConfirmDialogService } from 'vuesax-alpha'

const app = createApp(App)
app.use(VsConfirmDialogService)
```

```ts
// 按需调用，无需注册
import { VsConfirmDialogService } from 'vuesax-alpha'

VsConfirmDialogService({
  title: '确认',
  content: '确定继续？',
})
```

</command>

</card>

<card>

## 默认

函数式调用可以在任意位置弹出确认弹窗，返回的实例支持手动关闭。

<command>

```ts
import { VsConfirmDialogService } from 'vuesax-alpha'

const { close, setConfirmLoading } = VsConfirmDialogService({
  title: '确认删除',
  content: '删除后无法恢复，是否继续？',
  type: 'danger',
  onConfirm: () => {
    // 确认逻辑
  },
  onCancel: () => {
    // 取消逻辑
  },
  onClose: () => {
    // 关闭后回调
  },
})

setConfirmLoading(true)
```

</command>

</card>

<card>

## VNode 内容

支持 `title` 和 `content` 传入 VNode。

<command>

```ts
import { h } from 'vue'
import { VsConfirmDialogService } from 'vuesax-alpha'

VsConfirmDialogService({
  title: h('span', { style: 'color:#f59e0b' }, '危险操作'),
  content: h('div', null, [
    h('strong', null, '确定要删除该记录吗？'),
    h('div', { style: 'margin-top:8px;color:#94a3b8' }, '此操作不可撤销。'),
  ]),
  type: 'warning',
})
```

</command>

</card>
