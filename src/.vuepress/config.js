const sidebar = {
  guide: [
    {
      title: 'Essentials',
      collapsable: false,
      children: [
        '/guide/installation',
        '/guide/introduction',
        '/guide/instance',
        '/guide/template-syntax',
        '/guide/computed',
        '/guide/class-and-style',
        '/guide/conditional',
        '/guide/list',
        '/guide/events',
        '/guide/forms',
        '/guide/component-basics',
        '/guide/accessibility'
      ]
    },
    {
      title: 'Components In-Depth',
      collapsable: false,
      children: [
        '/guide/component-registration',
        '/guide/component-props',
        '/guide/component-custom-events',
        '/guide/component-slots',
        '/guide/component-provide-inject'
      ]
    },
    {
      title: 'Internals',
      collapsable: false,
      children: [
        '/guide/reactivity',
        '/guide/component-dynamic-async',
        '/guide/optimizations',
        '/guide/change-detection'
      ]
    },
    {
      title: 'Reusability & Composition',
      collapsable: false,
      children: [
        '/guide/mixins',
        '/guide/custom-directive'
      ]
    },
    {
      title: 'Scaling Up',
      collapsable: false,
      children: ['/guide/routing']
    },
    {
      title: 'Migration to Vue 3',
      collapsable: true,
      children: ['migration']
    },
    {
      title: 'Contribute to the Docs',
      collapsable: true,
      children: ['writing-guide']
    }
  ],
  api: [
    '/api/application-config',
    '/api/application-api',
    {
      title: 'Options',
      collapsable: false,
      children: [
        '/api/options-data',
        '/api/options-dom',
        '/api/options-lifecycle-hooks',
        '/api/options-assets',
        '/api/options-composition',
        '/api/options-misc'
      ]
    },
    '/api/instance-properties.md',
    '/api/instance-methods.md'
  ]
}

module.exports = {
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',
  head: [
    [
      'link',
      {
        href: 'https://use.fontawesome.com/releases/v5.13.0/css/all.css',
        rel: 'stylesheet'
      }
    ],
    ['link', { rel: 'icon', href: '/logo.png' }],
    [
      'script',
      {
        src: 'https://player.vimeo.com/api/player.js'
      }
    ],
    [
      'script',
      {
        src: 'https://extend.vimeocdn.com/ga/72160148.js',
        defer: 'defer'
      }
    ]
  ],
  themeConfig: {
    nav: [
      {
        text: 'Docs',
        ariaLabel: 'Documentation Menu',
        items: [
          { text: 'Guide', link: '/guide/introduction' },
          { text: 'Style Guide', link: '/style-guide/' },
          { text: 'Tooling', link: '/tooling/' }
        ]
      },
      { text: 'API Reference', link: '/api/application-config' },
      {
        text: 'Examples',
        ariaLabel: 'Examples Menu',
        items: [
          { text: 'Examples', link: '/examples/' },
          { text: 'Cookbook', link: '/cookbook/' }
        ]
      },
      {
        text: 'Community',
        ariaLabel: 'Community Menu',
        items: [
          { text: 'Team', link: '/community/team/' },
          { text: 'Partners', link: '/community/partners/' },
          { text: 'Join', link: '/community/join/' },
          { text: 'Themes', link: '/community/themes/' }
        ]
      }
    ],
    sidebarDepth: 2,
    sidebar: {
      collapsable: false,
      '/guide/': sidebar.guide,
      '/community/': sidebar.guide,
      '/api/': sidebar.api
    },
    smoothScroll: false
  },
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        '/': {
          message: 'New content is available.',
          buttonText: 'Refresh'
        }
      }
    }
  },
  markdown: {
    /** @param {import('markdown-it')} md */
    extendMarkdown: md => {
      md.options.highlight = require('./markdown/highlight')(
        md.options.highlight
      )
    }
  }
}
