// @mailpeek/preview — public API

// Main component
export { default as EmailPreview } from './components/EmailPreview.vue'

// Internal components (exported for consumers who want standalone usage)
export { default as PreviewFrame } from './components/PreviewFrame.vue'
export { default as GmailChrome } from './components/GmailChrome.vue'
export { default as OutlookChrome } from './components/OutlookChrome.vue'
export { default as ClientSwitcher } from './components/ClientSwitcher.vue'
export { default as DeviceToggle } from './components/DeviceToggle.vue'
export { default as DarkModeToggle } from './components/DarkModeToggle.vue'
export { default as PreviewHeader } from './components/PreviewHeader.vue'
export { default as CompatibilityDetails } from './components/CompatibilityDetails.vue'
export { default as AccessibilityDetails } from './components/AccessibilityDetails.vue'

// TypeScript types
export type { EmailPreviewProps, PreviewFrameProps, EmailPreviewEmits, EmailClient, DeviceWidth, DeviceToggleProps, DarkModeToggleProps, PreviewHeaderProps, EmailMetadata, CompatibilityReport, CompatibilityIssue, AccessibilityReport, AccessibilityIssue, AccessibilitySeverity } from './types'

// Client configuration databases
export { gmailConfig } from './clients/gmail'
export { outlookConfig } from './clients/outlook'

// CSS filtering utilities
export { filterHtml } from './utils/css-filter'
export type { FilterResult } from './utils/css-filter'

// Compatibility scoring utilities
export { analyzeCompatibility } from './utils/compatibility'

// Accessibility scoring utilities
export { analyzeAccessibility } from './utils/accessibility'

// Dark mode simulation utilities
export { getDarkModeConfig, getDarkModeCss } from './utils/dark-mode'
export type { DarkModeConfig, DarkModeStrategy } from './utils/dark-mode'

// HTML analysis utilities
export { analyzeEmail, extractSubject, extractPreviewText, calculateFileSize } from './utils/html-analysis'
