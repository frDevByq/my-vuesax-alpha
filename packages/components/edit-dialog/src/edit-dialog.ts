import { buildProps } from '@vuesax-alpha/utils'
import type { ExtractPropTypes } from 'vue'
import type EditDialog from './edit-dialog.vue'

export const editDialogProps = buildProps({
  /**
   * @description visibility of EditDialog
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * @description dialog mode: 'create' or 'edit'
   */
  mode: {
    type: String,
    values: ['create', 'edit'] as const,
    default: 'edit',
  },
  /**
   * @description dialog title
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description dialog subtitle
   */
  subtitle: {
    type: String,
    default: '',
  },
  /**
   * @description confirm button text
   */
  confirmText: {
    type: String,
    default: '',
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
  /**
   * @description form data
   */
  data: {
    type: Object,
    default: () => ({}),
  },
  /**
   * @description dialog width
   */
  width: {
    type: String,
    default: '560px',
  },
} as const)

export const editDialogEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  confirm: (
    mode: 'create' | 'edit',
    data: Record<string, any>,
    done?: () => void
  ) => true,
  cancel: () => true,
  close: () => true,
}

export type EditDialogProps = ExtractPropTypes<typeof editDialogProps>
export type EditDialogEmits = typeof editDialogEmits
export type EditDialogInstance = InstanceType<typeof EditDialog>
