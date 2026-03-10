/**
 * Expands a CSS shorthand value (1-4 space-separated values) into
 * top/right/bottom/left components for Outlook-safe inline styles.
 */
export function expandShorthand(value: string): {
  top: string
  right: string
  bottom: string
  left: string
} {
  const parts = value.trim().split(/\s+/)
  switch (parts.length) {
    case 1:
      return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] }
    case 2:
      return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] }
    case 3:
      return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[1] }
    default:
      return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] }
  }
}
