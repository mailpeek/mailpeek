<script setup lang="ts">
import type { DarkModeToggleProps, DarkModeToggleEmits } from '../types'

defineProps<DarkModeToggleProps>()
const emit = defineEmits<DarkModeToggleEmits>()

function toggle(enabled: boolean) {
  emit('update:modelValue', enabled)
}
</script>

<template>
  <div class="darkmode-toggle">
    <!-- Light mode: sun -->
    <button
      type="button"
      class="darkmode-toggle-btn"
      :class="{ 'darkmode-toggle-btn--active': !modelValue }"
      title="Light mode"
      @click="toggle(false)"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.4" fill="none"/>
        <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.3 3.3l1 1M11.7 11.7l1 1M3.3 12.7l1-1M11.7 4.3l1-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
    </button>

    <!-- Dark mode: moon -->
    <button
      type="button"
      class="darkmode-toggle-btn"
      :class="{ 'darkmode-toggle-btn--active': modelValue }"
      title="Dark mode"
      @click="toggle(true)"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M13.5 9.5a5.5 5.5 0 01-7-7 5.5 5.5 0 107 7z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.darkmode-toggle {
  display: inline-flex;
  gap: 6px;
}

.darkmode-toggle-btn {
  background: #ffffff;
  border: 1px solid #d4d4d8;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  color: #3f3f46;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s, color 0.15s, border-color 0.15s;
}

.darkmode-toggle-btn:focus {
  outline: none;
}
.darkmode-toggle-btn:hover {
  background: #f4f4f5;
  border-color: #a1a1aa;
}

.darkmode-toggle-btn--active {
  background: #27272a;
  border-color: #27272a;
  color: #ffffff;
}

.darkmode-toggle-btn--active:hover {
  background: #3f3f46;
  border-color: #3f3f46;
}
</style>
