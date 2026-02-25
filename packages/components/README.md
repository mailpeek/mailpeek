# @mailpeek/components

14 Vue 3 components for building cross-client email HTML, with server-side rendering.

**[Docs](https://mailpeek.dev/components)** · **[GitHub](https://github.com/mailpeek/mailpeek)**

## Features

- **14 email components** — Layout, content, and utility primitives that compile to email-safe HTML
- **Server-side rendering** — `render()` function converts Vue email templates to HTML strings
- **Type-safe** — Full TypeScript support for all components and props
- **Zero dependencies** — Vue 3 peer dep only

## Installation

```bash
npm install @mailpeek/components
```

## Quick Start

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

## Server-Side Rendering

Use the `render()` function to convert any Vue email component to an HTML string:

```ts
import { render } from '@mailpeek/components'
import WelcomeEmail from './WelcomeEmail.vue'

const html = await render(WelcomeEmail, { name: 'Aoife' })
// Send with Resend, SendGrid, Nodemailer, etc.
```

## Components

### Layout

| Component | Description |
|-----------|-------------|
| `EmailHtml` | Root `<html>` element with xmlns attributes |
| `EmailHead` | `<head>` with meta tags, optional title, and style slot |
| `EmailBody` | `<body>` with configurable background and padding |
| `EmailContainer` | Centred content wrapper (default 600px) |
| `EmailSection` | Full-width section block |
| `EmailRow` | Horizontal row for multi-column layouts |
| `EmailColumn` | Column within a row |

### Content

| Component | Description |
|-----------|-------------|
| `EmailHeading` | Heading element (`h1`-`h6`) |
| `EmailText` | Paragraph text |
| `EmailButton` | Call-to-action button with link |
| `EmailImage` | Image with email-safe defaults |
| `EmailLink` | Inline hyperlink |

### Utility

| Component | Description |
|-----------|-------------|
| `EmailDivider` | Horizontal rule |
| `EmailPreviewText` | Hidden preview text for inbox snippets |

All components output table-based HTML with inline styles for maximum email client compatibility.

## Also Available

[`@mailpeek/preview`](https://www.npmjs.com/package/@mailpeek/preview) — Preview emails across Gmail, Outlook, and dark mode with compatibility scoring and accessibility checking.

## License

MIT
