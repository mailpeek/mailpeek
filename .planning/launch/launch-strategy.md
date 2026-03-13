# Mailpeek Templates — Launch Strategy

## Launch Date: Tuesday March 24th, 2026 at 12:01am PST

Three weeks of runway before April 4th price increase. Enough time for one proper Product Hunt launch with pre-launch seeding.

---

## Platform Sequencing

| Date | Action |
|------|--------|
| **March 14th** | Teaser tweet — show one template, no pricing, no links |
| **March 14th** | Submit to Vue Weekly newsletter |
| **March 17th** | Educational post r/vuejs + r/webdev (tech angle, no sales pitch) |
| **March 19th** | DM 8–12 people personally for PH seed upvotes |
| **March 21st** | r/SideProject launch preview post + Indie Hackers |
| **March 23rd** | Pre-launch checklist complete, Twitter thread scheduled |
| **March 24th 12:01am PST** | Product Hunt live — paste maker comment immediately |
| **March 24th 8am PST** | Vue Discord + Nuxt Discord #showcase |
| **March 24th 11am PST** | Update r/vuejs and r/webdev posts with PH link |
| **April 1st** | "3 days left" urgency push |
| **April 4th** | Prices go up — non-negotiable |

---

## Product Hunt Strategy

### When to Post
Post at **12:01am Pacific Time on Tuesday March 24th.** PH leaderboard resets at midnight PST. Do not post at 9am — you'll be buried under posts that went live hours earlier.

### Tagline Options
- `45 Vue email templates with TypeScript props and dark mode` (primary)
- `Email templates built as real Vue SFCs — not just HTML with Vue wrappers`
- `Typed Vue components for transactional and marketing email`

### Gallery Assets (in order)
1. **Cover (1270×760px)** — Best template on dark background, product name + tagline
2. **Code screenshot** — TypeScript props interface in VS Code (converts technical buyers most)
3. **Theme system** — Same template with 2 different brand colours side by side
4. **Dark mode** — Light vs dark version of the same template
5. **Template grid** — All 45 thumbnails (already generated at `docs/public/ph-assets/template-grid.png`)
6. **GIF (optional)** — Theme colour changing in real time, under 3MB

### Driving Upvotes
- **Tier 1 (first 2 hours):** Personal network — DM the night before with the URL
- **Tier 2 (8am PST):** Vue Discord + Nuxt Discord #showcase
- **Tier 3 (all day):** Twitter/X thread drives organic discovery
- Do NOT post your PH link on Reddit — violates rules and gets removed

### Maker Comment
Address the MJML/React Email objection proactively:
> "Unlike MJML or React Email, these are full Vue SFCs — you manage them exactly like any other component in your app, with the same tooling, the same TypeScript, the same hot reload."

---

## Hacker News — Show HN

**Post on March 21–22 or March 26–27 — NOT on launch day.**

Frame it as a technical post, not a launch:
- Title: `Show HN: I built email templates as typed Vue SFCs — here's the architecture`
- Lead with the interesting technical constraint (email clients are a terrible rendering environment)
- Ask a genuine question for the community (workspace:* vs npm registry for paid distribution)
- Post at **9–10am EST on a weekday**
- Stay in the thread for 4–5 hours actively responding

---

## Community Channels

### Vue Discord
Post in `#showcase` at 8am PST on launch day:
> "Just launched Mailpeek Templates on Product Hunt — 45 email templates built as proper Vue SFCs with TypeScript props, a 20-property theming system, and pre-rendered HTML included if you don't want to use the Vue integration. Transactional and marketing templates. Would love any feedback: [PH link]"

### Nuxt Discord
Lead with the Nuxt angle — these users are most likely building SaaS products:
> "Built 45 email templates that work as actual Nuxt components — typed props, theming system, dark mode. Just launched on Product Hunt if you want to check it out: [PH link]"

### Reddit
- r/vuejs — educational post D-7 (March 17th), comment update on launch day
- r/webdev — same approach
- r/SideProject — more tolerant of launches, can be more explicit, post D-3 (March 21st)
- Do NOT cross-post r/vuejs and r/webdev on the same day

### Indie Hackers
Post a build-in-public update 1–2 days before launch. Title: "Launching my Vue email template pack next Tuesday — here's the product and pricing."

---

## Launch Day Timeline (March 24th PST)

| Time | Action |
|------|--------|
| 12:01am | Publish PH post, paste maker comment immediately |
| 12:05am | DM seed upvote group with the live link |
| 12:30am | Tweet the launch thread |
| 6:00am | Check PH ranking, respond to early comments |
| 8:00am | Post in Vue Discord + Nuxt Discord #showcase |
| 8:30am | Reply to every Twitter/X mention and quote tweet |
| 11:00am | Update r/vuejs and r/webdev posts with PH link comment |
| 12:00pm | "Midday update" tweet — share interesting feedback or stat |
| 4:00pm | Submit to TLDR Web Dev + Vue Weekly if not done |
| 6:00pm | Final tweet of the day — results + link |

---

## Pre-Launch Checklist (complete by March 22nd)

**Product:**
- [ ] Buy flow works end-to-end with a real card
- [ ] .tgz downloads correctly after purchase
- [ ] .tgz extracts cleanly and components work in a fresh Vue 3 / Nuxt project
- [ ] TypeScript types work in strict mode
- [ ] mailpeek.dev/templates loads fast (Lighthouse 90+ mobile)

**Product Hunt assets:**
- [ ] Cover image (1270×760px)
- [ ] Gallery images × 5 exported at correct size
- [ ] GIF under 3MB (optional)
- [ ] Tagline finalised (under 60 characters)
- [ ] Maker comment written and saved ready to paste at 12:01am
- [ ] PH post drafted and saved as draft (do not publish yet)

**Distribution:**
- [ ] Personal upvote list — 8–12 people confirmed
- [ ] Twitter/X thread drafted and scheduled for 12:30am March 24th
- [ ] Vue Discord message drafted
- [ ] Nuxt Discord message drafted
- [ ] r/vuejs post live with some engagement (from March 17th)
- [ ] TLDR Web Dev submission sent
- [ ] Vue Weekly submission sent

**Contingency answers ready:**
- [ ] "Why not npm?" — 2-sentence answer
- [ ] "Why not MJML?" — 2-sentence answer
- [ ] "Does this work with Nuxt 3 / Vue 2?" — clear answer
- [ ] Polar order notifications set up so you know when purchases happen

---

## Metrics to Watch on Launch Day

- **PH rank** — check at 8am, 12pm, 4pm, 8pm PST. Top 5 by noon = good shape
- **Visitor → Polar click-through rate** — healthy: ~30% of visitors click Buy
- **Polar click → purchase rate** — healthy: 5–10% of Polar clicks convert
- **Essentials vs Complete ratio** — if everyone buys Essentials, Complete value prop needs work
- **Twitter link clicks** — not vanity; this tells you how many people actually looked

---

## Post-Launch (March 25th–April 4th)

| Date | Action |
|------|--------|
| March 25th | Results tweet — be honest with numbers, gets reshared in build-in-public circles |
| March 26th | "Template spotlight" tweet — show one template's props interface |
| March 27–28th | Build-in-public post on Indie Hackers with real numbers |
| March 29–30th | "What I wish I knew about email in Vue" educational thread |
| April 1st | "3 days left at launch pricing" push on Twitter + Reddit thread updates |
| April 4th | Final countdown tweet in morning. Raise prices at midnight — mandatory |

---

## Key Tactical Notes

- **The .tgz distribution is an asset** — frame it as "a real product, not a throwaway OSS package"
- **Don't lead with "works without Vue"** — dilutes positioning, Vue devs are the primary buyer
- **Screenshots > live demo** at this price point — a broken demo is worse than no demo
- **Essentials at $39 is doing the most work** — it's a "why not" purchase for a working developer
- If Complete pricing feels too close to Essentials, buyers will default cheaper or leave
