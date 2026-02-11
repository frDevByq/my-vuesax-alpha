import { definePropType } from '@vuesax-alpha/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type DatePicker from './date-picker.vue'
import type { Component } from 'vue'

export interface FixedTime {
  hour?: string | number
  minute?: string | number
  second?: string | number
}

export interface TimeValue {
  hour: number
  minute: number
  second: number
}

export const datePickerProps = {
  value: {
    type: String,
    default: '',
  },
  startTime: {
    type: String,
    default: '',
  },
  endTime: {
    type: String,
    default: '',
  },
  range: {
    type: Boolean,
    default: false,
  },
  format: {
    type: String,
    default: 'yyyy-MM-dd HH:mm:ss',
  },
  showTime: {
    type: Boolean,
    default: true,
  },
  timeZero: {
    type: Boolean,
    default: true,
  },
  fixedTime: {
    type: definePropType<FixedTime>(Object),
    default: () => ({}),
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  labelFloat: {
    type: Boolean,
    default: false,
  },
  labelFloatNospace: {
    type: Boolean,
    default: false,
  },
  startPlaceholder: {
    type: String,
    default: '',
  },
  startLabel: {
    type: String,
    default: '',
  },
  endPlaceholder: {
    type: String,
    default: '',
  },
  endLabel: {
    type: String,
    default: '',
  },
  icon: {
    type: definePropType<string | Component>([String, Object]),
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rangeSeparator: {
    type: String as PropType<string>,
    default: '-',
  },
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>

export type DatePickerInstance = InstanceType<typeof DatePicker>
