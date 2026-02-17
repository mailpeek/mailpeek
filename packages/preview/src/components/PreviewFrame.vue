<script setup lang="ts">
import { computed } from 'vue'
import type { PreviewFrameProps } from '../types'

const props = withDefaults(defineProps<PreviewFrameProps>(), {
  width: '600px',
})

// Wrap the user's HTML with a base style reset so iframe renders
// consistently regardless of browser defaults
const srcdoc = computed(() => {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  /* Reset browser default iframe body styles */
  body { margin: 0; padding: 0; }
</style>
</head>
<body>
${props.html}
</body>
</html>`
})
</script>

<template>
  <div class="mailpeek-preview-frame" :style="{ width: props.width }">
    <iframe
      :srcdoc="srcdoc"
      sandbox="allow-same-origin"
      frameborder="0"
      scrolling="auto"
      style="width: 100%; min-height: 600px; border: none; display: block;"
      @load="$emit('load', $event)"
    />
  </div>
</template>

<style scoped>
.mailpeek-preview-frame {
  display: block;
  overflow: hidden;
}
</style>
