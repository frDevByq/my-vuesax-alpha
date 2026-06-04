<template>
  <div :class="textareaKls" :style="textareaStyle">
    <div
      :class="[ns.e('wrapper'), ns.is('disabled', disabled)]"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <label
        v-if="(label || placeholder) && (labelFloat || labelFloatNospace)"
        :for="textareaId"
        :class="[
          ns.e('placeholder'),
          { [ns.em('placeholder', 'float')]: labelFloat },
          { [ns.em('placeholder', 'nospace')]: labelFloatNospace },
          {
            [ns.em('placeholder', 'hidden')]:
              !labelFloatNospace && hasValue,
          },
          {
            [ns.em('placeholder', 'float-up')]:
              labelFloatNospace && (focused || hasValue),
          },
        ]"
      >
        {{ label || placeholder }}
      </label>

      <label
        v-if="label && !labelFloat && !labelFloatNospace"
        :for="textareaId"
        :class="ns.e('label')"
      >
        {{ label }}
      </label>

      <textarea
        :id="textareaId"
        ref="textareaRef"
        v-model="model"
        :class="[ns.e('inner'), ns.is('disabled', disabled)]"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :maxlength="maxlength"
        :placeholder="nativePlaceholder"
        :style="innerStyle"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @change="handleChange"
      />

      <div v-if="showWordLimit" :class="ns.e('footer')">
        <span :class="ns.e('count')">
          {{ textLength }}<template v-if="maxlength"> / {{ maxlength }}</template>
        </span>
      </div>

      <div :class="ns.e('affects')">
        <div :class="ns.em('affects', '1')" />
        <div :class="ns.em('affects', '2')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import {
  useColor,
  useGlobalConfig,
  useId,
  useNamespace,
  useVuesaxBaseComponent,
} from '@vuesax-alpha/hooks'
import { getVsColor } from '@vuesax-alpha/utils'
import { textareaEmits, textareaProps } from './textarea'

defineOptions({
  name: 'VsTextarea',
})

const props = defineProps(textareaProps)
const emit = defineEmits(textareaEmits)

const ns = useNamespace('textarea')
const globalInputStyle = useGlobalConfig('defaultInputStyle', 'border')
const resolvedInputStyle = computed(
  () => props.inputStyle || globalInputStyle.value || 'border'
)

const textareaId = props.id ?? useId()
const textareaRef = ref<HTMLTextAreaElement>()
const focused = ref(false)
const hovering = ref(false)

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})

const hasValue = computed(() => model.value.length > 0)
const nativePlaceholder = computed(() =>
  props.labelFloat || props.labelFloatNospace ? '' : props.placeholder
)
const textLength = computed(() => Array.from(model.value).length)

const innerStyle = computed(() => ({
  resize: props.resize,
}))

const vsBaseClasses = useVuesaxBaseComponent(useColor())

const textareaKls = computed(() => [
  vsBaseClasses,
  ns.b(),
  props.wrapClasses,
  ns.is(resolvedInputStyle.value),
  ns.is('block', props.block),
  ns.is('focus', focused.value),
  ns.is('hovering', hovering.value),
  { [ns.m(`state-${props.state}`)]: !!props.state },
  {
    [ns.m('has-label')]:
      props.label || props.labelFloat || props.labelFloatNospace,
  },
  { [ns.m('label-float-nospace')]: props.labelFloatNospace },
  { [ns.m('counting')]: props.showWordLimit },
  { [ns.m('has-color')]: !!props.color },
])

const textareaStyle = computed(() => [
  ns.cssVar({
    color: getVsColor(props.color),
  }),
  props.wrapStyles,
])

const resizeTextarea = () => {
  const textarea = textareaRef.value
  if (!textarea || !props.autosize) return

  const computedStyle = window.getComputedStyle(textarea)
  const lineHeight = Number.parseFloat(computedStyle.lineHeight) || 22
  const paddingTop = Number.parseFloat(computedStyle.paddingTop) || 0
  const paddingBottom = Number.parseFloat(computedStyle.paddingBottom) || 0
  const borderTop = Number.parseFloat(computedStyle.borderTopWidth) || 0
  const borderBottom = Number.parseFloat(computedStyle.borderBottomWidth) || 0
  const verticalPadding = paddingTop + paddingBottom + borderTop + borderBottom

  let minRows = props.rows
  let maxRows: number | undefined

  if (typeof props.autosize === 'object') {
    minRows = props.autosize.minRows ?? props.rows
    maxRows = props.autosize.maxRows
  }

  textarea.style.height = 'auto'

  const minHeight = minRows * lineHeight + verticalPadding
  const maxHeight = maxRows
    ? maxRows * lineHeight + verticalPadding
    : Number.POSITIVE_INFINITY
  const nextHeight = Math.min(
    Math.max(textarea.scrollHeight, minHeight),
    maxHeight
  )

  textarea.style.height = `${nextHeight}px`
  emit('resize', nextHeight)
}

const handleFocus = (evt: FocusEvent) => {
  focused.value = true
  emit('focus', evt)
}

const handleBlur = (evt: FocusEvent) => {
  focused.value = false
  emit('blur', evt)
}

const handleInput = (evt: Event) => {
  const target = evt.target as HTMLTextAreaElement
  emit('input', target.value)
  resizeTextarea()
}

const handleChange = (evt: Event) => {
  const target = evt.target as HTMLTextAreaElement
  emit('change', target.value)
}

const handleMouseEnter = (evt: MouseEvent) => {
  hovering.value = true
  emit('mouseenter', evt)
}

const handleMouseLeave = (evt: MouseEvent) => {
  hovering.value = false
  emit('mouseleave', evt)
}

watch(
  () => props.modelValue,
  () => nextTick(resizeTextarea)
)

watch(
  () => props.autosize,
  () => nextTick(resizeTextarea),
  { deep: true }
)

onMounted(() => {
  resizeTextarea()
})

defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  textareaRef,
})
</script>
