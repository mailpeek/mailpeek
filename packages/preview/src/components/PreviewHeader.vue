<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PreviewHeaderProps } from '../types'

const props = withDefaults(defineProps<PreviewHeaderProps>(), {
  darkMode: false,
  compatibility: null,
})

const emit = defineEmits<{
  'toggle-details': [open: boolean]
}>()

const detailsOpen = ref(false)

function toggleDetails() {
  detailsOpen.value = !detailsOpen.value
  emit('toggle-details', detailsOpen.value)
}

const badgeClass = computed(() => {
  if (!props.compatibility) return ''
  const grade = props.compatibility.grade
  return `preview-header__score--${grade.toLowerCase()}`
})
</script>

<template>
  <div class="preview-header" :class="{ 'preview-header--dark': darkMode }">
    <div class="preview-header__subject">
      {{ props.metadata.subject ?? 'No subject' }}
    </div>
    <div class="preview-header__meta">
      <span
        v-if="props.metadata.previewText !== null"
        class="preview-header__preview-text"
      >
        {{ props.metadata.previewText }}
      </span>
      <button
        v-if="compatibility"
        type="button"
        class="preview-header__score"
        :class="badgeClass"
        :title="`Compatibility: ${compatibility.score}/100 (${compatibility.totalIssues} issues)`"
        @click="toggleDetails"
      >
        {{ compatibility.grade }} {{ compatibility.score }}
      </button>
      <span
        class="preview-header__file-size"
        :class="{ 'preview-header__file-size--warning': props.metadata.fileSize.isWarning }"
      >
        {{ props.metadata.fileSize.formatted }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.preview-header {
  padding: 10px 14px;
  background: #ffffff;
  border: 1px solid #d4d4d8;
  border-radius: 6px;
  margin-bottom: 16px;
}

.preview-header__subject {
  font-size: 14px;
  font-weight: 600;
  color: #18181b;
  margin-bottom: 4px;
}

.preview-header__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #71717a;
}

.preview-header__preview-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-header__score {
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  padding: 1px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s;
}

.preview-header__score:hover {
  opacity: 0.85;
}

.preview-header__score--a {
  background: #dcfce7;
  color: #16a34a;
}

.preview-header__score--b {
  background: #dbeafe;
  color: #2563eb;
}

.preview-header__score--c {
  background: #fef3c7;
  color: #d97706;
}

.preview-header__score--d {
  background: #ffedd5;
  color: #ea580c;
}

.preview-header__score--f {
  background: #fef2f2;
  color: #dc2626;
}

.preview-header__file-size {
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  background: #f4f4f5;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
}

.preview-header__file-size--warning {
  color: #dc2626;
  background: #fef2f2;
  font-weight: 600;
}

/* Dark mode palette */
.preview-header--dark {
  background: #2d2d2d;
  border-color: #3c4043;
}
.preview-header--dark .preview-header__subject {
  color: #e8eaed;
}
.preview-header--dark .preview-header__meta {
  color: #9aa0a6;
}
.preview-header--dark .preview-header__score--a {
  background: #14532d;
  color: #4ade80;
}
.preview-header--dark .preview-header__score--b {
  background: #1e3a5f;
  color: #60a5fa;
}
.preview-header--dark .preview-header__score--c {
  background: #451a03;
  color: #fbbf24;
}
.preview-header--dark .preview-header__score--d {
  background: #431407;
  color: #fb923c;
}
.preview-header--dark .preview-header__score--f {
  background: #451a1a;
  color: #f87171;
}
.preview-header--dark .preview-header__file-size {
  background: #3c4043;
  color: #e8eaed;
}
.preview-header--dark .preview-header__file-size--warning {
  color: #f87171;
  background: #451a1a;
}
</style>
