<script setup lang="ts">
import { ref } from 'vue'

const copied = ref(false)
const installCmd = 'npm install @mailpeek/preview @mailpeek/components'

async function copyInstall() {
  try {
    await navigator.clipboard.writeText(installCmd)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // Fallback: select text
  }
}
</script>

<template>
  <section class="hero">
    <div class="hero__glow" aria-hidden="true"></div>
    <div class="hero__content">
      <div class="hero__wordmark-wrap">
        <img
          src="/logo-mark.png"
          alt=""
          class="hero__logo-icon"
          width="146"
          height="146"
        />
        <img
          src="/mailpeek-wordmark2.png"
          alt="mailpeek"
          class="hero__wordmark"
          width="640"
          height="146"
        />
      </div>
      <h1 class="hero__title">
        See what your recipients see.
      </h1>
      <p class="hero__subtitle">
        Build and preview emails in Vue. Compose with type-safe components, render to HTML,
        then preview across Gmail, Outlook, and dark mode. Open source, zero dependencies.
      </p>

      <div class="hero__actions">
        <a href="/getting-started" class="hero__cta hero__cta--primary">Get Started</a>
        <a href="#demo" class="hero__cta hero__cta--secondary">Try the Demo</a>
      </div>

      <div class="hero__install" @click="copyInstall">
        <span class="hero__install-prompt">$</span>
        <code class="hero__install-cmd">{{ installCmd }}</code>
        <button type="button" class="hero__install-copy" :title="copied ? 'Copied!' : 'Copy to clipboard'">
          <svg v-if="!copied" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.3"/>
            <path d="M11 3H3.5A1.5 1.5 0 0 0 2 4.5V11" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 8.5l3 3 5-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 96px 0 64px;
  text-align: center;
  overflow: visible;
}

.hero__glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100%;
  background: radial-gradient(ellipse at center 30%, rgba(0, 178, 173, 0.15) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
  animation: glow-pulse 6s ease-in-out infinite;
}

.dark .hero__glow {
  background:
    radial-gradient(ellipse at 40% 30%, rgba(0, 212, 206, 0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 30%, rgba(120, 80, 220, 0.16) 0%, transparent 50%);
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero__wordmark-wrap {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.hero__logo-icon {
  height: 70px;
  width: auto;
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.hero__wordmark {
  position: relative;
  z-index: 1;
  height: 144px;
  width: auto;
  display: block;
}

.dark .hero__wordmark {
  filter: brightness(1.8) saturate(1.2);
}

.hero__title {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: 0.02em;
  color: var(--hero-title-color, #18181b);
  margin: 0 0 16px;
}

.hero__subtitle {
  font-size: 18px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 0 36px;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
}

.hero__actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 36px;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.hero__cta--primary {
  background: var(--vp-c-brand-1);
  color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 178, 173, 0.3);
}

.hero__cta--primary:hover {
  box-shadow: 0 0 30px rgba(0, 178, 173, 0.5);
  transform: translateY(-1px);
}

.dark .hero__cta--primary {
  color: #0a0a0a;
}

.hero__cta--secondary {
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: transparent;
}

.hero__cta--secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.hero__install {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px 18px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.hero__install:hover {
  border-color: var(--vp-c-brand-1);
}

.hero__install-prompt {
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  font-weight: 600;
  user-select: none;
}

.hero__install-cmd {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.hero__install-copy {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--vp-c-text-3);
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.15s;
}

.hero__install-copy:hover {
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .hero {
    padding: 64px 0 40px;
  }

  .hero__logo-icon {
    display: none;
  }

  .hero__wordmark {
    height: 96px;
  }

  .hero__title {
    font-size: 36px;
  }

  .hero__subtitle {
    font-size: 16px;
  }

  .hero__actions {
    flex-direction: column;
    align-items: center;
  }

  .hero__cta {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}
</style>
