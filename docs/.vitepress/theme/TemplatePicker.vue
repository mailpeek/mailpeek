<script setup lang="ts">
import { computed } from 'vue'
import { templates, isFree, thumbnailPath, type TemplateInfo } from './templates'

defineProps<{ loadingSlug: string | null }>()
const emit = defineEmits<{ select: [template: TemplateInfo]; close: [] }>()

const freeTemplates = computed(() => templates.filter(isFree))
const lockedTemplates = computed(() => templates.filter(t => !isFree(t)))
</script>

<template>
  <div class="picker" role="dialog" aria-label="Start from a template" @keydown.esc="emit('close')">
    <div class="picker__header">
      <h2 class="picker__title">Start from a template</h2>
      <button class="picker__close" aria-label="Close" @click="emit('close')">&times;</button>
    </div>

    <p class="picker__section-label">Free</p>
    <div class="picker__grid">
      <button
        v-for="t in freeTemplates"
        :key="t.slug"
        class="picker__item"
        :disabled="loadingSlug !== null"
        @click="emit('select', t)"
      >
        <span class="picker__thumb">
          <img :src="thumbnailPath(t)" :alt="''" loading="lazy" />
        </span>
        <span class="picker__name">{{ loadingSlug === t.slug ? 'Loading…' : t.name }}</span>
      </button>
    </div>

    <p class="picker__section-label">
      In mailpeek Templates
      <a href="/templates" class="picker__section-link">See plans →</a>
    </p>
    <div class="picker__grid picker__grid--locked">
      <a
        v-for="t in lockedTemplates"
        :key="t.slug"
        class="picker__item picker__item--locked"
        :href="`/templates#${t.slug}`"
      >
        <span class="picker__thumb">
          <img :src="thumbnailPath(t)" :alt="''" loading="lazy" />
          <span class="picker__lock" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5" />
              <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </span>
        </span>
        <span class="picker__name">{{ t.name }}<span class="sr-only"> (paid)</span></span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.picker {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 14px 16px 16px;
}

.picker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.picker__title {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  padding: 0;
  border: none;
}

.picker__close {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  font-size: 18px;
  color: var(--vp-c-text-2);
  background: transparent;
  cursor: pointer;
}

.picker__close:hover {
  background: var(--vp-c-bg-mute);
}

.picker__section-label {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
  margin: 12px 0 8px;
}

.picker__section-link {
  font-size: 12px;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.picker__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.picker__grid--locked {
  max-height: 260px;
  overflow-y: auto;
  padding-right: 4px;
}

.picker__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.picker__item:disabled {
  cursor: wait;
}

.picker__thumb {
  position: relative;
  display: block;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  transition: border-color 0.15s;
}

.picker__item:hover .picker__thumb,
.picker__item:focus-visible .picker__thumb {
  border-color: var(--vp-c-brand-1);
}

.picker__thumb img {
  width: 100%;
  display: block;
}

.picker__item--locked img {
  opacity: 0.55;
}

.picker__lock {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  padding: 4px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
}

.picker__name {
  font-size: 12px;
  line-height: 1.3;
}

.picker__item--locked .picker__name {
  color: var(--vp-c-text-2);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
