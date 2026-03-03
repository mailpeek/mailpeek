---
layout: page
title: Thank you
---

<script setup>
import { ref, onMounted } from 'vue'

const showContent = ref(true)
</script>

<div class="thank-you" v-if="showContent">
  <div class="thank-you__icon">
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="var(--vp-c-brand-1)" opacity="0.12"/>
      <path d="M22 33l7 7 13-14" stroke="var(--vp-c-brand-1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>

  <h1 class="thank-you__title">You're all set!</h1>
  <p class="thank-you__text">
    Thanks for purchasing mailpeek templates. Check your email for your license key and download instructions.
  </p>

  <div class="thank-you__steps">
    <div class="thank-you__step">
      <span class="thank-you__step-num">1</span>
      <div>
        <strong>Check your email</strong>
        <p>Your license key and download link are on the way.</p>
      </div>
    </div>
    <div class="thank-you__step">
      <span class="thank-you__step-num">2</span>
      <div>
        <strong>Install the package</strong>
        <p>Follow the instructions in the email to add <code>@mailpeek/templates</code> to your project.</p>
      </div>
    </div>
    <div class="thank-you__step">
      <span class="thank-you__step-num">3</span>
      <div>
        <strong>Start building</strong>
        <p>Import templates, pass your theme, and render to HTML.</p>
      </div>
    </div>
  </div>

  <div class="thank-you__links">
    <a href="/getting-started" class="thank-you__cta">Getting Started Guide</a>
    <a href="/templates" class="thank-you__cta thank-you__cta--secondary">Back to Templates</a>
  </div>
</div>

<style>
.thank-you {
  max-width: 560px;
  margin: 0 auto;
  padding: 64px 0 80px;
  text-align: center;
}

.thank-you__icon {
  margin-bottom: 24px;
}

.thank-you__title {
  font-size: 36px;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin: 0 0 12px;
  border-bottom: none;
}

.thank-you__text {
  font-size: 17px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 0 40px;
}

.thank-you__steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
  margin-bottom: 40px;
}

.thank-you__step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
}

.thank-you__step-num {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-1);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  border-radius: 50%;
}

.dark .thank-you__step-num {
  color: #0a0a0a;
}

.thank-you__step strong {
  display: block;
  font-size: 15px;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}

.thank-you__step p {
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0;
}

.thank-you__step code {
  font-size: 13px;
  background: var(--vp-c-bg-alt);
  padding: 1px 5px;
  border-radius: 4px;
}

.thank-you__links {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.thank-you__cta {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  background: var(--vp-c-brand-1);
  color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 178, 173, 0.3);
  transition: all 0.2s;
}

.thank-you__cta:hover {
  box-shadow: 0 0 30px rgba(0, 178, 173, 0.5);
  transform: translateY(-1px);
}

.dark .thank-you__cta {
  color: #0a0a0a;
}

.thank-you__cta--secondary {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  box-shadow: none;
}

.thank-you__cta--secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  box-shadow: none;
  transform: none;
}

.dark .thank-you__cta--secondary {
  color: var(--vp-c-text-1);
}

@media (max-width: 640px) {
  .thank-you {
    padding: 40px 0 60px;
  }

  .thank-you__title {
    font-size: 28px;
  }

  .thank-you__links {
    flex-direction: column;
    align-items: center;
  }

  .thank-you__cta {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}
</style>
