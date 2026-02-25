# Getting Started

mailpeek has two packages: **@mailpeek/preview** for previewing emails across clients, and **@mailpeek/components** for building emails with Vue components. You can use either or both.

---

## Previewing Emails

`@mailpeek/preview` lets you preview any email HTML inside Gmail and Outlook previews. Dark mode, compatibility scoring, and accessibility checking are all included out of the box.

### Installation

::: code-group

```bash [npm]
npm install @mailpeek/preview
```

```bash [pnpm]
pnpm add @mailpeek/preview
```

```bash [yarn]
yarn add @mailpeek/preview
```

:::

### Import

Import the component and its stylesheet in your Vue app:

```ts
import { EmailPreview } from '@mailpeek/preview'
import '@mailpeek/preview/style.css'
```

### Basic Usage

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

The component renders your email HTML inside an iframe with Gmail chrome by default. Use the built-in toolbar to switch between email clients and device sizes.

### What's Included

Out of the box, `EmailPreview` provides:

- **Client chrome** — Gmail and Outlook UI wrappers that approximate the real inbox experience
- **CSS filtering** — Strips unsupported CSS properties per-client (e.g. Gmail removes `position`, Outlook removes `border-radius`)
- **Device toggle** — Switch between mobile and desktop viewport widths
- **Metadata display** — Shows the email subject, preview text, and file size
- **Clipping warning** — Flags emails that exceed Gmail's 102KB threshold
- **Compatibility scoring** — A 0–100 score with a breakdown of which CSS properties will break in each client
- **Accessibility checker** — 10 WCAG checks for alt text, heading hierarchy, link text, colour contrast, and more

---

## Building Emails

`@mailpeek/components` provides 14 Vue components that compile to cross-client email HTML. Use them to build emails with familiar Vue syntax, then render to an HTML string for sending.

### Installation

::: code-group

```bash [npm]
npm install @mailpeek/components
```

```bash [pnpm]
pnpm add @mailpeek/components
```

```bash [yarn]
yarn add @mailpeek/components
```

:::

### Basic Usage

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

Use the `render()` function to convert any Vue email component to an HTML string:

```ts
import { render } from '@mailpeek/components'
import WelcomeEmail from './WelcomeEmail.vue'

const html = await render(WelcomeEmail)
// Send with Resend, SendGrid, Nodemailer, etc.
```

See the [Components reference](/components) for all 14 components and the full API.
