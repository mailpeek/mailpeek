<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'preview' | 'build'>('preview')
</script>

<template>
  <section class="code-section">
    <h2 class="code-section__title">Drop it into any Vue app</h2>
    <p class="code-section__subtitle">
      Preview emails or build them — one import, a few lines of code.
    </p>
    <div class="code-section__block">
      <div class="code-section__header">
        <div class="code-section__dots" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <div class="code-section__tabs">
          <button
            :class="['code-section__tab', { 'code-section__tab--active': activeTab === 'preview' }]"
            @click="activeTab = 'preview'"
          >
            Preview
          </button>
          <button
            :class="['code-section__tab', { 'code-section__tab--active': activeTab === 'build' }]"
            @click="activeTab = 'build'"
          >
            Build
          </button>
        </div>
      </div>

      <!-- Preview tab -->
      <pre v-show="activeTab === 'preview'" class="code-section__pre"><code class="code-section__code"><span class="code-t">&lt;script setup&gt;</span>
<span class="code-k">import</span> { EmailPreview } <span class="code-k">from</span> <span class="code-s">'@mailpeek/preview'</span>
<span class="code-k">import</span> <span class="code-s">'@mailpeek/preview/style.css'</span>

<span class="code-k">const</span> html = <span class="code-s">`&lt;html&gt;...your email...&lt;/html&gt;`</span>
<span class="code-t">&lt;/script&gt;</span>

<span class="code-t">&lt;template&gt;</span>
  <span class="code-e">&lt;EmailPreview</span> <span class="code-a">:html</span>=<span class="code-s">"html"</span> <span class="code-a">client</span>=<span class="code-s">"gmail"</span> <span class="code-e">/&gt;</span>
<span class="code-t">&lt;/template&gt;</span></code></pre>

      <!-- Build tab -->
      <pre v-show="activeTab === 'build'" class="code-section__pre"><code class="code-section__code"><span class="code-t">&lt;script setup&gt;</span>
<span class="code-k">import</span> {
  EmailContainer, EmailHeading, EmailText, EmailButton
} <span class="code-k">from</span> <span class="code-s">'@mailpeek/components'</span>
<span class="code-t">&lt;/script&gt;</span>

<span class="code-t">&lt;template&gt;</span>
  <span class="code-e">&lt;EmailContainer&gt;</span>
    <span class="code-e">&lt;EmailHeading</span> <span class="code-a">as</span>=<span class="code-s">"h1"</span><span class="code-e">&gt;</span>Welcome!<span class="code-e">&lt;/EmailHeading&gt;</span>
    <span class="code-e">&lt;EmailText&gt;</span>Thanks for signing up.<span class="code-e">&lt;/EmailText&gt;</span>
    <span class="code-e">&lt;EmailButton</span>
      <span class="code-a">href</span>=<span class="code-s">"https://example.com"</span>
      <span class="code-a">backgroundColor</span>=<span class="code-s">"#0d9488"</span>
    <span class="code-e">&gt;</span>
      Get Started
    <span class="code-e">&lt;/EmailButton&gt;</span>
  <span class="code-e">&lt;/EmailContainer&gt;</span>
<span class="code-t">&lt;/template&gt;</span></code></pre>
    </div>
  </section>
</template>

<style scoped>
.code-section {
  padding: 64px 0;
}

.code-section__title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
  margin: 0 0 8px;
}

.code-section__subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
  text-align: center;
  margin: 0 0 32px;
}

.code-section__block {
  max-width: 560px;
  margin: 0 auto;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: #1b1b1f;
}

.code-section__header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #16161a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.code-section__dots {
  display: flex;
  gap: 6px;
}

.code-section__dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
}

.code-section__tabs {
  display: flex;
  gap: 2px;
  margin-left: 8px;
}

.code-section__tab {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-family: var(--vp-font-family-mono);
  color: rgba(255, 255, 255, 0.35);
  padding: 4px 12px;
  border-radius: 6px;
  transition: color 0.15s, background 0.15s;
}

.code-section__tab:hover {
  color: rgba(255, 255, 255, 0.6);
}

.code-section__tab--active {
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.08);
}

.code-section__pre {
  margin: 0;
  padding: 24px;
  overflow-x: auto;
}

.code-section__code {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
}

/* Syntax highlighting — teal-based */
.code-k { color: #c4b5fd; } /* keywords: import, from, const */
.code-s { color: #00d4ce; } /* strings — teal brand */
.code-t { color: rgba(255, 255, 255, 0.35); } /* template tags */
.code-e { color: #93c5fd; } /* element names */
.code-a { color: #fbbf24; } /* attributes */

@media (max-width: 640px) {
  .code-section {
    padding: 48px 0;
  }

  .code-section__title {
    font-size: 24px;
  }

  .code-section__code {
    font-size: 13px;
  }
}
</style>
