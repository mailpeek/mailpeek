# mailpeek

Vue.js email preview component — see how your emails render in Gmail, Outlook, and more.

![mailpeek demo](https://raw.githubusercontent.com/mailpeek/mailpeek/main/demo/mailpeek-demo.gif)

## Features

- **Email client simulation** — Preview emails as they appear in Gmail and Outlook (with CSS filtering)
- **Dark mode simulation** — See how emails render in each client's dark mode
- **Device responsive preview** — Toggle between mobile (375px) and desktop views
- **Email metadata extraction** — Automatically displays subject line, preview text, and file size
- **File size warnings** — Alerts when emails exceed Gmail's 102KB clipping threshold
- **Zero dependencies** — Only Vue 3 as a peer dependency
- **TypeScript support** — Full type definitions included
- **SSR compatible** — Works with Nuxt 3

## Packages

| Package | Description |
|---------|-------------|
| [`@mailpeek/preview`](packages/preview) | Email preview component with client simulation, dark mode, and device toggle |
| [`@mailpeek/components`](packages/components) | Vue 3 email components (EmailHtml, EmailBody, EmailContainer, EmailText, EmailButton) with SSR render pipeline |

## Installation

```bash
npm install @mailpeek/preview
# or
pnpm add @mailpeek/preview
# or
yarn add @mailpeek/preview
```

## Quick Start

```vue
<script setup lang="ts">
import { EmailPreview } from '@mailpeek/preview'
import '@mailpeek/preview/style.css'

const emailHtml = `
  <html>
    <head>
      <title>Welcome to Our Service</title>
    </head>
    <body>
      <h1>Hello!</h1>
      <p>Thanks for signing up.</p>
    </body>
  </html>
`
</script>

<template>
  <EmailPreview :html="emailHtml" />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `html` | `string` | `undefined` | Raw email HTML to preview |
| `width` | `string` | `'600px'` | CSS width for the preview container |
| `client` | `'gmail' \| 'outlook' \| 'raw'` | `'gmail'` | Email client to simulate |
| `mobile` | `boolean` | `false` | Enable mobile chrome variant |
| `deviceWidth` | `'mobile' \| 'desktop'` | `'desktop'` | Device width preset |
| `darkMode` | `boolean` | `false` | Enable dark mode simulation |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `loaded` | `Event` | Fired when the iframe finishes loading |
| `client-change` | `'gmail' \| 'outlook' \| 'raw'` | Fired when user switches email client |
| `device-change` | `'mobile' \| 'desktop'` | Fired when user changes device preset |
| `darkmode-change` | `boolean` | Fired when user toggles dark mode |

## Examples

### Gmail vs Outlook Simulation

The component automatically filters CSS properties that aren't supported by each email client:

```vue
<template>
  <!-- Gmail mode (default) - strips position, transform, animation, etc. -->
  <EmailPreview :html="emailHtml" client="gmail" />

  <!-- Outlook mode - strips border-radius, flexbox, max-width, etc. -->
  <EmailPreview :html="emailHtml" client="outlook" />

  <!-- Raw mode - no CSS filtering, renders exactly as provided -->
  <EmailPreview :html="emailHtml" client="raw" />
</template>
```

### Dark Mode Preview

See how your email looks in a client's dark mode:

```vue
<template>
  <!-- Gmail dark mode simulation -->
  <EmailPreview :html="emailHtml" client="gmail" :dark-mode="true" />

  <!-- Outlook dark mode simulation -->
  <EmailPreview :html="emailHtml" client="outlook" :dark-mode="true" />
</template>
```

Users can also toggle dark mode using the sun/moon buttons in the toolbar. Gmail uses full colour inversion while Outlook uses partial inversion, matching real-world client behaviour.

### Responsive Device Preview

```vue
<template>
  <!-- Start with mobile view -->
  <EmailPreview :html="emailHtml" device-width="mobile" />
</template>
```

Users can toggle between devices using the built-in toolbar buttons.

### Listening to Events

```vue
<script setup lang="ts">
import { EmailPreview } from '@mailpeek/preview'
import type { EmailClient, DeviceWidth } from '@mailpeek/preview'

function onClientChange(client: EmailClient) {
  console.log('Switched to:', client)
}

function onDeviceChange(device: DeviceWidth) {
  console.log('Device changed to:', device)
}

function onDarkModeChange(enabled: boolean) {
  console.log('Dark mode:', enabled)
}
</script>

<template>
  <EmailPreview
    :html="emailHtml"
    @client-change="onClientChange"
    @device-change="onDeviceChange"
    @darkmode-change="onDarkModeChange"
  />
</template>
```

### Using Slot Content

Instead of passing HTML as a prop, you can use slot content:

```vue
<template>
  <EmailPreview>
    <h1>Welcome!</h1>
    <p>This content will be rendered in the preview.</p>
  </EmailPreview>
</template>
```

## CSS Filtering

When simulating Gmail or Outlook, mailpeek automatically removes unsupported CSS properties and logs warnings to the console:

```
[mailpeek] Gmail Web: removed "position: fixed" — Gmail does not support CSS positioning
[mailpeek] Outlook: removed "border-radius: 4px" — Outlook Word renderer does not support border-radius
```

### Gmail Restrictions

Gmail strips: `position`, `transform`, `animation`, `transition`, `box-shadow`, `display: grid`, flexbox sub-properties (`align-items`, `justify-content`, etc.), and more.

### Outlook Restrictions

Outlook (Word engine) strips everything Gmail does, plus: `border-radius`, `display: flex`, `background-size`, `max-width`, `min-width`, and more.

## Email Metadata

The component automatically extracts and displays:

- **Subject** — From the `<title>` tag
- **Preview text** — From preheader elements or first ~100 characters of body text
- **File size** — Displayed in KB, with warning styling when over 100KB

## @mailpeek/components

Build cross-client email HTML with Vue 3 components:

```bash
npm install @mailpeek/components
```

```typescript
import { render, EmailHtml, EmailBody, EmailContainer, EmailText, EmailButton } from '@mailpeek/components'
import { defineComponent, h } from 'vue'

const WelcomeEmail = defineComponent({
  props: { name: String },
  setup(props) {
    return () => h(EmailHtml, null, {
      default: () => h(EmailBody, null, {
        default: () => h(EmailContainer, null, {
          default: () => [
            h(EmailText, null, { default: () => `Hello ${props.name}!` }),
            h(EmailButton, { href: 'https://example.com' }, { default: () => 'Get Started' }),
          ]
        })
      })
    })
  }
})

const html = await render(WelcomeEmail, { name: 'Aoife' })
```

Components output email-safe HTML with inline styles and table-based layouts. The `render()` function uses Vue SSR to compile components to a ready-to-send HTML string with proper DOCTYPE.

## TypeScript

All types are exported for use in your components:

```typescript
import type {
  EmailPreviewProps,
  EmailClient,
  DeviceWidth,
  EmailMetadata
} from '@mailpeek/preview'
```

## Browser Support

mailpeek works in all modern browsers that support:
- ES2020+
- CSS Custom Properties
- iframe `srcdoc` attribute

## License

MIT
