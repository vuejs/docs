const sidebar = {
  cookbook: [
    {
      title: 'Cookbook',
      collapsable: false,
      children: [
        '/cookbook/',
        '/cookbook/editable-svg-icons',
        '/cookbook/debugging-in-vscode'
      ]
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
        '/guide/data-methods',
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
        '/guide/mobile',
        '/guide/tooling/deployment'
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
    }
  ],
  api: [
    '/api/application-config',
    '/api/application-api',
    '/api/global-api',
    {
      title: 'Options',
      path: '/api/options-api',
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
      path: '/api/reactivity-api',
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
  ],
  migration: [
    '/guide/migration/introduction',
    {
      title: 'Details',
      collapsable: false,
      children: [
        '/guide/migration/array-refs',
        '/guide/migration/async-components',
        '/guide/migration/attribute-coercion',
        '/guide/migration/attrs-includes-class-style',
        '/guide/migration/children',
        '/guide/migration/custom-directives',
        '/guide/migration/custom-elements-interop',
        '/guide/migration/data-option',
        '/guide/migration/emits-option',
        '/guide/migration/events-api',
        '/guide/migration/filters',
        '/guide/migration/fragments',
        '/guide/migration/functional-components',
        '/guide/migration/global-api',
        '/guide/migration/global-api-treeshaking',
        '/guide/migration/inline-template-attribute',
        '/guide/migration/key-attribute',
        '/guide/migration/keycode-modifiers',
        '/guide/migration/listeners-removed',
        '/guide/migration/props-default-this',
        '/guide/migration/render-function-api',
        '/guide/migration/slots-unification',
        '/guide/migration/transition',
        '/guide/migration/transition-group',
        '/guide/migration/v-on-native-modifier-removed',
        '/guide/migration/v-model',
        '/guide/migration/v-if-v-for',
        '/guide/migration/v-bind',
        '/guide/migration/watch'
      ]
    }
  ],
  contributing: [
    {
      title: 'Contribute to the Docs',
      collapsable: false,
      children: [
        '/guide/contributing/writing-guide',
        '/guide/contributing/doc-style-guide',
        '/guide/contributing/translations'
      ]
    }
  ]
}

const sidebar_ko_KR = {
  cookbook: [
    {
      title: '쿡북',
      collapsable: false,
      children: [
        '/ko-KR/cookbook/',
        '/ko-KR/cookbook/editable-svg-icons',
        '/ko-KR/cookbook/debugging-in-vscode'
      ]
    }
  ],
  guide: [
    {
      title: '필수요소',
      collapsable: false,
      children: [
        '/ko-KR/guide/installation',
        '/ko-KR/guide/introduction',
        '/ko-KR/guide/instance',
        '/ko-KR/guide/template-syntax',
        '/ko-KR/guide/data-methods',
        '/ko-KR/guide/computed',
        '/ko-KR/guide/class-and-style',
        '/ko-KR/guide/conditional',
        '/ko-KR/guide/list',
        '/ko-KR/guide/events',
        '/ko-KR/guide/forms',
        '/ko-KR/guide/component-basics'
      ]
    },
    {
      title: '컴포넌트 톺아보기',
      collapsable: false,
      children: [
        '/ko-KR/guide/component-registration',
        '/ko-KR/guide/component-props',
        '/ko-KR/guide/component-attrs',
        '/ko-KR/guide/component-custom-events',
        '/ko-KR/guide/component-slots',
        '/ko-KR/guide/component-provide-inject',
        '/ko-KR/guide/component-dynamic-async',
        '/ko-KR/guide/component-template-refs',
        '/ko-KR/guide/component-edge-cases'
      ]
    },
    {
      title: '트랜지션 & 애니메이션',
      collapsable: false,
      children: [
        '/ko-KR/guide/transitions-overview',
        '/ko-KR/guide/transitions-enterleave',
        '/ko-KR/guide/transitions-list',
        '/ko-KR/guide/transitions-state'
      ]
    },
    {
      title: '재사용성 & 컴포지션',
      collapsable: false,
      children: [
        '/ko-KR/guide/mixins',
        '/ko-KR/guide/custom-directive',
        '/ko-KR/guide/teleport',
        '/ko-KR/guide/render-function',
        '/ko-KR/guide/plugins'
      ]
    },
    {
      title: '고급 가이드',
      collapsable: false,
      children: [
        {
          title: '반응성(Reactivity)',
          children: [
            '/ko-KR/guide/reactivity',
            '/ko-KR/guide/reactivity-fundamentals',
            '/ko-KR/guide/reactivity-computed-watchers'
          ]
        },
        {
          title: '컴포지션 API',
          children: [
            '/ko-KR/guide/composition-api-introduction',
            '/ko-KR/guide/composition-api-setup',
            '/ko-KR/guide/composition-api-lifecycle-hooks',
            '/ko-KR/guide/composition-api-provide-inject',
            '/ko-KR/guide/composition-api-template-refs'
          ]
        },
        '/ko-KR/guide/optimizations',
        '/ko-KR/guide/change-detection'
      ]
    },
    {
      title: '도구',
      collapsable: false,
      children: [
        '/ko-KR/guide/single-file-component',
        '/ko-KR/guide/testing',
        '/ko-KR/guide/typescript-support',
        '/ko-KR/guide/mobile',
        '/ko-KR/guide/tooling/deployment'
      ]
    },
    {
      title: '스케일 업',
      collapsable: false,
      children: ['/ko-KR/guide/routing', '/ko-KR/guide/state-management', '/ko-KR/guide/ssr']
    },
    {
      title: '접근성',
      collapsable: false,
      children: [
        '/ko-KR/guide/a11y-basics',
        '/ko-KR/guide/a11y-semantics',
        '/ko-KR/guide/a11y-standards',
        '/ko-KR/guide/a11y-resources'
      ]
    }
  ],
  api: [
    '/ko-KR/api/application-config',
    '/ko-KR/api/application-api',
    '/ko-KR/api/global-api',
    {
      title: '옵션',
      path: '/ko-KR/api/options-api',
      collapsable: false,
      children: [
        '/ko-KR/api/options-data',
        '/ko-KR/api/options-dom',
        '/ko-KR/api/options-lifecycle-hooks',
        '/ko-KR/api/options-assets',
        '/ko-KR/api/options-composition',
        '/ko-KR/api/options-misc'
      ]
    },
    '/ko-KR/api/instance-properties',
    '/ko-KR/api/instance-methods',
    '/ko-KR/api/directives',
    '/ko-KR/api/special-attributes',
    '/ko-KR/api/built-in-components.md',
    {
      title: 'Reactivity API',
      path: '/ko-KR/api/reactivity-api',
      collapsable: false,
      children: [
        '/ko-KR/api/basic-reactivity',
        '/ko-KR/api/refs-api',
        '/ko-KR/api/computed-watch-api'
      ]
    },
    '/ko-KR/api/composition-api'
  ],
  examples: [
    {
      title: '예제',
      collapsable: false,
      children: [
        '/ko-KR/examples/markdown',
        '/ko-KR/examples/commits',
        '/ko-KR/examples/grid-component',
        '/ko-KR/examples/tree-view',
        '/ko-KR/examples/svg',
        '/ko-KR/examples/modal',
        '/ko-KR/examples/elastic-header',
        '/ko-KR/examples/select2',
        '/ko-KR/examples/todomvc'
      ]
    }
  ],
  migration: [
    '/ko-KR/guide/migration/introduction',
    {
      title: '상세',
      collapsable: false,
      children: [
        '/ko-KR/guide/migration/array-refs',
        '/ko-KR/guide/migration/async-components',
        '/ko-KR/guide/migration/attribute-coercion',
        '/ko-KR/guide/migration/attrs-includes-class-style',
        '/ko-KR/guide/migration/children',
        '/ko-KR/guide/migration/custom-directives',
        '/ko-KR/guide/migration/custom-elements-interop',
        '/ko-KR/guide/migration/data-option',
        '/ko-KR/guide/migration/emits-option',
        '/ko-KR/guide/migration/events-api',
        '/ko-KR/guide/migration/filters',
        '/ko-KR/guide/migration/fragments',
        '/ko-KR/guide/migration/functional-components',
        '/ko-KR/guide/migration/global-api',
        '/ko-KR/guide/migration/global-api-treeshaking',
        '/ko-KR/guide/migration/inline-template-attribute',
        '/ko-KR/guide/migration/key-attribute',
        '/ko-KR/guide/migration/keycode-modifiers',
        '/ko-KR/guide/migration/listeners-removed',
        '/ko-KR/guide/migration/props-default-this',
        '/ko-KR/guide/migration/render-function-api',
        '/ko-KR/guide/migration/slots-unification',
        '/ko-KR/guide/migration/transition',
        '/ko-KR/guide/migration/transition-group',
        '/ko-KR/guide/migration/v-on-native-modifier-removed',
        '/ko-KR/guide/migration/v-model',
        '/ko-KR/guide/migration/v-if-v-for',
        '/ko-KR/guide/migration/v-bind',
        '/ko-KR/guide/migration/watch'
      ]
    }
  ],
  contributing: [
    {
      title: '문서에 기여하기',
      collapsable: false,
      children: [
        '/ko-KR/guide/contributing/writing-guide',
        '/ko-KR/guide/contributing/doc-style-guide',
        '/ko-KR/guide/contributing/translations'
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
    locales: {
      '/': {
        label: 'English',
        nav: [
          {
            text: 'Docs',
            ariaLabel: 'Documentation Menu',
            items: [
              {
                text: 'Guide',
                link: '/guide/introduction'
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
              },
              {
                text: 'Contribute',
                link: '/guide/contributing/writing-guide'
              },
              {
                text: 'Migration from Vue 2',
                link: '/guide/migration/introduction'
              }
            ]
          },
          {
            text: 'API Reference',
            link: '/api/'
          },
          {
            text: 'Ecosystem',
            items: [
              {
                text: 'Community',
                ariaLabel: 'Community Menu',
                items: [
                  {
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
                items: [
                  {
                    text: 'Vue Router',
                    link: 'https://next.router.vuejs.org/'
                  },
                  {
                    text: 'Vuex',
                    link: 'https://next.vuex.vuejs.org/'
                  },
                  {
                    text: 'Vue CLI',
                    link: 'https://cli.vuejs.org/'
                  },
                  {
                    text: 'Vue Test Utils',
                    link:
                      'https://vuejs.github.io/vue-test-utils-next-docs/guide/introduction.html'
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
            items: [
              {
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
        repo: 'vuejs/docs-next',
        editLinks: false,
        editLinkText: 'Edit this on GitHub!',
        lastUpdated: 'Last updated',
        docsDir: 'src',
        sidebarDepth: 2,
        sidebar: {
          collapsable: false,
          '/guide/migration/': sidebar.migration,
          '/guide/contributing/': sidebar.contributing,
          '/guide/': sidebar.guide,
          '/community/': sidebar.guide,
          '/cookbook/': sidebar.cookbook,
          '/api/': sidebar.api,
          '/examples/': sidebar.examples
        },
        smoothScroll: false,
        algolia: {
          indexName: 'vuejs-v3',
          appId: 'BH4D9OD16A',
          apiKey: 'bc6e8acb44ed4179c30d0a45d6140d3f'
        },
        carbonAds: {
          carbon: 'CEBDT27Y',
          custom: 'CKYD62QM',
          placement: 'vuejsorg'
        }
      },
      '/ko-KR/': {
        label: '한국어',
        selectText: '다른 언어로 보기',
        nav: [
          {
            text: '배우기',
            ariaLabel: '문서 메뉴',
            items: [
              {
                text: '가이드',
                link: '/ko-KR/guide/introduction'
              },
              {
                text: '스타일 가이드',
                link: '/ko-KR/style-guide/'
              },
              {
                text: '쿡북',
                link: '/ko-KR/cookbook/'
              },
              {
                text: '예제',
                link: '/ko-KR/examples/markdown'
              },
              {
                text: '기여하기',
                link: '/ko-KR/guide/contributing/writing-guide'
              },
              {
                text: 'Vue 2에서 이전',
                link: '/ko-KR/guide/migration/introduction'
              }
            ]
          },
          {
            text: 'API 문서',
            link: '/ko-KR/api/'
          },
          {
            text: '생태계',
            items: [
              {
                text: '커뮤니티',
                ariaLabel: '커뮤니티 메뉴',
                items: [
                  {
                    text: '팀',
                    link: '/ko-KR/community/team/'
                  },
                  {
                    text: '파트너',
                    link: '/ko-KR/community/partners'
                  },
                  {
                    text: '같이하기',
                    link: '/ko-KR/community/join/'
                  },
                  {
                    text: '테마',
                    link: '/ko-KR/community/themes/'
                  }
                ]
              },
              {
                text: '공식 프로젝트',
                items: [
                  {
                    text: 'Vue Router',
                    link: 'https://next.router.vuejs.org/'
                  },
                  {
                    text: 'Vuex',
                    link: 'https://next.vuex.vuejs.org/'
                  },
                  {
                    text: 'Vue CLI',
                    link: 'https://cli.vuejs.org/'
                  },
                  {
                    text: 'Vue Test Utils',
                    link:
                      'https://vuejs.github.io/vue-test-utils-next-docs/guide/introduction.html'
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
            text: 'Vue 후원하기',
            link: '/ko-KR/support-vuejs/',
            items: [
              {
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
        repo: 'narusas/docs-next',
        editLinks: false,
        editLinkText: 'Edit this on GitHub!',
        lastUpdated: 'Last updated',
        docsDir: 'src',
        sidebarDepth: 2,
        sidebar: {
          collapsable: false,
          '/ko-KR/guide/migration/': sidebar_ko_KR.migration,
          '/ko-KR/guide/contributing/': sidebar_ko_KR.contributing,
          '/ko-KR/guide/': sidebar_ko_KR.guide,
          '/ko-KR/community/': sidebar_ko_KR.guide,
          '/ko-KR/cookbook/': sidebar_ko_KR.cookbook,
          '/ko-KR/api/': sidebar_ko_KR.api,
          '/ko-KR/examples/': sidebar_ko_KR.examples
        },
        smoothScroll: false,
        algolia: {
          indexName: 'vuejs-v3',
          appId: 'BH4D9OD16A',
          apiKey: 'bc6e8acb44ed4179c30d0a45d6140d3f'
        },
        carbonAds: {
          carbon: 'CEBDT27Y',
          custom: 'CKYD62QM',
          placement: 'vuejsorg'
        }
      },

    },


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
  },
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'Vue.js',
      description: 'Vue-powered Static Site Generator'
    },
    '/ko-KR/': {
      lang: 'ko-KR',
      title: 'Vue.js',
      description: '프로그레시브 JavaScript 프레임워크'
    }
  }
}
