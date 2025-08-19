// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import 'virtual:group-icons.css'

// Demo preview components
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

// Custom components
import ButtonPlayground from '../components/ButtonPlayground.vue'
import AtomicButton from '../components/AtomicButton.vue'
import SimpleButton from '../components/SimpleButton.vue'

// import { CodeGroup, CodeGroupItem } from 'vitepress-plugin-code-group'
// import 'vitepress-plugin-code-group/dist/style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    // Register demo preview component
    app.component('demo-preview', AntDesignContainer)
    
    // Register our custom components globally
    app.component('ButtonPlayground', ButtonPlayground)
    app.component('AtomicButton', AtomicButton)
    app.component('SimpleButton', SimpleButton)
    
    // app.component('CodeGroup', CodeGroup)
    // app.component('CodeGroupItem', CodeGroupItem)
  }
} satisfies Theme
