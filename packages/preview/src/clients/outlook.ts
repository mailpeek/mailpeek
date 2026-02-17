// Outlook CSS restriction database for @mailpeek/preview
// Source: caniemail.com API data for Outlook 2019 (Word renderer)
// Source: Litmus Outlook rendering guide
//
// IMPORTANT version note: This restriction list applies to Outlook desktop
// (2016/2019/2021) which uses Microsoft Word as the rendering engine.
// This is distinct from:
//   - "New Outlook for Windows" (rolling out 2025): browser engine, near-full CSS support
//   - "Outlook.com / Outlook 365 web": browser engine, near-full CSS support
// The Word-based renderer is labeled version '2019-2021 (Word engine)' to avoid
// confusion with the new browser-based Outlook apps.
//
// Outlook (Word engine) strips MORE than Gmail:
// e.g. border-radius, display:flex, background-size, max-width

import type { ClientConfig } from './types'

export const outlookConfig: ClientConfig = {
  id: 'outlook',
  name: 'Outlook',
  version: '2019-2021 (Word engine)',
  stripExternalStylesheets: true,
  stripAtImport: true,
  cssRestrictions: [
    // Positioning — Word engine ignores CSS positioning entirely (HIGH confidence)
    {
      property: 'position',
      reason: 'Outlook Word renderer does not support CSS positioning',
    },
    {
      property: 'top',
      reason: 'Outlook Word renderer does not support position offsets',
    },
    {
      property: 'right',
      reason: 'Outlook Word renderer does not support position offsets',
    },
    {
      property: 'bottom',
      reason: 'Outlook Word renderer does not support position offsets',
    },
    {
      property: 'left',
      reason: 'Outlook Word renderer does not support position offsets',
    },
    {
      property: 'z-index',
      reason: 'Outlook Word renderer does not support position offsets',
    },

    // Flexbox — caniemail css-align-items:n for Outlook 2019 (HIGH confidence)
    // Note: Unlike Gmail, Outlook strips display:flex AND display:grid
    {
      property: 'display',
      reason: 'Outlook Word renderer does not support flexbox or grid',
      unsupportedValues: ['flex', 'inline-flex', 'grid', 'inline-grid'],
    },
    {
      property: 'align-items',
      reason: 'Outlook Word renderer does not support flexbox properties',
    },
    {
      property: 'justify-content',
      reason: 'Outlook Word renderer does not support flexbox properties',
    },
    {
      property: 'flex-direction',
      reason: 'Outlook Word renderer does not support flexbox properties',
    },
    {
      property: 'flex-wrap',
      reason: 'Outlook Word renderer does not support flexbox properties',
    },
    {
      property: 'flex',
      reason: 'Outlook Word renderer does not support flexbox properties',
    },

    // CSS Grid (HIGH confidence)
    {
      property: 'grid',
      reason: 'Outlook Word renderer does not support CSS Grid',
    },
    {
      property: 'grid-template-columns',
      reason: 'Outlook Word renderer does not support CSS Grid',
    },
    {
      property: 'grid-template-rows',
      reason: 'Outlook Word renderer does not support CSS Grid',
    },
    {
      property: 'grid-column',
      reason: 'Outlook Word renderer does not support CSS Grid',
    },
    {
      property: 'grid-row',
      reason: 'Outlook Word renderer does not support CSS Grid',
    },

    // Border radius — caniemail css-border-radius:n for Outlook 2019 (HIGH confidence)
    {
      property: 'border-radius',
      reason: 'Outlook Word renderer does not support border-radius',
    },

    // Box shadow — caniemail css-box-shadow:n (HIGH confidence)
    {
      property: 'box-shadow',
      reason: 'Outlook Word renderer does not support box-shadow',
    },

    // Animations (HIGH confidence)
    {
      property: 'animation',
      reason: 'Outlook Word renderer does not support animations',
    },
    {
      property: '-webkit-animation',
      reason: 'Outlook Word renderer does not support animations',
    },

    // Transitions (HIGH confidence)
    {
      property: 'transition',
      reason: 'Outlook Word renderer does not support transitions',
    },

    // Transforms (HIGH confidence)
    {
      property: 'transform',
      reason: 'Outlook Word renderer does not support transforms',
    },
    {
      property: '-webkit-transform',
      reason: 'Outlook Word renderer does not support transforms',
    },

    // Clip-path (HIGH confidence)
    {
      property: 'clip-path',
      reason: 'Outlook Word renderer does not support clip-path',
    },

    // Backdrop-filter (HIGH confidence)
    {
      property: 'backdrop-filter',
      reason: 'Outlook Word renderer does not support backdrop-filter',
    },
    {
      property: '-webkit-backdrop-filter',
      reason: 'Outlook Word renderer does not support backdrop-filter',
    },

    // Background size — caniemail css-background-size:n (HIGH confidence)
    {
      property: 'background-size',
      reason: 'Outlook Word renderer does not support background-size',
    },

    // Width constraints — MEDIUM confidence (Word engine has inconsistent support)
    {
      property: 'max-width',
      reason: 'Outlook Word renderer has inconsistent max/min-width support',
    },
    {
      property: 'min-width',
      reason: 'Outlook Word renderer has inconsistent max/min-width support',
    },

    // Aspect-ratio (HIGH confidence)
    {
      property: 'aspect-ratio',
      reason: 'Outlook Word renderer does not support aspect-ratio',
    },
  ],
}
