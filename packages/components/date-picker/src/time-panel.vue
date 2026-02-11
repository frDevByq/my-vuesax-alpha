<template>
  <div :class="ns.e('time-panel')">
    <div :class="ns.e('time-item')">
      <vs-select
        ref="hourSelectRef"
        v-model="hourValue"
        :disabled="hourDisabled"
        :placeholder="hourPlaceholder"
        filter
        :filter-method="handleHourFilter"
        size="small"
        @focus="() => focusFilterInput(hourSelectRef)"
      >
        <vs-option
          v-for="item in hourOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </vs-select>
    </div>
    <div :class="ns.e('time-item')">
      <vs-select
        ref="minuteSelectRef"
        v-model="minuteValue"
        :disabled="minuteDisabled"
        :placeholder="minutePlaceholder"
        filter
        :filter-method="handleMinuteFilter"
        size="small"
        @focus="() => focusFilterInput(minuteSelectRef)"
      >
        <vs-option
          v-for="item in minuteOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </vs-select>
    </div>
    <div v-if="showSecond" :class="ns.e('time-item')">
      <vs-select
        ref="secondSelectRef"
        v-model="secondValue"
        :disabled="secondDisabled"
        :placeholder="secondPlaceholder"
        filter
        :filter-method="handleSecondFilter"
        size="small"
        @focus="() => focusFilterInput(secondSelectRef)"
      >
        <vs-option
          v-for="item in secondOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </vs-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue'
import { VsOption, VsSelect } from '@vuesax-alpha/components/select'
import { useNamespace } from '@vuesax-alpha/hooks'
import { normalizeFixedTime, padTimeUnit } from './utils'
import type { FixedTime, TimeValue } from './date-picker'
import type { SelectInstance } from '@vuesax-alpha/components/select'

const props = defineProps({
  modelValue: {
    type: Object as () => TimeValue,
    required: true,
  },
  fixedTime: {
    type: Object as () => FixedTime,
    default: () => ({}),
  },
  showSecond: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const ns = useNamespace('date-picker')
const hourSelectRef = ref<SelectInstance>()
const minuteSelectRef = ref<SelectInstance>()
const secondSelectRef = ref<SelectInstance>()

const fixed = computed(() => normalizeFixedTime(props.fixedTime))

const hourDisabled = computed(() => fixed.value.hour !== null)
const minuteDisabled = computed(() => fixed.value.minute !== null)
const secondDisabled = computed(() => fixed.value.second !== null)

const hourOptions = computed(() =>
  Array.from({ length: 24 }, (_, index) => padTimeUnit(index))
)
const minuteOptions = computed(() =>
  Array.from({ length: 60 }, (_, index) => padTimeUnit(index))
)
const secondOptions = computed(() =>
  Array.from({ length: 60 }, (_, index) => padTimeUnit(index))
)

const hourValue = computed({
  get: () => padTimeUnit(fixed.value.hour ?? props.modelValue.hour),
  set: (value) => {
    if (hourDisabled.value) {
      return
    }
    emit('update:modelValue', {
      ...props.modelValue,
      hour: Number(value),
    })
  },
})

const minuteValue = computed({
  get: () => padTimeUnit(fixed.value.minute ?? props.modelValue.minute),
  set: (value) => {
    if (minuteDisabled.value) {
      return
    }
    emit('update:modelValue', {
      ...props.modelValue,
      minute: Number(value),
    })
  },
})

const secondValue = computed({
  get: () => padTimeUnit(fixed.value.second ?? props.modelValue.second),
  set: (value) => {
    if (secondDisabled.value) {
      return
    }
    emit('update:modelValue', {
      ...props.modelValue,
      second: Number(value),
    })
  },
})

const hourPlaceholder = computed(() => padTimeUnit(props.modelValue.hour))
const minutePlaceholder = computed(() => padTimeUnit(props.modelValue.minute))
const secondPlaceholder = computed(() => padTimeUnit(props.modelValue.second))

const parseInputValue = (value: string, max: number) => {
  const matched = value.match(/^\\d{1,2}$/)
  if (!matched) {
    return null
  }
  const parsed = Number(value)
  if (Number.isNaN(parsed)) {
    return null
  }
  return Math.min(Math.max(parsed, 0), max)
}

const focusFilterInput = (selectRef: typeof hourSelectRef) => {
  nextTick(() => {
    const el = selectRef.value?.$el as HTMLElement | undefined
    const input = el?.querySelector('input') as HTMLInputElement | null
    if (!input) {
      return
    }
    input.focus()
    input.select()
  })
}

const handleFilterCommit = (
  value: string,
  max: number,
  updater: (next: number) => void,
  nextRef?: typeof hourSelectRef
) => {
  if (value.length < 2) {
    return
  }
  const parsed = parseInputValue(value, max)
  if (parsed === null) {
    return
  }
  updater(parsed)
  if (nextRef?.value) {
    focusFilterInput(nextRef)
  }
}

const handleHourFilter = (value: string) => {
  if (hourDisabled.value) {
    return
  }
  handleFilterCommit(
    value,
    23,
    (next) =>
      emit('update:modelValue', {
        ...props.modelValue,
        hour: next,
      }),
    minuteSelectRef
  )
}

const handleMinuteFilter = (value: string) => {
  if (minuteDisabled.value) {
    return
  }
  handleFilterCommit(
    value,
    59,
    (next) =>
      emit('update:modelValue', {
        ...props.modelValue,
        minute: next,
      }),
    showSecond.value ? secondSelectRef : undefined
  )
}

const handleSecondFilter = (value: string) => {
  if (secondDisabled.value) {
    return
  }
  handleFilterCommit(value, 59, (next) =>
    emit('update:modelValue', {
      ...props.modelValue,
      second: next,
    })
  )
}
</script>
