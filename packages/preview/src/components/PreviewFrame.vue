<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PreviewFrameProps } from '../types'

const props = withDefaults(defineProps<PreviewFrameProps>(), {
  width: '600px',
})

const emit = defineEmits<{ load: [event: Event] }>()

const iframeHeight = ref('600px')

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
  body { margin: 0; padding: 0; overflow-x: hidden; }
</style>
</head>
<body>
${props.html}
</body>
</html>`
})

function onLoad(event: Event) {
  const iframe = event.target as HTMLIFrameElement
  try {
    const height = iframe.contentDocument?.documentElement?.scrollHeight
    if (height && height > 0) iframeHeight.value = height + 'px'
  } catch {
    // ignore
  }
  emit('load', event)
}
</script>

<template>
  <div class="mailpeek-preview-frame" :style="{ width: props.width }">
    <iframe
      :srcdoc="srcdoc"
      sandbox="allow-same-origin"
      frameborder="0"
      scrolling="no"
      :style="{ width: '100%', height: iframeHeight, border: 'none', display: 'block' }"
      @load="onLoad"
    />
  </div>
</template>

<style scoped>
.mailpeek-preview-frame {
  display: block;
  overflow: hidden;
}
</style>
