import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'

import type { Dayjs } from 'dayjs'
import type { FixedTime, TimeValue } from './date-picker'

dayjs.extend(customParseFormat)

export const normalizeFormat = (format: string) =>
  format.replace(/yyyy/g, 'YYYY').replace(/dd/g, 'DD')

export const padTimeUnit = (value: number) => `${value}`.padStart(2, '0')

export const normalizeTimeUnit = (value: string | number | undefined, max: number) => {
  if (value === undefined || value === null) {
    return null
  }
  const parsed = Number(value)
  if (Number.isNaN(parsed)) {
    return null
  }
  return Math.min(Math.max(parsed, 0), max)
}

export const normalizeFixedTime = (fixedTime: FixedTime | undefined) => ({
  hour: normalizeTimeUnit(fixedTime?.hour, 23),
  minute: normalizeTimeUnit(fixedTime?.minute, 59),
  second: normalizeTimeUnit(fixedTime?.second, 59),
})

export const parseDateValue = (value: string | undefined, format: string): Dayjs | null => {
  if (!value) {
    return null
  }
  const normalizedFormat = normalizeFormat(format)
  const parsed = dayjs(value, normalizedFormat, true)
  return parsed.isValid() ? parsed : null
}

export const formatDateValue = (value: string | undefined, format: string) => {
  if (!value) {
    return ''
  }
  const parsed = parseDateValue(value, format)
  if (!parsed) {
    return value
  }
  return parsed.format(normalizeFormat(format))
}

export const getDaysInMonth = (year: number, month: number) => {
  const safeYear = Number.isNaN(year) ? 1970 : year
  const safeMonth = Number.isNaN(month) ? 1 : month
  return dayjs(`${safeYear}-${padTimeUnit(safeMonth)}-01`).daysInMonth()
}

export const buildTimeValue = (source: Dayjs | null): TimeValue => {
  const base = source || dayjs()
  return {
    hour: base.hour(),
    minute: base.minute(),
    second: base.second(),
  }
}
