<script setup lang="ts">
import type { EmailHeadProps } from '../types'

withDefaults(defineProps<EmailHeadProps>(), {
  title: undefined,
})
</script>

<template>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no, address=no, email=no, date=no, url=no" />
    <meta name="x-apple-disable-message-reformatting" />
    <title v-if="title">{{ title }}</title>
    <slot />
  </head>
</template>
