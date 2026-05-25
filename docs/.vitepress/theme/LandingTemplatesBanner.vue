<script setup lang="ts">
import { ref, onMounted } from 'vue'

const sectionRef = ref<HTMLElement>()
const visible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>

<template>
  <section class="tmpl-banner" ref="sectionRef">
    <div class="tmpl-banner__glow" aria-hidden="true"></div>
    <div class="tmpl-banner__inner">
      <div class="tmpl-banner__text">
        <span class="tmpl-banner__eyebrow">New</span>
        <h2 class="tmpl-banner__title">45 production-ready email templates</h2>
        <p class="tmpl-banner__subtitle">
          Vue components + pre-rendered HTML, ready to drop into Resend, SendGrid, or Nodemailer.
        </p>
        <ul class="tmpl-banner__features">
          <li>Multi-client compatibility — Gmail, Outlook, Apple Mail</li>
          <li>Fully responsive single-column mobile layouts</li>
          <li>Bulletproof VML buttons for Outlook</li>
          <li>Customisable themes — colours, fonts, company name, and more</li>
        </ul>
        <div class="tmpl-banner__actions">
          <a href="https://buy.polar.sh/polar_cl_icsoOHZkflOGBQiHnR832Hphqw845JyhEwNHC4Xwyzc" class="tmpl-banner__cta tmpl-banner__cta--primary" target="_blank" rel="noopener">
            Get Complete — $59
          </a>
          <a href="https://buy.polar.sh/polar_cl_GJlqleLZ0q7jOp355qtIMnKb8yZVx3rloAwBb4TbLvT" class="tmpl-banner__cta tmpl-banner__cta--secondary" target="_blank" rel="noopener">
            Essentials — $29
          </a>
        </div>
      </div>
      <div class="tmpl-banner__previews" aria-hidden="true">
        <div class="tmpl-banner__stack" :class="{ 'is-visible': visible }">
          <img class="tmpl-banner__thumb tmpl-banner__thumb--back" src="/thumbnails/transactional/invoice.png" alt="" />
          <img class="tmpl-banner__thumb tmpl-banner__thumb--mid" src="/thumbnails/marketing/newsletter-multi-story.png" alt="" />
          <img class="tmpl-banner__thumb tmpl-banner__thumb--front" src="/thumbnails/marketing/product-launch.png" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tmpl-banner {
  position: relative;
  margin: 0 0 16px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.tmpl-banner__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 20% 50%, rgba(0, 178, 173, 0.1) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 50%, rgba(99, 102, 241, 0.06) 0%, transparent 60%);
  pointer-events: none;
}

.dark .tmpl-banner__glow {
  background: radial-gradient(ellipse at 20% 50%, rgba(0, 212, 206, 0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 50%, rgba(120, 80, 220, 0.08) 0%, transparent 60%);
}

.tmpl-banner__inner {
  position: relative;
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 48px 56px;
}

.tmpl-banner__text {
  flex: 1;
  min-width: 0;
}

.tmpl-banner__eyebrow {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-brand-1);
  background: rgba(0, 178, 173, 0.12);
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 14px;
}

.tmpl-banner__title {
  font-size: 28px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
  margin: 0 0 12px;
}

.tmpl-banner__subtitle {
  font-size: 15px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
  margin: 0 0 28px;
  max-width: 480px;
}

.tmpl-banner__features {
  list-style: none;
  padding: 0;
  margin: 0 0 28px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.tmpl-banner__features li {
  position: relative;
  padding-left: 20px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.tmpl-banner__features li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  width: 14px;
  height: 14px;
  background: var(--vp-c-brand-1);
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath d='M11.5 4L5.5 10 2.5 7' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath d='M11.5 4L5.5 10 2.5 7' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
}

.tmpl-banner__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.tmpl-banner__cta {
  display: inline-block;
  padding: 11px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
}

.tmpl-banner__cta--primary {
  background: var(--vp-c-brand-1);
  color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 178, 173, 0.3);
}

.tmpl-banner__cta--primary:hover {
  box-shadow: 0 0 28px rgba(0, 178, 173, 0.5);
  transform: translateY(-1px);
  color: #ffffff;
}

.dark .tmpl-banner__cta--primary {
  color: #0a0a0a;
}

.dark .tmpl-banner__cta--primary:hover {
  color: #0a0a0a;
}

.tmpl-banner__cta--secondary {
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 600;
}

.tmpl-banner__cta--secondary:hover {
  color: var(--vp-c-brand-2);
}

/* ── Cascade thumbnails ── */
.tmpl-banner__previews {
  flex-shrink: 0;
  width: 340px;
  height: 310px;
  position: relative;
}

.tmpl-banner__stack {
  position: relative;
  width: 100%;
  height: 100%;
}

.tmpl-banner__thumb {
  position: absolute;
  width: 230px;
  height: 172px;
  border-radius: 8px;
  object-fit: cover;
  object-position: top;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}

.dark .tmpl-banner__thumb {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
}

/* ── Start state: invisible, shifted up slightly ── */
.tmpl-banner__thumb--back {
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
  transform: translateY(12px);
  transition: transform 0.5s ease, opacity 0.5s ease;
  transition-delay: 0s;
}

.tmpl-banner__thumb--mid {
  top: 68px;
  left: 56px;
  z-index: 2;
  opacity: 0;
  transform: translateY(12px);
  transition: transform 0.5s ease, opacity 0.5s ease;
  transition-delay: 0.12s;
}

.tmpl-banner__thumb--front {
  top: 136px;
  left: 112px;
  z-index: 3;
  opacity: 0;
  transform: translateY(12px);
  transition: transform 0.5s ease, opacity 0.5s ease;
  transition-delay: 0.24s;
}

/* ── Visible state: slide into position ── */
.tmpl-banner__stack.is-visible .tmpl-banner__thumb--back {
  opacity: 1;
  transform: translateY(0);
}

.tmpl-banner__stack.is-visible .tmpl-banner__thumb--mid {
  opacity: 1;
  transform: translateY(0);
}

.tmpl-banner__stack.is-visible .tmpl-banner__thumb--front {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .tmpl-banner__previews {
    display: none;
  }

  .tmpl-banner__inner {
    padding: 36px 32px;
  }

  .tmpl-banner__title {
    font-size: 22px;
  }
}

@media (max-width: 640px) {
  .tmpl-banner__inner {
    padding: 28px 24px;
  }

  .tmpl-banner__title {
    font-size: 20px;
  }

  .tmpl-banner__subtitle {
    font-size: 14px;
  }
}
</style>
