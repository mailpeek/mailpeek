<script setup lang="ts">
import type { CompatibilityReport } from '../utils/compatibility'

defineProps<{
  report: CompatibilityReport
  darkMode?: boolean
}>()

const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <div class="compat-details" :class="{ 'compat-details--dark': darkMode }">
    <div class="compat-details__header">
      <span class="compat-details__summary">
        {{ report.totalIssues }} {{ report.totalIssues === 1 ? 'issue' : 'issues' }} found
      </span>
      <button type="button" class="compat-details__close" title="Close" @click="emit('close')">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <div v-if="report.hasExternalStylesheets" class="compat-details__warning">
      External stylesheets will be stripped by this client
    </div>

    <div v-if="report.hasAtImport" class="compat-details__warning">
      @import rules will be stripped by this client
    </div>

    <ul v-if="report.issues.length > 0" class="compat-details__list">
      <li v-for="issue in report.issues" :key="`${issue.property}-${issue.location}`" class="compat-details__item">
        <code class="compat-details__property">{{ issue.property }}</code>
        <span class="compat-details__reason">{{ issue.reason }}</span>
        <span v-if="issue.occurrences > 1" class="compat-details__count">
          {{ issue.occurrences }}x
        </span>
      </li>
    </ul>

    <p v-else-if="!report.hasExternalStylesheets && !report.hasAtImport" class="compat-details__empty">
      No compatibility issues detected.
    </p>

    <div class="compat-details__legend">
      <span class="compat-details__legend-item compat-details__legend-a">A 90-100</span>
      <span class="compat-details__legend-item compat-details__legend-b">B 75-89</span>
      <span class="compat-details__legend-item compat-details__legend-c">C 50-74</span>
      <span class="compat-details__legend-item compat-details__legend-d">D 25-49</span>
      <span class="compat-details__legend-item compat-details__legend-f">F 0-24</span>
    </div>
  </div>
</template>

<style scoped>
.compat-details {
  background: #f9fafb;
  border: 1px solid #d4d4d8;
  border-top: none;
  border-radius: 0 0 6px 6px;
  padding: 10px 14px;
  margin-top: -16px;
  margin-bottom: 16px;
  font-size: 12px;
  color: #52525b;
}

.compat-details__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.compat-details__summary {
  font-weight: 600;
  color: #3f3f46;
}

.compat-details__close {
  background: none;
  border: none;
  cursor: pointer;
  color: #a1a1aa;
  padding: 2px;
  display: flex;
  align-items: center;
}

.compat-details__close:hover {
  color: #52525b;
}

.compat-details__warning {
  background: #fef3c7;
  color: #92400e;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 6px;
  font-size: 11px;
}

.compat-details__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.compat-details__item {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 3px 0;
  border-bottom: 1px solid #e4e4e7;
}

.compat-details__item:last-child {
  border-bottom: none;
}

.compat-details__property {
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
  font-size: 11px;
  background: #e4e4e7;
  padding: 1px 5px;
  border-radius: 3px;
  color: #18181b;
  flex-shrink: 0;
}

.compat-details__reason {
  flex: 1;
  color: #71717a;
}

.compat-details__count {
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  color: #a1a1aa;
  font-size: 11px;
}

.compat-details__empty {
  margin: 0;
  color: #a1a1aa;
}

.compat-details__legend {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid #e4e4e7;
}

.compat-details__legend-item {
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 3px;
}

.compat-details__legend-a { background: #dcfce7; color: #16a34a; }
.compat-details__legend-b { background: #dbeafe; color: #2563eb; }
.compat-details__legend-c { background: #fef3c7; color: #d97706; }
.compat-details__legend-d { background: #ffedd5; color: #ea580c; }
.compat-details__legend-f { background: #fef2f2; color: #dc2626; }

/* Dark mode */
.compat-details--dark {
  background: #27272a;
  border-color: #3c4043;
}

.compat-details--dark .compat-details__summary {
  color: #e8eaed;
}

.compat-details--dark .compat-details__close {
  color: #9aa0a6;
}

.compat-details--dark .compat-details__close:hover {
  color: #e8eaed;
}

.compat-details--dark .compat-details__warning {
  background: #451a00;
  color: #fbbf24;
}

.compat-details--dark .compat-details__item {
  border-bottom-color: #3c4043;
}

.compat-details--dark .compat-details__property {
  background: #3c4043;
  color: #e8eaed;
}

.compat-details--dark .compat-details__reason {
  color: #9aa0a6;
}

.compat-details--dark .compat-details__count {
  color: #71717a;
}

.compat-details--dark .compat-details__empty {
  color: #71717a;
}

.compat-details--dark .compat-details__legend {
  border-top-color: #3c4043;
}

.compat-details--dark .compat-details__legend-a { background: #14532d; color: #4ade80; }
.compat-details--dark .compat-details__legend-b { background: #1e3a5f; color: #60a5fa; }
.compat-details--dark .compat-details__legend-c { background: #451a03; color: #fbbf24; }
.compat-details--dark .compat-details__legend-d { background: #431407; color: #fb923c; }
.compat-details--dark .compat-details__legend-f { background: #451a1a; color: #f87171; }
</style>
