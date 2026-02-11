---
PROPS:
  - name: value / v-model:value
    type: String
    values:
    description: 单选时间值
    default: ''
    link: null
    usage: '#default'
    code: null
  - name: range
    type: Boolean
    values: true, false
    description: 是否启用范围
    default: false
    link: null
    usage: '#range'
    code: null
  - name: start-time / v-model:start-time
    type: String
    values:
    description: 范围开始时间
    default: ''
    link: null
    usage: '#range'
    code: null
  - name: end-time / v-model:end-time
    type: String
    values:
    description: 范围结束时间
    default: ''
    link: null
    usage: '#range'
    code: null
  - name: format
    type: String
    values:
    description: 显示与输出格式
    default: yyyy-MM-dd HH:mm:ss
    link: null
    usage: '#format'
    code: null
  - name: show-time
    type: Boolean
    values: true, false
    description: 是否显示/选择时间
    default: true
    link: null
    usage: '#show-time'
    code: null
  - name: time-zero
    type: Boolean
    values: true, false
    description: 不显示时间时将时间置为 0
    default: true
    link: null
    usage: '#show-time'
    code: null
  - name: fixed-time
    type: Object
    values: { hour, minute, second }
    description: 固定某个时间单位
    default: {}
    link: null
    usage: '#fixed-time'
    code: null
---

# Date Picker

## Default

```vue
<template>
  <vs-date-picker v-model:value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## Format

```vue
<template>
  <vs-date-picker v-model:value="value" format="yyyy-MM-dd HH:mm:ss" />
</template>
```

## Show Time

```vue
<template>
  <vs-date-picker v-model:value="value" :show-time="false" :time-zero="true" />
</template>
```

## Fixed Time

```vue
<template>
  <vs-date-picker v-model:value="value" :fixed-time="{ second: '00' }" />
</template>
```

## Range

```vue
<template>
  <vs-date-picker
    range
    v-model:start-time="startTime"
    v-model:end-time="endTime"
    format="yyyy-MM-dd HH:mm:ss"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const startTime = ref('')
const endTime = ref('')
</script>
```
