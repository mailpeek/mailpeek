<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailSectionProps } from '../types'

const props = withDefaults(defineProps<EmailSectionProps>(), {})

const tdStyle = computed<CSSProperties>(() => ({
  backgroundColor: props.backgroundColor,
  padding: props.padding,
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
