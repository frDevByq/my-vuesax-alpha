<template>
  <div :class="ns.e('panel')">
    <div :class="ns.e('calendar')">
      <div :class="ns.e('calendar-header')">
        <button
          type="button"
          :class="ns.e('nav-button')"
          :disabled="disabled"
          @click="goPrevMonth"
        >
          ‹
        </button>
        <span :class="ns.e('month-label')">
          {{ currentYear }}-{{ padTimeUnit(currentMonth) }}
        </span>
        <button
          type="button"
          :class="ns.e('nav-button')"
          :disabled="disabled"
          @click="goNextMonth"
        >
          ›
        </button>
      </div>
      <div :class="ns.e('week')">
        <span
          v-for="item in weekLabels"
          :key="item"
          :class="ns.e('week-cell')"
        >
          {{ item }}
        </span>
      </div>
      <div :class="ns.e('days')">
        <button
          v-for="cell in calendarDays"
          :key="cell.key"
          type="button"
          :disabled="disabled || !cell.currentMonth"
          :class="[
            ns.e('day'),
            ns.is('today', cell.isToday),
            ns.is('current', cell.isSelected),
            ns.is('range-start', cell.isRangeStart),
            ns.is('range-end', cell.isRangeEnd),
            ns.is('in-range', cell.isInRange),
            ns.is('outside', !cell.currentMonth),
          ]"
          @click="selectDay(cell)"
        >
          {{ cell.label }}
        </button>
      </div>
    </div>
    <time-panel
      v-if="showTime"
      :model-value="timeValue"
      :fixed-time="fixedTime"
      :show-second="showSecond"
      @update:model-value="handleTimeUpdate"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useNamespace } from '@vuesax-alpha/hooks'
import dayjs from 'dayjs'
import TimePanel from './time-panel.vue'
import {
  buildTimeValue,
  getDaysInMonth,
  normalizeFixedTime,
  normalizeFormat,
  padTimeUnit,
  parseDateValue,
} from './utils'
import type { FixedTime, TimeValue } from './date-picker'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  rangeStart: {
    type: String,
    default: '',
  },
  rangeEnd: {
    type: String,
    default: '',
  },
  format: {
    type: String,
    required: true,
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
    type: Object as () => FixedTime,
    default: () => ({}),
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const ns = useNamespace('date-picker')
const year = ref<number | null>(null)
const month = ref<number | null>(null)
const day = ref<number | null>(null)
const viewDate = ref(dayjs())
const timeValue = ref<TimeValue>({
  hour: 0,
  minute: 0,
  second: 0,
})
const syncing = ref(false)

const normalizedFormat = computed(() => normalizeFormat(props.format))
const showSecond = computed(() => /s/.test(normalizedFormat.value))
const weekLabels = ['日', '一', '二', '三', '四', '五', '六']
const currentYear = computed(() => viewDate.value.year())
const currentMonth = computed(() => viewDate.value.month() + 1)
const rangeStartDate = computed(() =>
  parseDateValue(props.rangeStart, props.format)
)
const rangeEndDate = computed(() => parseDateValue(props.rangeEnd, props.format))

const calendarDays = computed(() => {
  const yearValue = currentYear.value
  const monthValue = currentMonth.value
  const daysInMonth = getDaysInMonth(yearValue, monthValue)
  const firstDay = dayjs(
    `${yearValue}-${padTimeUnit(monthValue)}-01`,
    'YYYY-MM-DD'
  ).day()
  const prevMonth = dayjs(
    `${yearValue}-${padTimeUnit(monthValue)}-01`,
    'YYYY-MM-DD'
  ).subtract(1, 'month')
  const prevDays = getDaysInMonth(prevMonth.year(), prevMonth.month() + 1)
  const total = 42
  return Array.from({ length: total }, (_, index) => {
    const dayIndex = index - firstDay + 1
    const currentMonthDay =
      dayIndex >= 1 && dayIndex <= daysInMonth ? dayIndex : null
    const prevMonthDay = dayIndex < 1 ? prevDays + dayIndex : null
    const nextMonthDay = dayIndex > daysInMonth ? dayIndex - daysInMonth : null
    const label = currentMonthDay ?? prevMonthDay ?? nextMonthDay ?? 1
    const cellMonth =
      currentMonthDay !== null
        ? monthValue
        : prevMonthDay !== null
        ? prevMonth.month() + 1
        : (viewDate.value.add(1, 'month').month() + 1)
    const cellYear =
      currentMonthDay !== null
        ? yearValue
        : prevMonthDay !== null
        ? prevMonth.year()
        : viewDate.value.add(1, 'month').year()
    const cellDate = dayjs(
      `${cellYear}-${padTimeUnit(cellMonth)}-${padTimeUnit(label)}`,
      'YYYY-MM-DD'
    )
    const isSelected =
      year.value === cellYear &&
      month.value === cellMonth &&
      day.value === label
    const isRangeStart = rangeStartDate.value
      ? cellDate.isSame(rangeStartDate.value, 'day')
      : false
    const isRangeEnd = rangeEndDate.value
      ? cellDate.isSame(rangeEndDate.value, 'day')
      : false
    const isInRange =
      rangeStartDate.value &&
      rangeEndDate.value &&
      cellDate.isAfter(rangeStartDate.value, 'day') &&
      cellDate.isBefore(rangeEndDate.value, 'day')
    const isToday = dayjs().isSame(
      cellDate,
      'day'
    )
    return {
      key: `${cellYear}-${cellMonth}-${label}-${index}`,
      label,
      currentMonth: currentMonthDay !== null,
      isSelected,
      isRangeStart,
      isRangeEnd,
      isInRange,
      isToday,
      year: cellYear,
      month: cellMonth,
      day: label,
    }
  })
})

const applyFixedTimeToValue = () => {
  const fixed = normalizeFixedTime(props.fixedTime)
  if (fixed.hour !== null) {
    timeValue.value.hour = fixed.hour
  }
  if (fixed.minute !== null) {
    timeValue.value.minute = fixed.minute
  }
  if (fixed.second !== null) {
    timeValue.value.second = fixed.second
  }
}

const applyTimeZero = () => {
  if (!props.showTime && props.timeZero) {
    timeValue.value.hour = 0
    timeValue.value.minute = 0
    timeValue.value.second = 0
  }
}

const syncFromModel = () => {
  syncing.value = true
  const parsed = parseDateValue(props.modelValue, props.format)
  if (parsed) {
    year.value = parsed.year()
    month.value = parsed.month() + 1
    day.value = parsed.date()
    viewDate.value = parsed
    timeValue.value = buildTimeValue(parsed)
  } else {
    year.value = null
    month.value = null
    day.value = null
    viewDate.value = dayjs()
    timeValue.value = buildTimeValue(null)
  }
  applyFixedTimeToValue()
  applyTimeZero()
  nextTick(() => {
    syncing.value = false
  })
}

const commitValue = () => {
  if (syncing.value) {
    return
  }
  if (!year.value || !month.value || !day.value) {
    emit('update:modelValue', '')
    return
  }
  const fixed = normalizeFixedTime(props.fixedTime)
  let hour = fixed.hour ?? timeValue.value.hour
  let minute = fixed.minute ?? timeValue.value.minute
  let second = fixed.second ?? timeValue.value.second
  if (!props.showTime && props.timeZero) {
    hour = 0
    minute = 0
    second = 0
  }
  if (!showSecond.value) {
    second = 0
  }
  const value = dayjs(
    `${year.value}-${padTimeUnit(month.value)}-${padTimeUnit(day.value)} ${padTimeUnit(
      hour
    )}:${padTimeUnit(minute)}:${padTimeUnit(second)}`,
    'YYYY-MM-DD HH:mm:ss'
  )
  emit('update:modelValue', value.format(normalizedFormat.value))
}

const handleTimeUpdate = (value: TimeValue) => {
  timeValue.value = value
  applyFixedTimeToValue()
  commitValue()
}

watch(
  () => props.modelValue,
  () => {
    syncFromModel()
  },
  { immediate: true }
)

watch([year, month, day], () => {
  const maxDay = year.value && month.value ? getDaysInMonth(year.value, month.value) : 31
  if (day.value && day.value > maxDay) {
    day.value = maxDay
  }
  applyFixedTimeToValue()
  applyTimeZero()
  commitValue()
})

watch(
  () => props.fixedTime,
  () => {
    applyFixedTimeToValue()
    commitValue()
  },
  { deep: true }
)

watch(
  () => [props.showTime, props.timeZero],
  () => {
    applyTimeZero()
    commitValue()
  }
)

const goPrevMonth = () => {
  if (props.disabled) {
    return
  }
  viewDate.value = viewDate.value.subtract(1, 'month')
}

const goNextMonth = () => {
  if (props.disabled) {
    return
  }
  viewDate.value = viewDate.value.add(1, 'month')
}

const selectDay = (cell: { year: number; month: number; day: number }) => {
  if (props.disabled) {
    return
  }
  year.value = cell.year
  month.value = cell.month
  day.value = cell.day
  viewDate.value = dayjs(
    `${cell.year}-${padTimeUnit(cell.month)}-${padTimeUnit(cell.day)}`,
    'YYYY-MM-DD'
  )
}
</script>
