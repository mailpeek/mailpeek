# ROADMAP.md — mailpeek

## Completed

### @mailpeek/preview (v0.1.3)
- [x] EmailPreview component with sandboxed iframe rendering
- [x] Gmail and Outlook client chrome
- [x] Per-client CSS filtering (property stripping, @font-face, @media, @import)
- [x] Gmail style block 8,192 character limit
- [x] Dark mode preview (Gmail, Outlook, Raw)
- [x] Mobile / tablet / desktop device toggle
- [x] Compatibility scoring (0–100 with per-property breakdown)
- [x] Accessibility checker (10 WCAG checks)
- [x] Email metadata extraction (subject, preview text, file size)
- [x] Gmail 102KB clipping warning
- [x] Console warnings for stripped CSS properties

### @mailpeek/components (v0.1.1)
- [x] 14 Vue email components (EmailHtml, EmailHead, EmailBody, EmailContainer, EmailSection, EmailRow, EmailColumn, EmailHeading, EmailText, EmailButton, EmailImage, EmailLink, EmailDivider, EmailPreviewText)
- [x] render() function for server-side HTML generation
- [x] Full TypeScript support

### @mailpeek/templates (v0.1.0) — Wave 1
- [x] Package scaffolding (Vite library mode, dual ESM/CJS, TypeScript declarations)
- [x] TemplateTheme system (20 customisable properties, resolveTheme helper, sensible defaults)
- [x] 15 transactional templates (Essentials tier, €49):
  - [x] Welcome
  - [x] Email Verification (code box or verify link)
  - [x] Password Reset
  - [x] Magic Link Login
  - [x] Invitation (team/workspace with role)
  - [x] Order Confirmation (line items table, totals breakdown)
  - [x] Shipping Notification (carrier, tracking, estimated delivery)
  - [x] Invoice (4-column items table, due date)
  - [x] Payment Failed (retry CTA, card last 4)
  - [x] Subscription Confirmation (plan details card)
  - [x] Trial Ending (days remaining, feature list)
  - [x] Account Deactivation (reactivation link)
  - [x] Feedback Request (NPS-style ask)
  - [x] Two-Factor Auth (large code display)
  - [x] Contact Form Reply (quoted message block)
- [x] Typed prop interfaces for all templates
- [x] HTML render script (scripts/render-html.ts)
- [x] Test suite (21 tests — rendering, theme customisation, HTML structure validation)

### Documentation
- [x] VitePress docs site (mailpeek.dev)
- [x] Getting started guide (preview + components)
- [x] API reference
- [x] Components reference with live demo
- [x] Examples page
- [x] Live demo page
- [x] Blog section (Gmail CSS stripping post)

---

### @mailpeek/templates — Wave 2
- [x] 15 marketing templates (Complete tier):
  - [x] Newsletter — Single Story
  - [x] Newsletter — Multi-Story
  - [x] Product Launch
  - [x] Product Update / Changelog
  - [x] Promotional — Sale
  - [x] Promotional — Coupon
  - [x] Event Invitation
  - [x] Event Reminder
  - [x] Re-engagement
  - [x] Referral
  - [x] Milestone / Anniversary
  - [x] Survey
  - [x] Case Study
  - [x] Seasonal / Holiday
  - [x] Black Friday / Flash Sale
- [x] Marketing template prop interfaces (15 typed interfaces)
- [x] Marketing test suite (18 tests)
- [x] Vite entry point and package.json exports for `./marketing` subpath

---

### @mailpeek/templates — Wave 3 (patterns & blocks)
- [x] 15 reusable patterns (Complete tier):
  - [x] Hero — Image Left
  - [x] Hero — Full Width
  - [x] Feature Grid (2-col)
  - [x] Feature Grid (3-col)
  - [x] Feature List
  - [x] Pricing Table (2-col)
  - [x] Pricing Table (3-col)
  - [x] Testimonial — Single
  - [x] Testimonial — Carousel
  - [x] Social Proof Bar
  - [x] Stats / Metrics Row
  - [x] CTA Banner
  - [x] Footer — Minimal
  - [x] Footer — Full
  - [x] Header — Logo + Nav
- [x] Pattern prop interfaces (15 typed interfaces)
- [x] Pattern test suite (18 tests)
- [x] Vite entry point and package.json exports for `./patterns` subpath

---

### @mailpeek/templates — Wave 4 (polish)
- [x] Pre-rendered HTML versions for all templates (copied to dist/html/ during build)
- [x] Preview thumbnails for docs site (Playwright screenshots, 45 PNGs)
- [x] Template gallery page on mailpeek.dev (TemplateGallery component with filters and preview modal)
- [x] Dark mode variants for all templates (DarkModeStyles component with @media prefers-color-scheme)

---

## In Progress

## Planned

### Preview
- [ ] Apple Mail client + dark mode (color-scheme)
- [ ] Yahoo Mail client
- [ ] Gmail `background-image` block-level stripping
- [ ] MSO conditional comment handling
- [ ] VML element handling
- [ ] Sender/subject header in Gmail and Outlook chrome
- [ ] Drag handle for custom viewport width

### Components
- [ ] Integration examples with Resend, SendGrid, Nodemailer

### Infrastructure
- [ ] CI: lint + test on push
- [ ] npm publish @mailpeek/components
- [ ] npm publish @mailpeek/templates (private, license-gated)
- [ ] Polar integration for payments, license keys, and tax compliance
