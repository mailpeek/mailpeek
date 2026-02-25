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

export interface EmailHeadProps {
  /** Document title (appears in browser tab / email client subject fallback) */
  title?: string
}

export interface EmailSectionProps {
  /** Background color */
  backgroundColor?: string
  /** CSS padding value (e.g. '16px', '16px 24px') */
  padding?: string
  /** Style overrides */
  style?: CSSProperties
}

export interface EmailRowProps {
  /** Style overrides */
  style?: CSSProperties
}

export interface EmailColumnProps {
  /** Column width (e.g. '50%', '200px') */
  width?: string
  /** Horizontal alignment */
  align?: 'left' | 'center' | 'right'
  /** Vertical alignment */
  valign?: 'top' | 'middle' | 'bottom'
  /** Background color */
  backgroundColor?: string
  /** CSS padding value */
  padding?: string
  /** Style overrides */
  style?: CSSProperties
}

export interface EmailHeadingProps {
  /** Heading level */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
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

export interface EmailImageProps {
  /** Image source URL (required) */
  src: string
  /** Alt text for accessibility */
  alt?: string
  /** Image width in pixels */
  width?: number
  /** Image height in pixels */
  height?: number
  /** Horizontal alignment */
  align?: 'left' | 'center' | 'right'
  /** Style overrides */
  style?: CSSProperties
}

export interface EmailLinkProps {
  /** Link URL (required) */
  href: string
  /** Link text color */
  color?: string
  /** Font size in pixels */
  fontSize?: number
  /** Font family stack */
  fontFamily?: string
  /** Style overrides */
  style?: CSSProperties
}

export interface EmailDividerProps {
  /** Divider color */
  color?: string
  /** Divider height in pixels */
  height?: number
  /** CSS margin value */
  margin?: string
  /** Style overrides */
  style?: CSSProperties
}

export interface EmailPreviewTextProps {
  /** Preview text shown in email client inbox (required) */
  text: string
}

// ─── Render Options ──────────────────────────────────────────────────────────

export interface RenderOptions {
  /** Whether to prepend the email DOCTYPE (default: true) */
  document?: boolean
  /** Email client to filter CSS for (e.g. 'gmail', 'outlook') */
  client?: 'gmail' | 'outlook'
}
