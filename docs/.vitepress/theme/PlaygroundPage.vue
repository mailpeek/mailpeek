<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { EmailPreview } from '@mailpeek/preview'
import '@mailpeek/preview/style.css'
import TemplatePicker from './TemplatePicker.vue'
import { templates, FREE_SLUGS, type TemplateInfo } from './templates'

const html = ref('')
const previewHtml = ref('')

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(html, (val) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    previewHtml.value = val
  }, 300)
})

const paidCount = templates.length - FREE_SLUGS.size

const pickerOpen = ref(false)
const pickerRef = ref<HTMLElement>()
const loadingSlug = ref<string | null>(null)
const loadError = ref('')
// The template currently in the editor, if it came from the picker
const loadedTemplate = ref<TemplateInfo | null>(null)
const bannerDismissed = ref(false)

async function openPicker() {
  pickerOpen.value = true
  await nextTick()
  pickerRef.value?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}

async function loadTemplate(template: TemplateInfo) {
  loadingSlug.value = template.slug
  loadError.value = ''
  try {
    const response = await fetch(`/html/${template.category}/${template.slug}.html`)
    if (!response.ok) throw new Error(String(response.status))
    html.value = await response.text()
    loadedTemplate.value = template
    bannerDismissed.value = false
    pickerOpen.value = false
  } catch {
    loadError.value = `Couldn't load ${template.name}. Try again.`
  } finally {
    loadingSlug.value = null
  }
}

function onPaste() {
  loadedTemplate.value = null
}

function clear() {
  html.value = ''
  previewHtml.value = ''
  loadedTemplate.value = null
}
</script>

<template>
  <div class="playground-page">
    <div class="playground-header">
      <h1>Playground</h1>
      <p>Paste your email HTML and instantly see how it renders across Gmail, Outlook, and dark mode. Everything runs in your browser - no HTML is sent to any server.</p>
    </div>

    <div class="playground-layout">
      <div class="playground-input">
        <div class="input-controls">
          <button
            class="btn btn-secondary"
            :aria-expanded="pickerOpen"
            @click="pickerOpen ? (pickerOpen = false) : openPicker()"
          >
            Start from a template
          </button>
          <button class="btn btn-ghost" @click="clear">Clear</button>
        </div>
        <div v-if="pickerOpen" ref="pickerRef">
          <TemplatePicker
            :loading-slug="loadingSlug"
            @select="loadTemplate"
            @close="pickerOpen = false"
          />
        </div>
        <p v-if="loadError" class="load-error" role="alert">{{ loadError }}</p>
        <textarea
          v-model="html"
          class="html-textarea"
          placeholder="Paste your email HTML here…"
          spellcheck="false"
          @paste="onPaste"
        ></textarea>
        <p class="privacy-note">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0">
            <path d="M8 1L2 3.5V8c0 3.3 2.5 6.1 6 6.9 3.5-.8 6-3.6 6-6.9V3.5L8 1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
          </svg>
          Everything runs in your browser. No HTML is sent to any server.
        </p>
      </div>

      <div class="playground-preview">
        <div v-if="loadedTemplate && !bannerDismissed && previewHtml" class="template-bar">
          <p>
            This is the {{ loadedTemplate.name }} template from mailpeek Templates.
            <a href="/templates">Click here for {{ paidCount }} more ready to use layouts.</a>
          </p>
          <button class="template-bar__close" aria-label="Dismiss" @click="bannerDismissed = true">&times;</button>
        </div>
        <div v-if="!previewHtml" class="preview-placeholder">
          <p>Paste HTML above to preview it here</p>
          <button class="preview-placeholder__link" @click="openPicker">
            or start from a production-ready template
          </button>
        </div>
        <EmailPreview v-else :html="previewHtml" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground-page {
  padding: 48px 32px;
  max-width: 1400px;
  margin: 0 auto;
}

.playground-header {
  margin-bottom: 32px;
}

.playground-header h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 10px;
}

.playground-header p {
  color: var(--vp-c-text-2);
  margin: 0;
  max-width: 640px;
}

.playground-layout {
  display: grid;
  grid-template-columns: 40% 1fr;
  gap: 24px;
  align-items: start;
}

/* Let grid columns shrink below their content's width on narrow screens */
.playground-input,
.playground-preview {
  min-width: 0;
}

.playground-input {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-controls {
  display: flex;
  gap: 8px;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.15s;
}

.btn-secondary {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.dark .btn-secondary {
  color: #0a0a0a;
}

.btn-secondary:hover {
  opacity: 0.88;
}

.btn-ghost {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn-ghost:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.html-textarea {
  width: 100%;
  min-height: 480px;
  padding: 14px 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  resize: vertical;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.html-textarea:focus {
  border-color: var(--vp-c-brand-1);
}

.html-textarea::placeholder {
  color: var(--vp-c-text-3);
}

.privacy-note {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 0;
}

.playground-preview {
  min-height: 480px;
}

.preview-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 480px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.preview-placeholder {
  flex-direction: column;
  gap: 6px;
}

.preview-placeholder p {
  margin: 0;
}

.preview-placeholder__link {
  font-size: 13px;
  color: var(--vp-c-brand-1);
  background: none;
  cursor: pointer;
}

.preview-placeholder__link:hover {
  text-decoration: underline;
}

.load-error {
  font-size: 13px;
  color: var(--vp-c-danger-1);
  margin: 0;
}

.template-bar {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  padding: 10px 12px 10px 16px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  line-height: 1.5;
}

.template-bar p {
  flex: 1;
  margin: 0;
  color: var(--vp-c-text-2);
}

.template-bar a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
}

.template-bar a:hover {
  text-decoration: underline;
}

.template-bar__close {
  font-size: 18px;
  line-height: 1;
  color: var(--vp-c-text-2);
  background: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .playground-page {
    padding: 32px 16px;
  }

  .playground-layout {
    grid-template-columns: 1fr;
  }

  .html-textarea {
    min-height: 280px;
  }

  .playground-preview {
    min-height: 320px;
  }

  .preview-placeholder {
    min-height: 320px;
  }
}
</style>
