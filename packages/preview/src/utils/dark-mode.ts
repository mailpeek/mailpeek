// Dark mode simulation utility for @mailpeek/preview
//
// Pure functions — no DOM, no Vue imports — fully SSR-safe.
// Returns CSS strings that simulate how email clients render
// emails in dark mode. Injected into the PreviewFrame iframe.
//
// Four strategies based on real client behaviour:
// - none: No content transformation — just a dark background. Gmail web does NOT
//   invert email content in dark mode; it only darkens the surrounding chrome.
// - full-inversion: CSS filter invert(0.9) + hue-rotate — used by Gmail mobile, Outlook Windows
// - partial-inversion: CSS filter at lower intensity — used by Outlook.com/mobile
// - color-scheme: sets color-scheme: dark to trigger @media (prefers-color-scheme: dark) — Apple Mail (future)

import type { EmailClient } from '../clients/types'

export type DarkModeStrategy = 'none' | 'full-inversion' | 'partial-inversion' | 'color-scheme'

export interface DarkModeConfig {
  /** The inversion strategy this client uses */
  strategy: DarkModeStrategy
  /** CSS to inject into the iframe <style> block */
  css: string
  /** Whether to set color-scheme: dark on <html> */
  colorScheme: boolean
}

// Gmail web: dark background only, no content transformation
const NONE_CSS = `
  html { background-color: #1a1a1a !important; }
`

const FULL_INVERSION_CSS = `
  html { background-color: #1a1a1a !important; }
  body { filter: invert(0.9) hue-rotate(180deg) !important; }
  img, video, picture, picture source {
    filter: invert(0.9) hue-rotate(180deg) !important;
  }
`

const PARTIAL_INVERSION_CSS = `
  html { background-color: #1e1e1e !important; }
  body { filter: invert(0.85) hue-rotate(180deg) !important; }
  img, video, picture, picture source {
    filter: invert(0.85) hue-rotate(180deg) !important;
  }
`

const configs: Record<EmailClient, DarkModeConfig> = {
  gmail: {
    strategy: 'none',
    css: NONE_CSS,
    colorScheme: false,
  },
  outlook: {
    strategy: 'partial-inversion',
    css: PARTIAL_INVERSION_CSS,
    colorScheme: false,
  },
  raw: {
    strategy: 'full-inversion',
    css: FULL_INVERSION_CSS,
    colorScheme: false,
  },
}

/**
 * Returns the full dark mode configuration for a given email client.
 */
export function getDarkModeConfig(client: EmailClient): DarkModeConfig {
  return configs[client]
}

/**
 * Returns the CSS string to inject into the iframe for dark mode simulation.
 * Returns an empty string if dark mode is not enabled.
 */
export function getDarkModeCss(client: EmailClient, enabled: boolean): string {
  if (!enabled) return ''
  return configs[client].css
}
