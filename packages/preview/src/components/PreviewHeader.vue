<script setup lang="ts">
import type { PreviewHeaderProps } from '../types'

const props = withDefaults(defineProps<PreviewHeaderProps>(), {
  darkMode: false,
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
.preview-header--dark .preview-header__file-size {
  background: #3c4043;
  color: #e8eaed;
}
.preview-header--dark .preview-header__file-size--warning {
  color: #f87171;
  background: #451a1a;
}
</style>
