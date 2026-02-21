// Dark mode simulation utility for @mailpeek/preview
//
// Pure functions — no DOM, no Vue imports — fully SSR-safe.
// Returns CSS strings that simulate how email clients render
// emails in dark mode. Injected into the PreviewFrame iframe.
//
// Three strategies based on real client behaviour:
// - full-inversion: CSS filter invert(0.9) + hue-rotate — used by Gmail mobile, Outlook Windows
// - partial-inversion: CSS filter at lower intensity — used by Outlook.com/mobile
// - color-scheme: sets color-scheme: dark to trigger @media (prefers-color-scheme: dark) — Apple Mail (future)

import type { EmailClient } from '../clients/types'

export type DarkModeStrategy = 'full-inversion' | 'partial-inversion' | 'color-scheme'

export interface DarkModeConfig {
  /** The inversion strategy this client uses */
  strategy: DarkModeStrategy
  /** CSS to inject into the iframe <style> block */
  css: string
  /** Whether to set color-scheme: dark on <html> */
  colorScheme: boolean
}

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
    strategy: 'full-inversion',
    css: FULL_INVERSION_CSS,
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
