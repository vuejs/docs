const base = require('@vue/theme/config')

module.exports = (async () => ({
  ...(await base()),

  lang: 'en-US',
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',

  themeConfig: {
    logo: '/logo.svg',
    repo: 'vuejs/docs',

    algolia: {
      indexName: 'vuejs-v3',
      appId: 'BH4D9OD16A',
      apiKey: 'bc6e8acb44ed4179c30d0a45d6140d3f'
    },

    carbonAds: {
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vue' },
      { icon: 'twitter', link: 'https://twitter.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/HBherRA' }
    ],

    nav: [
      {
        text: 'Docs',
        activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
        items: [
          {
            items: [
              { text: 'Guide', link: '/guide/introduction' },
              { text: 'Tutorial', link: '/tutorial/' },
              { text: 'Examples', link: '/examples/' },
              { text: 'Style Guide', link: '/style-guide/' },
              {
                text: 'Migration from Vue 2',
                link: '/guide/migration/introduction'
              }
            ]
          }
        ]
      },
      {
        text: 'API',
        activeMatch: `^/api/`,
        link: '/api/'
      },
      {
        text: 'Playground',
        link: 'https://sfc.vuejs.org'
      },
      {
        text: 'Ecosystem',
        items: [
          {
            text: 'Resources',
            items: [
              { text: 'Partners', link: '/community/partners/' },
              { text: 'Themes', link: '/community/themes/' },
              { text: 'Jobs', link: 'https://vuejobs.com/?ref=vuejs' },
              {
                text: 'Awesome Vue',
                link: 'https://github.com/vuejs/awesome-vue'
              }
            ]
          },
          {
            text: 'Official Projects',
            items: [
              { text: 'Vue Router', link: 'https://next.router.vuejs.org/' },
              { text: 'Vuex', link: 'https://next.vuex.vuejs.org/' },
              { text: 'Vue CLI', link: 'https://cli.vuejs.org/' },
              {
                text: 'Vue Test Utils',
                link: 'https://next.vue-test-utils.vuejs.org/v2/guide/introduction.html'
              },
              {
                text: 'Devtools',
                link: 'https://devtools.vuejs.org'
              }
            ]
          }
        ]
      },
      {
        text: 'Community',
        activeMatch: `^/community/`,
        items: [
          {
            items: [
              { text: 'Team', link: '/community/team' },
              {
                text: 'Contribution Guide',
                link: '/community/contribution-guide'
              }
            ]
          },
          {
            text: 'News',
            items: [
              { text: 'Twitter', link: 'https://twitter.com/vuejs' },
              { text: 'Newsletter', link: 'https://news.vuejs.org/' },
              { text: 'Blog', link: 'https://blog.vuejs.org/' },
              { text: 'Events', link: 'https://events.vuejs.org/' }
            ]
          },
          {
            text: 'Help',
            items: [
              { text: 'Forum', link: 'https://forum.vuejs.org/' },
              { text: 'Chat', link: 'https://discord.com/invite/HBherRA' },
              { text: 'DEV Community', link: 'https://dev.to/t/vue' }
            ]
          }
        ]
      },
      {
        text: 'Sponsor',
        link: '/sponsor/'
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            {
              text: 'Development Setup',
              link: '/guide/dev-setup'
            }
          ]
        },
        {
          text: 'Essentials',
          items: [
            {
              text: 'Creating an Application',
              link: '/guide/creating-a-vue-application'
            },
            {
              text: 'Template Syntax Overview',
              link: '/guide/template-syntax'
            },
            {
              text: 'State and Reactivity',
              link: '/guide/data-methods'
            },
            {
              text: 'Class and Style Bindings',
              link: '/guide/class-and-style'
            },
            { text: 'Conditional Rendering', link: '/guide/conditional' },
            { text: 'List Rendering', link: '/guide/list' },
            { text: 'Event Handling', link: '/guide/events' },
            { text: 'Form Input Bindings', link: '/guide/forms' },
            { text: 'Computed Properties', link: '/guide/computed' },
            { text: 'Watchers', link: '/guide/watchers' },
            { text: 'Components Basics', link: '/guide/component-basics' },
            { text: 'Template Refs', link: '/guide/template-refs' }
          ]
        },
        {
          text: 'Components In-Depth',
          items: [
            {
              text: 'Registration',
              link: '/guide/component-registration'
            },
            {
              text: 'Lifecycle',
              link: '/guide/component-lifecycle'
            },
            { text: 'Props', link: '/guide/component-props' },
            { text: 'Non-Prop Attributes', link: '/guide/component-attrs' },
            { text: 'Custom Events', link: '/guide/component-custom-events' },
            { text: 'Slots', link: '/guide/component-slots' },
            {
              text: 'Provide / inject',
              link: '/guide/component-provide-inject'
            },
            {
              text: 'Dynamic Components',
              link: '/guide/component-dynamic'
            },
            {
              text: 'Async Components',
              link: '/guide/component-async'
            }
          ]
        },
        {
          text: 'Reusability',
          items: [
            {
              text: 'Composable Functions',
              link: '/guide/composables'
            },
            { text: 'Custom Directives', link: '/guide/custom-directive' },
            { text: 'Plugins', link: '/guide/plugins' }
          ]
        },
        {
          text: 'Built-in Components',
          items: [
            { text: 'Transition', link: '/guide/transition' },
            { text: 'TransitionGroup', link: '/guide/transition-group' },
            { text: 'Teleport', link: '/guide/teleport' },
            { text: 'Suspense', link: '/guide/suspense' },
            { text: 'KeepAlive', link: '/guide/keep-alive' }
          ]
        },
        {
          text: 'Scaling Up',
          items: [
            {
              text: 'Single File Components',
              link: '/guide/single-file-component'
            },
            { text: 'TypeScript', link: '/guide/typescript' },
            { text: 'Routing', link: '/guide/routing' },
            { text: 'State Management', link: '/guide/state-management' },
            { text: 'Testing', link: '/guide/testing' },
            {
              text: 'Optimizing Performance',
              link: '/guide/optimizing-performance'
            }
          ]
        },
        {
          text: 'Advanced Topics',
          items: [
            { text: 'Reactivity in Depth', link: '/guide/reactivity' },
            { text: 'Rendering Mechanism', link: '/guide/rendering-mechanism' },
            {
              text: 'Render Functions & JSX',
              link: '/guide/render-fn-and-jsx'
            },
            { text: 'Server-Side Rendering', link: '/guide/ssr' },
            {
              text: 'Security',
              link: '/guide/security'
            },
            {
              text: 'Accessibility',
              link: '/guide/a11y'
            },
            {
              text: 'Web Components',
              link: '/guide/web-components'
            },
            {
              text: 'Building a Library for Vue',
              link: '/guide/building-a-library'
            },
            {
              text: 'Advanced Animations',
              link: '/guide/animation'
            }
            // {
            //   text: 'Vue for React Devs',
            //   link: '/guide/vue-for-react-devs'
            // }
          ]
        }
      ],
      '/api/': [
        {
          text: 'Global API',
          items: [
            { text: 'Application', link: '/api/application' },
            { text: 'Utilities', link: '/api/utilities' }
          ]
        },
        {
          text: 'Component',
          items: [
            { text: 'Options: State', link: '/api/options-state' },
            { text: 'Options: Rendering', link: '/api/options-rendering' },
            {
              text: 'Options: Lifecycle Hooks',
              link: '/api/options-lifecycle'
            },
            { text: 'Options: Composition', link: '/api/options-composition' },
            { text: 'Options: Misc', link: '/api/options-misc' },
            {
              text: 'Instance',
              link: '/api/component-instance'
            }
          ]
        },
        {
          text: 'Composition API',
          items: [
            { text: 'setup()', link: '/api/composition-setup' },
            { text: 'Reactivity', link: '/api/composition-reactivity' },
            { text: 'Lifecycle Hooks', link: '/api/composition-lifecycle' }
          ]
        },
        {
          text: 'Built-ins',
          items: [
            { text: 'Directives', link: '/api/built-in-directives' },
            { text: 'Components', link: '/api/built-in-components' },
            {
              text: 'Special Attributes',
              link: '/api/built-in-special-attributes'
            }
          ]
        },
        {
          text: 'Single File Component',
          items: [
            { text: 'Specification', link: '/api/sfc-spec' },
            { text: 'Tooling', link: '/api/sfc-tooling' },
            { text: '<script setup>', link: '/api/sfc-script-setup' },
            { text: '<style> Features', link: '/api/sfc-style' }
          ]
        },
        {
          text: 'Advanced APIs',
          items: [
            { text: 'Render Function', link: '/api/render-function' },
            { text: 'TypeScript Utility Types', link: '/api/utility-types' },
            { text: 'Server-Side Rendering', link: '/api/ssr' },
            { text: 'Compiler Options', link: '/api/compiler' },
            { text: 'Custom Renderer', link: '/api/custom-renderer' }
          ]
        }
      ]
    }
  }
}))()
