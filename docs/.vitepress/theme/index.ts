import DefaultTheme from 'vitepress/theme'
import EmailDemo from './EmailDemo.vue'
import LandingPage from './LandingPage.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('EmailDemo', EmailDemo)
    app.component('LandingPage', LandingPage)
  },
}
