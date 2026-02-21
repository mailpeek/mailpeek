<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailButtonProps } from '../types'

const props = withDefaults(defineProps<EmailButtonProps>(), {
  backgroundColor: '#007bff',
  color: '#ffffff',
  borderRadius: 4,
  fontSize: 16,
  paddingX: 24,
  paddingY: 12,
  align: 'center',
})

const wrapperStyle = computed<CSSProperties>(() => ({
  textAlign: props.align,
  margin: '0 0 16px 0',
}))

const linkStyle = computed<CSSProperties>(() => ({
  display: 'inline-block',
  backgroundColor: props.backgroundColor,
  color: props.color,
  fontSize: `${props.fontSize}px`,
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  borderRadius: `${props.borderRadius}px`,
  padding: `${props.paddingY}px ${props.paddingX}px`,
  ...props.style,
}))
</script>

<template>
  <div :style="wrapperStyle">
    <a :href="href" :style="linkStyle" target="_blank">
      <slot />
    </a>
  </div>
</template>
