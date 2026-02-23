<template>
  <section class="features">
    <h2 class="features__title">Everything you need to preview emails</h2>
    <div class="features__grid">
      <div class="features__card">
        <div class="features__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20"/><circle cx="6" cy="6" r="0.5" fill="currentColor"/><circle cx="9" cy="6" r="0.5" fill="currentColor"/></svg>
        </div>
        <h3 class="features__card-title">Client Simulation</h3>
        <p class="features__card-text">
          Preview emails as Gmail and Outlook render them. Accurate CSS filtering replicates each client's restrictions.
        </p>
      </div>

      <div class="features__card">
        <div class="features__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        </div>
        <h3 class="features__card-title">Dark Mode Preview</h3>
        <p class="features__card-text">
          Simulate how Gmail, Outlook, and Apple Mail transform your email in dark mode before your users see it.
        </p>
      </div>

      <div class="features__card">
        <div class="features__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        <h3 class="features__card-title">Compatibility Scoring</h3>
        <p class="features__card-text">
          Get a 0-100 score with a detailed breakdown of which CSS properties will break in each email client.
        </p>
      </div>

      <div class="features__card">
        <div class="features__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <h3 class="features__card-title">Accessibility Checker</h3>
        <p class="features__card-text">
          10 WCAG checks for alt text, heading hierarchy, link text quality, colour contrast, and more.
        </p>
      </div>

      <div class="features__card">
        <div class="features__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>
        </div>
        <h3 class="features__card-title">Device Preview</h3>
        <p class="features__card-text">
          Toggle between mobile, tablet, and desktop views to check responsive behaviour across screen sizes.
        </p>
      </div>

      <div class="features__card">
        <div class="features__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4M4 7l8 4M4 7v10l8 4m0-10v10"/></svg>
        </div>
        <h3 class="features__card-title">Zero Dependencies</h3>
        <p class="features__card-text">
          Only Vue 3 as a peer dependency. Fully typed with TypeScript. SSR compatible with Nuxt 3.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  padding: 64px 0;
}

.features__title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
  margin: 0 0 40px;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.features__card {
  padding: 28px 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.features__card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 24px rgba(0, 178, 173, 0.08);
}

.dark .features__card:hover {
  box-shadow: 0 0 24px rgba(0, 212, 206, 0.06);
}

.features__icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 178, 173, 0.1);
  border-radius: 10px;
  color: var(--vp-c-brand-1);
  margin-bottom: 16px;
}

.features__card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
}

.features__card-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
}

@media (max-width: 960px) {
  .features__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .features {
    padding: 48px 0;
  }

  .features__title {
    font-size: 24px;
  }

  .features__grid {
    grid-template-columns: 1fr;
  }
}
</style>
