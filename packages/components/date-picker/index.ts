import { withInstall } from '@vuesax-alpha/utils'
import DatePicker from './src/date-picker.vue'

export const VsDatePicker = withInstall(DatePicker as any)

export default VsDatePicker

export * from './src/date-picker'
