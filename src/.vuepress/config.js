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
        '/guide/component-basics'
      ]
    },
    {
      title: 'Components In-Depth',
      collapsable: false,
      children: [
        '/guide/component-registration',
        '/guide/component-props',
        '/guide/component-attrs',
        '/guide/component-custom-events',
        '/guide/component-slots',
        '/guide/component-provide-inject',
        '/guide/component-dynamic-async',
        '/guide/component-template-refs',
        '/guide/component-edge-cases'
      ]
    },
    {
      title: 'Transitions & Animation',
      collapsable: false,
      children: [
        '/guide/transitions-overview',
        '/guide/transitions-enterleave',
        '/guide/transitions-list',
        '/guide/transitions-state'
      ]
    },
    {
      title: 'Reusability & Composition',
      collapsable: false,
      children: [
        '/guide/mixins',
        '/guide/custom-directive',
        '/guide/teleport',
        '/guide/render-function',
        '/guide/plugins'
      ]
    },
    {
      title: 'Advanced Guides',
      collapsable: false,
      children: [
        {
          title: 'Reactivity',
          children: [
            '/guide/reactivity',
            '/guide/reactivity-fundamentals',
            '/guide/reactivity-computed-watchers'
          ]
        },
        {
          title: 'Composition API',
          children: [
            '/guide/composition-api-introduction',
            '/guide/composition-api-setup',
            '/guide/composition-api-lifecycle-hooks',
            '/guide/composition-api-provide-inject',
            '/guide/composition-api-template-refs'
          ]
        },
        '/guide/optimizations',
        '/guide/change-detection'
      ]
    },
    {
      title: 'Tooling',
      collapsable: false,
      children: [
        '/guide/single-file-component',
        '/guide/testing',
        '/guide/typescript-support'
      ]
    },
    {
      title: 'Scaling Up',
      collapsable: false,
      children: ['/guide/routing', '/guide/state-management', '/guide/ssr']
    },
    {
      title: 'Accessibility',
      collapsable: false,
      children: [
        '/guide/a11y-basics',
        '/guide/a11y-semantics',
        '/guide/a11y-standards',
        '/guide/a11y-resources'
      ]
    },
    {
      title: 'Migration from Vue 2',
      collapsable: true,
      children: [
        'migration/introduction',
        'migration/async-components',
        'migration/attribute-coercion',
        'migration/custom-directives',
        'migration/custom-elements-interop',
        'migration/data-option',
        'migration/events-api',
        'migration/filters',
        'migration/fragments',
        'migration/functional-components',
        'migration/global-api',
        'migration/global-api-treeshaking',
        'migration/inline-template-attribute',
        'migration/keycode-modifiers',
        'migration/render-function-api',
        'migration/slots-unification',
        'migration/v-model'
      ]
    },
    {
      title: 'Contribute to the Docs',
      collapsable: true,
      children: [
        'contributing/writing-guide',
        'contributing/doc-style-guide',
        'contributing/translations'
      ]
    }
  ],
  api: [
    '/api/application-config',
    '/api/application-api',
    '/api/global-api',
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
    '/api/instance-properties',
    '/api/instance-methods',
    '/api/directives',
    '/api/special-attributes',
    '/api/built-in-components.md',
    {
      title: 'Reactivity API',
      collapsable: false,
      children: [
        '/api/basic-reactivity',
        '/api/refs-api',
        '/api/computed-watch-api'
      ]
    },
    '/api/composition-api'
  ],
  examples: [
    {
      title: 'Examples',
      collapsable: false,
      children: [
        '/examples/markdown',
        '/examples/commits',
        '/examples/grid-component',
        '/examples/tree-view',
        '/examples/svg',
        '/examples/modal',
        '/examples/elastic-header',
        '/examples/select2',
        '/examples/todomvc'
      ]
    }
  ]
}

module.exports = {
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',
  head: [
    [
      'link',
      {
        href:
          'https://fonts.googleapis.com/css?family=Inter:300,400,500,600|Open+Sans:400,600;display=swap',
        rel: 'stylesheet'
      }
    ],
    [
      'link',
      {
        href:
          'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
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
    logo: '/logo.png',
    nav: [
      {
        text: 'Docs',
        ariaLabel: 'Documentation Menu',
        items: [
          { text: 'Guide', link: '/guide/introduction' },
          { text: 'Style Guide', link: '/style-guide/' },
          { text: 'Examples', link: '/examples/markdown' }
        ]
      },
      { text: 'API Reference', link: '/api/application-config' },
      {
        text: 'Ecosystem',
        items: [
          {
            text: 'Community',
            ariaLabel: 'Community Menu',
            items: [
              { text: 'Team', link: '/community/team/' },
              { text: 'Partners', link: '/community/partners' },
              { text: 'Join', link: '/community/join/' },
              { text: 'Themes', link: '/community/themes/' }
            ]
          },
          {
            text: 'Official Projects',
            items: [
              { text: 'Vue Router', link: 'https://router.vuejs.org/' },
              { text: 'Vuex', link: 'https://vuex.vuejs.org/' },
              { text: 'Vue CLI', link: 'https://cli.vuejs.org/' },
              {
                text: 'Vue Test Utils',
                link: 'https://vue-test-utils.vuejs.org/'
              },
              {
                text: 'Devtools',
                link: 'https://github.com/vuejs/vue-devtools'
              },
              { text: 'Weekly news', link: 'https://news.vuejs.org/' }
            ]
          }
        ]
      },
      {
        text: 'Support Vue',
        link: '/support-vuejs/',
        items: [
          {
            text: 'One-time Donations',
            link: '/support-vuejs/#one-time-donations'
          },
          {
            text: 'Recurring Pledges',
            link: '/support-vuejs/#recurring-pledges'
          },
          { text: 'T-Shirt Shop', link: 'https://vue.threadless.com/' }
        ]
      }
    ],
    repo: 'vuejs/docs-next',
    editLinks: false,
    editLinkText: 'Edit this on GitHub!',
    lastUpdated: 'Last updated',
    docsDir: 'src',
    sidebarDepth: 2,
    sidebar: {
      collapsable: false,
      '/guide/': sidebar.guide,
      '/community/': sidebar.guide,
      '/api/': sidebar.api,
      '/examples/': sidebar.examples
    },
    smoothScroll: false
  },
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          '/': {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        }
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'info',
        before: info =>
          `<div class="custom-block info"><p class="custom-block-title">${info}</p>`,
        after: '</div>'
      }
    ]
  ],
  markdown: {
    lineNumbers: true,
    /** @param {import('markdown-it')} md */
    extendMarkdown: md => {
      md.options.highlight = require('./markdown/highlight')(
        md.options.highlight
      )
    }
  }
}
