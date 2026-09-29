export type TemplateCategory = 'transactional' | 'marketing' | 'patterns'
export type Tier = 'essentials' | 'complete'

export interface TemplateInfo {
  name: string
  slug: string
  category: TemplateCategory
  description: string
}

// Prices are set in Polar; keep these in sync with the checkout products.
export const TIERS: Record<Tier, { label: string; price: string; href: string }> = {
  essentials: { label: 'Essentials', price: '$28', href: '/go/essentials' },
  complete: { label: 'Complete', price: '$55', href: '/go/complete' },
}

// Only these templates have their pre-rendered HTML published under
// docs/public/html. The rest ship exclusively in the paid package.
export const FREE_SLUGS = new Set(['welcome', 'password-reset', 'newsletter-single'])

export const templates: TemplateInfo[] = [
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

export function tierOf(template: TemplateInfo): Tier {
  return template.category === 'transactional' ? 'essentials' : 'complete'
}

export function isFree(template: TemplateInfo) {
  return FREE_SLUGS.has(template.slug)
}

export function thumbnailPath(template: TemplateInfo) {
  return `/thumbnails/${template.category}/${template.slug}.png`
}
