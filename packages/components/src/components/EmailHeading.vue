<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailHeadingProps } from '../types'

const props = withDefaults(defineProps<EmailHeadingProps>(), {
  as: 'h2',
  fontSize: 24,
  lineHeight: 1.3,
  fontFamily: 'Arial, sans-serif',
  color: '#333333',
  align: 'left',
})

const headingStyle = computed<CSSProperties>(() => ({
  fontSize: `${props.fontSize}px`,
  lineHeight: `${props.lineHeight}`,
  fontFamily: props.fontFamily,
  color: props.color,
  textAlign: props.align,
  margin: '0 0 16px 0',
  ...props.style,
}))
</script>

<template>
  <component :is="as" :style="headingStyle">
    <slot />
  </component>
</template>
