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
  marginTop: '0',
  marginRight: props.align === 'center' || props.align === 'right' ? 'auto' : undefined,
  marginBottom: '0',
  marginLeft: props.align === 'center' || props.align === 'left' ? 'auto' : undefined,
  backgroundColor: props.backgroundColor,
  ...props.style,
}))
</script>

<template>
  <table
    role="presentation"
    :align="align"
    width="100%"
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
