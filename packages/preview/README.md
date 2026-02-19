# @mailpeek/preview

Vue 3 component for previewing email HTML — see how your emails render in Gmail and Outlook before you send them.

![mailpeek demo](https://raw.githubusercontent.com/mailpeek/mailpeek/main/demo/mailpeek-demo.gif)

**[Live Demo](https://mailpeek.dev/demo)** · [Docs](https://mailpeek.dev) · [GitHub](https://github.com/mailpeek/mailpeek)

---

## Features

- **Gmail & Outlook simulation** — CSS filtering based on each client's known restrictions
- **Device preview** — toggle between mobile (375px) and desktop views
- **Email metadata** — subject line, preheader text, file size with Gmail 102KB clipping warning
- **Zero runtime dependencies** — Vue 3 peer dep only
- **TypeScript** — full type definitions included
- **SSR compatible** — works with Nuxt 3

## Installation

```bash
npm install @mailpeek/preview
# or
pnpm add @mailpeek/preview
# or
yarn add @mailpeek/preview
```

## Quick Start

```vue
<script setup lang="ts">
import { EmailPreview } from '@mailpeek/preview'
import '@mailpeek/preview/style.css'

const emailHtml = `
  <html>
    <head><title>Welcome to Our Service</title></head>
    <body>
      <h1>Hello!</h1>
      <p>Thanks for signing up.</p>
    </body>
  </html>
`
</script>

<template>
  <EmailPreview :html="emailHtml" />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `html` | `string` | `undefined` | Raw email HTML to preview |
| `width` | `string` | `'600px'` | CSS width for the preview container |
| `client` | `'gmail' \| 'outlook' \| 'raw'` | `'gmail'` | Email client to simulate |
| `mobile` | `boolean` | `false` | Enable mobile view |
| `deviceWidth` | `'mobile' \| 'desktop'` | `'desktop'` | Device width preset |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `loaded` | `Event` | Fired when the iframe finishes loading |
| `client-change` | `'gmail' \| 'outlook' \| 'raw'` | Fired when user switches email client |
| `device-change` | `'mobile' \| 'desktop'` | Fired when user changes device |

## CSS Filtering

When simulating Gmail or Outlook, mailpeek removes unsupported CSS properties and logs warnings:

```
[mailpeek] Gmail Web: removed "position: fixed" — Gmail does not support CSS positioning
[mailpeek] Outlook: removed "border-radius: 4px" — Outlook Word renderer does not support border-radius
```

**Gmail** strips: `position`, `transform`, `animation`, `transition`, `box-shadow`, `display: grid`, flexbox sub-properties, and more.

**Outlook** (Word engine, 2016–2021) strips everything Gmail does, plus: `border-radius`, `display: flex`, `background-size`, `max-width`, `min-width`, and more.

## TypeScript

```typescript
import type {
  EmailPreviewProps,
  EmailClient,
  DeviceWidth,
  EmailMetadata
} from '@mailpeek/preview'
```

## License

MIT © [mailpeek](https://mailpeek.dev)
