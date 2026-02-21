// @mailpeek/components — public API

// Components
export { default as EmailHtml } from './components/EmailHtml.vue'
export { default as EmailBody } from './components/EmailBody.vue'
export { default as EmailContainer } from './components/EmailContainer.vue'
export { default as EmailText } from './components/EmailText.vue'
export { default as EmailButton } from './components/EmailButton.vue'

// Render pipeline
export { render } from './render'

// Types
export type {
  EmailHtmlProps,
  EmailBodyProps,
  EmailContainerProps,
  EmailTextProps,
  EmailButtonProps,
  RenderOptions,
} from './types'
