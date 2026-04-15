import { buildProps } from '@vuesax-alpha/utils'
import type { ExtractPropTypes } from 'vue'
import type InfoDialog from './info-dialog.vue'

export const infoDialogProps = buildProps({
  /**
   * @description visibility of InfoDialog
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * @description dialog title
   */
  title: {
    type: String,
    default: '提示信息',
  },
  /**
   * @description dialog description
   */
  description: {
    type: String,
    default: '',
  },
  /**
   * @description dialog loading state
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * @description icon and loading accent color
   */
  color: {
    type: String,
    default: '#3b82f6',
  },
  /**
   * @description dialog minimum width
   */
  minWidth: {
    type: String,
    default: '360px',
  },
  /**
   * @description show close button
   */
  showClose: {
    type: Boolean,
    default: true,
  },
  /**
   * @description show cancel button
   */
  showCancel: {
    type: Boolean,
    default: true,
  },
  /**
   * @description show confirm button
   */
  showConfirm: {
    type: Boolean,
    default: true,
  },
  /**
   * @description cancel button text
   */
  cancelText: {
    type: String,
    default: '取消',
  },
  /**
   * @description confirm button text
   */
  confirmText: {
    type: String,
    default: '确认',
  },
  /**
   * @description prevent close on overlay click
   */
  preventClose: {
    type: Boolean,
    default: false,
  },
} as const)

export const infoDialogEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  confirm: () => true,
  cancel: () => true,
  close: () => true,
}

export type InfoDialogProps = ExtractPropTypes<typeof infoDialogProps>
export type InfoDialogEmits = typeof infoDialogEmits
export type InfoDialogInstance = InstanceType<typeof InfoDialog>
