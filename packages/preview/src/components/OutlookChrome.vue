<script setup lang="ts">
defineProps<{ mobile?: boolean; darkMode?: boolean }>()
</script>
<template>
  <div class="outlook-chrome" :class="{ 'outlook-chrome--mobile': mobile, 'outlook-chrome--dark': darkMode }">
    <div class="outlook-toolbar">
      <!-- Text labels suggesting Outlook actions -->
      <button class="outlook-btn" type="button">Reply</button>
      <button class="outlook-btn" type="button">Reply All</button>
      <button class="outlook-btn" type="button">Forward</button>
    </div>
    <div class="outlook-body">
      <slot />
    </div>
  </div>
</template>
<style scoped>
/* Outlook brand palette from RESEARCH.md */
.outlook-chrome {
  background: #f3f2f1;
  border: 1px solid #e1dfdd;
  border-radius: 4px;
  overflow: hidden;
}
.outlook-toolbar {
  background: #ffffff;
  border-bottom: 1px solid #e1dfdd;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.outlook-chrome--mobile .outlook-toolbar {
  padding: 6px 8px;
  gap: 4px;
}
.outlook-btn {
  background: transparent;
  border: 1px solid #8a8886;
  color: #323130;
  padding: 4px 12px;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 13px;
  cursor: default;
}
.outlook-chrome--mobile .outlook-btn {
  padding: 3px 8px;
  font-size: 12px;
}
.outlook-body {
  padding: 16px;
  background: #ffffff;
}
.outlook-chrome--mobile .outlook-body {
  padding: 8px;
}

/* Dark mode palette */
.outlook-chrome--dark {
  background: #1e1e1e;
  border-color: #3a3a3a;
}
.outlook-chrome--dark .outlook-toolbar {
  background: #2d2d2d;
  border-bottom-color: #3a3a3a;
}
.outlook-chrome--dark .outlook-btn {
  color: #e0e0e0;
  border-color: #555555;
}
.outlook-chrome--dark .outlook-body {
  background: #1e1e1e;
}
</style>
