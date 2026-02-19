<script setup lang="ts">
import { EmailPreview } from '@mailpeek/preview'
import '@mailpeek/preview/style.css'
import emailHtml from '../../../demo/welcome-email.html?raw'
</script>

<template>
  <div class="demo-page">
    <div class="demo-container">
      <h1>Live Demo</h1>
      <p>Switch between Gmail, Outlook, and Raw rendering. Toggle between mobile and desktop views.</p>
      <EmailPreview :html="emailHtml" />
    </div>
  </div>
</template>

<style scoped>
.demo-page {
  padding: 48px 32px;
}

.demo-container {
  max-width: 960px;
  margin: 0 auto;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 12px;
}

p {
  color: #6b7280;
  margin: 0 0 32px;
}
</style>
