<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { EmailImageProps } from '../types'

const props = withDefaults(defineProps<EmailImageProps>(), {
  alt: '',
})

const wrapperStyle = computed<CSSProperties>(() => ({
  textAlign: props.align,
}))

const imgStyle = computed<CSSProperties>(() => ({
  display: 'block',
  border: '0',
  outline: 'none',
  textDecoration: 'none',
  maxWidth: '100%',
  width: props.width ? `${props.width}px` : undefined,
  height: props.height ? `${props.height}px` : undefined,
  margin: props.align === 'center' ? '0 auto' : undefined,
  ...props.style,
}))
</script>

<template>
  <div v-if="align" :style="wrapperStyle">
    <img :src="src" :alt="alt" :width="width" :height="height" :style="imgStyle" />
  </div>
  <img v-else :src="src" :alt="alt" :width="width" :height="height" :style="imgStyle" />
</template>
