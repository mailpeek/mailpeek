# CONTEXT.md — Project Background & Research

This document captures all research, decisions, and context gathered during the planning phase. Feed this to Claude Code so it has full context without re-researching.

---

## Market Research Summary

### Vue.js Ecosystem (as of Feb 2026)
- ~3 million active Vue developers (GitHub data)
- 7-9 million weekly npm downloads
- Second most popular frontend framework behind React
- 93% of Vue developers plan to use it for their next project
- 80% would "definitely" choose Vue again
- Stack Overflow 2025: 17.6% usage (React 44.7%, Angular 18.2%)
- Ecosystem mature: Vue 3.5 stable, 3.6 coming, Nuxt 4, Pinia 3, Vite 7
- Evan You's VoidZero raised $4.6M for next-gen Vite tooling

### react.email / Resend (the model to follow)
- react.email: 17,041 GitHub stars, 920,325 weekly npm downloads
- Open source MIT — the components are free
- Built by Resend (YC W23), which is the paid email sending API
- Resend raised $3M seed, then $18M Series A from Andreessen Horowitz
- Resend revenue: ~$5M in 2024
- Strategy: open-source components drive adoption → funnels users to paid sending API
- Key components: Html, Head, Body, Container, Section, Row, Column, Text, Heading, Button, Link, Image, Hr, Preview, Tailwind
- Also has 50+ copy-paste patterns (Bento Grids, Pricing Tables, etc.)
- Dev CLI with hot reload preview server

### Competitors
- **Litmus**: SaaS screenshot testing, $99-199/mo. Not embeddable in apps.
- **Email on Acid (Sinch)**: Similar to Litmus, SaaS screenshot-based.
- **Unlayer**: Embeddable drag-drop editor, SaaS pricing. Vue wrapper exists (656 GitHub stars) but it's just a thin wrapper — requires Unlayer account.
- **@yakoue/mailpeek-builder**: MJML-based Vue builder, 0 dependents on npm. Abandoned.
- **MJML**: Framework-agnostic email template language. Popular but no Vue integration, no preview component.

### The Gap
There is NO Vue-native solution for:
1. Building email HTML with Vue components
2. Previewing email HTML in a Vue app
3. Testing email client compatibility in a Vue workflow
4. Any email-related developer tooling for Vue

This is a complete greenfield opportunity.

---

## Key Technical Decisions

### Why iframe with srcdoc (not v-html or doc.write)
- Email HTML must be completely isolated from the host app's styles
- `srcdoc` is reactive in Vue — when the prop changes, the iframe re-renders
- `doc.open()/doc.write()` has timing issues with Vue's reactivity
- `sandbox="allow-same-origin"` prevents scripts but allows style rendering
- Cross-origin iframe restrictions don't apply since we're using srcdoc (same origin)

### Why pnpm monorepo
- Three packages (@mailpeek/preview, @mailpeek/components, @mailpeek/templates) share types and utilities
- pnpm workspaces are the Vue ecosystem standard (Vue itself uses pnpm)
- Single repo = single CI pipeline, coordinated releases

### Why Vite library mode
- Standard for Vue component libraries
- Tree-shakeable ESM output
- Generates .d.ts type declarations
- Same tool the target audience already uses

### Why no server-side component
- Preview is purely client-side (iframe rendering)
- No API keys, no external services, no CORS issues
- Simple npm install + import, works immediately
- Premium features validated via offline license key check (no server calls)

### Why a TemplateTheme config object (not a theming engine)
- Competitors (react.email, Craftingemails/Maizzle) all ship templates with sensible defaults and props/config-based customisation — nobody builds a complex theming engine for email HTML
- `TemplateTheme` interface gives users one object to define brand colors, typography, logo, company info, and social links — reusable across all templates
- Templates are also designed as copy-paste starting points — users can fork Vue SFCs for deeper customisation
- Every template accepts an optional `theme` prop alongside its specific content props

---

## Revenue Strategy

### Pricing
- **Free tier (MIT):** Preview component, mobile/desktop toggle, metadata extraction, CSS inline warning
- **Pro tier (€14.99/mo or €149/yr):** Dark mode sim, client hints, compatibility score, accessibility, Gmail clipping
- **Essentials templates (€49 one-time):** 15 transactional email templates (Vue SFC + HTML)
- **Complete templates (€99 one-time):** 45 templates — transactional + marketing + reusable patterns

### Revenue math
- 100 Pro subs × €14.99 = €1,499/mo
- 10 Essentials sales × €49 = €490/mo
- 5 Complete sales × €99 = €495/mo
- Combined: €2,484/mo (exceeds €1-2k target)

### Pricing benchmarks (Feb 2026)
- Craftingemails: 27 templates = $99, 12 transactional = $19, full access (165+) = $199/yr
- react.email: Templates are free/open-source (monetises via Resend sending API instead)
- Maizzle: Framework free, premium template packs via Craftingemails partnership
- Two-tier model (Essentials €49 / Complete €99) is well-supported by market comparables

### Payment infrastructure — Polar (polar.sh)
- **Decision:** Polar over Stripe, Lemon Squeezy, and Gumroad
- **Why Polar:**
  - Merchant of Record — handles EU VAT, US sales tax, and global tax compliance (critical for Ireland-based solo dev selling globally)
  - 4% + 40c per transaction (20% cheaper than Lemon Squeezy's 5% + 50c, far cheaper than Gumroad's 10%)
  - Built-in license key generation and validation
  - Built specifically for developers selling software
  - Embeddable checkout for mailpeek.dev integration
  - Open source — aligns with mailpeek ethos
  - No monthly fees — only pay when you sell
- **Why not Stripe:** Cheapest fees (2.9% + 30c) but no Merchant of Record — would require handling VAT/sales tax compliance manually or paying for Stripe Tax add-on. Not worth the admin overhead for a side project at €1-2k/month.
- **Why not Lemon Squeezy:** Acquired by Stripe in 2024, reports of reliability/support issues since. Higher fees than Polar (5% + 50c). Future uncertain as Stripe builds its own MoR solution.
- **Why not Gumroad:** 10% + 2.9% fees are prohibitively expensive. No license key support.
- License key passed as prop to component — premium features activate client-side
- No server needed for validation in v1 (hash-based check)
- Upgrade to server validation if piracy becomes a problem

---

## Go-to-Market

### Launch channels (in order of priority)
1. npm publish + GitHub public repo
2. Vue.js subreddit (r/vuejs — 125k members)
3. Vue Discord server
4. Hacker News (Show HN)
5. X/Twitter (tag Vue community accounts)
6. dev.to article: "Building production emails with Vue.js"
7. awesome-vue list submission
8. Made with Vue.js submission

### Content marketing (month 1-3)
- "Why Vue developers deserve better email tools" blog post
- "From react.email to mailpeek: building the Vue equivalent" dev.to
- Integration tutorials: mailpeek + Resend, mailpeek + SendGrid, mailpeek + Nodemailer
- Video demo (short, for X/Twitter and YouTube)

---

## Developer Profile
- 15+ years frontend experience
- Primary framework: Vue.js (deep expertise)
- Email development background (SFMC, AMPscript, Content Builder)
- Based in Ireland
- Time budget: 3-4 hours/week (weekends)
- Goal: €1-2k/month passive income from build-once-sell-repeatedly product
- Previous attempt: SFMC Chrome extension (pivoted away — too niche, SFMC architecture makes generic tooling infeasible)
