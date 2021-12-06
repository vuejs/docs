// @ts-check
const fs = require('fs')
const path = require('path')
const { genApiIndex } = require('../../scripts/genApiIndex')
const { genExamplesData } = require('../../scripts/genExamplesData')
const { headerPlugin } = require('./header')

const nav = [
  {
    text: 'Docs',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      {
        items: [
          { text: 'Guide', link: '/guide/introduction' },
          { text: 'Tutorial', link: '/tutorial/' },
          { text: 'Examples', link: '/examples/' },
          { text: 'Quick Start', link: '/guide/quick-start' },
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
          { text: 'Partners', link: '/ecosystem/partners' },
          { text: 'Themes', link: '/ecosystem/themes' },
          { text: 'Video Courses', link: '/ecosystem/video-courses' },
          { text: 'Jobs', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: 'T-Shirt Shop', link: 'https://vue.threadless.com/' }
          // TODO should start a separate branch for Vue 3?
          // {
          //   text: 'Awesome Vue',
          //   link: 'https://github.com/vuejs/awesome-vue'
          // }
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
]

const sidebar = {
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
          link: '/guide/essentials/application'
        },
        {
          text: 'Template Syntax',
          link: '/guide/essentials/template-syntax'
        },
        {
          text: 'Reactivity Fundamentals',
          link: '/guide/essentials/reactivity-fundamentals'
        },
        { text: 'Computed Properties', link: '/guide/essentials/computed' },
        {
          text: 'Class and Style Bindings',
          link: '/guide/essentials/class-and-style'
        },
        {
          text: 'Conditional Rendering',
          link: '/guide/essentials/conditional'
        },
        { text: 'List Rendering', link: '/guide/essentials/list' },
        { text: 'Event Handling', link: '/guide/essentials/event-handling' },
        { text: 'Form Input Bindings', link: '/guide/essentials/forms' },
        {
          text: 'Lifecycle Hooks',
          link: '/guide/essentials/lifecycle'
        },
        { text: 'Watchers', link: '/guide/essentials/watchers' },
        { text: 'Template Refs', link: '/guide/essentials/template-refs' },
        {
          text: 'Components Basics',
          link: '/guide/essentials/component-basics'
        }
      ]
    },
    {
      text: 'Components In-Depth',
      items: [
        {
          text: 'Registration',
          link: '/guide/components/registration'
        },
        { text: 'Props', link: '/guide/components/props' },
        { text: 'Fallthrough Attributes', link: '/guide/components/attrs' },
        { text: 'Events', link: '/guide/components/events' },
        { text: 'Slots', link: '/guide/components/slots' },
        {
          text: 'Provide / inject',
          link: '/guide/components/provide-inject'
        },
        {
          text: 'Async Components',
          link: '/guide/components/async'
        }
      ]
    },
    {
      text: 'Reusability',
      items: [
        {
          text: 'Composables',
          link: '/guide/reusability/composables'
        },
        {
          text: 'Custom Directives',
          link: '/guide/reusability/custom-directives'
        },
        { text: 'Plugins', link: '/guide/reusability/plugins' }
      ]
    },
    {
      text: 'Built-in Components',
      items: [
        { text: 'Transition', link: '/guide/built-ins/transition' },
        { text: 'TransitionGroup', link: '/guide/built-ins/transition-group' },
        { text: 'KeepAlive', link: '/guide/built-ins/keep-alive' },
        { text: 'Teleport', link: '/guide/built-ins/teleport' },
        { text: 'Suspense', link: '/guide/built-ins/suspense' }
      ]
    },
    {
      text: 'Scaling Up',
      items: [
        { text: 'Single-File Components', link: '/guide/scaling-up/sfc' },
        { text: 'Tooling', link: '/guide/scaling-up/tooling' },
        { text: 'Routing', link: '/guide/scaling-up/routing' },
        {
          text: 'State Management',
          link: '/guide/scaling-up/state-management'
        },
        { text: 'Testing', link: '/guide/scaling-up/testing' },
        { text: 'TypeScript', link: '/guide/scaling-up/typescript' }
      ]
    },
    {
      text: 'Best Practices',
      items: [
        {
          text: 'Production Deployment',
          link: '/guide/best-practices/production-deployment'
        },
        {
          text: 'Performance',
          link: '/guide/best-practices/performance'
        },
        {
          text: 'Security',
          link: '/guide/best-practices/security'
        },
        {
          text: 'Accessibility',
          link: '/guide/best-practices/accessibility'
        }
      ]
    },
    {
      text: 'Advanced Topics',
      items: [
        {
          text: 'Ways of Using Vue',
          link: '/guide/advanced/ways-of-using-vue'
        },
        {
          text: 'Reactivity in Depth',
          link: '/guide/advanced/reactivity-in-depth'
        },
        {
          text: 'Rendering Mechanism',
          link: '/guide/advanced/rendering-mechanism'
        },
        {
          text: 'Render Functions & JSX',
          link: '/guide/advanced/render-function'
        },
        {
          text: 'Server-Side Rendering',
          link: '/guide/advanced/server-side-rendering'
        },
        { text: 'Custom Renderers', link: '/guide/advanced/custom-renderer' },
        {
          text: 'Web Components',
          link: '/guide/advanced/web-components'
        },
        {
          text: 'Building a Library for Vue',
          link: '/guide/advanced/building-a-library'
        },
        {
          text: 'Advanced Animations',
          link: '/guide/advanced/animation'
        }
        // {
        //   text: 'Vue for React Devs',
        //   link: '/guide/advanced/vue-for-react-devs'
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
      text: 'Built-ins',
      items: [
        { text: 'Directives', link: '/api/built-in-directives' },
        { text: 'Components', link: '/api/built-in-components' },
        { text: 'Special Elements', link: '/api/built-in-special-elements' },
        {
          text: 'Special Attributes',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'Single File Component',
      items: [
        { text: 'Syntax Specification', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: '<style> Features', link: '/api/sfc-style' }
      ]
    },
    {
      text: 'Advanced APIs',
      items: [
        { text: 'Render Function', link: '/api/render-function' },
        { text: 'Server-Side Rendering', link: '/api/ssr' },
        { text: 'TypeScript Utility Types', link: '/api/utility-types' },
        { text: 'Custom Renderer', link: '/api/custom-renderer' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'Basic',
      items: [
        {
          text: 'Hello World',
          link: '/examples/#hello-world'
        },
        {
          text: 'Handling User Input',
          link: '/examples/#handling-input'
        },
        {
          text: 'Attribute Bindings',
          link: '/examples/#attribute-bindings'
        },
        {
          text: 'Conditionals and Loops',
          link: '/examples/#conditionals-and-loops'
        },
        {
          text: 'Form Bindings',
          link: '/examples/#form-bindings'
        },
        {
          text: 'Simple Component',
          link: '/examples/#simple-component'
        }
      ]
    },
    {
      text: 'Practical',
      items: [
        {
          text: 'Markdown Editor',
          link: '/examples/#markdown'
        },
        {
          text: 'Fetching Data',
          link: '/examples/#fetching-data'
        },
        {
          text: 'Grid with Sort and Filter',
          link: '/examples/#grid'
        },
        {
          text: 'Tree View',
          link: '/examples/#tree'
        },
        {
          text: 'SVG Graph',
          link: '/examples/#svg'
        },
        {
          text: 'Modal with Transitions',
          link: '/examples/#modal'
        },
        {
          text: 'List with Transitions',
          link: '/examples/#list-transition'
        },
        {
          text: 'TodoMVC',
          link: '/examples/#todomvc'
        }
      ]
    },
    {
      // https://eugenkiss.github.io/7guis/
      text: '7 GUIs',
      items: [
        {
          text: 'Counter',
          link: '/examples/#counter'
        },
        {
          text: 'Temperature Converter',
          link: '/examples/#temperature-converter'
        },
        {
          text: 'Flight Booker',
          link: '/examples/#flight-booker'
        },
        {
          text: 'Timer',
          link: '/examples/#timer'
        },
        {
          text: 'CRUD',
          link: '/examples/#crud'
        },
        {
          text: 'Circle Drawer',
          link: '/examples/#circle-drawer'
        },
        {
          text: 'Cells',
          link: '/examples/#cells'
        }
      ]
    }
  ],
  '/tutorial/': [
    {
      text: 'Tutorial',
      items: [
        {
          text: '1. Hello World',
          link: '/tutorial/#step-1'
        },
        {
          text: '2. Render a List',
          link: '/tutorial/#step-2'
        }
      ]
    }
  ]
}

genApiIndex(sidebar['/api/'])
genExamplesData()

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  // @ts-ignore
  extends: require('@vue/theme/config'),
  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      exclude: ['@vue/repl']
    },
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  },

  lang: 'en-US',
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',

  head: [
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ]
  ],

  markdown: {
    config(md) {
      md.use(headerPlugin)
    }
  },

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

    nav,
    sidebar,

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: 'Copyright © 2014-2021 Evan You'
    }
  }
}
