---
title: "How to Send Transactional Emails with Vue and Resend"
description: "Build an email as a Vue component, render it to email-safe HTML, and send it with Resend. A complete, copy-paste guide for Vue 3 and Nuxt apps."
date: 2026-06-05
---

# How to Send Transactional Emails with Vue and Resend

[Resend](https://resend.com) has quickly become the default way to send email from modern applications. The API is clean, the deliverability is good, and the developer experience is impressive. But Resend only handles the sending. It provides a `html` field and you produce the HTML that is compatible with Gmail, Outlook, and the many other email clients.

If you're working in Vue or Nuxt, you don't want to have to hand-write table-based HTML for every email. You already have a component model. This guide shows how to author your emails as Vue components, render them to email-safe HTML, and send them with Resend.

It takes about five minutes.

---

## What you'll need

- A Resend account and an [API key](https://resend.com/api-keys)
- A verified sending domain in Resend (or use their `onboarding@resend.dev` for testing)
- A Vue 3 or Nuxt 3 project
- Node 18+

Install the two packages you'll use to build and render the email, plus the Resend SDK:

```bash
npm install @mailpeek/components resend
```

`@mailpeek/components` is a set of Vue 3 components that compile to table-based, inline-styled HTML, plus a `render()` function that turns a component into an HTML string. It's open source and Vue 3 is the only peer dependency.

---

## Step 1: Build the email as a Vue component

Create an email the same way you'd build any Vue component. The mailpeek components handle the email-specific HTML for you: tables for layout, inline styles, bulletproof buttons for Outlook, and so on.

```vue
<!-- emails/ConfirmEmail.vue -->
<script setup lang="ts">
import {
  EmailHtml, EmailHead, EmailBody, EmailContainer,
  EmailHeading, EmailText, EmailButton, EmailPreviewText,
} from '@mailpeek/components'

defineProps<{ name: string; confirmUrl: string }>()
</script>

<template>
  <EmailHtml>
    <EmailHead title="Confirm your email" />
    <EmailBody>
      <EmailPreviewText>Just one more step to get started</EmailPreviewText>
      <EmailContainer>
        <EmailHeading as="h1">Welcome, {{ name }}</EmailHeading>
        <EmailText>
          Thanks for signing up. Confirm your email address to activate your account.
        </EmailText>
        <EmailButton :href="confirmUrl">Confirm email</EmailButton>
      </EmailContainer>
    </EmailBody>
  </EmailHtml>
</template>
```

A few things worth pointing out:

- `EmailPreviewText` sets the preheader text that shows up in the inbox list next to the subject line. It's hidden in the email body itself.
- `EmailButton` outputs the VML + HTML hybrid that renders as a real button in Outlook, not just a styled link.
- Props are fully typed, so the data each email needs is explicit and checked at compile time.

---

## Step 2: Render the component to HTML

Resend expects a string of HTML. The `render()` function provides this and it's async, because it runs Vue's server-side renderer under the hood.

```ts
import { render } from '@mailpeek/components'
import ConfirmEmail from './emails/ConfirmEmail.vue'

const html = await render(ConfirmEmail, {
  name: 'Sarah',
  confirmUrl: 'https://app.example.com/confirm?token=abc123',
})
```

The second argument is your component's props. The returned `html` includes the email DOCTYPE and all styles inlined, ready to send.

---

## Step 3: Send it with Resend

Now send that HTML to Resend:

```ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'Acme <onboarding@yourdomain.com>',
  to: 'sarah@example.com',
  subject: 'Confirm your email',
  html,
})
```

That covers the component, to HTML, to an inbox.

---

## Putting it together in a Nuxt server route

In a real app you'll usually send from the server. Here's the full flow as a Nuxt 3 server route. It works the same in any Node backend - the only Nuxt-specific part is the `defineEventHandler` wrapper.

```ts
// server/api/send-confirmation.post.ts
import { render } from '@mailpeek/components'
import { Resend } from 'resend'
import ConfirmEmail from '~/emails/ConfirmEmail.vue'

const resend = new Resend(process.env.RESEND_API_KEY)

export default defineEventHandler(async (event) => {
  const { email, name, confirmUrl } = await readBody(event)

  const html = await render(ConfirmEmail, { name, confirmUrl })

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@yourdomain.com>',
    to: email,
    subject: 'Confirm your email',
    html,
  })

  if (error) {
    throw createError({ statusCode: 502, statusMessage: 'Email failed to send' })
  }

  return { id: data?.id }
})
```

The same three steps apply to SendGrid, Postmark, Nodemailer, or any other provider. They all take an HTML string, and `render()` produces a plain one.

---

## Previewing before you send

The reason email is painful is not knowing what the recipient will actually see. Gmail strips most of your `<style>` block. Outlook ignores any modern HTML or CSS.

You can check what survives without sending test emails to yourself. [`@mailpeek/preview`](https://www.npmjs.com/package/@mailpeek/preview) renders your HTML so you can preview it in Gmail, Outlook, and dark mode, and flags the CSS each client will remove:

```vue
<script setup lang="ts">
import { EmailPreview } from '@mailpeek/preview'
import '@mailpeek/preview/style.css'

// the same `html` string you'd pass to Resend
defineProps<{ html: string }>()
</script>

<template>
  <EmailPreview :html="html" client="gmail" />
</template>
```

It estimates email client behaviour rather than replicating it, so it's feedback during development, not a replacement for your production-level QA process.

---

## Skip the boilerplate

Building each email by hand is fine if you only need one or two emails. However, if you need a full suite for your product or business such as a welcome, email verification, password reset, order confirmation, invoices, payment failed etc. it adds up fast, and every one has to be tested across clients.

That's exactly what [mailpeek templates](https://mailpeek.dev/templates) is for. 45 production-ready emails built on these same components, with typed props, dark mode variants, and pre-rendered HTML. Sending one with Resend is the same `render()` call you've already seen:

```ts
import { render } from '@mailpeek/components'
import { PasswordResetEmail } from '@mailpeek/templates'

const html = await render(PasswordResetEmail, {
  recipientName: 'Sarah',
  resetUrl: 'https://app.example.com/reset?token=abc123',
  expiryHours: 1,
  theme: { companyName: 'Acme', primaryColor: '#0d9488' },
})
```

You can define your brand with company name, brand colour, fonts, footer details - and it carries across every template.

[Browse all 45 templates →](https://mailpeek.dev/templates)
