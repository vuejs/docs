const sidebar = {
  cookbook: [
    {
      title: 'Cookbook',
      collapsable: false,
      children: ['/cookbook/', '/cookbook/editable-svg-icons']
    }
  ],
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
        '/guide/typescript-support',
        '/guide/mobile'
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
      title: 'Migration Guide',
      collapsable: true,
      children: [
        '/guide/migration/introduction',
        '/guide/migration/array-refs',
        '/guide/migration/async-components',
        '/guide/migration/attribute-coercion',
        '/guide/migration/custom-directives',
        '/guide/migration/custom-elements-interop',
        '/guide/migration/data-option',
        '/guide/migration/events-api',
        '/guide/migration/filters',
        '/guide/migration/fragments',
        '/guide/migration/functional-components',
        '/guide/migration/global-api',
        '/guide/migration/global-api-treeshaking',
        '/guide/migration/inline-template-attribute',
        '/guide/migration/key-attribute',
        '/guide/migration/keycode-modifiers',
        '/guide/migration/props-default-this',
        '/guide/migration/render-function-api',
        '/guide/migration/slots-unification',
        '/guide/migration/transition',
        '/guide/migration/v-model',
        '/guide/migration/v-if-v-for',
        '/guide/migration/v-bind'
      ]
    },
    {
      title: 'Contribute to the Docs',
      collapsable: true,
      children: [
        '/guide/contributing/writing-guide',
        '/guide/contributing/doc-style-guide',
        '/guide/contributing/translations'
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

const sidebarRU = {
  cookbook: [{
    title: 'Книга рецептов',
    collapsable: false,
    children: ['/ru/cookbook/', '/ru/cookbook/editable-svg-icons']
  }],
  guide: [{
      title: 'Основы',
      collapsable: false,
      children: [
        '/ru/guide/installation',
        '/ru/guide/introduction',
        '/ru/guide/instance',
        '/ru/guide/template-syntax',
        '/ru/guide/computed',
        '/ru/guide/class-and-style',
        '/ru/guide/conditional',
        '/ru/guide/list',
        '/ru/guide/events',
        '/ru/guide/forms',
        '/ru/guide/component-basics'
      ]
    },
    {
      title: 'Продвинутые компоненты',
      collapsable: false,
      children: [
        '/ru/guide/component-registration',
        '/ru/guide/component-props',
        '/ru/guide/component-attrs',
        '/guide/component-custom-events',
        '/ru/guide/component-slots',
        '/ru/guide/component-provide-inject',
        '/ru/guide/component-dynamic-async',
        '/ru/guide/component-template-refs',
        '/ru/guide/component-edge-cases'
      ]
    },
    {
      title: 'Переходы и анимации',
      collapsable: false,
      children: [
        '/ru/guide/transitions-overview',
        '/ru/guide/transitions-enterleave',
        '/ru/guide/transitions-list',
        '/ru/guide/transitions-state'
      ]
    },
    {
      title: 'Переиспользование и композиция',
      collapsable: false,
      children: [
        '/ru/guide/mixins',
        '/ru/guide/custom-directive',
        '/ru/guide/teleport',
        '/ru/guide/render-function',
        '/ru/guide/plugins'
      ]
    },
    {
      title: 'Продвинутые руководства',
      collapsable: false,
      children: [{
          title: 'Reactivity',
          children: [
            '/ru/guide/reactivity',
            '/ru/guide/reactivity-fundamentals',
            '/ru/guide/reactivity-computed-watchers'
          ]
        },
        {
          title: 'Composition API',
          children: [
            '/ru/guide/composition-api-introduction',
            '/ru/guide/composition-api-setup',
            '/ru/guide/composition-api-lifecycle-hooks',
            '/ru/guide/composition-api-provide-inject',
            '/ru/guide/composition-api-template-refs'
          ]
        },
        '/ru/guide/optimizations',
        '/ru/guide/change-detection'
      ]
    },
    {
      title: 'Инструментарий',
      collapsable: false,
      children: [
        '/ru/guide/single-file-component',
        '/ru/guide/testing',
        '/ru/guide/typescript-support'
      ]
    },
    {
      title: 'Масштабирование',
      collapsable: false,
      children: ['/ru/guide/routing', '/ru/guide/state-management', '/ru/guide/ssr']
    },
    {
      title: 'Accessibility',
      collapsable: false,
      children: [
        '/ru/guide/a11y-basics',
        '/ru/guide/a11y-semantics',
        '/ru/guide/a11y-standards',
        '/ru/guide/a11y-resources'
      ]
    },
    {
      title: 'Миграция с Vue 2',
      collapsable: true,
      children: [
        '/ru/guide/migration/introduction',
        '/ru/guide/migration/async-components',
        '/ru/guide/migration/attribute-coercion',
        '/ru/guide/migration/custom-directives',
        '/ru/guide/migration/custom-elements-interop',
        '/ru/guide/migration/data-option',
        '/ru/guide/migration/events-api',
        '/ru/guide/migration/filters',
        '/ru/guide/migration/fragments',
        '/ru/guide/migration/functional-components',
        '/ru/guide/migration/global-api',
        '/ru/guide/migration/global-api-treeshaking',
        '/ru/guide/migration/inline-template-attribute',
        '/ru/guide/migration/key-attribute',
        '/ru/guide/migration/keycode-modifiers',
        '/ru/guide/migration/render-function-api',
        '/ru/guide/migration/slots-unification',
        '/ru/guide/migration/transition',
        '/ru/guide/migration/v-model'
      ]
    },
    {
      title: 'Внести вклад в документацию',
      collapsable: true,
      children: [
        '/ru/guide/contributing/doc-style-guide',
        '/ru/guide/contributing/translations'
      ]
    }
  ],
  api: [
    '/ru/api/application-config',
    '/ru/api/application-api',
    '/ru/api/global-api',
    {
      title: 'Опции',
      collapsable: false,
      children: [
        '/ru/api/options-data',
        '/ru/api/options-dom',
        '/ru/api/options-lifecycle-hooks',
        '/ru/api/options-assets',
        '/ru/api/options-composition',
        '/ru/api/options-misc'
      ]
    },
    '/ru/api/instance-properties',
    '/ru/api/instance-methods',
    '/ru/api/directives',
    '/ru/api/special-attributes',
    '/ru/api/built-in-components.md',
    {
      title: 'Reactivity API',
      collapsable: false,
      children: [
        '/ru/api/basic-reactivity',
        '/ru/api/refs-api',
        '/ru/api/computed-watch-api'
      ]
    },
    '/ru/api/composition-api'
  ],
  examples: [{
    title: 'Примеры',
    collapsable: false,
    children: [
      '/ru/examples/markdown',
      '/ru/examples/commits',
      '/ru/examples/grid-component',
      '/ru/examples/tree-view',
      '/ru/examples/svg',
      '/ru/examples/modal',
      '/ru/examples/elastic-header',
      '/ru/examples/select2',
      '/ru/examples/todomvc'
    ]
  }]
}

module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Vue.js',
      description: 'Vue.js - The Progressive JavaScript Framework',
    },
    '/ru/': {
      lang: 'ru',
      title: 'Vue.js',
      description: 'Vue.js - Прогрессивный JavaScript-фреймворк'
    },
  },
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
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.png'
      }
    ],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/images/icons/apple-icon-152x152.png'
      }
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/images/icons/ms-icon-144x144.png'
      }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    [
      ('script',
      {
        src: 'https://player.vimeo.com/api/player.js'
      })
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
    repo: 'vuejs/docs-next',
    editLinks: false,
    docsDir: 'src',
    sidebarDepth: 2,
    smoothScroll: false,
    algolia: {
      indexName: 'vuejs-v3',
      apiKey: 'bc6e8acb44ed4179c30d0a45d6140d3f'
    },
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this on GitHub!',
        lastUpdated: 'Last updated',
        nav: [{
          text: 'Docs',
          ariaLabel: 'Documentation Menu',
          items: [{
              text: 'Guide',
              link: '/guide/introduction'
            },
            {
              text: 'Migration Guide',
              link: '/guide/migration/introduction'
            },
            {
              text: 'Style Guide',
              link: '/style-guide/'
            },
            {
              text: 'Cookbook',
              link: '/cookbook/'
            },
            {
              text: 'Examples',
              link: '/examples/markdown'
            }
          ]
        },
        {
          text: 'API Reference',
          link: '/api/application-config'
        },
        {
          text: 'Ecosystem',
          items: [{
              text: 'Community',
              ariaLabel: 'Community Menu',
              items: [{
                  text: 'Team',
                  link: '/community/team/'
                },
                {
                  text: 'Partners',
                  link: '/community/partners'
                },
                {
                  text: 'Join',
                  link: '/community/join/'
                },
                {
                  text: 'Themes',
                  link: '/community/themes/'
                }
              ]
            },
            {
              text: 'Official Projects',
              items: [{
                  text: 'Vue Router',
                  link: 'https://next.router.vuejs.org/'
                },
                {
                  text: 'Vuex',
                  link: 'https://vuex.vuejs.org/'
                },
                {
                  text: 'Vue CLI',
                  link: 'https://cli.vuejs.org/'
                },
                {
                  text: 'Vue Test Utils',
                  link: 'https://vuejs.github.io/vue-test-utils-next-docs/guide/introduction.html'
                },
                {
                  text: 'Devtools',
                  link: 'https://github.com/vuejs/vue-devtools'
                },
                {
                  text: 'Weekly news',
                  link: 'https://news.vuejs.org/'
                }
              ]
            }
          ]
        },
        {
          text: 'Support Vue',
          link: '/support-vuejs/',
          items: [{
              text: 'One-time Donations',
              link: '/support-vuejs/#one-time-donations'
            },
            {
              text: 'Recurring Pledges',
              link: '/support-vuejs/#recurring-pledges'
            },
            {
              text: 'T-Shirt Shop',
              link: 'https://vue.threadless.com/'
            }
          ]
        }
        ],
        sidebar: {
          collapsable: false,
          '/guide/': sidebar.guide,
          '/community/': sidebar.guide,
          '/cookbook/': sidebar.cookbook,
          '/api/': sidebar.api,
          '/examples/': sidebar.examples
        },
      },
      '/ru/': {
        label: 'Русский',
        selectText: 'Переводы',
        editLinkText: 'Изменить эту страницу на GitHub',
        lastUpdated: 'Последнее обновление',
        nav: [{
          text: 'Документация',
          ariaLabel: 'Меню документации',
          items: [{
              text: 'Руководство',
              link: '/ru/guide/introduction'
            },
            {
              text: 'Руководство по миграции',
              link: '/ru/guide/migration/introduction'
            },
            {
              text: 'Рекомендации',
              link: '/ru/style-guide/'
            },
            {
              text: 'Книга рецептов',
              link: '/ru/cookbook/'
            },
            {
              text: 'Примеры',
              link: '/ru/examples/markdown'
            }
          ]
        },
        {
          text: 'Справочник API',
          link: '/ru/api/application-config'
        },
        {
          text: 'Экосистема',
          items: [{
              text: 'Сообщество',
              ariaLabel: 'Меню сообщества',
              items: [{
                  text: 'Команда',
                  link: '/ru/community/team/'
                },
                {
                  text: 'Партнёры',
                  link: '/ru/community/partners'
                },
                {
                  text: 'Join',
                  link: '/ru/community/join/'
                },
                {
                  text: 'Темы',
                  link: '/ru/community/themes/'
                }
              ]
            },
            {
              text: 'Официальные проекты',
              items: [{
                  text: 'Vue Router',
                  link: 'https://next.router.vuejs.org/'
                },
                {
                  text: 'Vuex',
                  link: 'https://vuex.vuejs.org/ru/'
                },
                {
                  text: 'Vue CLI',
                  link: 'https://cli.vuejs.org/ru/'
                },
                {
                  text: 'Vue Test Utils',
                  link: 'https://vuejs.github.io/vue-test-utils-next-docs/guide/introduction.html'
                },
                {
                  text: 'Devtools',
                  link: 'https://github.com/vuejs/vue-devtools'
                },
                {
                  text: 'Weekly news',
                  link: 'https://news.vuejs.org/'
                }
              ]
            }
          ]
        },
        {
          text: 'Поддержать Vue',
          link: '/ru/support-vuejs/',
          items: [{
              text: 'Единоразовые пожертвования',
              link: '/support-vuejs/#one-time-donations'
            },
            {
              text: 'Повторяющиеся взносы',
              link: '/support-vuejs/#recurring-pledges'
            },
            {
              text: 'Магазин футболок',
              link: 'https://vue.threadless.com/'
            }
          ]
        }
        ],
        sidebar: {
          collapsable: false,
          '/ru/guide/': sidebarRU.guide,
          '/ru/community/': sidebarRU.guide,
          '/ru/cookbook/': sidebarRU.cookbook,
          '/ru/api/': sidebarRU.api,
          '/ru/examples/': sidebarRU.examples
        },
      },
    }
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
