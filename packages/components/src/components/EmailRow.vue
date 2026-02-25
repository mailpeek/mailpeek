<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailRowProps } from '../types'

const props = withDefaults(defineProps<EmailRowProps>(), {})

const tableStyle = computed<CSSProperties>(() => ({
  width: '100%',
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
        <slot />
      </tr>
    </tbody>
  </table>
</template>
