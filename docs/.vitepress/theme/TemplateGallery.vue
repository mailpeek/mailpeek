<script setup lang="ts">
import { ref, computed } from 'vue'
import { EmailPreview } from '@mailpeek/preview'
import '@mailpeek/preview/style.css'

type Category = 'all' | 'transactional' | 'marketing' | 'patterns'

interface TemplateInfo {
  name: string
  slug: string
  category: 'transactional' | 'marketing' | 'patterns'
  description: string
}

const templates: TemplateInfo[] = [
  // Transactional
  { name: 'Welcome', slug: 'welcome', category: 'transactional', description: 'New user onboarding with CTA' },
  { name: 'Email Verification', slug: 'email-verification', category: 'transactional', description: 'Verify email with code or link' },
  { name: 'Password Reset', slug: 'password-reset', category: 'transactional', description: 'Reset password link with expiry' },
  { name: 'Magic Link Login', slug: 'magic-link-login', category: 'transactional', description: 'Passwordless auth link' },
  { name: 'Invitation', slug: 'invitation', category: 'transactional', description: 'Team invite with accept button' },
  { name: 'Order Confirmation', slug: 'order-confirmation', category: 'transactional', description: 'Purchase receipt with line items' },
  { name: 'Shipping Notification', slug: 'shipping-notification', category: 'transactional', description: 'Order shipped with tracking' },
  { name: 'Invoice', slug: 'invoice', category: 'transactional', description: 'Payment receipt with breakdown' },
  { name: 'Payment Failed', slug: 'payment-failed', category: 'transactional', description: 'Failed payment with retry CTA' },
  { name: 'Subscription Confirmation', slug: 'subscription-confirmation', category: 'transactional', description: 'Plan activated confirmation' },
  { name: 'Trial Ending', slug: 'trial-ending', category: 'transactional', description: 'Trial expiry with upgrade CTA' },
  { name: 'Account Deactivation', slug: 'account-deactivation', category: 'transactional', description: 'Account closing notice' },
  { name: 'Feedback Request', slug: 'feedback-request', category: 'transactional', description: 'NPS-style review request' },
  { name: 'Two-Factor Auth', slug: 'two-factor-auth', category: 'transactional', description: '2FA verification code' },
  { name: 'Contact Form Reply', slug: 'contact-form-reply', category: 'transactional', description: 'Auto-reply to contact form' },
  // Marketing
  { name: 'Newsletter — Single', slug: 'newsletter-single', category: 'marketing', description: 'Hero article with CTA' },
  { name: 'Newsletter — Multi', slug: 'newsletter-multi-story', category: 'marketing', description: 'Digest with article cards' },
  { name: 'Product Launch', slug: 'product-launch', category: 'marketing', description: 'New product announcement' },
  { name: 'Product Update', slug: 'product-update', category: 'marketing', description: 'Changelog / what is new' },
  { name: 'Sale', slug: 'promotional-sale', category: 'marketing', description: 'Discount with bold CTA' },
  { name: 'Coupon', slug: 'promotional-coupon', category: 'marketing', description: 'Coupon code with expiry' },
  { name: 'Event Invitation', slug: 'event-invitation', category: 'marketing', description: 'Event with RSVP button' },
  { name: 'Event Reminder', slug: 'event-reminder', category: 'marketing', description: 'Follow-up reminder' },
  { name: 'Re-engagement', slug: 're-engagement', category: 'marketing', description: 'Win-back email' },
  { name: 'Referral', slug: 'referral', category: 'marketing', description: 'Refer-a-friend with reward' },
  { name: 'Milestone', slug: 'milestone', category: 'marketing', description: 'Usage milestone celebration' },
  { name: 'Survey', slug: 'survey', category: 'marketing', description: 'Short survey request' },
  { name: 'Case Study', slug: 'case-study', category: 'marketing', description: 'Customer success highlight' },
  { name: 'Seasonal', slug: 'seasonal', category: 'marketing', description: 'Holiday greeting with CTA' },
  { name: 'Black Friday', slug: 'black-friday', category: 'marketing', description: 'Flash sale promotion' },
  // Patterns
  { name: 'Hero — Image Left', slug: 'hero-image-left', category: 'patterns', description: 'Image + text side by side' },
  { name: 'Hero — Full Width', slug: 'hero-full-width', category: 'patterns', description: 'Full-bleed image with text' },
  { name: 'Feature Grid (2-col)', slug: 'feature-grid2-col', category: 'patterns', description: 'Two features side by side' },
  { name: 'Feature Grid (3-col)', slug: 'feature-grid3-col', category: 'patterns', description: 'Three features in a row' },
  { name: 'Feature List', slug: 'feature-list', category: 'patterns', description: 'Vertical list with accents' },
  { name: 'Pricing (2-col)', slug: 'pricing-table2-col', category: 'patterns', description: 'Two-plan comparison' },
  { name: 'Pricing (3-col)', slug: 'pricing-table3-col', category: 'patterns', description: 'Three-plan comparison' },
  { name: 'Testimonial', slug: 'testimonial-single', category: 'patterns', description: 'Quote with attribution' },
  { name: 'Testimonial Carousel', slug: 'testimonial-carousel', category: 'patterns', description: 'Multiple quotes side by side' },
  { name: 'Social Proof', slug: 'social-proof-bar', category: 'patterns', description: 'Company logo strip' },
  { name: 'Stats Row', slug: 'stats-row', category: 'patterns', description: 'Big numbers with labels' },
  { name: 'CTA Banner', slug: 'cta-banner', category: 'patterns', description: 'Full-width colored banner' },
  { name: 'Footer — Minimal', slug: 'footer-minimal', category: 'patterns', description: 'Simple unsubscribe footer' },
  { name: 'Footer — Full', slug: 'footer-full', category: 'patterns', description: 'Links, social, legal' },
  { name: 'Header', slug: 'header-logo-nav', category: 'patterns', description: 'Logo + navigation links' },
]

const activeCategory = ref<Category>('all')
const previewHtml = ref<string | null>(null)
const previewName = ref('')

const filteredTemplates = computed(() => {
  if (activeCategory.value === 'all') return templates
  return templates.filter(t => t.category === activeCategory.value)
})

const categories: { key: Category; label: string; count: number }[] = [
  { key: 'all', label: 'All', count: templates.length },
  { key: 'transactional', label: 'Transactional', count: templates.filter(t => t.category === 'transactional').length },
  { key: 'marketing', label: 'Marketing', count: templates.filter(t => t.category === 'marketing').length },
  { key: 'patterns', label: 'Patterns', count: templates.filter(t => t.category === 'patterns').length },
]

const categoryColors: Record<string, string> = {
  transactional: '#0d9488',
  marketing: '#6366f1',
  patterns: '#f59e0b',
}

// FAQ
const faqItems = [
  {
    question: 'What formats are included?',
    answer: 'Every template ships as a Vue Single File Component (.vue) with full TypeScript props, plus a pre-rendered HTML file you can drop straight into any sending service — no Vue required.',
  },
  {
    question: 'Can I customise the design?',
    answer: 'Yes. Each template accepts a theme object with 20+ properties (colours, fonts, company name, logo). For deeper changes, fork the .vue source and edit it directly.',
  },
  {
    question: 'Which email clients are supported?',
    answer: 'All templates use table-based layouts with inline styles. Tested across Gmail (web + mobile), Outlook (2016–365 + web), Apple Mail, Yahoo Mail, and Samsung Mail. Dark mode is handled via @media (prefers-color-scheme).',
  },
  {
    question: 'Do I get updates?',
    answer: 'Yes — lifetime updates are included. When new templates are added or client rendering bugs are fixed, you get access to the latest version at no extra cost.',
  },
  {
    question: 'Is there a refund policy?',
    answer: 'Yes — 14-day money-back guarantee, no questions asked. If the templates don\'t work for your project, get a full refund.',
  },
]

const openFaqIndex = ref<number | null>(null)

function toggleFaq(index: number) {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

// Email signup
const signupEmail = ref('')
const signupState = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

async function submitSignup() {
  const email = signupEmail.value.trim()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
  signupState.value = 'sending'
  try {
    await fetch('https://hook.eu1.make.com/q2xbveigisobioj2m784kvho9col61qv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    signupState.value = 'success'
  } catch {
    signupState.value = 'error'
  }
}

async function openPreview(template: TemplateInfo) {
  try {
    const response = await fetch(`/html/${template.category}/${template.slug}.html`)
    if (!response.ok) {
      previewHtml.value = `<html><body style="font-family: sans-serif; padding: 40px; text-align: center; color: #666;"><p>Preview not available. Run the render script to generate HTML files.</p></body></html>`
    } else {
      previewHtml.value = await response.text()
    }
  } catch {
    previewHtml.value = `<html><body style="font-family: sans-serif; padding: 40px; text-align: center; color: #666;"><p>Preview not available.</p></body></html>`
  }
  previewName.value = template.name
}

function closePreview() {
  previewHtml.value = null
  previewName.value = ''
}

function thumbnailPath(template: TemplateInfo) {
  return `/thumbnails/${template.category}/${template.slug}.png`
}

function isCompleteTier(category: string) {
  return category === 'marketing' || category === 'patterns'
}
</script>

<template>
  <div class="templates-page vp-doc">
    <!-- Hero -->
    <section class="hero">
      <div class="hero__glow" aria-hidden="true"></div>
      <div class="hero__content">
        <h1 class="hero__title">45 production-ready email templates</h1>
        <p class="hero__subtitle">
          Beautiful, tested email templates built with Vue components. Table-based layouts, inline styles, dark mode — all the hard parts handled for you.
        </p>
        <div class="hero__stats">
          <div class="hero__stat">
            <span class="hero__stat-number">15</span>
            <span class="hero__stat-label">Transactional</span>
          </div>
          <div class="hero__stat-divider"></div>
          <div class="hero__stat">
            <span class="hero__stat-number">15</span>
            <span class="hero__stat-label">Marketing</span>
          </div>
          <div class="hero__stat-divider"></div>
          <div class="hero__stat">
            <span class="hero__stat-number">15</span>
            <span class="hero__stat-label">Patterns</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="pricing">
      <h2 class="pricing__title">Choose your plan</h2>
      <p class="pricing__subtitle">One-time purchase. Lifetime updates. No subscription.</p>
      <div class="pricing__grid">
        <!-- Essentials -->
        <div class="pricing__card">
          <div class="pricing__card-header">
            <h3 class="pricing__card-name">Essentials</h3>
            <p class="pricing__card-desc">Everything you need for transactional emails</p>
          </div>
          <div class="pricing__card-price">
            <span class="pricing__amount">&euro;39</span>
            <span class="pricing__period">one-time</span>
          </div>
          <ul class="pricing__features">
            <li>15 transactional templates</li>
            <li>Vue SFC + pre-rendered HTML</li>
            <li>20+ theme properties</li>
            <li>Full TypeScript support</li>
            <li>Dark mode variants</li>
            <li>Lifetime updates</li>
          </ul>
          <span class="pricing__cta pricing__cta--disabled">
            Coming Soon
          </span>
        </div>

        <!-- Complete -->
        <div class="pricing__card pricing__card--featured">
          <div class="pricing__card-badge">Most Popular</div>
          <div class="pricing__card-header">
            <h3 class="pricing__card-name">Complete</h3>
            <p class="pricing__card-desc">The full collection for any email you'll ever need</p>
          </div>
          <div class="pricing__card-price">
            <span class="pricing__amount">&euro;89</span>
            <span class="pricing__period">one-time</span>
          </div>
          <ul class="pricing__features">
            <li>Everything in Essentials</li>
            <li>15 marketing templates</li>
            <li>15 reusable patterns &amp; blocks</li>
            <li>45 templates total</li>
            <li>Priority support</li>
            <li>Lifetime updates</li>
          </ul>
          <span class="pricing__cta pricing__cta--disabled">
            Coming Soon
          </span>
        </div>
      </div>
    </section>

    <!-- Signup -->
    <section class="signup">
      <div class="signup__card">
        <template v-if="signupState !== 'success'">
          <h2 class="signup__title">Get notified when templates launch</h2>
          <p class="signup__subtitle">Be the first to know when the templates are available.</p>
          <form class="signup__form" @submit.prevent="submitSignup">
            <input
              v-model="signupEmail"
              type="email"
              name="email"
              placeholder="you@example.com"
              class="signup__input"
              required
              :disabled="signupState === 'sending'"
            />
            <button
              type="submit"
              class="signup__button"
              :disabled="signupState === 'sending'"
            >
              {{ signupState === 'sending' ? 'Sending...' : 'Notify me' }}
            </button>
          </form>
          <p v-if="signupState === 'error'" class="signup__error">
            Something went wrong. Please try again.
          </p>
        </template>
        <template v-else>
          <div class="signup__success">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="var(--vp-c-brand-1)" opacity="0.15"/>
              <path d="M11 16.5l3.5 3.5 6.5-7" stroke="var(--vp-c-brand-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="signup__success-text">You're on the list!</p>
          </div>
        </template>
      </div>
    </section>

    <!-- Gallery -->
    <section class="gallery">
      <h2 class="gallery__title">Browse all templates</h2>

      <!-- Category filter -->
      <div class="gallery__filters">
        <button
          v-for="cat in categories"
          :key="cat.key"
          :class="['gallery__filter', { 'gallery__filter--active': activeCategory === cat.key }]"
          @click="activeCategory = cat.key"
        >
          {{ cat.label }}
          <span class="gallery__count">{{ cat.count }}</span>
        </button>
      </div>

      <!-- Grid -->
      <div class="gallery__grid">
        <div
          v-for="template in filteredTemplates"
          :key="template.slug"
          class="gallery__card"
          @click="openPreview(template)"
        >
          <div class="gallery__thumbnail">
            <img
              :src="thumbnailPath(template)"
              :alt="template.name"
              loading="lazy"
              @error="($event.target as HTMLImageElement).style.display = 'none'"
            />
            <div class="gallery__thumbnail-placeholder">
              <span>{{ template.name }}</span>
            </div>
          </div>
          <div class="gallery__info">
            <div class="gallery__info-top">
              <span
                class="gallery__badge"
                :style="{ backgroundColor: categoryColors[template.category] + '18', color: categoryColors[template.category] }"
              >
                {{ template.category }}
              </span>
              <span v-if="isCompleteTier(template.category)" class="gallery__tier-badge">
                Complete
              </span>
            </div>
            <h3 class="gallery__name">{{ template.name }}</h3>
            <p class="gallery__desc">{{ template.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq">
      <h2 class="faq__title">Frequently asked questions</h2>
      <div class="faq__list">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          :class="['faq__item', { 'faq__item--open': openFaqIndex === index }]"
        >
          <button class="faq__question" @click="toggleFaq(index)">
            <span>{{ item.question }}</span>
            <svg
              class="faq__chevron"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 8l4 4 4-4" />
            </svg>
          </button>
          <div v-if="openFaqIndex === index" class="faq__answer">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Preview modal -->
    <Teleport to="body">
      <div v-if="previewHtml" class="gallery__overlay" @click.self="closePreview">
        <div class="gallery__modal">
          <div class="gallery__modal-header">
            <h3>{{ previewName }}</h3>
            <button class="gallery__modal-close" @click="closePreview">&times;</button>
          </div>
          <div class="gallery__modal-body">
            <EmailPreview :html="previewHtml" />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* ─── Page wrapper ─── */
.templates-page {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ─── Hero ─── */
.hero {
  position: relative;
  padding: 80px 0 48px;
  text-align: center;
  overflow: visible;
}

.hero__glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100%;
  background: radial-gradient(ellipse at center 30%, rgba(0, 178, 173, 0.12) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.dark .hero__glow {
  background:
    radial-gradient(ellipse at 40% 30%, rgba(0, 212, 206, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 30%, rgba(120, 80, 220, 0.12) 0%, transparent 50%);
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
}

.hero__title {
  font-size: 44px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
  margin: 0 0 16px;
}

.hero__subtitle {
  font-size: 18px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 auto 36px;
  max-width: 560px;
}

.hero__stats {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 20px 36px;
}

.hero__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.hero__stat-number {
  font-size: 28px;
  font-weight: 800;
  color: var(--vp-c-brand-1);
}

.hero__stat-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero__stat-divider {
  width: 1px;
  height: 36px;
  background: var(--vp-c-divider);
}

/* ─── Pricing ─── */
.pricing {
  padding: 64px 0;
  text-align: center;
}

.pricing__title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
}

.pricing__subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0 0 40px;
}

.pricing__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 720px;
  margin: 0 auto;
}

.pricing__card {
  position: relative;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 32px 28px;
  text-align: left;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.pricing__card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 24px rgba(0, 178, 173, 0.08);
}

.dark .pricing__card:hover {
  box-shadow: 0 0 24px rgba(0, 212, 206, 0.06);
}

.pricing__card--featured {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 24px rgba(0, 178, 173, 0.1);
}

.dark .pricing__card--featured {
  box-shadow: 0 0 24px rgba(0, 212, 206, 0.08);
}

.pricing__card-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-brand-1);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 14px;
  border-radius: 20px;
  white-space: nowrap;
}

.dark .pricing__card-badge {
  color: #0a0a0a;
}

.pricing__card-header {
  margin-bottom: 20px;
}

.pricing__card-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 4px;
}

.pricing__card-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}

.pricing__card-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 24px;
}

.pricing__amount {
  font-size: 40px;
  font-weight: 800;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}

.pricing__period {
  font-size: 14px;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.pricing__features {
  list-style: none;
  padding: 0;
  margin: 0 0 28px;
}

.pricing__features li {
  position: relative;
  padding-left: 24px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.pricing__features li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 16px;
  height: 16px;
  background: var(--vp-c-brand-1);
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M13.5 4.5l-7 7L3 8' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M13.5 4.5l-7 7L3 8' fill='none' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
}

.pricing__cta {
  display: block;
  text-align: center;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: transparent;
  transition: all 0.2s;
  cursor: pointer;
}

.pricing__cta:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.pricing__cta--featured {
  background: var(--vp-c-brand-1);
  color: #ffffff;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 20px rgba(0, 178, 173, 0.3);
}

.pricing__cta--featured:hover {
  box-shadow: 0 0 30px rgba(0, 178, 173, 0.5);
  color: #ffffff;
  transform: translateY(-1px);
}

.dark .pricing__cta--featured {
  color: #0a0a0a;
}

.dark .pricing__cta--featured:hover {
  color: #0a0a0a;
}

.pricing__cta--disabled {
  opacity: 0.5;
  cursor: default;
  pointer-events: none;
}

/* ─── Signup ─── */
.signup {
  padding: 0 0 48px;
  display: flex;
  justify-content: center;
}

.signup__card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 40px;
  text-align: center;
  max-width: 520px;
  width: 100%;
}

.signup__title {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
}

.signup__subtitle {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0 0 24px;
  line-height: 1.5;
}

.signup__form {
  display: flex;
  gap: 8px;
}

.signup__input {
  flex: 1;
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
  transition: border-color 0.2s;
}

.signup__input:focus {
  border-color: var(--vp-c-brand-1);
}

.signup__input::placeholder {
  color: var(--vp-c-text-3);
}

.signup__button {
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  background: var(--vp-c-brand-1);
  color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  box-shadow: 0 0 20px rgba(0, 178, 173, 0.3);
}

.signup__button:hover {
  box-shadow: 0 0 30px rgba(0, 178, 173, 0.5);
  transform: translateY(-1px);
}

.signup__button:disabled {
  opacity: 0.6;
  cursor: default;
  transform: none;
  box-shadow: 0 0 20px rgba(0, 178, 173, 0.3);
}

.dark .signup__button {
  color: #0a0a0a;
}

.signup__error {
  font-size: 13px;
  color: #ef4444;
  margin: 12px 0 0;
}

.signup__success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.signup__success-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin: 0;
}

/* ─── Gallery ─── */
.gallery {
  padding: 48px 0 64px;
}

.gallery__title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
  margin: 0 0 32px;
}

.gallery__filters {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.gallery__filter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.gallery__filter:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.gallery__filter--active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.gallery__count {
  font-size: 12px;
  background: var(--vp-c-bg-soft);
  padding: 1px 6px;
  border-radius: 10px;
  color: var(--vp-c-text-3);
}

.gallery__filter--active .gallery__count {
  background: rgba(0, 178, 173, 0.15);
  color: var(--vp-c-brand-1);
}

.gallery__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.gallery__card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.gallery__card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 24px rgba(0, 178, 173, 0.08);
  transform: translateY(-2px);
}

.dark .gallery__card:hover {
  box-shadow: 0 4px 24px rgba(0, 212, 206, 0.06);
}

.gallery__thumbnail {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f8fafc;
}

.dark .gallery__thumbnail {
  background: #1e293b;
}

.gallery__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.gallery__thumbnail-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--vp-c-text-3);
  z-index: 0;
}

.gallery__thumbnail img + .gallery__thumbnail-placeholder {
  display: none;
}

.gallery__info {
  padding: 16px;
}

.gallery__info-top {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.gallery__badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 2px 8px;
  border-radius: 4px;
}

.gallery__tier-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(0, 178, 173, 0.12);
  color: var(--vp-c-brand-1);
}

.gallery__name {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 4px;
}

.gallery__desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* ─── FAQ ─── */
.faq {
  padding: 48px 0 80px;
  max-width: 640px;
  margin: 0 auto;
}

.faq__title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
  margin: 0 0 32px;
}

.faq__list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.faq__item {
  border-bottom: 1px solid var(--vp-c-divider);
}

.faq__item:first-child {
  border-top: 1px solid var(--vp-c-divider);
}

.faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 18px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s;
}

.faq__question:hover {
  color: var(--vp-c-brand-1);
}

.faq__chevron {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
  transition: transform 0.2s;
}

.faq__item--open .faq__chevron {
  transform: rotate(180deg);
}

.faq__answer {
  padding: 0 0 18px;
}

.faq__answer p {
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* ─── Modal ─── */
.gallery__overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.gallery__modal {
  background: var(--vp-c-bg);
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.gallery__modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.gallery__modal-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.gallery__modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 20px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.gallery__modal-close:hover {
  background: var(--vp-c-bg-alt);
}

.gallery__modal-body {
  flex: 1;
  overflow: auto;
  padding: 24px;
}

/* ─── Responsive: Tablet ─── */
@media (max-width: 960px) {
  .gallery__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .pricing__grid {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
}

/* ─── Responsive: Mobile ─── */
@media (max-width: 640px) {
  .templates-page {
    padding: 0 16px;
  }

  .hero {
    padding: 40px 0 28px;
  }

  .hero__title {
    font-size: 28px;
    line-height: 1.15;
  }

  .hero__subtitle {
    font-size: 15px;
    margin-bottom: 28px;
  }

  .hero__stats {
    display: flex;
    flex-direction: row;
    gap: 0;
    padding: 16px 12px;
    width: 100%;
    justify-content: center;
  }

  .hero__stat {
    flex: 1;
    min-width: 0;
  }

  .hero__stat-number {
    font-size: 24px;
  }

  .hero__stat-label {
    font-size: 11px;
  }

  .hero__stat-divider {
    width: 1px;
    height: 32px;
  }

  .pricing {
    padding: 36px 0;
  }

  .pricing__title {
    font-size: 24px;
  }

  .pricing__subtitle {
    font-size: 14px;
    margin-bottom: 28px;
  }

  .pricing__grid {
    grid-template-columns: 1fr;
    max-width: 100%;
    gap: 24px;
  }

  .pricing__card {
    padding: 28px 20px;
  }

  .pricing__amount {
    font-size: 36px;
  }

  .gallery {
    padding: 36px 0 48px;
  }

  .gallery__title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .gallery__filters {
    gap: 6px;
    margin-bottom: 24px;
  }

  .gallery__filter {
    padding: 6px 12px;
    font-size: 13px;
  }

  .gallery__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .gallery__thumbnail {
    height: 140px;
  }

  .gallery__info {
    padding: 12px;
  }

  .gallery__name {
    font-size: 13px;
  }

  .gallery__desc {
    font-size: 12px;
    display: none;
  }

  .gallery__badge {
    font-size: 10px;
    padding: 1px 6px;
  }

  .gallery__tier-badge {
    font-size: 9px;
    padding: 1px 5px;
  }

  .gallery__overlay {
    padding: 8px;
  }

  .gallery__modal {
    border-radius: 12px;
    max-height: 95vh;
  }

  .gallery__modal-header {
    padding: 12px 16px;
  }

  .gallery__modal-body {
    padding: 12px;
  }

  .signup {
    padding: 36px 0;
  }

  .signup__card {
    padding: 28px 20px;
  }

  .signup__title {
    font-size: 18px;
  }

  .signup__subtitle {
    font-size: 13px;
  }

  .signup__form {
    flex-direction: column;
  }

  .signup__input {
    width: 100%;
  }

  .signup__button {
    width: 100%;
    justify-content: center;
  }

  .faq {
    padding: 36px 0 60px;
  }

  .faq__title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .faq__question {
    font-size: 14px;
    padding: 16px 0;
  }

  .faq__answer p {
    font-size: 13px;
  }
}
</style>
