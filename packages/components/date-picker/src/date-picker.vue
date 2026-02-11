<template>
  <div :class="[ns.b(), ns.is('range', range)]">
    <vs-popper
      v-model:visible="visible"
      trigger="click"
      placement="bottom-start"
      :disabled="disabled"
      :popper-class="ns.e('content')"
      :show-arrow="false"
    >
      <template #default>
        <div :class="ns.e('reference')">
        <div v-if="range" :class="ns.e('range')">
          <vs-input
            v-model="startDisplay"
            :disabled="disabled"
            :placeholder="startPlaceholder"
            :label="startLabel || label"
            :label-float="labelFloatEnabled"
            :label-float-nospace="labelFloatNospace"
            readonly
            :wrap-classes="ns.e('range-input')"
          >
            <template v-if="$slots.icon || icon" #icon>
              <slot name="icon">
                <component :is="icon" />
              </slot>
            </template>
          </vs-input>
          <span :class="ns.e('range-separator')">{{ rangeSeparator }}</span>
          <vs-input
            v-model="endDisplay"
            :disabled="disabled"
            :placeholder="endPlaceholder"
            :label="endLabel || label"
            :label-float="labelFloatEnabled"
            :label-float-nospace="labelFloatNospace"
            readonly
            :wrap-classes="ns.e('range-input')"
          >
            <template v-if="$slots.icon || icon" #icon>
              <slot name="icon">
                <component :is="icon" />
              </slot>
            </template>
          </vs-input>
        </div>
          <vs-input
            v-else
            v-model="displayValue"
            :disabled="disabled"
            :placeholder="placeholder"
            :label="label"
            :label-float="labelFloatEnabled"
            :label-float-nospace="labelFloatNospace"
            readonly
            :wrap-classes="ns.e('single-input')"
          >
            <template v-if="$slots.icon || icon" #icon>
              <slot name="icon">
                <component :is="icon" />
              </slot>
            </template>
          </vs-input>
        </div>
      </template>
      <template #content>
        <div :class="ns.e('panels')">
          <date-picker-panel
            v-if="!range"
            v-model="innerValue"
            :format="format"
            :show-time="showTime"
            :time-zero="timeZero"
            :fixed-time="fixedTime"
            :disabled="disabled"
          />
          <template v-else>
            <date-picker-panel
              v-model="innerStart"
              :range-start="innerStart"
              :range-end="innerEnd"
              :format="format"
              :show-time="showTime"
              :time-zero="timeZero"
              :fixed-time="fixedTime"
              :placeholder="startPlaceholder"
              :disabled="disabled"
            />
            <date-picker-panel
              v-model="innerEnd"
              :range-start="innerStart"
              :range-end="innerEnd"
              :format="format"
              :show-time="showTime"
              :time-zero="timeZero"
              :fixed-time="fixedTime"
              :placeholder="endPlaceholder"
              :disabled="disabled"
            />
          </template>
        </div>
      </template>
    </vs-popper>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { VsInput } from '@vuesax-alpha/components/input'
import { VsPopper } from '@vuesax-alpha/components/popper'
import { useNamespace } from '@vuesax-alpha/hooks'
import { formatDateValue } from './utils'
import DatePickerPanel from './date-picker-panel.vue'
import { datePickerProps } from './date-picker'

defineOptions({
  name: 'VsDatePicker',
})

const props = defineProps(datePickerProps)
const emit = defineEmits(['update:value', 'update:startTime', 'update:endTime'])

const ns = useNamespace('date-picker')
const visible = ref(false)

const displayValue = computed({
  get: () => formatDateValue(props.value, props.format),
  set: () => {},
})

const startDisplay = computed({
  get: () => formatDateValue(props.startTime, props.format),
  set: () => {},
})

const endDisplay = computed({
  get: () => formatDateValue(props.endTime, props.format),
  set: () => {},
})

const labelFloatEnabled = computed(() => {
  if (props.labelFloatNospace) {
    return true
  }
  return props.labelFloat || Boolean(props.label)
})

const innerValue = computed({
  get: () => props.value,
  set: (value: string) => emit('update:value', value),
})

const innerStart = computed({
  get: () => props.startTime,
  set: (value: string) => emit('update:startTime', value),
})

const innerEnd = computed({
  get: () => props.endTime,
  set: (value: string) => emit('update:endTime', value),
})
</script>
