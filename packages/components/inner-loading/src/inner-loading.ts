import { buildProps } from '@vuesax-alpha/utils'
import { useColorProp } from '@vuesax-alpha/hooks'
import type { ExtractPropTypes } from 'vue'
import type InnerLoading from './inner-loading.vue'

export const innerLoadingProps = buildProps({
  /**
   * @description loading state
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * @description loading color
   */
  color: useColorProp,
  /**
   * @description minimum height when loading
   */
  minHeight: {
    type: String,
    default: '100px',
  },
} as const)

export type InnerLoadingProps = ExtractPropTypes<typeof innerLoadingProps>
export type InnerLoadingInstance = InstanceType<typeof InnerLoading>
