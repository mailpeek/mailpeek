<script setup lang="ts">
import type { EmailHtmlProps } from '../types'

withDefaults(defineProps<EmailHtmlProps>(), {
  lang: 'en',
  dir: 'ltr',
})
</script>

<template>
  <html
    :lang="lang"
    :dir="dir"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <slot />
  </html>
</template>
