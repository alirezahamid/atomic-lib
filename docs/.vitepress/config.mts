import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Atomic Lib",
  description: "Forge Your UI at Lightning Speed",
  head: [
    ['script', { defer: '', src: '/_vercel/insights/script.js' }]
  ],
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin()
    ],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/atoms' }
    ],
    sidebar: [
      {
        text: 'Atoms',
        items: [
          { text: 'Overview', link: '/atoms/' },
          { text: 'Button', link: '/atoms/button' },
          { text: 'Heading', link: '/atoms/heading' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alirezahamid/atomic-lib.git' }
    ]
  }
})
