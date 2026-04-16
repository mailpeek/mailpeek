# Mailpeek Templates — Launch Copy

---

## Product Hunt

### Tagline (58 chars)
```
45 production-ready email templates for Vue developers
```

### Description (257 chars)
```
Mailpeek Templates — typed Vue SFCs with TypeScript props, a theme system, dark mode, and mobile-responsive layouts. Built for Vue/Nuxt SaaS developers who are tired of building transactional emails from scratch. Ships pre-rendered HTML too, no Vue required.
```

### Maker's First Comment
Hey Product Hunt — I built this because I kept doing the same painful thing every time I started a new SaaS project: spending an entire weekend writing welcome emails, password reset emails, and invoice templates from scratch. Table-based layouts, inline styles, Outlook hacks — every time, from zero.

Mailpeek Templates is the fix I wanted to exist.

**What's included:**

- **Essentials ($39 launch / $49 regular):** 15 transactional templates — welcome, email verification, password reset, magic link, two-factor auth, invitation, order confirmation, shipping notification, invoice, payment failed, subscription confirmation, trial ending, account deactivation, feedback request, and contact form reply.

- **Complete ($79 launch / $99 regular):** All 45 templates — the 15 above plus 15 marketing templates (newsletters, product launch, promotional, event invitations, re-engagement) and 15 reusable layout patterns (hero sections, feature grids, pricing tables, testimonials, footers).

Every template is a typed Vue SFC with a `TemplateTheme` prop — one config object sets your brand colours, font, logo, company name, and footer across all 45 templates. Pre-rendered HTML is also included if you just want to drop files straight into Resend or Nodemailer without touching Vue.

Would love feedback from anyone building SaaS with Vue/Nuxt. Happy to answer questions below.

---

## Twitter/X Launch Thread

**Tweet 1 — Hook**
Every Vue SaaS project I've ever started has the same week-one tax:

Build the welcome email.
Build the password reset email.
Build the invoice.
Build the "payment failed" email.

Table-based layouts. Inline CSS. Outlook hacks.

From scratch. Every. Time.

I got fed up. So I built Mailpeek Templates. 🧵

---

**Tweet 2 — What it is**
45 production-ready email templates for Vue developers.

Typed Vue SFCs. TypeScript props. A theme system so you configure your brand once and it flows through all 45 templates.

Dark mode. Mobile-responsive. Pre-rendered HTML included if you don't want to touch Vue at all.

---

**Tweet 3 — The theme system**
The part I'm most proud of: `TemplateTheme`.

One config object. Set your primary colour, font, logo, company name, footer address, unsubscribe URL.

Every template reads from it. Change your brand colour once, every email updates.

[use a screenshot of the code snippet — email code screenshots perform better than pasted text on X]

```ts
const html = await render(WelcomeEmail, {
  recipientName: 'Sarah',
  theme: {
    primaryColor: '#6366f1',
    companyName: 'Acme',
  },
})
```

---

**Tweet 4 — What's in the box**
**Essentials (15 templates):**
Welcome, Email Verification, Password Reset, Magic Link, 2FA, Invitation, Order Confirmation, Shipping Notification, Invoice, Payment Failed, Subscription Confirmation, Trial Ending, Account Deactivation, Feedback Request, Contact Form Reply

**Complete (30 more):**
Newsletters, Product Launch, Promotional, Event Invitations, Re-engagement, Referral, plus 15 layout patterns — hero sections, pricing tables, feature grids, testimonials, footers.

---

**Tweet 5 — You don't even need Vue**
Worth noting: you don't need to use the Vue components.

Every template ships as a pre-rendered HTML file. Drop it straight into Resend, SendGrid, Nodemailer, whatever you're using.

The Vue SFCs are there when you want full control. The HTML is there when you just want to ship.

---

**Tweet 6 — Pricing**
Launch pricing (ends April 30th):

Essentials — 15 transactional templates
$39 (goes to $49)

Complete — all 45 templates
$79 (goes to $99)

One-time payment. Distributed as a .tgz via Polar. Drop it in your project like any npm package.

---

**Tweet 7 — Closing CTA**
Built this as an indie maker. 15+ years writing frontend code and email HTML, and I finally got tired of doing this work from scratch on every project.

If you're a Vue or Nuxt developer shipping a SaaS product, this is for you.

mailpeek.dev/templates

Launch pricing ends April 30th.

---

## Reddit

### r/vuejs
**Title:** I built 45 production-ready email templates for Vue — typed SFCs, theme system, dark mode, pre-rendered HTML

**Body:**
Every SaaS project I build has the same hidden tax in week one: building all the transactional emails from scratch. Welcome emails, password resets, invoices, payment failed notices — all of them need table-based layouts, inline CSS, and Outlook workarounds. It takes a weekend and the results are always inconsistent. I've been working on Mailpeek (a Vue-native email toolkit) for a few months, and today I'm launching the templates pack. 45 templates built as typed Vue SFCs with TypeScript props, a shared `TemplateTheme` config object for branding, dark mode support, and mobile-responsive layouts. Pre-rendered HTML is also included for anyone who just wants to drop files into Resend or Nodemailer without the Vue layer. Happy to answer questions about how anything is built.

---

### r/SideProject
**Title:** Launched today: 45 email templates for Vue/Nuxt developers — one-time payment, no subscriptions

**Body:**
Six months of weekend work, and today it's live. I kept solving the same problem at the start of every SaaS project — building all the transactional emails from scratch. It's boring, it's slow, and table-based email HTML is genuinely painful to write well. So I built a pack of 45 production-ready email templates specifically for Vue developers: typed Vue SFCs, a theme system that lets you configure your brand once and have it flow through all 45 templates, dark mode support, and pre-rendered HTML if you want to skip the Vue layer entirely. Two tiers: Essentials (15 transactional templates, $39 launch price) and Complete (all 45 templates, $79 launch price). Distributed as a .tgz via Polar. Launch pricing ends April 30th.

---

### LinkedIn
I launched something today that I genuinely wish had existed every time I started a new product.

Mailpeek Templates is a pack of 45 production-ready email templates built specifically for Vue and Nuxt developers. Typed Vue SFCs, TypeScript props, a theme system that lets you configure your brand once and apply it across all 45 templates — colours, fonts, logo, company name, footer.

Dark mode support. Mobile-responsive layouts. Pre-rendered HTML included for teams who want to drop files straight into Resend, SendGrid, or Nodemailer without writing any Vue code.

The Essentials tier covers the 15 transactional emails every SaaS product needs: welcome, password reset, email verification, magic link, two-factor auth, invoice, order confirmation, payment failed, trial ending, and more.

The Complete tier adds 15 marketing templates — newsletters, product launch announcements, promotional emails, event invitations, re-engagement sequences — plus 15 reusable layout patterns for building custom campaigns.

One-time payment. No subscriptions. Available now at mailpeek.dev/templates with launch pricing through April 4th.

If you're building a Vue or Nuxt SaaS product, this is the email layer you've been putting off.

---

## Email to Subscribers

### Subject line options
- Option A: `Your Vue email templates are ready — launch pricing ends April 30th`
- Option B: `45 email templates for Vue developers (no more building from scratch)`
- Option C: `Mailpeek Templates is live — here's what's inside`

### Body
Hi [first name],

Mailpeek Templates is live today.

45 production-ready email templates built specifically for Vue and Nuxt developers — typed Vue SFCs with TypeScript props, a shared `TemplateTheme` config that applies your brand across every template, dark mode support, and mobile-responsive layouts. Pre-rendered HTML is included too, so you can use them without the Vue layer if you prefer.

**Essentials** — 15 transactional templates (welcome, password reset, invoice, payment failed, and 11 more): $39 until April 4th, then $49.

**Complete** — all 45 templates (transactional + marketing + 15 reusable layout patterns): $79 until April 4th, then $99.

One-time payment. No subscription.

mailpeek.dev/templates

Thanks for following along while I built this.

[Your name]

---

## Hacker News — Show HN

### Title
```
Show HN: Mailpeek Templates – 45 typed Vue email templates with theme system and pre-rendered HTML
```

### Opening comment
I'm an indie maker and Vue developer based in Ireland. I've been building SaaS products for years, and every single project has the same painful first week: building all the transactional emails from scratch.

Table-based layouts, inline CSS, inline everything really, Outlook conditional comments, dark mode edge cases — email HTML is its own discipline, and it takes real time to get right. And then you do it all over again on the next project.

I built Mailpeek Templates to solve this for the Vue ecosystem specifically. There's no equivalent of react.email for Vue developers — nothing typed, nothing Vue-native, nothing with a proper theme system. So I built it.

**What it is:** 45 email templates as typed Vue SFCs. Each template takes content props (recipient name, URLs, line items, etc.) and an optional `TemplateTheme` object — one config sets your brand colour, font, logo, company name, and footer address across all templates. Pre-rendered HTML is also shipped in the package for teams that want to use the templates without any Vue code.

**Three categories:**
- 15 transactional templates (welcome, password reset, 2FA, invoice, order confirmation, payment failed, etc.)
- 15 marketing templates (newsletters, product launch, promotional, event invitations, re-engagement)
- 15 reusable layout patterns (hero sections, feature grids, pricing tables, testimonials, footers)

**Distribution:** .tgz file via Polar checkout. Works like any npm package — `npm install ./mailpeek-templates.tgz`. The templates package is separate from the open-source Mailpeek preview component (already on npm).

**Pricing:** $39 Essentials (15 transactional) / $79 Complete (all 45) at launch. Goes to $49/$99 on April 4th.

The stack decisions, if anyone's curious: the templates are built on top of @mailpeek/components (my Vue email component library), which outputs table-based layouts with inline styles. The theme system is a plain TypeScript interface — no runtime, no CSS variables, just props that flow into inline styles. Happy to go deep on any of the technical decisions.

mailpeek.dev/templates

---

## Notes for Posting

- **PH maker comment:** If it runs long in the PH interface, trim the template list to bullet points only
- **Tweet 3 code snippet:** Use a screenshot, not pasted text — performs better on X
- **Reddit:** Don't cross-post r/vuejs and r/webdev on the same day. Be ready to answer technical questions
- **HN:** Title must start with "Show HN:" exactly. Post 9–10am EST weekday. Add opening comment immediately after posting
- **Email:** Swap `[first name]` and `[Your name]` with your merge tags and actual name
