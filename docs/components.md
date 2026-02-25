# @mailpeek/components

Vue components that compile to cross-client email HTML. Build emails with Vue's component model and render them to email-safe HTML strings on the server.

## Installation

```bash
npm install @mailpeek/components
```

## Live Preview

This email is built entirely with @mailpeek/components and rendered via the `render()` function. Switch between Gmail, Outlook, and Raw to see how it looks across clients.

<ComponentsDemo />

## Component Reference

### Document Structure

#### EmailHtml

The root `<html>` wrapper with XHTML namespaces for Outlook VML support.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lang` | `string` | `'en'` | Language attribute |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction |

```vue
<EmailHtml lang="en" dir="ltr">
  <EmailHead />
  <EmailBody>...</EmailBody>
</EmailHtml>
```

#### EmailHead

Renders `<head>` with essential email meta tags (charset, viewport, format-detection, Apple reformat prevention). Add custom `<style>` or `<meta>` tags via the default slot.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Document title |

```vue
<EmailHead title="Order Confirmation">
  <style>
    @media (prefers-color-scheme: dark) {
      .dark-bg { background-color: #1a1a1a !important; }
    }
  </style>
</EmailHead>
```

#### EmailBody

The `<body>` wrapper with email-safe resets (margin, padding, text-size-adjust).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundColor` | `string` | `'#ffffff'` | Background color |
| `style` | `CSSProperties` | — | Style overrides |

```vue
<EmailBody backgroundColor="#f4f4f5">
  ...
</EmailBody>
```

### Layout

#### EmailContainer

Centered, max-width table container. The outermost content wrapper for most emails.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `number` | `600` | Maximum width in pixels |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` | Horizontal alignment |
| `backgroundColor` | `string` | — | Background color |
| `style` | `CSSProperties` | — | Style overrides |

```vue
<EmailContainer :maxWidth="600">
  ...
</EmailContainer>
```

#### EmailSection

A full-width table section. Use for grouping content with shared background/padding.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundColor` | `string` | — | Background color |
| `padding` | `string` | — | CSS padding (e.g. `'16px 24px'`) |
| `style` | `CSSProperties` | — | Style overrides |

```vue
<EmailSection padding="32px 24px" backgroundColor="#ffffff">
  ...
</EmailSection>
```

#### EmailRow

A table row for multi-column layouts. Place `EmailColumn` components inside.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `CSSProperties` | — | Style overrides |

```vue
<EmailRow>
  <EmailColumn width="50%">Left</EmailColumn>
  <EmailColumn width="50%">Right</EmailColumn>
</EmailRow>
```

#### EmailColumn

A table cell for use inside `EmailRow`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string` | — | Column width (e.g. `'50%'`, `'200px'`) |
| `align` | `'left' \| 'center' \| 'right'` | — | Horizontal alignment |
| `valign` | `'top' \| 'middle' \| 'bottom'` | `'top'` | Vertical alignment |
| `backgroundColor` | `string` | — | Background color |
| `padding` | `string` | — | CSS padding |
| `style` | `CSSProperties` | — | Style overrides |

### Content

#### EmailText

A paragraph with email-safe defaults.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fontSize` | `number` | `16` | Font size in pixels |
| `lineHeight` | `number` | `1.5` | Line height multiplier |
| `fontFamily` | `string` | `'Arial, sans-serif'` | Font family |
| `color` | `string` | `'#333333'` | Text color |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| `style` | `CSSProperties` | — | Style overrides |

```vue
<EmailText :fontSize="14" color="#6b7280" align="center">
  Thanks for signing up!
</EmailText>
```

#### EmailHeading

A heading element (h1–h6) with email-safe defaults.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `'h1' \| 'h2' \| ... \| 'h6'` | `'h2'` | Heading level |
| `fontSize` | `number` | `24` | Font size in pixels |
| `lineHeight` | `number` | `1.3` | Line height multiplier |
| `fontFamily` | `string` | `'Arial, sans-serif'` | Font family |
| `color` | `string` | `'#333333'` | Text color |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| `style` | `CSSProperties` | — | Style overrides |

```vue
<EmailHeading as="h1" :fontSize="28" align="center">
  Welcome!
</EmailHeading>
```

#### EmailButton

A bulletproof button using an `<a>` tag with inline styles.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | **required** | Link URL |
| `backgroundColor` | `string` | `'#007bff'` | Button background |
| `color` | `string` | `'#ffffff'` | Text color |
| `borderRadius` | `number` | `4` | Border radius in pixels |
| `fontSize` | `number` | `16` | Font size in pixels |
| `paddingX` | `number` | `24` | Horizontal padding |
| `paddingY` | `number` | `12` | Vertical padding |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` | Alignment |
| `style` | `CSSProperties` | — | Style overrides |

```vue
<EmailButton href="https://example.com" backgroundColor="#00b2ad" :borderRadius="8">
  Get Started
</EmailButton>
```

#### EmailImage

An image with email-safe resets (display block, border 0, no outline).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Image URL |
| `alt` | `string` | `''` | Alt text |
| `width` | `number` | — | Width in pixels |
| `height` | `number` | — | Height in pixels |
| `align` | `'left' \| 'center' \| 'right'` | — | Alignment |
| `style` | `CSSProperties` | — | Style overrides |

```vue
<EmailImage src="https://example.com/logo.png" alt="Logo" :width="150" align="center" />
```

#### EmailLink

An inline link with `target="_blank"`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | **required** | Link URL |
| `color` | `string` | `'#007bff'` | Link color |
| `fontSize` | `number` | — | Font size in pixels |
| `fontFamily` | `string` | `'Arial, sans-serif'` | Font family |
| `style` | `CSSProperties` | — | Style overrides |

```vue
<EmailText>
  Questions? <EmailLink href="mailto:hi@acme.com" color="#00b2ad">Email us</EmailLink>
</EmailText>
```

#### EmailDivider

A horizontal divider.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `'#e0e0e0'` | Line color |
| `height` | `number` | `1` | Height in pixels |
| `margin` | `string` | `'16px 0'` | CSS margin |
| `style` | `CSSProperties` | — | Style overrides |

```vue
<EmailDivider color="#e4e4e7" />
```

#### EmailPreviewText

Hidden text shown in the inbox preview. Pads with invisible characters to prevent email clients from pulling body content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **required** | Preview text |

```vue
<EmailPreviewText text="Your order has been confirmed." />
```

## Full Example

The live preview above is built from this template, which uses all 14 components:

```vue
<script setup>
import {
  EmailHtml, EmailHead, EmailBody, EmailContainer,
  EmailSection, EmailRow, EmailColumn, EmailText,
  EmailHeading, EmailButton, EmailImage, EmailLink,
  EmailDivider, EmailPreviewText,
} from '@mailpeek/components'
</script>

<template>
  <EmailHtml>
    <EmailHead title="Welcome to Launchpad" />
    <EmailBody backgroundColor="#f0f4f8">
      <EmailPreviewText text="Your account is ready. Here's everything you need to get started." />

      <EmailSection padding="48px 20px">
        <EmailContainer :maxWidth="600">

          <!-- Teal header banner -->
          <EmailSection
            padding="36px 48px 32px"
            backgroundColor="#0d9488"
            :style="{ borderRadius: '12px 12px 0 0', textAlign: 'center' }"
          >
            <EmailImage
              src="https://example.com/icon.png"
              alt=""
              :width="48"
              :height="48"
              align="center"
              :style="{ borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '16px' }"
            />
            <EmailHeading as="h1" :fontSize="28" align="center" color="#ffffff">
              Launchpad
            </EmailHeading>
          </EmailSection>

          <!-- Hero -->
          <EmailSection padding="48px 48px 32px" backgroundColor="#ffffff">
            <EmailHeading as="h2" :fontSize="24" color="#0f172a">
              Welcome aboard, Sarah! 👋
            </EmailHeading>
            <EmailText :fontSize="16" :lineHeight="1.7" color="#475569">
              Your Launchpad account is ready. You're joining thousands of
              developers who ship faster with better tooling.
            </EmailText>
            <EmailButton
              href="https://example.com/get-started"
              backgroundColor="#0d9488"
              :borderRadius="6"
              :paddingX="32"
              :paddingY="14"
              align="left"
            >
              Get started →
            </EmailButton>
          </EmailSection>

          <EmailSection padding="0 48px" backgroundColor="#ffffff">
            <EmailDivider color="#e2e8f0" :style="{ margin: '0' }" />
          </EmailSection>

          <!-- Features with icon + text rows -->
          <EmailSection padding="32px 48px 24px" backgroundColor="#ffffff">
            <EmailHeading as="h3" :fontSize="18" color="#0f172a">
              Three things to do first
            </EmailHeading>

            <EmailRow :style="{ marginBottom: '24px' }">
              <EmailColumn width="48px" valign="top">
                <EmailImage
                  src="https://example.com/icon-cli.png"
                  alt="" :width="40" :height="40"
                  :style="{ borderRadius: '50%' }"
                />
              </EmailColumn>
              <EmailColumn valign="top" padding="0 0 0 16px">
                <EmailText :fontSize="15" color="#0f172a" :style="{ fontWeight: '600', margin: '0 0 4px 0' }">
                  Install the CLI
                </EmailText>
                <EmailText :fontSize="14" color="#64748b" :style="{ margin: '0' }">
                  Run npm install -g launchpad-cli to connect your local environment.
                </EmailText>
              </EmailColumn>
            </EmailRow>

            <!-- ...repeat for more features... -->
          </EmailSection>

          <!-- Testimonial -->
          <EmailSection padding="32px 48px" backgroundColor="#f8fafc">
            <EmailText :fontSize="15" color="#334155" :style="{ fontStyle: 'italic' }">
              "Launchpad cut our deployment time from 20 minutes to under 2."
            </EmailText>
            <EmailText :fontSize="13" color="#64748b">
              — Marcus Chen, Lead Engineer
            </EmailText>
          </EmailSection>

          <!-- Footer -->
          <EmailSection
            padding="32px 48px"
            backgroundColor="#f8fafc"
            :style="{ borderRadius: '0 0 12px 12px' }"
          >
            <EmailText :fontSize="13" color="#94a3b8" align="center">
              <EmailLink href="#" color="#64748b">Unsubscribe</EmailLink> ·
              <EmailLink href="#" color="#64748b">Privacy Policy</EmailLink> ·
              <EmailLink href="#" color="#64748b">View in browser</EmailLink>
            </EmailText>
          </EmailSection>

        </EmailContainer>
      </EmailSection>
    </EmailBody>
  </EmailHtml>
</template>
```

## render() Function

Convert any Vue email component to an HTML string on the server:

```ts
import { render } from '@mailpeek/components'
import MyEmail from './MyEmail.vue'

// Basic render
const html = await render(MyEmail)

// With props
const html = await render(MyEmail, { name: 'Alice' })

// With client-specific CSS filtering
const html = await render(MyEmail, { name: 'Alice' }, { client: 'gmail' })

// Without DOCTYPE
const html = await render(MyEmail, {}, { document: false })
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `document` | `boolean` | `true` | Prepend email DOCTYPE |
| `client` | `'gmail' \| 'outlook'` | — | Apply client CSS filtering |
