---
title: "Dark Mode in Email: Why Every Client Does It Differently"
description: "Gmail, Outlook, and Apple Mail each handle dark mode in their own way. Here's exactly what happens to your email in each one, and how to preview the damage before you send."
date: 2026-03-03
author: Aoife Shannon
---

# Dark Mode in Email: Why Every Client Does It Differently

You test your email in Gmail. It looks great. You toggle dark mode and check again. Still looks great - nothing changed. You relax.

Then a user on Gmail iOS screenshots your email and your white logo has vanished into a black background, your carefully chosen brand colours have been replaced with something you have never seen before, and your call-to-action button now blends into the surrounding content.

This is dark mode in email. There is no spec. There is no standard. Every client does whatever it wants.

## The Three Dark Mode Strategies

Email clients fall into three broad categories when it comes to dark mode. Understanding which strategy each client uses is the key to not being surprised by what your users see.

### Strategy 1: No transformation

The client darkens its own UI (the toolbar, sidebar, message list) but leaves the email body completely untouched. Your email renders exactly as you wrote it - light background, dark text, everything intact.

This sounds ideal, but it creates a jarring experience. Your bright white email sits inside a dark UI, like a flashlight in a dark room. Users notice, and some will blame your email for "not supporting dark mode" even though the client chose not to transform it.

**Clients that use this strategy:**
- Gmail web (desktop browser)

### Strategy 2: Full colour inversion

The client applies a blanket colour inversion across the entire email body. Light backgrounds become dark. Dark text becomes light. Images get inverted and then re-inverted so photographs do not look like negatives.

This is the most aggressive approach. It transforms everything, which means it also breaks things. A dark-on-dark section in your original email becomes light-on-light after inversion. Transparent PNGs with dark content disappear. Brand colours shift to their complementary opposites.

**Clients that use this strategy:**
- Gmail iOS app
- Gmail Android app (varies by device)

### Strategy 3: Partial inversion

The client selectively replaces specific colours rather than inverting everything. It targets background colours and text colours individually, attempting to create a dark version that preserves the visual hierarchy without flipping the entire palette.

This sounds smarter than full inversion, and sometimes it is. But "selective" means the client is making judgment calls about which colours to replace and what to replace them with. Those judgments do not always match your design intent. A brand green might become a shade of teal. A light grey background might stay light grey while the text on top of it turns white.

**Clients that use this strategy:**
- Outlook desktop (Word engine)
- Outlook.com / New Outlook
- Apple Mail (macOS and iOS)

## What Each Client Actually Does

### Gmail Web Desktop: Nothing

Gmail web in dark mode does not touch your email content. The Gmail UI around it goes dark, but the email iframe renders exactly as written. If your email has a white background, it stays white.

```
┌─────────────────────────────────────┐
│  Gmail UI (dark)                    │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │  Your email (unchanged)       │  │
│  │  White background             │  │
│  │  Dark text                    │  │
│  │  All colours as written       │  │
│  │                               │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

This is the easiest client to support in dark mode because there is nothing to support. But it is also why testing only in Gmail web gives you false confidence - you think dark mode is fine when you have not actually tested dark mode at all.

### Gmail iOS: Full Inversion

Gmail on iOS applies a CSS filter that inverts the entire email. The algorithm roughly works like this:

1. Invert all colours (white becomes black, black becomes white, everything in between flips)
2. Re-invert `<img>` elements so photographs look normal
3. Re-invert `background-image` elements for the same reason

The result is that your text and background colours are all inverted, but your images survive. Mostly.

**What breaks:**

**Transparent PNGs with dark content.** If your logo is a dark graphic on a transparent background, the inversion turns it light. But because the image is re-inverted to protect photographs, it flips back to dark. Now you have a dark logo on a dark background. It disappears.

```css
/* Your original */
background-color: #ffffff;  /* white */
color: #1a1a1a;            /* near-black */

/* After Gmail iOS inversion */
background-color: #000000;  /* black */
color: #e5e5e5;            /* near-white */
```

**Dark-on-dark sections.** If you have a section with a dark background and light text (like a footer or a hero banner), inversion makes it a light background with dark text. That is fine on its own. But if the section next to it was originally light background with dark text (now inverted to dark background with light text), you end up with alternating sections that look inverted from your original design intent.

**Brand colours.** Every colour gets its complementary opposite. Your brand blue `#2563eb` becomes `#da9c14` (a muddy gold). There is no way to override this from within the email.

### Outlook Desktop (Word Engine): Selective Replacement

Outlook's Word rendering engine takes a more surgical approach. Instead of inverting everything, it examines individual elements and replaces colours it deems "too light for dark mode."

The rules are not fully documented, but through testing the behaviour is roughly:

1. **Background colours close to white** get replaced with a dark grey (`#1e1e1e` or similar)
2. **Text colours close to black** get replaced with a light grey or white
3. **Colours far from black or white** (your brand colours, accent colours) are left alone or shifted slightly
4. **Images are not inverted** - they render as-is

This means Outlook dark mode mostly works, but with unpredictable edge cases:

```css
/* Your original */
background-color: #f5f5f5;  /* light grey */
color: #333333;             /* dark grey */

/* Outlook dark mode might render as */
background-color: #2d2d2d;  /* dark grey (replaced) */
color: #d4d4d4;             /* light grey (replaced) */
```

**What breaks:**

**Mid-range colours.** Outlook has to decide where "light" ends and "coloured" begins. A light blue background (`#dbeafe`) might get replaced with dark grey, or it might be left as-is. The threshold is not consistent across Outlook versions.

**Explicit colour pairings.** If you set `background-color: #1a1a1a` and `color: #ffffff` to create your own dark section, Outlook might not realise you already handled dark mode for that element. It could replace your white text with light grey and your dark background with slightly different dark grey, producing a low-contrast result that is technically readable but visually flat.

**Borders and dividers.** A `border: 1px solid #e5e7eb` (light grey border) might disappear against Outlook's dark background, or it might be replaced with something heavier than you intended.

### Outlook.com / New Outlook: Lighter Touch

The web and new desktop versions of Outlook use a browser rendering engine (not Word), so they have better CSS support overall. Their dark mode transformation is similar to Outlook desktop's selective approach but less aggressive.

Colours are remapped rather than replaced, producing results closer to a proper dark theme than a colour swap. But the same fundamental problem exists: the client is guessing what your dark mode should look like, and guesses are sometimes wrong.

### Apple Mail: Color Scheme Aware

Apple Mail on macOS and iOS is the most standards-friendly. It respects the `color-scheme` meta tag and the `prefers-color-scheme` media query, meaning you can actually provide your own dark mode styles that Apple Mail will use.

```html
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
```

```css
@media (prefers-color-scheme: dark) {
  .email-body {
    background-color: #1a1a1a !important;
    color: #e5e5e5 !important;
  }
  .brand-header {
    background-color: #0f172a !important;
  }
}
```

If you provide these styles, Apple Mail uses them. If you do not, it falls back to its own partial inversion - similar to Outlook's approach but generally more predictable.

The catch: `@media (prefers-color-scheme)` is stripped by Gmail, so these styles only work in Apple Mail and a few other clients that support them. You cannot write a single set of dark mode styles that works everywhere.

## The Comparison Table

| Behaviour | Gmail Web | Gmail iOS | Outlook Desktop | Outlook.com | Apple Mail |
|---|---|---|---|---|---|
| Strategy | None | Full inversion | Partial inversion | Partial inversion | Partial inversion |
| Transforms backgrounds | No | Yes (inverted) | Yes (replaced) | Yes (remapped) | Yes (replaced or CSS) |
| Transforms text colour | No | Yes (inverted) | Yes (replaced) | Yes (remapped) | Yes (replaced or CSS) |
| Transforms images | No | Inverts then re-inverts | No | No | No |
| Respects `prefers-color-scheme` | No | No | No | Partial | Yes |
| Respects `color-scheme` meta | No | No | No | Partial | Yes |
| Predictability | High (nothing happens) | Low | Medium | Medium | High (if you provide styles) |

## Practical Advice

### Do not rely on a single dark mode test

If you check dark mode in Gmail web and everything looks fine, you have tested nothing. Gmail web does not transform emails. You need to check at least Gmail iOS (full inversion) and Outlook (partial inversion) to cover the two transformation strategies that actually change your email.

### Use solid backgrounds on images

Transparent PNGs are the most common dark mode casualty. If your logo or icon uses transparency, it will likely disappear or look wrong after inversion. Use a solid background colour on the image itself, or provide a version with a built-in background.

### Avoid relying on pure white and pure black

Elements with `#ffffff` backgrounds and `#000000` text are the first targets for colour replacement. Using slightly off-white (`#fafafa`) and slightly off-black (`#1a1a1a`) does not help - clients are smart enough to catch near-white and near-black values. But being aware that these specific colours will be transformed helps you anticipate the result.

### Test your dark-on-dark sections

If your email has sections with intentionally dark backgrounds (hero banners, footers, CTAs), these are the most likely to break. After inversion, they become light sections. After partial replacement, they become slightly different dark sections with potentially lower contrast. Check these areas specifically.

### Keep critical information in text, not in styled containers

If a piece of information is only readable because of its background colour or container styling, dark mode can make it unreadable. The text content of your email should make sense even if every background colour changes.

## Preview Before You Send

I built [`@mailpeek/preview`](https://www.npmjs.com/package/@mailpeek/preview) specifically because dark mode testing was the most painful part of email development. Sending test emails to multiple devices and toggling dark mode on each one is time-consuming and error-prone.

The preview component lets you toggle dark mode on and off for each client and see the transformation in real time:

```vue
<script setup lang="ts">
import { EmailPreview } from '@mailpeek/preview'
import '@mailpeek/preview/style.css'
</script>

<template>
  <!-- Gmail dark mode: no transformation (chrome darkens, email stays the same) -->
  <EmailPreview :html="emailHtml" client="gmail" dark-mode />

  <!-- Outlook dark mode: partial colour inversion -->
  <EmailPreview :html="emailHtml" client="outlook" dark-mode />
</template>
```

The dark mode approximation covers Gmail's no-op strategy, full colour inversion for iOS clients, and partial inversion for Outlook. It is not pixel-perfect - actual rendering varies between OS versions, app versions, and device settings. But it catches the big problems (disappearing logos, invisible text, broken contrast) before you send.

Both `@mailpeek/preview` and `@mailpeek/components` are free, open source, and MIT licensed. Vue 3 only, zero runtime dependencies, full TypeScript support.

- **npm**: [@mailpeek/preview](https://www.npmjs.com/package/@mailpeek/preview) and [@mailpeek/components](https://www.npmjs.com/package/@mailpeek/components)
- **Docs**: [mailpeek.dev](https://mailpeek.dev)
- **GitHub**: [github.com/mailpeek/mailpeek](https://github.com/mailpeek/mailpeek)
- **Live demo**: [mailpeek.dev/demo](https://mailpeek.dev/demo)

If you have dealt with dark mode email bugs, I would genuinely like to hear about them. The dark mode strategies in mailpeek are based on documented behaviour and community testing, and real-world edge cases help make the approximations more accurate.
