<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// Intermediate "go" pages exist purely so Cloudflare Web Analytics records a
// real pageview for buy-button clicks (the beacon is pageview-only and cannot
// track button clicks directly). We pause briefly to let the beacon fire, then
// forward to the Polar checkout. Bots that do not run JS never reach Polar,
// which also de-noises the checkout numbers.
const props = defineProps<{ tier: 'complete' | 'essentials' }>()

const TIERS = {
  complete: {
    label: 'Complete',
    url: 'https://buy.polar.sh/polar_cl_icsoOHZkflOGBQiHnR832Hphqw845JyhEwNHC4Xwyzc',
  },
  essentials: {
    label: 'Essentials',
    url: 'https://buy.polar.sh/polar_cl_GJlqleLZ0q7jOp355qtIMnKb8yZVx3rloAwBb4TbLvT',
  },
} as const

const target = computed(() => TIERS[props.tier])
const redirecting = ref(true)

onMounted(() => {
  // ~900ms gives the Cloudflare beacon time to register the pageview before we
  // leave the page, while staying fast enough to feel intentional.
  setTimeout(() => {
    window.location.replace(target.value.url)
  }, 900)
})
</script>

<template>
  <div class="buy-redirect">
    <div class="buy-redirect__spinner" aria-hidden="true"></div>
    <h1 class="buy-redirect__title">Taking you to secure checkout…</h1>
    <p class="buy-redirect__text">
      You're being redirected to our payment provider for the
      <strong>{{ target.label }}</strong> template pack.
    </p>
    <p class="buy-redirect__fallback">
      Not redirected automatically?
      <a :href="target.url">Click here to continue</a>.
    </p>
  </div>
</template>

<style scoped>
.buy-redirect {
  max-width: 460px;
  margin: 0 auto;
  padding: 96px 24px;
  text-align: center;
}

.buy-redirect__spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 28px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: buy-redirect-spin 0.8s linear infinite;
}

@keyframes buy-redirect-spin {
  to {
    transform: rotate(360deg);
  }
}

.buy-redirect__title {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 12px;
  border-bottom: none;
}

.buy-redirect__text {
  font-size: 16px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 0 24px;
}

.buy-redirect__fallback {
  font-size: 14px;
  color: var(--vp-c-text-3);
}

.buy-redirect__fallback a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.buy-redirect__fallback a:hover {
  text-decoration: underline;
}
</style>
