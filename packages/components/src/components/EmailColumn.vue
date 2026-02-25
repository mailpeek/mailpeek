<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailColumnProps } from '../types'

const props = withDefaults(defineProps<EmailColumnProps>(), {
  valign: 'top',
})

const tdStyle = computed<CSSProperties>(() => ({
  width: props.width,
  textAlign: props.align,
  verticalAlign: props.valign,
  backgroundColor: props.backgroundColor,
  padding: props.padding,
  ...props.style,
}))
</script>

<template>
  <td :style="tdStyle">
    <slot />
  </td>
</template>
