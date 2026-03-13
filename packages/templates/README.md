# @mailpeek/templates

45 production-ready email templates for Vue 3. Table-based layouts, inline styles, full TypeScript support, and dark mode — built on top of `@mailpeek/components`.

## What's included

```
dist/          Vue SFCs + TypeScript types (use in your Vue/Nuxt app)
html/          Pre-rendered HTML files (drop straight into any email sender)
```

**Essentials** — 15 transactional templates (welcome, password reset, invoice, order confirmation, and more)

**Complete** — all 45 templates: 15 transactional + 15 marketing + 15 reusable patterns

---

## Installation

Install from the downloaded `.tgz` file:

```bash
npm install ./mailpeek-templates-essentials-0.1.0.tgz
# or
pnpm add ./mailpeek-templates-essentials-0.1.0.tgz
```

You'll also need Vue if you don't have it already:

```bash
npm install vue
```

---

## Option 1 - Use the pre-rendered HTML directly

The `html/` directory inside the package contains ready-made HTML files for every template, with default props and the default theme applied. Drop them straight into Resend, SendGrid, Nodemailer, or any other sender.

```js
import { readFileSync } from 'fs'
import { resolve } from 'path'

const html = readFileSync(
  resolve('./node_modules/@mailpeek/templates/html/transactional/welcome.html'),
  'utf8'
)
```

This is the quickest path if you just need standard-looking emails without customisation.

---

## Option 2 - Render with your own props and theme

Use `render()` from `@mailpeek/components` with any template component:

```ts
import { render } from '@mailpeek/components'
import { WelcomeEmail } from '@mailpeek/templates'

const html = await render(WelcomeEmail, {
  recipientName: 'Sarah',
  companyName: 'Acme',
  ctaUrl: 'https://acme.com/start',
  theme: {
    primaryColor: '#6366f1',
    fontFamily: 'Georgia, serif',
  },
})

// html is a complete email-safe HTML string ready to send
```

### With Resend

```ts
import { Resend } from 'resend'
import { render } from '@mailpeek/components'
import { WelcomeEmail } from '@mailpeek/templates'

const resend = new Resend(process.env.RESEND_API_KEY)

const html = await render(WelcomeEmail, {
  recipientName: 'Sarah',
  companyName: 'Acme',
  ctaUrl: 'https://acme.com/start',
})

await resend.emails.send({
  from: 'hello@acme.com',
  to: 'sarah@example.com',
  subject: 'Welcome to Acme',
  html,
})
```

### With Nodemailer

```ts
import nodemailer from 'nodemailer'
import { render } from '@mailpeek/components'
import { WelcomeEmail } from '@mailpeek/templates'

const html = await render(WelcomeEmail, {
  recipientName: 'Sarah',
  companyName: 'Acme',
  ctaUrl: 'https://acme.com/start',
})

await transporter.sendMail({
  from: 'hello@acme.com',
  to: 'sarah@example.com',
  subject: 'Welcome to Acme',
  html,
})
```

---

## Option 3 - Use as Vue components (Nuxt / SSR)

Import and render templates server-side in a Nuxt 3 app:

```ts
// server/api/send-welcome.post.ts
import { render } from '@mailpeek/components'
import { WelcomeEmail } from '@mailpeek/templates'

export default defineEventHandler(async (event) => {
  const html = await render(WelcomeEmail, {
    recipientName: 'Sarah',
    companyName: 'Acme',
    ctaUrl: 'https://acme.com/start',
  })

  // send html via your email provider
})
```

---

## Theming

Every template accepts a `theme` prop with 8 properties:

```ts
const theme = {
  companyName: 'Acme',
  primaryColor: '#6366f1',
  backgroundColor: '#f8fafc',
  contentBackground: '#ffffff',
  fontFamily: '"Inter", Arial, sans-serif',
  companyAddress: '123 Main St, Dublin, Ireland',
  unsubscribeUrl: 'https://acme.com/unsubscribe',
  privacyUrl: 'https://acme.com/privacy',
}

const html = await render(WelcomeEmail, { theme })
```

---

## TypeScript

All props are fully typed. Import the prop interfaces directly:

```ts
import type { WelcomeEmailProps, TemplateTheme } from '@mailpeek/templates'
```

---

## Subpath imports (Complete tier)

```ts
import { WelcomeEmail } from '@mailpeek/templates'
import { WelcomeEmail } from '@mailpeek/templates/transactional'

// Complete tier only:
import { NewsletterSingle } from '@mailpeek/templates/marketing'
import { HeroFullWidth } from '@mailpeek/templates/patterns'
```

---

## Support

Questions or issues: support@mailpeek.dev
