# API Reference

## `EmailPreview`

The main component for rendering email previews.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `html` | `string` | `undefined` | Raw email HTML to preview |
| `width` | `string` | `'600px'` | CSS width for the preview container |
| `client` | `EmailClient` | `'gmail'` | Email client to preview |
| `mobile` | `boolean` | `false` | Enable mobile chrome variant |
| `deviceWidth` | `DeviceWidth` | `'desktop'` | Device width preset |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `loaded` | `Event` | Fired when the iframe finishes loading |
| `client-change` | `EmailClient` | Fired when user switches email client |
| `device-change` | `DeviceWidth` | Fired when user changes device preset |

### Slots

| Slot | Description |
|------|-------------|
| `default` | HTML content to render in the preview (alternative to the `html` prop) |

## Types

```ts
type EmailClient = 'gmail' | 'outlook' | 'raw'

type DeviceWidth = 'mobile' | 'desktop'

interface EmailMetadata {
  subject: string | null
  previewText: string | null
  fileSize: {
    bytes: number
    formatted: string
    isWarning: boolean
  }
}

interface EmailPreviewProps {
  html?: string
  width?: string
  client?: EmailClient
  mobile?: boolean
  deviceWidth?: DeviceWidth
}

interface ClientConfig {
  id: string
  name: string
  version: string
  cssRestrictions: CssRestriction[]
  stripExternalStylesheets?: boolean
  stripAtImport?: boolean
}

interface CssRestriction {
  property: string
  reason: string
  unsupportedValues?: string[]
}

interface FilterResult {
  html: string
  warnings: string[]
}
```

## Utility Functions

### `filterHtml`

Filters HTML through a client's CSS restriction rules, removing unsupported properties from both inline styles and `<style>` blocks.

```ts
import { filterHtml, gmailConfig } from '@mailpeek/preview'

const { html, warnings } = filterHtml(rawHtml, gmailConfig)
```

### `filterInlineStyles`

Filters only inline `style="..."` attributes.

```ts
import { filterInlineStyles, outlookConfig } from '@mailpeek/preview'

const { html, warnings } = filterInlineStyles(rawHtml, outlookConfig)
```

### `filterStyleBlocks`

Filters only `<style>...</style>` blocks.

```ts
import { filterStyleBlocks, gmailConfig } from '@mailpeek/preview'

const { html, warnings } = filterStyleBlocks(rawHtml, gmailConfig)
```

### `analyzeEmail`

Extracts metadata (subject, preview text, file size) from an email HTML string.

```ts
import { analyzeEmail } from '@mailpeek/preview'

const metadata = analyzeEmail(emailHtml)
// { subject: 'Welcome', previewText: 'Thanks for...', fileSize: { bytes: 2048, formatted: '2.0 KB', isWarning: false } }
```

### `extractSubject`

Extracts the subject from the `<title>` tag.

```ts
import { extractSubject } from '@mailpeek/preview'

const subject = extractSubject(emailHtml) // 'Welcome to Our Service'
```

### `extractPreviewText`

Extracts the preview/preheader text.

```ts
import { extractPreviewText } from '@mailpeek/preview'

const preview = extractPreviewText(emailHtml) // 'Thanks for signing up.'
```

### `calculateFileSize`

Calculates the file size with a Gmail clipping warning.

```ts
import { calculateFileSize } from '@mailpeek/preview'

const size = calculateFileSize(emailHtml)
// { bytes: 2048, formatted: '2.0 KB', isWarning: false }
```

## Client Configs

Pre-built client configuration objects with CSS restriction rules.

### `gmailConfig`

Gmail Web CSS restrictions (2024). Strips `position`, `transform`, `animation`, `transition`, `box-shadow`, `display: grid`, flexbox sub-properties, and more.

```ts
import { gmailConfig } from '@mailpeek/preview'
```

### `outlookConfig`

Outlook Word engine CSS restrictions (2019-2021). Strips everything Gmail does, plus `border-radius`, `display: flex`, `background-size`, `max-width`, `min-width`, and more.

```ts
import { outlookConfig } from '@mailpeek/preview'
```

## Sub-Components

These components are exported individually for advanced use cases.

| Component | Description |
|-----------|-------------|
| `PreviewFrame` | Iframe wrapper that injects HTML via `srcdoc` |
| `GmailChrome` | Gmail web interface chrome |
| `OutlookChrome` | Outlook web interface chrome |
| `ClientSwitcher` | Client switching toolbar |
| `DeviceToggle` | Device width toggle buttons |
| `PreviewHeader` | Email metadata display header |
