<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailSectionProps } from '../types'
import { expandShorthand } from '../utils/expandShorthand'

const props = withDefaults(defineProps<EmailSectionProps>(), {})

const paddingStyle = computed(() => {
  if (!props.padding) return {}
  const { top, right, bottom, left } = expandShorthand(props.padding)
  return { paddingTop: top, paddingRight: right, paddingBottom: bottom, paddingLeft: left }
})

const tdStyle = computed<CSSProperties>(() => ({
  backgroundColor: props.backgroundColor,
  ...paddingStyle.value,
  ...props.style,
}))
</script>

<template>
  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >
    <tbody>
      <tr>
        <td :style="tdStyle">
          <slot />
        </td>
      </tr>
    </tbody>
  </table>
</template>
