import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Atomic Lib",
  description: "A VitePress Site",
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
          {
            text: 'Form & Interactive',
            collapsed: false,
            items: [
              { text: 'Button', link: '/atoms/button' },
              { text: 'Input', link: '/atoms/input' },
              { text: 'Label', link: '/atoms/label' },
              { text: 'Textarea', link: '/atoms/textarea' },
              { text: 'Select', link: '/atoms/select' },
            ]
          },
          {
            text: 'Typography & Content',
            collapsed: false,
            items: [
              { text: 'Heading', link: '/atoms/heading' },
              { text: 'Paragraph', link: '/atoms/paragraph' },
              { text: 'Span', link: '/atoms/span' },
            ]
          },
          {
            text: 'Navigation & Media',
            collapsed: false,
            items: [
              { text: 'Link', link: '/atoms/link' },
              { text: 'Image', link: '/atoms/image' },
            ]
          },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
