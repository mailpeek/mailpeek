<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailLinkProps } from '../types'

const props = withDefaults(defineProps<EmailLinkProps>(), {
  color: '#007bff',
  fontFamily: 'Arial, sans-serif',
})

const linkStyle = computed<CSSProperties>(() => ({
  color: props.color,
  fontSize: props.fontSize ? `${props.fontSize}px` : undefined,
  fontFamily: props.fontFamily,
  textDecoration: 'underline',
  ...props.style,
}))
</script>

<template>
  <a :href="href" :style="linkStyle" target="_blank">
    <slot />
  </a>
</template>
