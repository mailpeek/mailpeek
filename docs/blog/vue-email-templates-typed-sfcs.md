---
title: "How I Built 45 Email Templates as Typed Vue SFCs"
description: "The technical constraints of email HTML, why Vue SFCs are a surprisingly good fit, and how a theme system works without CSS variables."
date: 2026-03-16
---

# How I Built 45 Email Templates as Typed Vue SFCs

Every SaaS project I've ever started comes with the dreaded transactional and marketing emails - welcome, password reset, invoicing and so on. Each involving the pain of email-specific HTML. If I never saw table-based layouts or Outlook conditional comments again I'd be happy! After doing this multiple times across projects I got fed up and decided to build a proper set of reusable templates. What started as a personal time-saver became 45 typed Vue SFCs with a full theme system. Here's what I learned while building them.

---

## Email HTML is nothing like web HTML

The first thing to understand is that email clients are a terrible, fragmented rendering environment. Gmail strips `<style>` blocks from the `<head>`. Outlook uses Microsoft Word's rendering engine (yes, Word) which means flexbox and grid are completely ignored. Apple Mail is mostly fine but has its own dark mode quirks.

The rules that apply:

- **No flexbox or grid.** Use HTML tables for every multi-column layout.
- **All styles must be inlined.** Gmail strips anything in a `<style>` block. Every element needs a `style="..."` attribute.
- **No CSS shorthand.** Use `margin-top`, `margin-right`, `margin-bottom`, `margin-left` individually - shorthand is unreliable across clients.
- **Explicit dimensions on every image.** `width` and `height` as HTML attributes, not just CSS.
- **Bulletproof buttons.** A plain `<a>` styled as a button will break in Outlook. The reliable pattern uses VML conditional comments:

```html
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="https://example.com"
  style="height:44px;v-text-anchor:middle;width:200px;"
  arcsize="7%" fillcolor="#0d9488">
  <v:textbox inset="0,0,0,0">
  <center style="color:#ffffff;font-family:sans-serif;font-size:15px;font-weight:700;">
    Get started
  </center>
  </v:textbox>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!-->
<a href="https://example.com" style="background-color:#0d9488;border-radius:6px;
  color:#ffffff;display:inline-block;font-size:15px;font-weight:700;
  line-height:44px;padding:0 28px;text-decoration:none;">
  Get started
</a>
<!--<![endif]-->
```

Outlook renders the VML version. Every other client renders the HTML anchor. It's verbose, but it's the only reliable approach.

---

## Why Vue SFCs are a surprisingly good fit

Once you accept that email HTML has its own rules, the question is: what's the best way to author and maintain it?

Plain HTML files work, but they don't compose well. Copy-pasting a footer across 45 files and then needing to update a URL in all of them is exactly the kind of problem components solve.

Vue SFCs work well here for three reasons.

**First, SSR render-to-string gives you exactly what you need.** Email isn't interactive - you just need a string of HTML to hand to Resend, Nodemailer, or whatever sending provider you use. Vue's `renderToString` produces that string from any component.

**Second, TypeScript props give you a typed contract for every template.** Instead of a comment saying "remember to update the recipient name", you get a compile error if you forget. Every template's required and optional fields are explicit.

**Third, it fits your existing mental model.** If you're building a Vue or Nuxt app, these templates live in your project like any other component. Same tooling, same TypeScript, same hot reload in development.

---

## The shell component

With 45 templates, the biggest risk is inconsistency. Every template needs the same boilerplate: the email DOCTYPE, `<head>` with CSS, the outer table structure, a branded header, a footer with unsubscribe and privacy links.

The solution is a `TemplateShell` component that handles all of that. Each individual template only implements its unique content sections:

```vue
<!-- WelcomeEmail.vue -->
<template>
  <TemplateShell :theme="theme" title="Welcome" :preview-text="previewText">
    <EmailSection>
      <EmailText>Hi {{ recipientName }},</EmailText>
      <EmailText>{{ bodyText }}</EmailText>
      <EmailButton :href="ctaUrl" :theme="theme">{{ ctaText }}</EmailButton>
    </EmailSection>
  </TemplateShell>
</template>
```

The shell renders around it: branded header, content, footer. Change the shell once and all 45 templates update.

---

## The theme system

The part I spent the most time on is `TemplateTheme` - a plain TypeScript interface that controls branding across every template:

```typescript
export interface TemplateTheme {
  companyName?: string
  primaryColor?: string
  fontFamily?: string
  backgroundColor?: string
  contentBackground?: string
  unsubscribeUrl?: string
  privacyUrl?: string
  companyAddress?: string
}
```

No runtime. No CSS variables (those get stripped by email clients anyway). Just props that flow into inline styles throughout the component tree.

The practical benefit: set your brand colour and company name once, pass the theme object to any template, and every email is consistently branded. Change `primaryColor` and buttons, headers, and links all update automatically.

---

## Dark mode without CSS variables

Dark mode in email is genuinely tricky. The approach that works on the web (`prefers-color-scheme` with CSS custom properties) doesn't work in email because CSS variables are stripped.

The solution is `@media (prefers-color-scheme: dark)` with attribute selectors targeting actual hex values. Instead of:

```css
/* This won't work - CSS variables are stripped */
@media (prefers-color-scheme: dark) {
  .email-body { background-color: var(--bg-dark); }
}
```

You write:

```css
@media (prefers-color-scheme: dark) {
  [data-ogsc] .email-body,
  [data-ogsb] .email-body {
    background-color: #1a1a2e !important;
  }
}
```

In the templates, this CSS is generated dynamically from the theme object so it adapts when the user changes their background colours. The `TemplateShell` injects it into `<EmailHead>` at render time.

---

## SSR as the render pipeline

The actual render function is straightforward:

```typescript
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

export async function render(component, props) {
  const app = createSSRApp({
    render: () => h(component, props),
  })

  const html = await renderToString(app)
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" ...>\n${html}`
}
```

This works anywhere Node runs: a Nuxt server route, an Express handler, a Vercel edge function. The email DOCTYPE is prepended automatically because email clients expect it.

Using it looks like this:

```typescript
import { render } from '@mailpeek/components'
import { WelcomeEmail } from '@mailpeek/templates/transactional'

const html = await render(WelcomeEmail, {
  recipientName: 'Sarah',
  theme: {
    companyName: 'Acme',
    primaryColor: '#6366f1',
  },
})

await resend.emails.send({
  from: 'hello@acme.com',
  to: 'sarah@example.com',
  subject: 'Welcome to Acme',
  html,
})
```

---

## What this became

After building this out across 45 templates (15 transactional, 15 marketing, 15 reusable layout patterns) it's now Mailpeek Templates, a paid template pack for Vue and Nuxt developers.

If you're building a SaaS product and want to skip the email HTML work entirely, it's available at [mailpeek.dev/templates](https://mailpeek.dev/templates). Pre-rendered HTML is also included if you'd rather not use the Vue layer at all.
