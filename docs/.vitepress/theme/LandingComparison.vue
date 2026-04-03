<template>
  <section class="why">
    <h2 class="why__title">Catch issues early, ship with confidence</h2>
    <p class="why__subtitle">
      Mailpeek fits seamlessly into your development phase. Spot broken layouts and stripped CSS instantly,
      without sending a single test email.
    </p>
    <div class="why__grid">
      <div class="why__card">
        <div class="why__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h3 class="why__card-title">Instant feedback</h3>
        <p class="why__card-text">
          See how Gmail and Outlook handle your CSS as you build. No sending, no waiting, no switching tools.
        </p>
      </div>

      <div class="why__card">
        <div class="why__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <h3 class="why__card-title">Find issues before QA</h3>
        <p class="why__card-text">
          Catch stripped properties, broken layouts, and accessibility gaps at dev time, not after a Litmus run.
        </p>
      </div>

      <div class="why__card">
        <div class="why__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h3 class="why__card-title">No account required</h3>
        <p class="why__card-text">
          No subscription, no external service, no sending credits. Drop it into your Vue app and it works offline.
        </p>
      </div>

      <div class="why__card">
        <div class="why__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        </div>
        <h3 class="why__card-title">Know what will break</h3>
        <p class="why__card-text">
          A 0-100 compatibility score with a full breakdown of which CSS properties won't survive each client.
        </p>
      </div>
    </div>

    <p class="why__note">
      Mailpeek approximates how Gmail and Outlook handle your CSS. It's a faster feedback loop during development,
      not a replacement for QA testing in Litmus or Email on Acid.
    </p>
  </section>
</template>

<style scoped>
.why {
  padding: 64px 0;
}

.why__title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
  margin: 0 0 8px;
}

.why__subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
  text-align: center;
  margin: 0 auto 40px;
  max-width: 560px;
  line-height: 1.6;
}

.why__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.why__card {
  padding: 28px 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.why__card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 24px rgba(0, 178, 173, 0.08);
}

.dark .why__card:hover {
  box-shadow: 0 0 24px rgba(0, 212, 206, 0.06);
}

.why__icon {
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

.why__card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
}

.why__card-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
}

.why__note {
  font-size: 13px;
  color: var(--vp-c-text-3);
  text-align: center;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
}

@media (max-width: 960px) {
  .why__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .why {
    padding: 48px 0;
  }

  .why__title {
    font-size: 24px;
  }

  .why__grid {
    grid-template-columns: 1fr;
  }
}
</style>
