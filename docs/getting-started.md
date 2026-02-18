# Getting Started

## Installation

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

## Import

Import the component and its stylesheet in your Vue app:

```ts
import { EmailPreview } from '@mailpeek/preview'
import '@mailpeek/preview/style.css'
```

## Basic Usage

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

## What's Included

Out of the box, `EmailPreview` provides:

- **Client chrome** — Gmail and Outlook UI wrappers that simulate the real inbox experience
- **CSS filtering** — Strips unsupported CSS properties per-client (e.g. Gmail removes `position`, Outlook removes `border-radius`)
- **Device toggle** — Switch between mobile and desktop viewport widths
- **Metadata display** — Shows the email subject, preview text, and file size
- **Clipping warning** — Flags emails that exceed Gmail's 102KB threshold
