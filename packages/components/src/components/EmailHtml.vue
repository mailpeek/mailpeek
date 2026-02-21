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
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no, address=no, email=no, date=no, url=no" />
      <meta name="x-apple-disable-message-reformatting" />
    </head>
    <slot />
  </html>
</template>
