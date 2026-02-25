import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'mailpeek',
  description: 'Vue.js email components and preview toolkit',
  appearance: 'dark',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'mailpeek' }],
    ['meta', { property: 'og:description', content: 'Build emails with Vue components and preview them across Gmail, Outlook, and dark mode.' }],
    ['meta', { property: 'og:url', content: 'https://mailpeek.dev' }],
    ['meta', { property: 'og:image', content: 'https://mailpeek.dev/wordmark.png' }],
  ],
  themeConfig: {
    logo: { src: '/logo-mark.png', alt: 'mailpeek' },
    siteTitle: false,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Demo', link: '/demo' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'API', link: '/api' },
      { text: 'Components', link: '/components' },
      { text: 'Examples', link: '/examples' },
      { text: 'Blog', link: '/blog/' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Examples', link: '/examples' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'API', link: '/api' },
          { text: 'Components', link: '/components' },
        ],
      },
      {
        text: 'Blog',
        items: [
          { text: 'Why Gmail Breaks Your Email CSS', link: '/blog/gmail-breaks-your-email-css' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mailpeek/mailpeek' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'mailpeek.dev',
    },
  },
})
