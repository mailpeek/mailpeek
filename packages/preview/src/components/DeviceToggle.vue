<script setup lang="ts">
import type { DeviceToggleProps, DeviceToggleEmits, DeviceWidth } from '../types'

const props = defineProps<DeviceToggleProps>()
const emit = defineEmits<DeviceToggleEmits>()

function selectDevice(device: DeviceWidth) {
  emit('update:modelValue', device)
}
</script>

<template>
  <div class="device-toggle">
    <!-- Mobile: phone shape -->
    <button
      type="button"
      class="device-toggle-btn"
      :class="{ 'device-toggle-btn--active': modelValue === 'mobile' }"
      title="Mobile (375px)"
      @click="selectDevice('mobile')"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="4" y="1" width="8" height="14" rx="1.5" stroke="currentColor" stroke-width="1.4" fill="none"/>
        <circle cx="8" cy="12.5" r="0.75" fill="currentColor"/>
      </svg>
    </button>

    <!-- Desktop: monitor with stand -->
    <button
      type="button"
      class="device-toggle-btn"
      :class="{ 'device-toggle-btn--active': modelValue === 'desktop' }"
      title="Desktop"
      @click="selectDevice('desktop')"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1" y="2" width="14" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4" fill="none"/>
        <path d="M6 11v2M10 11v2M5 13h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.device-toggle {
  display: inline-flex;
  gap: 6px;
}

.device-toggle-btn {
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

.device-toggle-btn:focus {
  outline: none;
}
.device-toggle-btn:hover {
  background: #f4f4f5;
  border-color: #a1a1aa;
}

.device-toggle-btn--active {
  background: #27272a;
  border-color: #27272a;
  color: #ffffff;
}

.device-toggle-btn--active:hover {
  background: #3f3f46;
  border-color: #3f3f46;
}
</style>
