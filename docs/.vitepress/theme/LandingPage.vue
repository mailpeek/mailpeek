<script setup lang="ts">
import LandingHero from './LandingHero.vue'
import EmailDemo from './EmailDemo.vue'
import LandingFeatures from './LandingFeatures.vue'
import LandingComparison from './LandingComparison.vue'
import LandingCode from './LandingCode.vue'
import LandingSignup from './LandingSignup.vue'
</script>

<template>
  <div class="landing">
    <LandingHero />

    <section id="demo" class="landing__section landing__demo">
      <div class="landing__container">
        <EmailDemo />
      </div>
    </section>


    <LandingFeatures />
    <LandingComparison />
    <LandingCode />
    <LandingSignup />
  </div>
</template>

<style scoped>
.landing {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

.landing__section {
  padding: 64px 0;
}

.landing__container {
  max-width: 960px;
  margin: 0 auto;
}

.landing__section-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
  text-align: center;
}

.landing__section-subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0 0 32px;
  text-align: center;
}

@media (max-width: 768px) {
  .landing__demo {
    display: none;
  }
}

@media (max-width: 640px) {
  .landing {
    padding: 0 16px 48px;
  }

  .landing__section {
    padding: 48px 0;
  }

  .landing__section-title {
    font-size: 24px;
  }
}
</style>
