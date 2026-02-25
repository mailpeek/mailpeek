<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailPreviewTextProps } from '../types'

defineProps<EmailPreviewTextProps>()

const containerStyle = computed<CSSProperties>(() => ({
  display: 'none',
  fontSize: '1px',
  color: '#ffffff',
  lineHeight: '1px',
  maxHeight: '0px',
  maxWidth: '0px',
  opacity: 0,
  overflow: 'hidden',
}))

// Invisible padding characters prevent email clients from pulling body content
// into the preview. Uses &#847; (combining grapheme joiner) repeated.
const padding = '\u034F'.repeat(150)
</script>

<template>
  <div :style="containerStyle">{{ text }}{{ padding }}</div>
</template>
