# mailpeek

The only Vue-native email toolkit. Build cross-client emails with type-safe components, then preview them across Gmail, Outlook, and dark mode.

![mailpeek demo](https://raw.githubusercontent.com/mailpeek/mailpeek/main/demo/mailpeek-demo.gif)

**[Live Demo](https://mailpeek.dev/demo)** · **[Docs](https://mailpeek.dev)** · **[GitHub](https://github.com/mailpeek/mailpeek)**

## Packages

| Package | Description |
|---------|-------------|
| [`@mailpeek/preview`](packages/preview) | Preview emails across Gmail, Outlook, and dark mode with CSS filtering, compatibility scoring, and accessibility checking |
| [`@mailpeek/components`](packages/components) | 14 Vue components that compile to cross-client email HTML, with server-side rendering |

## @mailpeek/preview

Preview any email HTML inside Gmail and Outlook with per-client CSS filtering, dark mode, compatibility scoring, and accessibility checking.

```bash
npm install @mailpeek/preview
```

```vue
<script setup lang="ts">
import { EmailPreview } from '@mailpeek/preview'
import '@mailpeek/preview/style.css'

const emailHtml = `
  <html>
    <head>
      <title>Welcome to Our Service</title>
    </head>
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

### Features

- **Gmail & Outlook preview** — Per-client CSS filtering strips unsupported properties (`@font-face`, `@media`, positioning, flexbox, grid, and more)
- **Dark mode** — Preview how each client transforms your email in dark mode
- **Compatibility scoring** — 0-100 score with per-property breakdown of what breaks in each client
- **Accessibility checker** — 10 WCAG checks for alt text, heading hierarchy, link text, and colour contrast
- **Device toggle** — Switch between mobile, tablet, and desktop viewports
- **Metadata display** — Subject line, preview text, and file size with Gmail 102KB clipping warning
- **Zero dependencies** — Vue 3 peer dep only, fully typed, SSR compatible

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `html` | `string` | `undefined` | Raw email HTML to preview |
| `width` | `string` | `'600px'` | CSS width for the preview container |
| `client` | `'gmail' \| 'outlook' \| 'raw'` | `'gmail'` | Email client to preview |
| `mobile` | `boolean` | `false` | Enable mobile chrome variant |
| `deviceWidth` | `'mobile' \| 'desktop'` | `'desktop'` | Device width preset |
| `darkMode` | `boolean` | `false` | Enable dark mode preview |

## @mailpeek/components

Build cross-client email HTML with 14 type-safe Vue components.

```bash
npm install @mailpeek/components
```

```vue
<script setup>
import {
  EmailHtml, EmailHead, EmailBody, EmailContainer,
  EmailHeading, EmailText, EmailButton,
} from '@mailpeek/components'
</script>

<template>
  <EmailHtml>
    <EmailHead title="Welcome" />
    <EmailBody>
      <EmailContainer>
        <EmailHeading as="h1">Hello!</EmailHeading>
        <EmailText>Thanks for joining us.</EmailText>
        <EmailButton href="https://example.com">Get Started</EmailButton>
      </EmailContainer>
    </EmailBody>
  </EmailHtml>
</template>
```

### Server-Side Rendering

```ts
import { render } from '@mailpeek/components'
import WelcomeEmail from './WelcomeEmail.vue'

const html = await render(WelcomeEmail, { name: 'Aoife' })
// Send with Resend, SendGrid, Nodemailer, etc.
```

### Components

`EmailHtml` · `EmailHead` · `EmailBody` · `EmailContainer` · `EmailSection` · `EmailRow` · `EmailColumn` · `EmailHeading` · `EmailText` · `EmailButton` · `EmailImage` · `EmailLink` · `EmailDivider` · `EmailPreviewText`

All components output email-safe HTML with inline styles and table-based layouts. Full TypeScript support, zero dependencies beyond Vue 3.

## License

MIT
