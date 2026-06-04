import { isNil } from 'lodash-unified'
import { UPDATE_MODEL_EVENT } from '@vuesax-alpha/constants'
import { useColorProp } from '@vuesax-alpha/hooks'
import {
  buildProps,
  definePropType,
  isNumber,
  isString,
} from '@vuesax-alpha/utils'

import type { ExtractPropTypes, StyleValue } from 'vue'
import type { EmitFn } from '@vuesax-alpha/utils'
import type Textarea from './textarea.vue'

export const textareaStyleValues = [
  'border',
  'shadow',
  'transparent',
  'soft',
] as const

export type TextareaStyleType = (typeof textareaStyleValues)[number]
export type TextareaAutosize = boolean | { minRows?: number; maxRows?: number }

export const textareaProps = buildProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  labelFloat: {
    type: Boolean,
    default: false,
  },
  labelFloatNospace: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 4,
  },
  autosize: {
    type: definePropType<TextareaAutosize>([Boolean, Object]),
    default: false,
  },
  resize: {
    type: String,
    values: ['none', 'both', 'horizontal', 'vertical'] as const,
    default: 'vertical',
  },
  maxlength: {
    type: Number,
  },
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  color: useColorProp,
  state: useColorProp,
  inputStyle: {
    type: String,
    values: textareaStyleValues,
  },
  id: {
    type: String,
  },
  wrapClasses: {
    type: String,
  },
  wrapStyles: {
    type: definePropType<StyleValue>([String, Object, Array]),
  },
} as const)

export const textareaEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (value: string) => !isNil(value),
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  resize: (height: number) => isNumber(height),
}

export type TextareaProps = ExtractPropTypes<typeof textareaProps>
export type TextareaEmits = typeof textareaEmits
export type TextareaEmitsFn = EmitFn<TextareaEmits>
export type TextareaInstance = InstanceType<typeof Textarea>
