<template>
  <section class="comparison">
    <h2 class="comparison__title">How mailpeek compares</h2>
    <p class="comparison__subtitle">
      Most email preview tools are expensive SaaS platforms. mailpeek is a Vue component you own.
    </p>
    <div class="comparison__table-wrap">
      <table class="comparison__table">
        <thead>
          <tr>
            <th></th>
            <th class="comparison__highlight">mailpeek</th>
            <th>Litmus</th>
            <th>Email on Acid</th>
            <th>React Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="comparison__label">Price</td>
            <td class="comparison__highlight"><strong class="comparison__free">Free</strong></td>
            <td>From $500/mo</td>
            <td>From $74/mo</td>
            <td>Free</td>
          </tr>
          <tr>
            <td class="comparison__label">Open source</td>
            <td class="comparison__highlight"><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
            <td><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
          </tr>
          <tr>
            <td class="comparison__label">Embeddable component</td>
            <td class="comparison__highlight"><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
            <td><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
          </tr>
          <tr>
            <td class="comparison__label">Vue support</td>
            <td class="comparison__highlight"><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
          </tr>
          <tr>
            <td class="comparison__label">Gmail simulation</td>
            <td class="comparison__highlight"><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
          </tr>
          <tr>
            <td class="comparison__label">Outlook simulation</td>
            <td class="comparison__highlight"><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
          </tr>
          <tr>
            <td class="comparison__label">Dark mode preview</td>
            <td class="comparison__highlight"><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
          </tr>
          <tr>
            <td class="comparison__label">Compatibility scoring</td>
            <td class="comparison__highlight"><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
          </tr>
          <tr>
            <td class="comparison__label">Accessibility checker</td>
            <td class="comparison__highlight"><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__yes" aria-label="Yes">&#10003;</span></td>
            <td><span class="comparison__no" aria-label="No">&#10005;</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.comparison {
  padding: 64px 0;
}

.comparison__title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
  margin: 0 0 8px;
}

.comparison__subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
  text-align: center;
  margin: 0 0 32px;
}

.comparison__table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
}

.comparison__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  min-width: 600px;
}

.comparison__table th,
.comparison__table td {
  padding: 14px 18px;
  text-align: center;
  border-bottom: 1px solid var(--vp-c-divider);
}

.comparison__table tbody tr:last-child td {
  border-bottom: none;
}

.comparison__table th {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 14px;
  padding-bottom: 16px;
  background: var(--vp-c-bg-soft);
}

.comparison__table th:first-child,
.comparison__table td:first-child {
  text-align: left;
}

.comparison__label {
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.comparison__highlight {
  background: rgba(0, 178, 173, 0.04);
}

.dark .comparison__highlight {
  background: rgba(0, 212, 206, 0.06);
}

.comparison__table th.comparison__highlight {
  color: var(--vp-c-brand-1);
}

.comparison__free {
  color: var(--vp-c-brand-1);
}

.comparison__yes {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-size: 16px;
}

.comparison__no {
  color: var(--vp-c-text-3);
  font-size: 16px;
}

@media (max-width: 640px) {
  .comparison {
    padding: 48px 0;
  }

  .comparison__title {
    font-size: 24px;
  }

  .comparison__table th,
  .comparison__table td {
    padding: 10px 12px;
    font-size: 13px;
  }
}
</style>
