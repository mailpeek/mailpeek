import DefaultTheme from 'vitepress/theme'
import EmailDemo from './EmailDemo.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('EmailDemo', EmailDemo)
  },
}
