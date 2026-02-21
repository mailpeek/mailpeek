<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailTextProps } from '../types'

const props = withDefaults(defineProps<EmailTextProps>(), {
  fontSize: 16,
  lineHeight: 1.5,
  fontFamily: 'Arial, sans-serif',
  color: '#333333',
  align: 'left',
})

const textStyle = computed<CSSProperties>(() => ({
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
  <p :style="textStyle">
    <slot />
  </p>
</template>
