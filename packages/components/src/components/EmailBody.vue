<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailBodyProps } from '../types'

const props = withDefaults(defineProps<EmailBodyProps>(), {
  backgroundColor: '#ffffff',
})

const bodyStyle = computed<CSSProperties>(() => ({
  margin: '0',
  padding: '0',
  width: '100%',
  backgroundColor: props.backgroundColor,
  WebkitTextSizeAdjust: '100%',
  ...props.style,
}))
</script>

<template>
  <body :style="bodyStyle">
    <slot />
  </body>
</template>
