// Core prop types for @mailpeek/preview Phase 1 + Phase 2 + Phase 3

import type { EmailClient } from './clients/types'
import type { EmailMetadata } from './utils/html-analysis'

// Re-export EmailMetadata for public API
export type { EmailMetadata } from './utils/html-analysis'

// Re-export EmailClient from clients/types for public API
export type { EmailClient } from './clients/types'

// Phase 3: Device width presets
export type DeviceWidth = 'mobile' | 'desktop'

export interface DeviceToggleProps {
  /** Currently selected device width preset */
  modelValue: DeviceWidth
}

export type DeviceToggleEmits = {
  /** Emitted when user selects a device preset */
  'update:modelValue': [width: DeviceWidth]
}

export interface PreviewHeaderProps {
  /** Email metadata to display (subject, preview text, file size) */
  metadata: EmailMetadata
}

export interface EmailPreviewProps {
  /** Raw HTML string to render in the preview iframe */
  html?: string
  /** Width of the preview frame (CSS value, e.g. '600px', '100%') */
  width?: string
  /** Which client simulation to show (default: 'gmail') */
  client?: EmailClient
  /** Enable mobile chrome variant (default: false) */
  mobile?: boolean
  /** Device width preset for the preview iframe (default: 'desktop') */
  deviceWidth?: DeviceWidth
}

export interface PreviewFrameProps {
  /** The processed HTML string to inject via srcdoc */
  html: string
  /** CSS width for the iframe container */
  width?: string
}

export type EmailPreviewEmits = {
  /** Emitted when the iframe finishes loading */
  loaded: [event: Event]
  /** Emitted when user switches clients via ClientSwitcher */
  'client-change': [client: EmailClient]
  /** Emitted when user changes device width via DeviceToggle */
  'device-change': [width: DeviceWidth]
}
