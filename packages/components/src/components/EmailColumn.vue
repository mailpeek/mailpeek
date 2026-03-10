<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailColumnProps } from '../types'
import { expandShorthand } from '../utils/expandShorthand'

const props = withDefaults(defineProps<EmailColumnProps>(), {
  valign: 'top',
})

const paddingStyle = computed(() => {
  if (!props.padding) return {}
  const { top, right, bottom, left } = expandShorthand(props.padding)
  return { paddingTop: top, paddingRight: right, paddingBottom: bottom, paddingLeft: left }
})

const tdStyle = computed<CSSProperties>(() => ({
  width: props.width,
  textAlign: props.align,
  verticalAlign: props.valign,
  backgroundColor: props.backgroundColor,
  ...paddingStyle.value,
  ...props.style,
}))
</script>

<template>
  <td :valign="props.valign" :style="tdStyle">
    <slot />
  </td>
</template>
