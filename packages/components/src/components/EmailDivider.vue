<script setup lang="ts">
import { computed } from 'vue'
import type { EmailDividerProps } from '../types'
import { expandShorthand } from '../utils/expandShorthand'

const props = withDefaults(defineProps<EmailDividerProps>(), {
  color: '#e0e0e0',
  height: 1,
  margin: '16px 0',
})

const marginValues = computed(() => {
  const { top, bottom } = expandShorthand(props.margin)
  return { top, bottom }
})
</script>

<template>
  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    :style="{
      marginTop: marginValues.top,
      marginRight: '0',
      marginBottom: marginValues.bottom,
      marginLeft: '0',
      ...style,
    }"
  >
    <tbody>
      <tr>
        <td
          :height="height"
          :bgcolor="color"
          :style="({
            fontSize: '1px',
            lineHeight: '1px',
            backgroundColor: color,
            height: `${height}px`,
            'mso-line-height-rule': 'exactly',
          } as any)"
        >&#160;</td>
      </tr>
    </tbody>
  </table>
</template>
