import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Atomic Lib",
  titleTemplate: ":title | Atomic Design Components Library",
  description: "A curated library of atomic UI components built with React and Vue. Framework-agnostic, accessible, and production-ready components following Brad Frost's Atomic Design methodology.",
  lang: 'en-US',
  
  // SEO and Meta
  head: [
    // Favicon and Icons
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    
    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Atomic Lib - Atomic Design Components Library' }],
    ['meta', { property: 'og:description', content: 'A curated library of atomic UI components built with React and Vue. Framework-agnostic, accessible, and production-ready components.' }],
    ['meta', { property: 'og:url', content: 'https://atomiclib.ahamid.me/' }],
    ['meta', { property: 'og:site_name', content: 'Atomic Lib' }],
    ['meta', { property: 'og:image', content: 'https://atomiclib.ahamid.me/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Atomic Lib - Atomic Design Components Library' }],
    ['meta', { name: 'twitter:description', content: 'Copy-paste atomic UI components for React and Vue. No installation required.' }],
    ['meta', { name: 'twitter:image', content: 'https://atomiclib.ahamid.me/twitter-card.png' }],
    
    // Additional SEO Meta Tags
    ['meta', { name: 'author', content: 'Alireza Hamid' }],
    ['meta', { name: 'keywords', content: 'atomic design, ui components, react components, vue components, design system, component library, typescript, accessibility, brad frost' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'googlebot', content: 'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1' }],
    
    // Canonical URL (will be overridden per page)
    ['link', { rel: 'canonical', href: 'https://atomiclib.ahamid.me/' }],
    
    // Preconnect to external domains
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    
    // Schema.org structured data
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Atomic Lib",
      "description": "A curated library of atomic UI components built with React and Vue following Atomic Design methodology",
      "url": "https://atomiclib.ahamid.me/",
      "author": {
        "@type": "Person",
        "name": "Alireza Hamid",
        "url": "https://github.com/alirezahamid"
      },
      "programmingLanguage": ["TypeScript", "JavaScript"],
      "runtimePlatform": ["React", "Vue.js"],
      "keywords": "atomic design, ui components, react, vue, component library, design system",
      "license": "https://opensource.org/licenses/MIT",
      "codeRepository": "https://github.com/alirezahamid/atomic-lib"
    })]
  ],
  
  // Clean URLs
  cleanUrls: true,
  
  // Sitemap generation
  sitemap: {
    hostname: 'https://atomiclib.ahamid.me',
    transformItems: (items) => {
      // Add priority and changefreq to sitemap items
      return items.map((item) => {
        if (item.url === '/') {
          item.priority = 1.0
          item.changefreq = 'weekly'
        } else if (item.url.includes('/atoms/')) {
          item.priority = 0.8
          item.changefreq = 'monthly'
        } else {
          item.priority = 0.6
          item.changefreq = 'monthly'
        }
        return item
      })
    }
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin()
    ],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    siteTitle: 'Atomic Lib',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/atoms' },
      { 
        text: 'Community',
        items: [
          { text: '💬 Discussions', link: 'https://github.com/alirezahamid/atomic-lib/discussions' },
          { text: '💡 Request Components', link: 'https://github.com/alirezahamid/atomic-lib/issues' },
          { text: '🐛 Report Issues', link: 'https://github.com/alirezahamid/atomic-lib/issues' },
          { text: '🐙 Source Code', link: 'https://github.com/alirezahamid/atomic-lib' }
        ]
      },
      { 
        text: 'Resources',
        items: [
          { text: 'Atomic Design Guide', link: 'http://atomicdesign.bradfrost.com/' },
          { text: 'Brad Frost (Creator)', link: 'https://bradfrost.com/' }
        ]
      }
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

    // Footer
    footer: {
      message: 'Built with ❤️ following Atomic Design principles by Brad Frost | <a href="https://github.com/alirezahamid/atomic-lib/discussions">Join Discussions</a> | <a href="https://github.com/alirezahamid/atomic-lib/issues">Request Components</a>',
      copyright: 'Copyright © 2024 Alireza Hamid. Released under MIT License.'
    },

    // Edit link
    editLink: {
      pattern: 'https://github.com/alirezahamid/atomic-lib/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/alirezahamid/atomic-lib' }
    ],

    // Search configuration
    search: {
      provider: 'local'
    }
  }
})
