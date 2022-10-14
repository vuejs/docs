import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
import { jobsPlugin } from './jobsMdPlugin'

const nav = [
  {
    text: 'Dokumentacja',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      { text: 'Przewodnik', link: '/guide/introduction' },
      { text: 'Samouczek', link: '/tutorial/' },
      { text: 'Przykłady', link: '/examples/' },
      { text: 'Szybki start', link: '/guide/quick-start' },
      // { text: 'Przewodnik po stylach', link: '/style-guide/' },
      {
        text: 'Vue 2 Dokumentacja',
        link: 'https://v2.vuejs.org'
      },
      {
        text: 'Migracja z Vue 2',
        link: 'https://v3-migration.vuejs.org/'
      }
    ]
  },
  {
    text: 'API',
    activeMatch: `^/api/`,
    link: '/api/'
  },
  {
    text: 'Piaskownica',
    link: 'https://sfc.vuejs.org'
  },
  {
    text: 'Ekosystem',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Zasoby',
        items: [
          { text: 'Partnerzy', link: '/partners/' },
          { text: 'Motywy', link: '/ecosystem/themes' },
          { text: 'Praca', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: 'T-Shirt Shop', link: 'https://vue.threadless.com/' }
        ]
      },
      {
        text: 'Oficjalne biblioteki',
        items: [
          { text: 'Vue Router', link: 'https://router.vuejs.org/' },
          { text: 'Pinia', link: 'https://pinia.vuejs.org/' },
          { text: 'Tooling Guide', link: '/guide/scaling-up/tooling.html' }
        ]
      },
      {
        text: 'Kursy wideo',
        items: [
          {
            text: 'Vue Mastery',
            link: 'https://www.vuemastery.com/courses/'
          },
          {
            text: 'Vue School',
            link: 'https://vueschool.io/?friend=vuejs&utm_source=Vuejs.org&utm_medium=Link&utm_content=Navbar%20Dropdown'
          }
        ]
      },
      {
        text: 'Pomoc',
        items: [
          {
            text: 'Discord Chat',
            link: 'https://discord.com/invite/HBherRA'
          },
          {
            text: 'GitHub Discussions',
            link: 'https://github.com/vuejs/core/discussions'
          },
          { text: 'DEV Community', link: 'https://dev.to/t/vue' }
        ]
      },
      {
        text: 'Nowości',
        items: [
          { text: 'Blog', link: 'https://blog.vuejs.org/' },
          { text: 'Twitter', link: 'https://twitter.com/vuejs' },
          { text: 'Newsletter', link: 'https://news.vuejs.org/' },
          { text: 'Wydarzenia', link: 'https://events.vuejs.org/' }
        ]
      }
    ]
  },
  {
    text: 'O nas',
    activeMatch: `^/about/`,
    items: [
      { text: 'FAQ', link: '/about/faq' },
      { text: 'Zespół', link: '/about/team' },
      { text: 'Wydania', link: '/about/releases' },
      {
        text: 'Przewodnik dla społeczności',
        link: '/about/community-guide'
      },
      { text: 'Kodeks postępowania', link: '/about/coc' },
      {
        text: 'Film dokumentalny',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
  {
    text: 'Sponsor',
    link: '/sponsor/'
  },
  {
    text: 'Partnerzy',
    link: '/partners/',
    activeMatch: `^/partners/`
  }
]

export const sidebar = {
  '/guide/': [
    {
      text: 'Pierwsze kroki',
      items: [
        { text: 'Wprowadzenie ', link: '/guide/introduction' },
        {
          text: 'Szybki start',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: 'Podstawy',
      items: [
        {
          text: 'Tworzenie aplikacji',
          link: '/guide/essentials/application'
        },
        {
          text: 'Składnia szablonu',
          link: '/guide/essentials/template-syntax'
        },
        {
          text: 'Podstawy reaktywności',
          link: '/guide/essentials/reactivity-fundamentals'
        },
        {
          text: 'Właściwości obliczane',
          link: '/guide/essentials/computed'
        },
        {
          text: 'Przypisywanie klas i stylów',
          link: '/guide/essentials/class-and-style'
        },
        {
          text: 'Renderowanie warunkowe',
          link: '/guide/essentials/conditional'
        },
        { text: 'Renderowanie listy', link: '/guide/essentials/list' },
        {
          text: 'Obsługa zdarzeń',
          link: '/guide/essentials/event-handling'
        },
        { text: 'Form Input Bindings', link: '/guide/essentials/forms' },
        {
          text: 'Cykl życia Hooków',
          link: '/guide/essentials/lifecycle'
        },
        { text: 'Strażnicy', link: '/guide/essentials/watchers' },
        { text: 'Template Refs', link: '/guide/essentials/template-refs' },
        {
          text: 'Podstawy komponentów',
          link: '/guide/essentials/component-basics'
        }
      ]
    },
    {
      text: 'Komponenty - dogłębnie',
      items: [
        {
          text: 'Rejestracja komponentu',
          link: '/guide/components/registration'
        },
        { text: 'Propsy', link: '/guide/components/props' },
        { text: 'Zdarzenia', link: '/guide/components/events' },
        {
          text: 'Fallthrough Attributes',
          link: '/guide/components/attrs'
        },
        { text: 'Sloty', link: '/guide/components/slots' },
        {
          text: 'Provide / inject',
          link: '/guide/components/provide-inject'
        },
        {
          text: 'Komponenty asynchroniczne',
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
          text: 'Dyrektywy niestandardowe',
          link: '/guide/reusability/custom-directives'
        },
        { text: 'Pluginy', link: '/guide/reusability/plugins' }
      ]
    },
    {
      text: 'Wbudowane komponenty',
      items: [
        { text: 'Transition', link: '/guide/built-ins/transition' },
        {
          text: 'TransitionGroup',
          link: '/guide/built-ins/transition-group'
        },
        { text: 'KeepAlive', link: '/guide/built-ins/keep-alive' },
        { text: 'Teleport', link: '/guide/built-ins/teleport' },
        { text: 'Suspense', link: '/guide/built-ins/suspense' }
      ]
    },
    {
      text: 'Skalowanie',
      items: [
        { text: 'Single-File Components', link: '/guide/scaling-up/sfc' },
        { text: 'Tooling', link: '/guide/scaling-up/tooling' },
        { text: 'Routing', link: '/guide/scaling-up/routing' },
        {
          text: 'Zarządzanie stanem',
          link: '/guide/scaling-up/state-management'
        },
        { text: 'Testowanie', link: '/guide/scaling-up/testing' },
        {
          text: 'Server-Side Rendering (SSR)',
          link: '/guide/scaling-up/ssr'
        }
      ]
    },
    {
      text: 'Dobre praktyki',
      items: [
        {
          text: 'Production Deployment',
          link: '/guide/best-practices/production-deployment'
        },
        {
          text: 'Wydajność',
          link: '/guide/best-practices/performance'
        },
        {
          text: 'Dostępność',
          link: '/guide/best-practices/accessibility'
        },
        {
          text: 'Bezpieczeństwo',
          link: '/guide/best-practices/security'
        }
      ]
    },
    {
      text: 'TypeScript',
      items: [
        { text: 'Przegląd', link: '/guide/typescript/overview' },
        {
          text: 'TS z Composition API',
          link: '/guide/typescript/composition-api'
        },
        {
          text: 'TS z Options API',
          link: '/guide/typescript/options-api'
        }
      ]
    },
    {
      text: 'Dodatkowe tematy',
      items: [
        {
          text: 'Sposoby używania Vue',
          link: '/guide/extras/ways-of-using-vue'
        },
        {
          text: 'Composition API FAQ',
          link: '/guide/extras/composition-api-faq'
        },
        {
          text: 'Reactivity in Depth',
          link: '/guide/extras/reactivity-in-depth'
        },
        {
          text: 'Mechanizm renderowania',
          link: '/guide/extras/rendering-mechanism'
        },
        {
          text: 'Render Functions & JSX',
          link: '/guide/extras/render-function'
        },
        {
          text: 'Vue and Web Components',
          link: '/guide/extras/web-components'
        },
        {
          text: 'Techniki animacji',
          link: '/guide/extras/animation'
        },
        {
          text: 'Reactivity Transform',
          link: '/guide/extras/reactivity-transform'
        }
        // {
        //   text: 'Building a Library for Vue',
        //   link: '/guide/extras/building-a-library'
        // },
        // { text: 'Custom Renderers', link: '/guide/extras/custom-renderer' },
        // {
        //   text: 'Vue for React Devs',
        //   link: '/guide/extras/vue-for-react-devs'
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
          text: 'Reactivity: Utilities',
          link: '/api/reactivity-utilities'
        },
        {
          text: 'Reactivity: Advanced',
          link: '/api/reactivity-advanced'
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
        {
          text: 'Special Elements',
          link: '/api/built-in-special-elements'
        },
        {
          text: 'Special Attributes',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'Single-File Component',
      items: [
        { text: 'Syntax Specification', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'CSS Features', link: '/api/sfc-css-features' }
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
  '/style-guide/': [
    {
      text: 'Przewodnik po stylach',
      items: [
        {
          text: 'Przegląd',
          link: '/style-guide/'
        },
        {
          text: 'A - Podstawowe',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'B - Silnie zalecane',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'C - Zalecane',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'D - Do użytku z zachowaniem ostrożności',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'pl-PL',
  title: 'Vue.js',
  description: 'Vue.js - Progresywny Framework JavaScript',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],
  scrollOffset: 'header',

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://vuejs.org/images/logo.png'
      }
    ],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://sponsors.vuejs.org'
      }
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        'data-spa': 'auto',
        defer: ''
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,

    algolia: {
      indexName: 'vuejs',
      appId: 'ML0LEBN7FQ',
      apiKey: 'f49cbd92a74532cc55cfbffa5e5a7d01',
      SearchParameters: {
        facetFilters: ['version:v3']
      }
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

    editLink: {
      repo: 'vuejs/docs',
      text: 'Edytuj tę stronę w serwisie GitHub'
    },

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2014-${new Date().getFullYear()} Evan You`
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin).use(jobsPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked themeInter
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  },

  vue: {
    reactivityTransform: true
  }
})
