import { buildProps } from '@vuesax-alpha/utils'
import type { ExtractPropTypes } from 'vue'
import type ConfirmDialog from './confirm-dialog.vue'

export const confirmDialogProps = buildProps({
  /**
   * @description visibility of ConfirmDialog
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * @description dialog type
   */
  type: {
    type: String,
    values: ['success', 'error', 'warning', 'info', 'danger'] as const,
    default: 'info',
  },
  /**
   * @description dialog title
   */
  title: {
    type: String,
    default: '确认操作',
  },
  /**
   * @description dialog description
   */
  description: {
    type: String,
    default: '您确定要执行此操作吗?',
  },
  /**
   * @description confirm button text
   */
  confirmText: {
    type: String,
    default: '确认',
  },
  /**
   * @description cancel button text
   */
  cancelText: {
    type: String,
    default: '取消',
  },
  /**
   * @description show cancel button
   */
  showCancel: {
    type: Boolean,
    default: true,
  },
  /**
   * @description show close button
   */
  showClose: {
    type: Boolean,
    default: true,
  },
  /**
   * @description prevent close on overlay click
   */
  preventClose: {
    type: Boolean,
    default: false,
  },
  /**
   * @description dialog loading state
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * @description confirm button loading state
   */
  confirmLoading: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description await confirm callback
   */
  awaitConfirm: {
    type: Boolean,
    default: false,
  },
  /**
   * @description prevent close when confirm loading
   */
  confirmLoadingNotClose: {
    type: Boolean,
    default: true,
  },
} as const)

export const confirmDialogEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  confirm: (done?: () => void) => true,
  cancel: () => true,
  close: () => true,
}

export type ConfirmDialogProps = ExtractPropTypes<typeof confirmDialogProps>
export type ConfirmDialogEmits = typeof confirmDialogEmits
export type ConfirmDialogInstance = InstanceType<typeof ConfirmDialog>
