// Core prop types for @mailpeek/preview Phase 1 + Phase 2 + Phase 3

import type { EmailClient } from './clients/types'
import type { EmailMetadata } from './utils/html-analysis'

// Re-export EmailMetadata for public API
export type { EmailMetadata } from './utils/html-analysis'

// Re-export EmailClient from clients/types for public API
export type { EmailClient } from './clients/types'

// Re-export compatibility types for public API
export type { CompatibilityReport, CompatibilityIssue } from './utils/compatibility'

// Re-export accessibility types for public API
export type { AccessibilityReport, AccessibilityIssue, AccessibilitySeverity } from './utils/accessibility'

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

export interface DarkModeToggleProps {
  /** Whether dark mode is enabled */
  modelValue: boolean
}

export type DarkModeToggleEmits = {
  /** Emitted when user toggles dark mode */
  'update:modelValue': [enabled: boolean]
}

export interface PreviewHeaderProps {
  /** Email metadata to display (subject, preview text, file size) */
  metadata: EmailMetadata
  /** Whether dark mode is active */
  darkMode?: boolean
  /** Compatibility report for the current client */
  compatibility?: import('./utils/compatibility').CompatibilityReport | null
  /** Whether the compatibility details panel is open (controls chevron direction) */
  detailsOpen?: boolean
  /** Accessibility report for the email */
  accessibility?: import('./utils/accessibility').AccessibilityReport | null
  /** Whether the accessibility details panel is open (controls chevron direction) */
  a11yDetailsOpen?: boolean
  /** Subject line of the email (optional, can be extracted from metadata) */
  subject?: string
  /** Preview text of the email (optional, can be extracted from metadata) */
  previewText?: string
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
  /** Enable dark mode simulation (default: false) */
  darkMode?: boolean
  /** Subject line of the email */
  subject?: string
  /** Preview text of the email */
  previewText?: string
}

export interface PreviewFrameProps {
  /** The processed HTML string to inject via srcdoc */
  html: string
  /** CSS width for the iframe container */
  width?: string
  /** Whether dark mode simulation is active */
  darkMode?: boolean
  /** The active email client (determines dark mode strategy) */
  client?: EmailClient
}

export type EmailPreviewEmits = {
  /** Emitted when the iframe finishes loading */
  loaded: [event: Event]
  /** Emitted when user switches clients via ClientSwitcher */
  'client-change': [client: EmailClient]
  /** Emitted when user changes device width via DeviceToggle */
  'device-change': [width: DeviceWidth]
  /** Emitted when user toggles dark mode */
  'darkmode-change': [enabled: boolean]
}
