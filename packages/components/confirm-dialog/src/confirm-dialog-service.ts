import { createVNode, isVNode, reactive, render } from 'vue'
import { isClient } from '@vuesax-alpha/utils'
import ConfirmDialogConstructor from './confirm-dialog.vue'
import type { VNode } from 'vue'
import type { ConfirmDialogEmits, ConfirmDialogProps } from './confirm-dialog'

export type ConfirmDialogContent = string | VNode

export type ConfirmDialogServiceOptions = Partial<
  Omit<ConfirmDialogProps, 'modelValue' | 'title' | 'description'>
> & {
  title?: ConfirmDialogContent
  content?: ConfirmDialogContent
  description?: ConfirmDialogContent
  onConfirm?: ConfirmDialogEmits['confirm']
  onCancel?: ConfirmDialogEmits['cancel']
  onClose?: ConfirmDialogEmits['close']
}

export interface ConfirmDialogServiceHandle {
  close: () => void
  setConfirmLoading: (loading: boolean) => void
}

export const confirmDialogService = (
  options: ConfirmDialogServiceOptions = {}
): ConfirmDialogServiceHandle => {
  if (!isClient) {
    return {
      close: () => undefined,
      setConfirmLoading: () => undefined,
    }
  }

  const { title, content, description, onConfirm, onCancel, onClose, ...rest } =
    options

  const resolvedContent = content ?? description

  const container = document.createElement('div')
  document.body.appendChild(container)

  let destroyed = false
  const destroy = () => {
    if (destroyed) return
    destroyed = true
    render(null, container)
    container.remove()
  }

  const props: any = reactive({
    ...rest,
    modelValue: true,
    title: title && !isVNode(title) ? title : undefined,
    description:
      resolvedContent && !isVNode(resolvedContent)
        ? resolvedContent
        : undefined,
    onConfirm,
    onCancel,
    onClose: () => {
      onClose?.()
      destroy()
    },
    'onUpdate:modelValue': (value: boolean) => {
      props.modelValue = value
    },
  })

  const slots: Record<string, () => VNode> = {}

  if (title !== undefined && isVNode(title)) {
    slots.title = () => title
  }

  if (resolvedContent !== undefined && isVNode(resolvedContent)) {
    slots.default = () => resolvedContent
  }

  const vm = createVNode(ConfirmDialogConstructor, props, slots)
  render(vm, container)

  const close = () => {
    props.modelValue = false
  }

  return {
    close,
    setConfirmLoading: (loading: boolean) => {
      props.confirmLoading = loading
    },
  }
}

export default confirmDialogService
