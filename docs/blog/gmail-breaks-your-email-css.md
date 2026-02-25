---
title: "Why Gmail Breaks Your Email CSS (and How to Catch It Before Your Users Do)"
description: "A deep dive into what Gmail and Outlook actually strip from your email HTML, how dark mode makes it worse, and how to preview the damage before you hit send."
date: 2026-02-25
author: Aoife Shannon
---

# Why Gmail Breaks Your Email CSS (and How to Catch It Before Your Users Do)

You spent an afternoon building a beautiful transactional email. The header gradient is perfect. The buttons have rounded corners and a subtle shadow. The layout uses flexbox so everything centres nicely. You send a test to yourself, open it in Gmail, and half the design is gone.

This is not a bug. This is email in 2026.

Email rendering is stuck somewhere around 2004. Gmail runs every incoming email through a custom HTML sanitizer that aggressively strips CSS it considers unsafe or unnecessary. Outlook desktop (2016 through 2021) goes further - it literally uses Microsoft Word as its HTML rendering engine. Word. The word processor. For rendering HTML.

The result is that the CSS you write and the CSS your recipients see are often two completely different things. And unlike web development, there are no DevTools, no error messages, and no way to know what broke until someone screenshots it and sends it to you.

Let's fix that.

## What Gmail Actually Strips

Gmail's HTML sanitizer is not documented in full, but between Google's own developer docs, community testing, and resources like caniemail.com, we have a clear picture. Here is what it removes.

### @font-face - gone entirely

```css
/* What you wrote */
@font-face {
  font-family: 'BrandSans';
  src: url('https://fonts.example.com/brand-sans.woff2') format('woff2');
}

h1 {
  font-family: 'BrandSans', sans-serif;
}

/* What Gmail renders */
h1 {
  font-family: 'BrandSans', sans-serif; /* Falls back to Arial/Helvetica */
}
```

The `@font-face` rule is stripped. The `font-family` declaration stays, but since the font was never loaded, you get whatever sans-serif fallback the system provides. On most machines, that is Arial.

### @media queries - ignored on desktop

```css
/* What you wrote */
@media (max-width: 600px) {
  .container { width: 100% !important; }
  .column { display: block !important; }
}

/* What Gmail desktop renders */
/* Nothing. The entire @media block is removed. */
```

Gmail desktop strips all `@media` rules. Your responsive email is not responsive in Gmail desktop. Gmail mobile has partial support, but desktop - which is where a huge percentage of business email is read - ignores media queries completely.

### Positioning properties - all stripped

```css
/* What you wrote */
.tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  z-index: 100;
}

/* What Gmail renders */
.tooltip {
  /* Empty. Every property was stripped. */
}
```

`position`, `top`, `right`, `bottom`, `left`, and `z-index` are all removed. Any layout that depends on positioned elements will collapse.

### CSS Grid - stripped (but flexbox partially survives)

```css
/* What you wrote */
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.flex-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* What Gmail renders */
.grid-layout {
  /* display: grid is removed entirely */
}

.flex-layout {
  display: flex; /* Kept! */
  /* But align-items and justify-content are stripped */
}
```

This is a subtle one. Gmail does support `display: flex`, but it strips the sub-properties that make flexbox useful -- `align-items`, `justify-content`, `flex-direction`, `flex-wrap`, and `flex`. So your flex container exists, but you have no control over how its children are laid out.

### Visual effects - stripped

```css
/* What you wrote */
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

/* What Gmail renders */
.card {
  /* All three properties removed */
}
```

`box-shadow`, `transform`, `animation`, and `transition` are all stripped. Your hover effects, entrance animations, and depth cues will not render.

### External stylesheets and @import - stripped

```html
<!-- What you wrote -->
<link rel="stylesheet" href="https://example.com/email-styles.css">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter');
</style>

<!-- What Gmail renders -->
<!-- The <link> tag is removed entirely -->
<style>
  /* @import rule is removed */
</style>
```

Gmail strips all external `<link>` stylesheet references and all `@import` rules inside `<style>` blocks. Every style must be in an inline `<style>` block or in a `style` attribute.

### The 8,192-character style block limit

This is the one that catches people off guard. If a single `<style>` block in your email exceeds 8,192 characters, Gmail removes the **entire block**. Not the overflow - the whole thing. Every rule in that block disappears.

```html
<!-- What you wrote -->
<style>
  /* ... 8,193 characters of perfectly valid CSS ... */
</style>

<!-- What Gmail renders -->
<!-- The entire <style> block is gone. -->
```

Most email developers do not know this limit exists. If you are using a CSS framework, a design system, or generating styles programmatically, it is easy to hit. The fix is to split your styles across multiple `<style>` blocks, each under the limit.

## Outlook Is Even Worse

If Gmail's sanitizer is aggressive, Outlook's Word rendering engine is hostile. Outlook desktop (2016, 2019, 2021) strips everything Gmail strips, plus:

- **`border-radius`** - no rounded corners, period. Your carefully rounded buttons become rectangles.
- **`display: flex`** - Gmail keeps it, Outlook removes it. Flexbox does not exist in Word.
- **`background-size`** - background images render, but you cannot control their sizing.
- **`max-width` and `min-width`** - width constraints are unreliable. Use fixed `width` instead.
- **`float`** - the traditional CSS layout fallback does not work either.

The reason is straightforward: Microsoft Word's HTML renderer was built for converting Word documents to HTML, not for rendering modern web pages. It supports a subset of HTML 4 and CSS 2, and that is roughly where it stops.

There is good news on the horizon. Microsoft is rolling out a new Chromium-based Outlook that uses a proper browser engine. But the transition is gradual - classic Word-engine Outlook and new Chromium Outlook coexist, and you need to support both for the foreseeable future.

## Dark Mode: The Wild West

If cross-client CSS support is a mess, dark mode is where it becomes genuinely chaotic. Every email client handles dark mode differently, and there is no single approach that works everywhere.

- **Gmail web desktop**: Does NOT transform email content at all. It darkens the surrounding Gmail UI chrome, but your email renders exactly as written - light background and all.
- **Gmail iOS**: Full colour inversion. It applies a CSS filter that inverts colours across the entire email body, then re-inverts images so photos do not look like negatives.
- **Outlook desktop (Word engine)**: Partial inversion with per-element colour replacement. It selectively replaces background and text colours, sometimes producing unexpected combinations.
- **Outlook.com / New Outlook**: Partial inversion at a lower intensity, closer to a colour remap than a true invert.

The practical consequence is that an email can look correct in Gmail web dark mode (because nothing changes), broken in Gmail iOS dark mode (because your dark-on-dark section disappears), and weird in Outlook (because it replaced your brand green with a shade of teal it thought was more readable).

There is no CSS property or meta tag that reliably controls dark mode across all clients. You have to test each one.

## Gmail vs Outlook: CSS Property Comparison

Here is a quick reference for what survives and what does not in the two most common email clients:

| CSS Property | Gmail Web | Outlook (Word Engine) |
|---|---|---|
| `color`, `background-color` | Supported | Supported |
| `font-size`, `font-weight`, `font-family` | Supported | Supported |
| `margin`, `padding` | Supported | Supported |
| `border` | Supported | Supported |
| `width`, `height` | Supported | Supported |
| `text-align`, `vertical-align` | Supported | Supported |
| `display: block/inline/none` | Supported | Supported |
| `display: flex` | Supported | **Stripped** |
| `align-items`, `justify-content` | **Stripped** | **Stripped** |
| `display: grid` | **Stripped** | **Stripped** |
| `border-radius` | Supported | **Stripped** |
| `max-width`, `min-width` | Supported | **Stripped** |
| `float` | Supported | **Stripped** |
| `background-size` | Supported | **Stripped** |
| `box-shadow` | **Stripped** | **Stripped** |
| `position` / offsets / `z-index` | **Stripped** | **Stripped** |
| `transform` | **Stripped** | **Stripped** |
| `animation`, `transition` | **Stripped** | **Stripped** |
| `@font-face` | **Stripped** | **Stripped** |
| `@media` queries | **Stripped** | **Stripped** |
| `@import` / external stylesheets | **Stripped** | **Stripped** |

The pattern is clear: Outlook strips everything Gmail strips, plus `border-radius`, `display: flex`, `background-size`, `max-width`/`min-width`, and `float`. If it works in Outlook, it works everywhere.

## How to Catch This Before Your Users Do

I got tired of sending test emails to myself, opening them in six different clients, and squinting at screenshots. So I built a tool to solve it.

[`@mailpeek/preview`](https://www.npmjs.com/package/@mailpeek/preview) is a Vue component that previews how Gmail and Outlook render your email HTML. It runs the same kind of CSS filtering those clients perform - stripping unsupported properties, removing `@media` queries, enforcing the style block character limit - and shows you the result in real time.

Install it:

```bash
npm install @mailpeek/preview
```

Drop it into any Vue 3 app:

```vue
<script setup lang="ts">
import { EmailPreview } from '@mailpeek/preview'
import '@mailpeek/preview/style.css'

const emailHtml = `
  <html>
    <head>
      <style>
        .hero { border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .cta { display: flex; align-items: center; justify-content: center; }
      </style>
    </head>
    <body>
      <div class="hero">
        <h1>Welcome aboard</h1>
        <div class="cta">
          <a href="#">Get Started</a>
        </div>
      </div>
    </body>
  </html>
`
</script>

<template>
  <!-- Gmail mode: box-shadow stripped, flex sub-properties stripped -->
  <EmailPreview :html="emailHtml" client="gmail" />

  <!-- Outlook mode: all of the above PLUS border-radius stripped -->
  <EmailPreview :html="emailHtml" client="outlook" />
</template>
```

Switching between `client="gmail"` and `client="outlook"` shows you exactly what each client strips. The component also exposes:

- A **compatibility score** (0-100) that tells you how much of your CSS survives in each client. A score of 100 means nothing is stripped. A score of 60 means you have problems.
- **Console warnings** that name every stripped property, where it was found, and why it was removed.
- A built-in **accessibility checker** running 10 WCAG-relevant checks - missing alt text on images, broken heading hierarchy, vague link text, and more.
- **Dark mode preview** that simulates Gmail's no-op behaviour, Outlook's partial inversion, and full colour inversion for iOS clients.
- **Device width toggles** between mobile, tablet, and desktop viewports.

Disclaimer: It is not a pixel-perfect simulation - it approximates client behaviour based on documented CSS restriction databases and community testing from caniemail.com. But it catches the vast majority of issues before you send.

## Build Emails That Survive Gmail

Previewing is half the problem. The other half is writing email HTML that works in the first place.

If you have used React Email, you know the idea: instead of writing raw `<table>` HTML with inline styles by hand, you use components that output email-safe markup. [`@mailpeek/components`](https://www.npmjs.com/package/@mailpeek/components) is the Vue equivalent.

```bash
npm install @mailpeek/components
```

Here is a welcome email built with mailpeek components:

```vue
<script setup>
import {
  EmailHtml, EmailHead, EmailBody, EmailContainer,
  EmailHeading, EmailText, EmailButton, EmailImage,
} from '@mailpeek/components'
</script>

<template>
  <EmailHtml>
    <EmailHead title="Welcome to Acme" />
    <EmailBody>
      <EmailContainer>
        <EmailImage
          src="https://acme.com/logo.png"
          alt="Acme logo"
          width="120"
        />
        <EmailHeading as="h1">Welcome aboard</EmailHeading>
        <EmailText>
          Thanks for creating your account. We are excited to have you.
        </EmailText>
        <EmailButton href="https://acme.com/dashboard">
          Go to Dashboard
        </EmailButton>
      </EmailContainer>
    </EmailBody>
  </EmailHtml>
</template>
```

Every component outputs table-based HTML with inline styles - the format that survives every email client. `EmailContainer` becomes a centred `<table>`, `EmailButton` becomes a padded `<a>` inside a `<td>` with a background colour, `EmailColumn` becomes table cells with proper `valign` attributes. You write clean Vue templates; the components handle the ugly-but-compatible output.

When you are ready to send, render the template to an HTML string on the server:

```ts
import { render } from '@mailpeek/components'
import WelcomeEmail from './WelcomeEmail.vue'

const html = await render(WelcomeEmail, { name: 'Jane' })
// html is a complete email HTML string
// Send with Resend, SendGrid, Nodemailer, or whatever you use
```

The `render` function uses Vue's server-side rendering pipeline to produce a complete HTML document. Pass it to any email sending service as the HTML body.

There are 14 components in total: `EmailHtml`, `EmailHead`, `EmailBody`, `EmailContainer`, `EmailSection`, `EmailRow`, `EmailColumn`, `EmailHeading`, `EmailText`, `EmailButton`, `EmailImage`, `EmailLink`, `EmailDivider`, and `EmailPreviewText`. Enough to build most transactional and marketing emails without dropping down to raw table markup.

## Wrap-up

Email client rendering is genuinely difficult. The CSS restrictions are inconsistent, poorly documented, and changing as Microsoft transitions Outlook to a new engine. Dark mode multiplies the problem. Testing has historically meant sending real emails and checking them in real clients.

Both `@mailpeek/preview` and `@mailpeek/components` are free, open source, and MIT licensed. Vue 3 only, zero runtime dependencies, full TypeScript support.

- **npm**: [@mailpeek/preview](https://www.npmjs.com/package/@mailpeek/preview) and [@mailpeek/components](https://www.npmjs.com/package/@mailpeek/components)
- **Docs**: [mailpeek.dev](https://mailpeek.dev)
- **GitHub**: [github.com/mailpeek/mailpeek](https://github.com/mailpeek/mailpeek)
- **Live demo**: [mailpeek.dev/demo](https://mailpeek.dev/demo)

If you have ever sent an email that looked perfect in your browser and broken in your inbox, give it a try. And if you find CSS restrictions that the filtering misses, open an issue - the restriction databases are just TypeScript objects and they are straightforward to contribute to.
