# ROADMAP.md — mailpeek

## Milestone 1: @mailpeek/preview (Free Tier)

Ship the open-source preview component to npm with core features.

### Phase 1: Project Scaffolding
- Monorepo setup (pnpm workspaces)
- TypeScript config
- Vite library mode build
- Vitest setup
- Package structure for @mailpeek/preview
- CI: lint + test on push

### Phase 2: Core EmailPreview Component
- `<EmailPreview>` component with html prop
- Sandboxed iframe rendering via srcdoc
- Style isolation (email CSS doesn't leak into host app)
- Basic responsive: fills container width
- TypeScript types for all props/events

### Phase 3: Device Preview & Interactivity
- Mobile (375px) / Desktop (100%) presets
- Interactive width toggle buttons
- Smooth width transition animation
- `resize` event emission
- Drag handle for custom width (stretch goal)

### Phase 4: Email Metadata Extraction
- Extract `<title>` as subject line
- Extract preview/preheader text
- Calculate email size in kb
- CSS inlining detection (warn if `<style>` blocks found without inline equivalents)
- Display info bar above/below preview

### Phase 5: Documentation & Examples
- VitePress docs site
- Getting started guide
- API reference (auto-generated from types)
- Example: preview a transactional email
- Example: preview with mobile/desktop toggle in a dashboard
- README with demo GIF

### Phase 6: npm Publish & Launch
- [x] Package publishing config (files, exports, sideEffects)
- [x] npm publish @mailpeek/preview
- [x] GitHub repo public
- [ ] Create @mailpeek X/Twitter account
- [ ] Post: Vue subreddit (r/vuejs)
- [ ] Post: Vue Discord
- [ ] Post: Hacker News (Show HN)
- [ ] Post: X/Twitter
- [ ] Submit to awesome-vue
- [ ] Submit to Made with Vue.js

---

## Milestone 2: @mailpeek/preview (Premium Features)

Add paid features behind a license key.

### Phase 7: Dark Mode Simulation
- Gmail dark mode transforms
- Apple Mail dark mode transforms  
- Outlook dark mode transforms
- Toggle in UI + `darkMode` prop

### Phase 8: Compatibility Scoring
- CSS property support database (Gmail, Outlook, Apple Mail, Yahoo, Samsung Mail)
- HTML analysis: scan for unsupported properties
- Score calculation (0-100)
- Visual issue indicators overlaid on preview
- `compatibility` event with full report

### Phase 9: Accessibility & Gmail Clipping
- Alt text checker
- Colour contrast analysis
- Heading hierarchy validation
- Link text quality check
- Gmail 102kb clipping simulation
- Size warning threshold

### Phase 10: License & Payment
- License key validation (simple hash check, no server needed for v1)
- Gumroad or Lemon Squeezy storefront
- License key prop gates premium features
- Graceful degradation (premium features hidden, not broken)

---

## Milestone 3: @mailpeek/components (Future)

Vue components that compile to cross-client email HTML.

### Phase 11+: Component Library
- Core components: EmailHtml, EmailHead, EmailBody, EmailContainer, EmailSection, EmailRow, EmailColumn, EmailText, EmailHeading, EmailButton, EmailImage, EmailLink, EmailDivider, EmailPreviewText
- render() function for server-side HTML generation
- Integration examples with Resend, SendGrid, Nodemailer
- Premium copy-paste patterns (e-commerce, transactional, marketing)
