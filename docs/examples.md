# Examples

## Gmail vs Outlook vs Raw

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

When previewing in Gmail or Outlook mode, mailpeek logs warnings for any removed properties:

```
[mailpeek] Gmail Web: removed "position: fixed" — Gmail does not support CSS positioning
[mailpeek] Outlook: removed "border-radius: 4px" — Outlook Word renderer does not support border-radius
```

## Responsive Device Preview

Start with a specific device width and let users toggle between sizes:

```vue
<template>
  <!-- Start with mobile view -->
  <EmailPreview :html="emailHtml" device-width="mobile" />
</template>
```

Users can toggle between mobile (375px) and desktop views using the built-in toolbar buttons.

## Listening to Events

Track when users switch clients or device sizes:

```vue
<script setup lang="ts">
import { EmailPreview } from '@mailpeek/preview'
import '@mailpeek/preview/style.css'
import type { EmailClient, DeviceWidth } from '@mailpeek/preview'

function onClientChange(client: EmailClient) {
  console.log('Switched to:', client)
}

function onDeviceChange(device: DeviceWidth) {
  console.log('Device changed to:', device)
}
</script>

<template>
  <EmailPreview
    :html="emailHtml"
    @client-change="onClientChange"
    @device-change="onDeviceChange"
  />
</template>
```

## Slot Content

Instead of passing HTML as a prop, you can use slot content:

```vue
<template>
  <EmailPreview>
    <h1>Welcome!</h1>
    <p>This content will be rendered in the preview.</p>
  </EmailPreview>
</template>
```

## Custom Width

Override the default 600px preview width:

```vue
<template>
  <EmailPreview :html="emailHtml" width="100%" />
</template>
```

## Using Utility Functions Directly

You can use the CSS filtering and analysis utilities without the component:

```ts
import { filterHtml, gmailConfig, analyzeEmail } from '@mailpeek/preview'

// Filter HTML for Gmail compatibility
const { html, warnings } = filterHtml(rawEmailHtml, gmailConfig)

// Extract metadata
const metadata = analyzeEmail(rawEmailHtml)
console.log(metadata.subject)      // 'Welcome to Our Service'
console.log(metadata.fileSize)     // { bytes: 2048, formatted: '2.0 KB', isWarning: false }
```
