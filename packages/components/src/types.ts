import type { CSSProperties } from 'vue'

// ─── Component Props ─────────────────────────────────────────────────────────

export interface EmailHtmlProps {
  /** Language attribute for <html> tag */
  lang?: string
  /** Text direction */
  dir?: 'ltr' | 'rtl'
}

export interface EmailBodyProps {
  /** Background color of the body */
  backgroundColor?: string
  /** Style overrides */
  style?: CSSProperties
}

export interface EmailContainerProps {
  /** Maximum width of the container in pixels */
  maxWidth?: number
  /** Horizontal alignment */
  align?: 'left' | 'center' | 'right'
  /** Background color */
  backgroundColor?: string
  /** Style overrides */
  style?: CSSProperties
}

export interface EmailTextProps {
  /** Font size in pixels */
  fontSize?: number
  /** Line height (unitless multiplier) */
  lineHeight?: number
  /** Font family stack */
  fontFamily?: string
  /** Text color */
  color?: string
  /** Text alignment */
  align?: 'left' | 'center' | 'right'
  /** Style overrides */
  style?: CSSProperties
}

export interface EmailButtonProps {
  /** Link URL (required) */
  href: string
  /** Button background color */
  backgroundColor?: string
  /** Button text color */
  color?: string
  /** Border radius in pixels */
  borderRadius?: number
  /** Font size in pixels */
  fontSize?: number
  /** Horizontal padding in pixels */
  paddingX?: number
  /** Vertical padding in pixels */
  paddingY?: number
  /** Button alignment */
  align?: 'left' | 'center' | 'right'
  /** Style overrides */
  style?: CSSProperties
}

// ─── Render Options ──────────────────────────────────────────────────────────

export interface RenderOptions {
  /** Whether to prepend the email DOCTYPE (default: true) */
  document?: boolean
  /** Email client to filter CSS for (e.g. 'gmail', 'outlook') */
  client?: 'gmail' | 'outlook'
}
