// Client simulation type definitions for @mailpeek/preview

/**
 * Supported email client identifiers.
 * 'raw' means no CSS simulation is applied.
 */
export type EmailClient = 'gmail' | 'outlook' | 'raw'

/**
 * Describes a single CSS restriction for an email client.
 * If unsupportedValues is undefined, ALL values of the property are stripped.
 * If unsupportedValues is set, only declarations whose value starts with one of
 * the listed strings will be stripped.
 */
export interface CssRestriction {
  /** CSS property name in kebab-case (e.g. 'position', 'border-radius') */
  property: string
  /** Human-readable explanation for the console warning */
  reason: string
  /**
   * If set, only strip the property when the value starts with one of these strings.
   * Example: ['grid', 'inline-grid'] strips display:grid but keeps display:flex.
   * If undefined, ALL values of this property are stripped.
   */
  unsupportedValues?: string[]
}

/**
 * Full configuration for an email client simulator.
 * Contains the client metadata and its CSS restriction list.
 */
export interface ClientConfig {
  /** Unique identifier matching the EmailClient union type */
  id: EmailClient
  /** Display name for console warnings and UI labels */
  name: string
  /** Version string clarifying which version this restriction list applies to */
  version: string
  /** List of CSS properties that this client strips or does not support */
  cssRestrictions: CssRestriction[]
  /**
   * If true, <link rel="stylesheet"> tags are removed from the HTML.
   * Gmail and Outlook both strip external stylesheets.
   */
  stripExternalStylesheets?: boolean
  /**
   * If true, @import rules are removed from <style> blocks.
   * Gmail and Outlook both strip @import.
   */
  stripAtImport?: boolean
}
