// Gmail Web CSS restriction database for @mailpeek/preview
// Source: Google Developers Gmail CSS support docs (updated December 11, 2025)
// Source: caniemail.com API data
//
// Note: Gmail web DOES support display:flex AND display:grid (both listed in official
// supported properties), but does NOT support their sub-properties
// (align-items, justify-content, grid-template-columns, gap, etc.).
//
// Note: Gmail web DOES support @media queries. The viewport used is the full browser
// window width (not the email pane width), so min-width queries almost always fire on
// desktop. stripMediaQueries is false for Gmail.

import type { ClientConfig } from './types'

export const gmailConfig: ClientConfig = {
  id: 'gmail',
  name: 'Gmail Web',
  version: '2024',
  stripExternalStylesheets: true,
  stripAtImport: true,
  stripFontFace: true,
  stripMediaQueries: false,
  styleBlockCharLimit: 8192,
  cssRestrictions: [
    // Positioning — not in Gmail supported list (HIGH confidence)
    {
      property: 'position',
      reason: 'Gmail does not support CSS positioning',
    },
    {
      property: 'top',
      reason: 'Gmail does not support position offset properties',
    },
    {
      property: 'right',
      reason: 'Gmail does not support position offset properties',
    },
    {
      property: 'bottom',
      reason: 'Gmail does not support position offset properties',
    },
    {
      property: 'left',
      reason: 'Gmail does not support position offset properties',
    },
    {
      property: 'z-index',
      reason: 'Gmail does not support z-index',
    },

    // Transforms — not in Gmail supported list (HIGH confidence)
    {
      property: 'transform',
      reason: 'Gmail does not support CSS transforms',
    },
    {
      property: '-webkit-transform',
      reason: 'Gmail does not support CSS transforms',
    },

    // Animations — caniemail css-animation:n for Gmail (HIGH confidence)
    {
      property: 'animation',
      reason: 'Gmail does not support CSS animations',
    },
    {
      property: '-webkit-animation',
      reason: 'Gmail does not support CSS animations',
    },

    // Transitions (HIGH confidence)
    {
      property: 'transition',
      reason: 'Gmail does not support CSS transitions',
    },

    // Box shadow — caniemail css-box-shadow:n for Gmail (HIGH confidence)
    {
      property: 'box-shadow',
      reason: 'Gmail does not support box-shadow',
    },

    // Flexbox sub-properties — caniemail css-align-items:n (HIGH confidence)
    // Note: display:flex itself IS supported by Gmail; only sub-properties are stripped
    {
      property: 'align-items',
      reason: 'Gmail does not support flexbox layout properties (display: flex is supported)',
    },
    {
      property: 'justify-content',
      reason: 'Gmail does not support flexbox layout properties',
    },
    {
      property: 'flex-direction',
      reason: 'Gmail does not support flexbox layout properties',
    },
    {
      property: 'flex-wrap',
      reason: 'Gmail does not support flexbox layout properties',
    },
    {
      property: 'flex',
      reason: 'Gmail does not support flexbox layout properties',
    },

    // CSS Grid sub-properties — display:grid IS supported by Gmail (same as display:flex),
    // but sub-properties that control grid layout are stripped (HIGH confidence)
    {
      property: 'grid',
      reason: 'Gmail does not support CSS Grid layout sub-properties (display: grid is supported)',
    },
    {
      property: 'grid-template-columns',
      reason: 'Gmail does not support CSS Grid layout sub-properties (display: grid is supported)',
    },
    {
      property: 'grid-template-rows',
      reason: 'Gmail does not support CSS Grid layout sub-properties (display: grid is supported)',
    },
    {
      property: 'grid-column',
      reason: 'Gmail does not support CSS Grid layout sub-properties (display: grid is supported)',
    },
    {
      property: 'grid-row',
      reason: 'Gmail does not support CSS Grid layout sub-properties (display: grid is supported)',
    },
    {
      property: 'gap',
      reason: 'Gmail does not support CSS Grid layout sub-properties (display: grid is supported)',
    },
    {
      property: 'grid-gap',
      reason: 'Gmail does not support CSS Grid layout sub-properties (display: grid is supported)',
    },

    // Clip-path — caniemail css-clip-path:n (HIGH confidence)
    {
      property: 'clip-path',
      reason: 'Gmail does not support clip-path',
    },

    // Backdrop-filter — caniemail css-backdrop-filter:n (HIGH confidence)
    {
      property: 'backdrop-filter',
      reason: 'Gmail does not support backdrop-filter',
    },
    {
      property: '-webkit-backdrop-filter',
      reason: 'Gmail does not support backdrop-filter',
    },

    // Filter (HIGH confidence)
    {
      property: 'filter',
      reason: 'Gmail does not support filter',
    },

    // Aspect-ratio — caniemail css-aspect-ratio:n (HIGH confidence)
    {
      property: 'aspect-ratio',
      reason: 'Gmail does not support aspect-ratio',
    },

    // Interaction properties (HIGH confidence)
    {
      property: 'resize',
      reason: 'Gmail does not support resize',
    },
    {
      property: 'user-select',
      reason: 'Gmail does not support user-select',
    },
    {
      property: 'pointer-events',
      reason: 'Gmail does not support pointer-events',
    },
  ],
}
