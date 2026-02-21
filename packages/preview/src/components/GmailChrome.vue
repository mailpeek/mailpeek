<script setup lang="ts">
defineProps<{ mobile?: boolean; darkMode?: boolean }>()
</script>
<template>
  <div class="gmail-chrome" :class="{ 'gmail-chrome--mobile': mobile, 'gmail-chrome--dark': darkMode }">
    <div class="gmail-toolbar">
      <!-- Abstract toolbar icons suggesting Gmail actions -->
      <div class="gmail-toolbar-icons">
        <svg class="gmail-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3 7l7 5 7-5v8a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" stroke="currentColor" stroke-width="1.4" fill="none"/>
          <path d="M3 7l7-4 7 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
        <svg class="gmail-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M4 5h12M4 10h12M4 15h8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <svg class="gmail-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M5 4l10 6-10 6V4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" fill="none"/>
        </svg>
      </div>
    </div>
    <div class="gmail-body">
      <slot />
    </div>
  </div>
</template>
<style scoped>
/* Gmail brand palette from RESEARCH.md */
.gmail-chrome {
  background: #f6f8fc;
  border-radius: 8px;
  border: 1px solid #dadce0;
  overflow: hidden;
}
.gmail-chrome--mobile {
  border-radius: 0;
}
.gmail-toolbar {
  background: #ffffff;
  border-bottom: 1px solid #dadce0;
  padding: 8px 16px;
  display: flex;
  align-items: center;
}
.gmail-chrome--mobile .gmail-toolbar {
  padding: 6px 12px;
}
.gmail-toolbar-icons {
  display: flex;
  gap: 12px;
}
.gmail-icon {
  color: #5f6368;
  opacity: 0.7;
}
.gmail-body {
  padding: 16px;
}
.gmail-chrome--mobile .gmail-body {
  padding: 8px;
}

/* Dark mode palette */
.gmail-chrome--dark {
  background: #1a1a1a;
  border-color: #3c4043;
}
.gmail-chrome--dark .gmail-toolbar {
  background: #2d2d2d;
  border-bottom-color: #3c4043;
}
.gmail-chrome--dark .gmail-icon {
  color: #9aa0a6;
}
.gmail-chrome--dark .gmail-body {
  background: #1a1a1a;
}
</style>
