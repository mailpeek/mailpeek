<script setup lang="ts">
// NOTE: renderToString is imported from 'vue/server-renderer'.
// This module ships with the vue package itself (no separate install required).
// In production builds, apps using only the `html` prop path will have this
// tree-shaken out by Vite/Rollup since the import is only exercised when
// the default slot is used.
import { ref, computed, watch, useSlots, onMounted, h, createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import type { EmailPreviewProps, EmailPreviewEmits, EmailClient, DeviceWidth } from '../types'
import { filterHtml } from '../utils/css-filter'
import { analyzeEmail } from '../utils/html-analysis'
import { analyzeCompatibility } from '../utils/compatibility'
import { gmailConfig } from '../clients/gmail'
import { outlookConfig } from '../clients/outlook'
import PreviewFrame from './PreviewFrame.vue'
import CompatibilityDetails from './CompatibilityDetails.vue'
import GmailChrome from './GmailChrome.vue'
import OutlookChrome from './OutlookChrome.vue'
import ClientSwitcher from './ClientSwitcher.vue'
import DeviceToggle from './DeviceToggle.vue'
import DarkModeToggle from './DarkModeToggle.vue'
import PreviewHeader from './PreviewHeader.vue'

const props = withDefaults(defineProps<EmailPreviewProps>(), {
  html: undefined,
  width: '600px',
  client: 'gmail',
  mobile: false,
  deviceWidth: 'desktop',
  darkMode: false,
})

const emit = defineEmits<EmailPreviewEmits>()
const slots = useSlots()

// The HTML string that will be rendered in the iframe
const resolvedHtml = ref<string>('')

// Internal client state (allows switcher to work without two-way binding)
const activeClient = ref<EmailClient>(props.client)

// Sync prop to internal state (per RESEARCH.md pitfall #4 — guard against reactive loops)
watch(() => props.client, (newVal) => {
  if (newVal !== undefined && newVal !== activeClient.value) {
    activeClient.value = newVal
  }
})

// Handle client switch from UI
function onClientChange(client: EmailClient) {
  activeClient.value = client
  emit('client-change', client)
}

// Internal device state (allows toggle to work without two-way binding)
const activeDevice = ref<DeviceWidth>(props.deviceWidth ?? 'desktop')

// Sync deviceWidth prop to internal state (same guard pattern as activeClient)
watch(() => props.deviceWidth, (newVal) => {
  if (newVal !== undefined && newVal !== activeDevice.value) {
    activeDevice.value = newVal
  }
})

// Handle device change from DeviceToggle UI
function onDeviceChange(device: DeviceWidth) {
  activeDevice.value = device
  emit('device-change', device)
}

// Internal dark mode state (allows toggle to work without two-way binding)
const activeDarkMode = ref<boolean>(props.darkMode)

// Sync darkMode prop to internal state (same guard pattern)
watch(() => props.darkMode, (newVal) => {
  if (newVal !== undefined && newVal !== activeDarkMode.value) {
    activeDarkMode.value = newVal
  }
})

// Handle dark mode toggle from UI
function onDarkModeChange(enabled: boolean) {
  activeDarkMode.value = enabled
  emit('darkmode-change', enabled)
}

const isMobile = computed(() => props.mobile || activeDevice.value === 'mobile')

// Resolve effective width — mobile prop takes precedence, then device toggle, then props.width
const effectiveWidth = computed(() => {
  if (isMobile.value) return '375px'
  return props.width
})

// Filtered HTML computed — applies CSS restrictions for the active client
const filteredHtml = computed(() => {
  if (activeClient.value === 'raw') {
    return resolvedHtml.value
  }
  const config = activeClient.value === 'gmail' ? gmailConfig : outlookConfig
  const { html, warnings } = filterHtml(resolvedHtml.value, config)
  // Log warnings batched after computed cycle (not per-property) per RESEARCH.md pitfall #2
  warnings.forEach(w => console.warn(w))
  return html
})

// Email metadata computed from resolved HTML (subject, preview text, file size)
const metadata = computed(() => analyzeEmail(resolvedHtml.value))

// Compatibility report computed — scores HTML against active client's restrictions
const compatibilityReport = computed(() => {
  if (activeClient.value === 'raw') return null
  const config = activeClient.value === 'gmail' ? gmailConfig : outlookConfig
  return analyzeCompatibility(resolvedHtml.value, config)
})

// Whether compatibility details panel is open
const showCompatibilityDetails = ref(false)

function onToggleDetails(open: boolean) {
  showCompatibilityDetails.value = open
}

// Render slot content to an HTML string using vue/server-renderer
async function renderSlotToHtml(): Promise<string> {
  const defaultSlot = slots.default?.()
  if (!defaultSlot || defaultSlot.length === 0) return ''

  // Wrap slot VNodes in a fragment component for renderToString.
  // createSSRApp is required because renderToString expects App<any> | VNode,
  // not a plain render object in strict TypeScript mode.
  const app = createSSRApp({
    render() {
      return h('div', defaultSlot)
    },
  })
  const html = await renderToString(app)
  // renderToString wraps in <div>, unwrap it
  return html.replace(/^<div[^>]*>/, '').replace(/<\/div>$/, '')
}

// Resolve HTML from prop or slot
async function resolveHtml() {
  if (props.html !== undefined) {
    resolvedHtml.value = props.html
  } else if (slots.default) {
    resolvedHtml.value = await renderSlotToHtml()
  } else {
    resolvedHtml.value = ''
  }
}

// Recompute when html prop changes (covers PREV-02 reactivity requirement)
watch(() => props.html, resolveHtml, { immediate: true })

// Also resolve on mount for slot content (slot VNodes not reactive the same way)
onMounted(resolveHtml)

function onFrameLoaded(event: Event) {
  emit('loaded', event)
}
</script>

<template>
  <div class="mailpeek-preview">
    <!-- Toolbar: ClientSwitcher on left, DeviceToggle on right -->
    <div class="mailpeek-toolbar">
      <ClientSwitcher
        :model-value="activeClient"
        @update:model-value="onClientChange"
      />

      <div class="mailpeek-toolbar-right">
        <DarkModeToggle
          :model-value="activeDarkMode"
          @update:model-value="onDarkModeChange"
        />
        <DeviceToggle
          :model-value="activeDevice"
          @update:model-value="onDeviceChange"
        />
      </div>
    </div>

    <!-- Metadata header with compatibility score badge -->
    <PreviewHeader
      :metadata="metadata"
      :dark-mode="activeDarkMode"
      :compatibility="compatibilityReport"
      @toggle-details="onToggleDetails"
    />

    <!-- Expandable compatibility details panel -->
    <CompatibilityDetails
      v-if="showCompatibilityDetails && compatibilityReport"
      :report="compatibilityReport"
      :dark-mode="activeDarkMode"
      @close="showCompatibilityDetails = false"
    />

    <!-- Device-width container constrains the chrome + iframe -->
    <div class="mailpeek-device-container" :style="{ maxWidth: effectiveWidth }">
      <!-- Gmail chrome wrapper -->
      <GmailChrome v-if="activeClient === 'gmail'" :mobile="isMobile" :dark-mode="activeDarkMode">
        <PreviewFrame :html="filteredHtml" :width="'100%'" :dark-mode="activeDarkMode" :client="activeClient" @load="onFrameLoaded" />
      </GmailChrome>

      <!-- Outlook chrome wrapper -->
      <OutlookChrome v-else-if="activeClient === 'outlook'" :mobile="isMobile" :dark-mode="activeDarkMode">
        <PreviewFrame :html="filteredHtml" :width="'100%'" :dark-mode="activeDarkMode" :client="activeClient" @load="onFrameLoaded" />
      </OutlookChrome>

      <!-- Raw mode (no chrome, no filtering) -->
      <PreviewFrame v-else :html="resolvedHtml" :width="'100%'" :dark-mode="activeDarkMode" client="raw" @load="onFrameLoaded" />
    </div>

    <p v-if="activeDarkMode" class="mailpeek-darkmode-note">
      Dark mode is simulated — actual rendering may vary slightly between clients.
    </p>
  </div>
</template>

<style scoped>
.mailpeek-preview {
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.mailpeek-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  max-width: 900px;
}

.mailpeek-toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mailpeek-device-container {
  margin: 0 auto;
  transition: max-width 0.3s ease;
}

.mailpeek-darkmode-note {
  margin: 10px 0 0;
  font-size: 12px;
  color: #9aa0a6;
  text-align: center;
}
</style>
