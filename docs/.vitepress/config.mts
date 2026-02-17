import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'mailpeek',
  description: 'Vue.js email preview component',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'mailpeek' }],
    ['meta', { property: 'og:description', content: 'Vue.js email preview component — see how your emails render before you send them.' }],
    ['meta', { property: 'og:url', content: 'https://mailpeek.dev' }],
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'API', link: '/api' },
      { text: 'Examples', link: '/examples' },
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
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aoifeshannon/mailpeek' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'mailpeek.dev',
    },
  },
})
