const fs = require('fs')
const path = require('path')
const getBaseConfig = require('@vue/theme/config')

module.exports = (async () => {
  const baseConfig = await getBaseConfig()

  // inject api preference initialization code
  baseConfig.head.push([
    'script',
    {},
    fs.readFileSync(path.resolve(__dirname, './apiPreference.js'), 'utf-8')
  ])

  return {
    ...baseConfig,

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
        { icon: 'languages', link: '/translations/' },
        { icon: 'github', link: 'https://github.com/vuejs/' },
        { icon: 'twitter', link: 'https://twitter.com/vuejs' },
        { icon: 'discord', link: 'https://discord.com/invite/HBherRA' }
      ],

      nav: [
        {
          text: 'Learn',
          activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
          items: [
            {
              items: [
                { text: 'Guide', link: '/guide/introduction' },
                { text: 'Tutorial', link: '/tutorial/' },
                { text: 'Examples', link: '/examples/' },
                { text: 'Style Guide', link: '/style-guide/' }
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
          activeMatch: `^/ecosystem/`,
          items: [
            {
              text: 'Resources',
              items: [
                {
                  text: 'Official Projects',
                  link: 'https://github.com/vuejs/'
                },
                { text: 'Partners', link: '/ecosystem/partners' },
                { text: 'Themes', link: '/ecosystem/themes' },
                { text: 'Jobs', link: 'https://vuejobs.com/?ref=vuejs' },
                {
                  text: 'Awesome Vue',
                  link: 'https://github.com/vuejs/awesome-vue'
                }
              ]
            },
            {
              text: 'Help',
              items: [
                { text: 'Chat', link: 'https://discord.com/invite/HBherRA' },
                { text: 'Forum', link: 'https://forum.vuejs.org/' },
                { text: 'DEV Community', link: 'https://dev.to/t/vue' }
              ]
            },
            {
              text: 'News',
              items: [
                { text: 'Blog', link: 'https://blog.vuejs.org/' },
                { text: 'Twitter', link: 'https://twitter.com/vuejs' },
                { text: 'Newsletter', link: 'https://news.vuejs.org/' },
                { text: 'Events', link: 'https://events.vuejs.org/' }
              ]
            }
          ]
        },
        {
          text: 'About',
          activeMatch: `^/about/`,
          items: [
            {
              items: [
                { text: 'FAQ', link: '/about/faq' },
                { text: 'Team', link: '/about/team' },
                { text: 'Releases', link: '/about/releases' },
                {
                  text: 'Contribution Guide',
                  link: '/about/contribution-guide'
                },
                { text: 'Code of Conduct', link: '/about/coc' }
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
                text: 'Quick Start',
                link: '/guide/quick-start'
              }
            ]
          },
          {
            text: 'Essentials',
            items: [
              {
                text: 'Creating an Application',
                link: '/guide/application'
              },
              {
                text: 'Template Syntax',
                link: '/guide/template-syntax'
              },
              {
                text: 'State and Reactivity',
                link: '/guide/state-and-reactivity'
              },
              { text: 'Computed Properties', link: '/guide/computed' },
              { text: 'Watchers and Effects', link: '/guide/watchers' },
              {
                text: 'Class and Style Bindings',
                link: '/guide/class-and-style'
              },
              { text: 'Conditional Rendering', link: '/guide/conditional' },
              { text: 'List Rendering', link: '/guide/list' },
              { text: 'Event Handling', link: '/guide/events' },
              { text: 'Form Input Bindings', link: '/guide/forms' },
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
                text: 'Composables',
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
              { text: 'KeepAlive', link: '/guide/keep-alive' },
              { text: 'Teleport', link: '/guide/teleport' },
              { text: 'Suspense', link: '/guide/suspense' }
            ]
          },
          {
            text: 'Scaling Up',
            items: [
              { text: 'TypeScript', link: '/guide/typescript' },
              { text: 'Routing', link: '/guide/routing' },
              { text: 'State Management', link: '/guide/state-management' },
              { text: 'Testing', link: '/guide/testing' },
              {
                text: 'Performance Optimization',
                link: '/guide/performance-optimization'
              },
              {
                text: 'Production Deployment',
                link: '/guide/production-deployment'
              }
            ]
          },
          {
            text: 'Advanced Topics',
            items: [
              { text: 'The Big Picture', link: '/guide/the-big-picture' },
              {
                text: 'Reactivity in Depth',
                link: '/guide/reactivity-in-depth'
              },
              {
                text: 'Rendering Mechanism',
                link: '/guide/rendering-mechanism'
              },
              {
                text: 'Render Functions & JSX',
                link: '/guide/render-fn-and-jsx'
              },
              { text: 'Server-Side Rendering', link: '/guide/ssr' },
              { text: 'Custom Renderers', link: '/guide/custom-renderer' },
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
              {
                text: 'General',
                link: '/api/general'
              }
            ]
          },
          {
            text: 'Options API',
            items: [
              { text: 'Options: State', link: '/api/options-state' },
              { text: 'Options: Rendering', link: '/api/options-rendering' },
              {
                text: 'Options: Lifecycle',
                link: '/api/options-lifecycle'
              },
              {
                text: 'Options: Composition',
                link: '/api/options-composition'
              },
              { text: 'Options: Misc', link: '/api/options-misc' },
              {
                text: 'Component Instance',
                link: '/api/component-instance'
              }
            ]
          },
          {
            text: 'Composition API',
            items: [
              { text: 'setup()', link: '/api/composition-api-setup' },
              {
                text: 'Reactivity: Core',
                link: '/api/reactivity-core'
              },
              {
                text: 'Reactivity: Advanced',
                link: '/api/reactivity-advanced'
              },
              {
                text: 'Reactivity: Utilities',
                link: '/api/reactivity-utilities'
              },
              {
                text: 'Lifecycle Hooks',
                link: '/api/composition-api-lifecycle'
              },
              {
                text: 'Dependency Injection',
                link: '/api/composition-api-dependency-injection'
              }
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
              { text: 'Overview', link: '/api/sfc-overview' },
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
  }
})()
