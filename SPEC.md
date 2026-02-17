# SPEC.md — @mailpeek/preview

**Status:** DRAFT — Awaiting finalization in Claude Code via `/discuss-project`

---

## Vision

**mailpeek** is the missing email development toolkit for Vue.js. It fills the gap that react.email fills for React developers — providing Vue-native components for building, previewing, and testing email HTML.

Phase 1 is `@mailpeek/preview`: a drop-in Vue 3 component that renders email HTML in a sandboxed iframe with email-client-like constraints, mobile/desktop toggling, and (in the paid tier) dark mode simulation, compatibility scoring, and accessibility checking.

---

## Problem

- Email HTML renders differently from web HTML (table layouts, inline CSS, Outlook's Word engine, Gmail CSS stripping, dark mode inconsistencies)
- Vue developers have **no equivalent** to react.email (17k GitHub stars, 920k weekly npm downloads)
- Existing solutions are React-only (react.email), SaaS-only (Litmus $99/mo), or thin wrappers around proprietary services (Unlayer)
- Developers building apps that send emails (CRMs, marketing platforms, SaaS with notifications) need to preview emails in their own UI
- Vue has ~3 million active developers and 7-9 million weekly npm downloads — large underserved market

---

## Target Users

1. **Vue developers building SaaS** that sends transactional or marketing emails (primary)
2. **Email developers** who use Vue in their toolchain
3. **Agencies** building email-capable products for clients

---

## Phase 1 Scope: @mailpeek/preview

### Core Features (Free / Open Source)

1. **`<EmailPreview>` component** — accepts raw HTML string via prop, renders in sandboxed iframe
2. **Mobile / desktop toggle** — switch viewport width (375px, 768px, 100%)
3. **Interactive width control** — drag handle or preset buttons
4. **HTML-to-preview pipeline** — immediate render, no server round-trip
5. **CSS inlining warning** — detects non-inlined styles and warns developer
6. **Subject line preview** — extracts and displays `<title>` as the email subject
7. **Preview text extraction** — shows the preview/preheader text as email clients would
8. **Zero dependencies** — only Vue 3 as peer dependency
9. **TypeScript** — full type definitions for all props and events
10. **SSR compatible** — works with Nuxt 3 (renders placeholder server-side, hydrates client-side)

### Premium Features (Paid License — Phase 1.1)

11. **Dark mode simulation** — applies transforms matching Gmail, Apple Mail, Outlook dark mode behaviour
12. **Client rendering hints** — visual indicators for unsupported CSS (e.g., Outlook ignoring `margin`, Gmail stripping `<style>`)
13. **Compatibility score** — analyses email HTML, returns score based on CSS/HTML support across major clients
14. **Gmail clipping preview** — simulates 102kb message clipping
15. **Accessibility checker** — alt text, colour contrast, heading hierarchy, link text
16. **HTML source viewer** — toggle to see the raw HTML alongside the preview
17. **Size indicator** — shows email weight in kb with warnings at Gmail clipping threshold

### Explicitly NOT in Scope (Phase 1)

- Email building/composition components (Phase 2)
- Drag-and-drop editor (Phase 3)
- Server-side rendering of emails (Phase 2 — `render()` function)
- Email sending functionality
- Screenshot-based testing (Litmus-style)
- Backend/API of any kind
- Paid license infrastructure (will use simple license key check initially)

---

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Vue 3 + Composition API | Target market |
| Language | TypeScript | Expected by Vue ecosystem |
| Build tool | Vite (library mode) | Standard for Vue libraries |
| Testing | Vitest + @vue/test-utils | Vue ecosystem standard |
| Docs | VitePress | Same as Vue's own docs, free hosting via GitHub Pages |
| Package manager | pnpm | Monorepo support for future packages |
| Monorepo | pnpm workspaces | @mailpeek/preview now, @mailpeek/components later |
| CSS approach | Scoped styles, no Tailwind dependency | Minimal footprint |
| iframe sandboxing | `sandbox="allow-same-origin"` with srcdoc | Isolates email styles from host app |
| npm scope | `@mailpeek` | Clean namespace for the ecosystem |
| License (code) | MIT for free tier | Maximises adoption |
| License (premium) | Commercial license | Revenue |

---

## Package Structure

```
mailpeek/                          # Monorepo root
├── packages/
│   ├── preview/                    # @mailpeek/preview (Phase 1)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── EmailPreview.vue        # Main component
│   │   │   │   ├── PreviewFrame.vue        # Sandboxed iframe
│   │   │   │   ├── DeviceToggle.vue        # Mobile/desktop switcher
│   │   │   │   ├── PreviewHeader.vue       # Subject + preview text
│   │   │   │   └── CompatibilityBar.vue    # CSS support warnings (premium)
│   │   │   ├── utils/
│   │   │   │   ├── css-support.ts          # Email client CSS support data
│   │   │   │   ├── dark-mode.ts            # Dark mode transforms (premium)
│   │   │   │   ├── html-analysis.ts        # Inlining check, size, clipping
│   │   │   │   └── accessibility.ts        # A11y checker (premium)
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── __tests__/
│   │
│   ├── components/                 # @mailpeek/components (Phase 2 — future)
│   └── render/                     # @mailpeek/render (Phase 2 — future)
│
├── docs/                           # VitePress documentation site
├── examples/                       # Example usage projects
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.json
└── README.md
```

---

## Component API Design

```vue
<template>
  <EmailPreview
    :html="emailHtml"
    :width="375"
    :dark-mode="false"
    :show-source="false"
    :show-info="true"
    class="my-preview"
    @compatibility="onCompatReport"
    @loaded="onLoaded"
  />
</template>

<script setup lang="ts">
import { EmailPreview } from '@mailpeek/preview'
import type { CompatibilityReport } from '@mailpeek/preview'

const emailHtml = ref('<html>...</html>')

function onCompatReport(report: CompatibilityReport) {
  console.log(report.score)        // 0-100
  console.log(report.issues)       // Array of { property, clients, severity }
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `html` | `string` | `''` | Raw email HTML to preview |
| `width` | `number \| 'mobile' \| 'tablet' \| 'desktop'` | `'desktop'` | Preview viewport width |
| `darkMode` | `boolean` | `false` | Enable dark mode simulation (premium) |
| `client` | `string` | `'generic'` | Simulate specific client rendering (premium) |
| `showSource` | `boolean` | `false` | Show HTML source panel (premium) |
| `showInfo` | `boolean` | `true` | Show subject/preview text/size bar |
| `interactive` | `boolean` | `true` | Allow user to toggle width/dark mode |
| `licenseKey` | `string` | `undefined` | License key for premium features |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `loaded` | `{ width, height }` | Email finished rendering in iframe |
| `compatibility` | `CompatibilityReport` | Compatibility analysis complete |
| `resize` | `{ width }` | User changed preview width |

---

## Revenue Model

| Tier | Price | Includes |
|------|-------|----------|
| Free (MIT) | €0 | Preview component, mobile/desktop toggle, subject/preview text, CSS inline warning |
| Pro | €14.99/mo or €149/yr | Dark mode, client hints, compatibility score, Gmail clipping, accessibility, source viewer |
| Premium Components | €99 one-time | 50+ email patterns (Phase 2) |

**Target:** €1,000–2,000/month within 6 months of launch

---

## Success Metrics

- **Week 1:** Published on npm, GitHub repo with README and demo
- **Month 1:** 100+ GitHub stars, 500+ weekly npm downloads
- **Month 3:** 1,000+ weekly downloads, first 10 Pro subscribers
- **Month 6:** 5,000+ weekly downloads, 50+ Pro subscribers, Phase 2 components in beta

---

## Market Context

- **react.email**: 17k stars, 920k weekly downloads, backed by Resend ($18M Series A from a16z). React only.
- **Litmus**: SaaS screenshot testing, from $99/mo. Not embeddable.
- **MJML**: Framework-agnostic template language. No Vue integration, no preview component.
- **Unlayer Vue**: Thin wrapper around Unlayer SaaS. Requires Unlayer account.
- **Vue ecosystem**: Zero email-specific tools exist. Complete greenfield.

---

## Developer Background

- 15+ years frontend development
- Deep Vue.js expertise (primary framework)
- SFMC / email development experience (understands email client quirks)
- Side project: 3-4 hours/week
- Goal: Build once, sell repeatedly
