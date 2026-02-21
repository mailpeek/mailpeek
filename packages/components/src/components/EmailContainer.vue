<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailContainerProps } from '../types'

const props = withDefaults(defineProps<EmailContainerProps>(), {
  maxWidth: 600,
  align: 'center',
})

const tableStyle = computed<CSSProperties>(() => ({
  width: '100%',
  maxWidth: `${props.maxWidth}px`,
  margin: props.align === 'center' ? '0 auto' : undefined,
  marginRight: props.align === 'left' ? 'auto' : undefined,
  marginLeft: props.align === 'right' ? 'auto' : undefined,
  backgroundColor: props.backgroundColor,
  ...props.style,
}))
</script>

<template>
  <table
    role="presentation"
    :style="tableStyle"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >
    <tbody>
      <tr>
        <td>
          <slot />
        </td>
      </tr>
    </tbody>
  </table>
</template>
