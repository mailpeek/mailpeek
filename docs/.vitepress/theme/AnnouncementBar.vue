<script setup lang="ts">
</script>

<template>
  <div class="announcement-bar">
    <a href="/templates" class="announcement-bar__link">
      <span class="announcement-bar__badge">New</span>
      Email templates coming soon
      <span class="announcement-bar__arrow">&rarr;</span>
      <span class="announcement-bar__cta">Join the waitlist</span>
    </a>
  </div>
</template>

<style scoped>
.announcement-bar {
  background: linear-gradient(135deg, #00948f 0%, #00b2ad 50%, #00c4bf 100%);
  text-align: center;
  padding: 8px 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.announcement-bar__link {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  letter-spacing: -0.01em;
}

.announcement-bar__link:hover .announcement-bar__cta {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.announcement-bar__link:hover .announcement-bar__arrow {
  transform: translateX(2px);
}

.announcement-bar__badge {
  background: rgba(255, 255, 255, 0.2);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  border-radius: 10px;
}

.announcement-bar__arrow {
  transition: transform 0.2s;
}

.announcement-bar__cta {
  font-weight: 700;
}
</style>
