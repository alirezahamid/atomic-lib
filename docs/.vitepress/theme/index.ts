// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import 'virtual:group-icons.css'

// import { CodeGroup, CodeGroupItem } from 'vitepress-plugin-code-group'
// import 'vitepress-plugin-code-group/dist/style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    // app.component('CodeGroup', CodeGroup)
    // app.component('CodeGroupItem', CodeGroupItem)
  }
} satisfies Theme
