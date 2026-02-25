<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailDividerProps } from '../types'

const props = withDefaults(defineProps<EmailDividerProps>(), {
  color: '#e0e0e0',
  height: 1,
  margin: '16px 0',
})

const hrStyle = computed<CSSProperties>(() => ({
  border: 'none',
  backgroundColor: props.color,
  height: `${props.height}px`,
  margin: props.margin,
  ...props.style,
}))
</script>

<template>
  <hr :style="hrStyle" />
</template>
