<script setup lang="ts">
import type { EmailClient } from '../types'

const props = defineProps<{
  modelValue: EmailClient
}>()

const emit = defineEmits<{
  'update:modelValue': [client: EmailClient]
}>()

const clients: Array<{ id: EmailClient; label: string }> = [
  { id: 'gmail', label: 'Gmail' },
  { id: 'outlook', label: 'Outlook' },
  { id: 'raw', label: 'Raw HTML' },
]

function selectClient(client: EmailClient) {
  emit('update:modelValue', client)
}
</script>
<template>
  <div class="client-switcher">
    <button
      v-for="c in clients"
      :key="c.id"
      type="button"
      class="client-switcher-btn"
      :class="{ 'client-switcher-btn--active': modelValue === c.id }"
      @click="selectClient(c.id)"
    >
      {{ c.label }}
    </button>
  </div>
</template>
<style scoped>
.client-switcher {
  display: inline-flex;
  gap: 6px;
}
.client-switcher-btn {
  background: #ffffff;
  border: 1px solid #d4d4d8;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  color: #3f3f46;
  transition: background-color 0.15s, color 0.15s, border-color 0.15s;
}
.client-switcher-btn:focus {
  outline: none;
}
.client-switcher-btn:hover {
  background: #f4f4f5;
  border-color: #a1a1aa;
}
.client-switcher-btn--active {
  background: #27272a;
  border-color: #27272a;
  color: #ffffff;
}
.client-switcher-btn--active:hover {
  background: #3f3f46;
  border-color: #3f3f46;
}
</style>
