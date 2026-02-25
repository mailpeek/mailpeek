# ROADMAP.md — mailpeek

## Completed

### @mailpeek/preview
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

### @mailpeek/components
- [x] 14 Vue email components (EmailHtml, EmailHead, EmailBody, EmailContainer, EmailSection, EmailRow, EmailColumn, EmailHeading, EmailText, EmailButton, EmailImage, EmailLink, EmailDivider, EmailPreviewText)
- [x] render() function for server-side HTML generation
- [x] Full TypeScript support

### Documentation
- [x] VitePress docs site (mailpeek.dev)
- [x] Getting started guide (preview + components)
- [x] API reference
- [x] Components reference with live demo
- [x] Examples page
- [x] Live demo page

---

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
- [ ] Copy-paste email patterns (e-commerce, transactional, marketing)

### Infrastructure
- [ ] CI: lint + test on push
- [ ] npm publish @mailpeek/components
