// @mailpeek/preview — public API

// Main component
export { default as EmailPreview } from './components/EmailPreview.vue'

// Internal components (exported for consumers who want standalone usage)
export { default as PreviewFrame } from './components/PreviewFrame.vue'
export { default as GmailChrome } from './components/GmailChrome.vue'
export { default as OutlookChrome } from './components/OutlookChrome.vue'
export { default as ClientSwitcher } from './components/ClientSwitcher.vue'
export { default as DeviceToggle } from './components/DeviceToggle.vue'
export { default as PreviewHeader } from './components/PreviewHeader.vue'

// TypeScript types
export type { EmailPreviewProps, PreviewFrameProps, EmailPreviewEmits, EmailClient, DeviceWidth, DeviceToggleProps, PreviewHeaderProps, EmailMetadata } from './types'

// Client configuration databases
export { gmailConfig } from './clients/gmail'
export { outlookConfig } from './clients/outlook'

// CSS filtering utilities
export { filterHtml } from './utils/css-filter'
export type { FilterResult } from './utils/css-filter'

// HTML analysis utilities
export { analyzeEmail, extractSubject, extractPreviewText, calculateFileSize } from './utils/html-analysis'
