---
PROPS:
  - name: loading
    type: Boolean
    values: true, false
    description: 是否显示加载动画
    default: false
    link: null
    usage: '#default'
    code: null

  - name: color
    type: String
    values: primary, success, danger, warning, dark, RGB, HEX
    description: 加载动画的颜色
    default: primary
    link: null
    usage: '#color'
    code: null

  - name: min-height
    type: String
    values: CSS height value
    description: 容器的最小高度
    default: '0'
    link: null
    usage: '#default'
    code: null

SLOTS:
  - name: default
    type: Slot
    values: null
    description: 内容区域，loading 为 false 时显示
    default: null
    link: null
    usage: '#default'

  - name: description
    type: Slot
    values: null
    description: 加载时显示的描述文本
    default: null
    link: null
    usage: '#description'
---

# Inner Loading

<card>

## 默认

<docs-warn />

内部加载组件用于在容器内部显示加载状态，提供了平滑的过渡动画效果。

<template #example>
<inner-loading-default />
</template>

<template #template>
@[code vue](../.vuepress/components/inner-loading/default.vue)

</template>

</card>

<card>

## 颜色

通过 `color` 属性可以设置加载动画的颜色，支持 Vuesax 主题色、RGB 和 HEX 颜色值。

<template #example>
<inner-loading-color />
</template>

<template #template>
@[code vue](../.vuepress/components/inner-loading/color.vue)

</template>

</card>

<card>

## 描述文本

通过 `description` 插槽可以添加加载时显示的描述文本。

<template #example>
<inner-loading-description />
</template>

<template #template>
@[code vue](../.vuepress/components/inner-loading/description.vue)

</template>

</card>

<card>

## 实际应用

在实际应用中，通常用于表单提交、数据加载等场景。

<template #example>
<inner-loading-practical />
</template>

<template #template>
@[code vue](../.vuepress/components/inner-loading/practical.vue)

</template>

</card>

<card>

## API

</card>
