<script setup lang="ts">
import type { AccessibilityReport } from '../utils/accessibility'

defineProps<{
  report: AccessibilityReport
  darkMode?: boolean
}>()

const emit = defineEmits<{ close: [] }>()

function severityLabel(severity: string): string {
  return severity.charAt(0).toUpperCase() + severity.slice(1)
}
</script>

<template>
  <div class="a11y-details" :class="{ 'a11y-details--dark': darkMode }">
    <div class="a11y-details__header">
      <span class="a11y-details__summary">
        {{ report.totalIssues }} {{ report.totalIssues === 1 ? 'issue' : 'issues' }} found
      </span>
      <button type="button" class="a11y-details__close" title="Close" @click="emit('close')">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <ul v-if="report.issues.length > 0" class="a11y-details__list">
      <li v-for="issue in report.issues" :key="issue.id" class="a11y-details__item">
        <span class="a11y-details__severity" :class="`a11y-details__severity--${issue.severity}`">
          {{ severityLabel(issue.severity) }}
        </span>
        <span class="a11y-details__message">{{ issue.message }}</span>
        <span v-if="issue.occurrences > 1" class="a11y-details__count">
          {{ issue.occurrences }}x
        </span>
      </li>
    </ul>

    <p v-else class="a11y-details__empty">
      No accessibility issues detected.
    </p>

    <div class="a11y-details__legend">
      <span class="a11y-details__legend-item a11y-details__legend-a">A 90-100</span>
      <span class="a11y-details__legend-item a11y-details__legend-b">B 75-89</span>
      <span class="a11y-details__legend-item a11y-details__legend-c">C 50-74</span>
      <span class="a11y-details__legend-item a11y-details__legend-d">D 25-49</span>
      <span class="a11y-details__legend-item a11y-details__legend-f">F 0-24</span>
    </div>
  </div>
</template>

<style scoped>
.a11y-details {
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

.a11y-details__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.a11y-details__summary {
  font-weight: 600;
  color: #3f3f46;
}

.a11y-details__close {
  background: none;
  border: none;
  cursor: pointer;
  color: #a1a1aa;
  padding: 2px;
  display: flex;
  align-items: center;
}

.a11y-details__close:hover {
  color: #52525b;
}

.a11y-details__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.a11y-details__item {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 3px 0;
  border-bottom: 1px solid #e4e4e7;
}

.a11y-details__item:last-child {
  border-bottom: none;
}

.a11y-details__severity {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.a11y-details__severity--critical {
  background: #fef2f2;
  color: #dc2626;
}

.a11y-details__severity--major {
  background: #fff7ed;
  color: #ea580c;
}

.a11y-details__severity--minor {
  background: #f4f4f5;
  color: #71717a;
}

.a11y-details__message {
  flex: 1;
  color: #71717a;
}

.a11y-details__count {
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  color: #a1a1aa;
  font-size: 11px;
}

.a11y-details__empty {
  margin: 0;
  color: #a1a1aa;
}

.a11y-details__legend {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid #e4e4e7;
}

.a11y-details__legend-item {
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 3px;
}

.a11y-details__legend-a { background: #f3e8ff; color: #7c3aed; }
.a11y-details__legend-b { background: #ede9fe; color: #6d28d9; }
.a11y-details__legend-c { background: #fef3c7; color: #d97706; }
.a11y-details__legend-d { background: #ffedd5; color: #ea580c; }
.a11y-details__legend-f { background: #fef2f2; color: #dc2626; }

/* Dark mode */
.a11y-details--dark {
  background: #27272a;
  border-color: #3c4043;
}

.a11y-details--dark .a11y-details__summary {
  color: #e8eaed;
}

.a11y-details--dark .a11y-details__close {
  color: #9aa0a6;
}

.a11y-details--dark .a11y-details__close:hover {
  color: #e8eaed;
}

.a11y-details--dark .a11y-details__item {
  border-bottom-color: #3c4043;
}

.a11y-details--dark .a11y-details__severity--critical {
  background: #451a1a;
  color: #f87171;
}

.a11y-details--dark .a11y-details__severity--major {
  background: #431407;
  color: #fb923c;
}

.a11y-details--dark .a11y-details__severity--minor {
  background: #3c4043;
  color: #9aa0a6;
}

.a11y-details--dark .a11y-details__message {
  color: #9aa0a6;
}

.a11y-details--dark .a11y-details__count {
  color: #71717a;
}

.a11y-details--dark .a11y-details__empty {
  color: #71717a;
}

.a11y-details--dark .a11y-details__legend {
  border-top-color: #3c4043;
}

.a11y-details--dark .a11y-details__legend-a { background: #2e1065; color: #c4b5fd; }
.a11y-details--dark .a11y-details__legend-b { background: #3b0764; color: #a78bfa; }
.a11y-details--dark .a11y-details__legend-c { background: #451a03; color: #fbbf24; }
.a11y-details--dark .a11y-details__legend-d { background: #431407; color: #fb923c; }
.a11y-details--dark .a11y-details__legend-f { background: #451a1a; color: #f87171; }
</style>
