# ROADMAP.md — mailpeek

## Milestone 1: @mailpeek/preview (Core)

Ship the open-source preview component to npm with core features.

### Phase 1: Project Scaffolding ✓
- [x] Monorepo setup (pnpm workspaces)
- [x] TypeScript config
- [x] Vite library mode build
- [x] Vitest setup
- [x] Package structure for @mailpeek/preview
- [ ] CI: lint + test on push

### Phase 2: Core EmailPreview Component ✓
- [x] `<EmailPreview>` component with html prop
- [x] Sandboxed iframe rendering via srcdoc
- [x] Style isolation (email CSS doesn't leak into host app)
- [x] Basic responsive: fills container width
- [x] TypeScript types for all props/events

### Phase 3: Device Preview & Interactivity ✓
- [x] Mobile (375px) / Desktop (100%) presets
- [x] Interactive width toggle buttons
- [x] Smooth width transition animation
- [x] `resize` event emission
- [ ] Drag handle for custom width (stretch goal)

### Phase 4: Email Metadata Extraction ✓
- [x] Extract `<title>` as subject line
- [x] Extract preview/preheader text
- [x] Calculate email size in kb
- [x] CSS inlining detection (warn if `<style>` blocks found without inline equivalents)
- [x] Display info bar above/below preview

### Phase 5: Documentation & Examples ✓
- [x] VitePress docs site
- [x] Getting started guide
- [x] API reference (auto-generated from types)
- [x] Example: preview a transactional email
- [x] Example: preview with mobile/desktop toggle in a dashboard
- [x] README with demo GIF
- [x] Live demo page (mailpeek.dev/demo)

### Phase 6: npm Publish & Launch ✓
- [x] Package publishing config (files, exports, sideEffects)
- [x] npm publish @mailpeek/preview
- [x] GitHub repo public
- [x] npm README
- [x] Demo GIF
- [x] Post: Vue subreddit (r/vuejs)
- [ ] Create @mailpeek X/Twitter account
- [x] Post: Vue Discord
- [x] Post: Hacker News (Show HN)
- [ ] Post: X/Twitter
- [x] Submit to awesome-vue
- [x] Submit to Made with Vue.js

---

## Milestone 2: @mailpeek/preview (Premium Features) ✓

### Phase 7: Dark Mode Preview ✓
- [x] Gmail dark mode (background only — Gmail web does not invert content)
- [x] Outlook dark mode (partial inversion)
- [x] Raw mode dark mode (full inversion)
- [x] Toggle in UI + `darkMode` prop
- [ ] Apple Mail dark mode (color-scheme strategy)

### Phase 8: Compatibility Scoring ✓
- [x] CSS property support database (Gmail, Outlook)
- [x] HTML analysis: scan for unsupported properties
- [x] Score calculation (0-100)
- [x] Detailed per-property breakdown
- [x] `compatibility` event with full report

### Phase 9: Accessibility Checker ✓
- [x] Alt text checker
- [x] Colour contrast analysis
- [x] Heading hierarchy validation
- [x] Link text quality check
- [x] 10 WCAG-aligned checks total
- [x] Gmail 102kb clipping warning
- [x] Size warning threshold

### Phase 10: CSS Filter Accuracy ✓
- [x] Per-client CSS property stripping (Gmail: 16 rules, Outlook: 22 rules)
- [x] `@font-face` block stripping
- [x] `@media` query stripping (Gmail desktop, Outlook Word)
- [x] Gmail style block 8,192 character limit
- [x] `float` stripping for Outlook Word engine
- [x] Console warnings for every stripped property
- [ ] `background-image` block-level nuke for Gmail
- [ ] MSO conditional comment handling
- [ ] VML element handling

---

## Milestone 3: @mailpeek/components ✓

Vue components that compile to cross-client email HTML.

### Phase 11: Component Library ✓
- [x] EmailHtml, EmailHead, EmailBody, EmailContainer
- [x] EmailSection, EmailRow, EmailColumn
- [x] EmailText, EmailHeading, EmailButton
- [x] EmailImage, EmailLink, EmailDivider, EmailPreviewText
- [x] 14 components total, all fully typed
- [x] render() function for server-side HTML generation
- [x] 61 tests covering all components

### Phase 12: Components Documentation ✓
- [x] /components docs page with full API reference
- [x] Live preview demo (ComponentsDemo.vue)
- [x] Getting started guide (build + preview sections)
- [x] Site-wide promotion (landing page, features, comparison table)

---

## Milestone 4: Future

### Launch & Marketing
- [ ] Create @mailpeek X/Twitter account
- [ ] Post: X/Twitter
- [ ] CI: lint + test on push
- [ ] npm publish @mailpeek/components

### Preview Improvements
- [ ] Apple Mail client + dark mode (color-scheme)
- [ ] Yahoo Mail client
- [ ] `background-image` block-level nuke for Gmail
- [ ] MSO conditional comment handling
- [ ] VML element handling
- [ ] Chrome sender/subject header in Gmail and Outlook wrappers
- [ ] Drag handle for custom viewport width

### Components Improvements
- [ ] Integration examples with Resend, SendGrid, Nodemailer
- [ ] Copy-paste email patterns (e-commerce, transactional, marketing)
