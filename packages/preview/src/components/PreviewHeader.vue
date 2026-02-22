<script setup lang="ts">
import { computed } from 'vue'
import type { PreviewHeaderProps } from '../types'

const props = withDefaults(defineProps<PreviewHeaderProps>(), {
  darkMode: false,
  compatibility: null,
  detailsOpen: false,
  accessibility: null,
  a11yDetailsOpen: false,
})

const emit = defineEmits<{
  'toggle-details': [open: boolean]
  'toggle-a11y-details': [open: boolean]
}>()

function toggleDetails() {
  emit('toggle-details', !props.detailsOpen)
}

function toggleA11yDetails() {
  emit('toggle-a11y-details', !props.a11yDetailsOpen)
}

const badgeClass = computed(() => {
  if (!props.compatibility) return ''
  const grade = props.compatibility.grade
  return `preview-header__score--${grade.toLowerCase()}`
})

const a11yBadgeClass = computed(() => {
  if (!props.accessibility) return ''
  const grade = props.accessibility.grade
  return `preview-header__a11y--${grade.toLowerCase()}`
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
        :class="[badgeClass, { 'preview-header__score--open': props.detailsOpen }]"
        :title="`Compatibility: ${compatibility.score}/100 (${compatibility.totalIssues} issues) — click for details`"
        @click="toggleDetails"
      >
        <span>{{ compatibility.grade }} {{ compatibility.score }}</span>
        <svg class="preview-header__score-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 3.5l2.5 3 2.5-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button
        v-if="accessibility"
        type="button"
        class="preview-header__a11y"
        :class="[a11yBadgeClass, { 'preview-header__a11y--open': props.a11yDetailsOpen }]"
        :title="`Accessibility: ${accessibility.score}/100 (${accessibility.totalIssues} issues) — click for details`"
        @click="toggleA11yDetails"
      >
        <span>A11y {{ accessibility.grade }} {{ accessibility.score }}</span>
        <svg class="preview-header__score-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 3.5l2.5 3 2.5-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
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
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
}

.preview-header__score:hover {
  opacity: 0.85;
}

.preview-header__score-chevron {
  transition: transform 0.2s;
  flex-shrink: 0;
  width: 10px;
  height: 10px;
}

.preview-header__score--open .preview-header__score-chevron {
  transform: rotate(180deg);
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

.preview-header__a11y {
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  padding: 1px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
}

.preview-header__a11y:hover {
  opacity: 0.85;
}

.preview-header__a11y--open .preview-header__score-chevron {
  transform: rotate(180deg);
}

.preview-header__a11y--a {
  background: #f3e8ff;
  color: #7c3aed;
}

.preview-header__a11y--b {
  background: #ede9fe;
  color: #6d28d9;
}

.preview-header__a11y--c {
  background: #fef3c7;
  color: #d97706;
}

.preview-header__a11y--d {
  background: #ffedd5;
  color: #ea580c;
}

.preview-header__a11y--f {
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
.preview-header--dark .preview-header__a11y--a {
  background: #2e1065;
  color: #c4b5fd;
}
.preview-header--dark .preview-header__a11y--b {
  background: #3b0764;
  color: #a78bfa;
}
.preview-header--dark .preview-header__a11y--c {
  background: #451a03;
  color: #fbbf24;
}
.preview-header--dark .preview-header__a11y--d {
  background: #431407;
  color: #fb923c;
}
.preview-header--dark .preview-header__a11y--f {
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
