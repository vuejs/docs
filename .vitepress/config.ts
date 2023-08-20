import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'

const nav: ThemeConfig['nav'] = [
  {
    text: 'Documentazione',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      { text: 'Guida', link: '/guide/introduction' },
      { text: 'Tutorial', link: '/tutorial/' },
      { text: 'Esempi', link: '/examples/' },
      { text: 'Quick Start', link: '/guide/quick-start' },
      // { text: 'Style Guide', link: '/style-guide/' },
      { text: 'Glossario', link: '/glossary/' },
      {
        text: 'Vue 2 Docs',
        link: 'https://v2.vuejs.org'
      },
      {
        text: 'Migrare da Vue 2',
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
    text: 'Playground',
    link: 'https://play.vuejs.org'
  },
  {
    text: 'Ecosistema',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Risorse',
        items: [
          { text: 'Partner', link: '/partners/' },
          { text: 'Temi', link: '/ecosystem/themes' },
          {
            text: 'Certificazioni',
            link: 'https://certification.vuejs.org/?ref=vuejs-nav'
          },
          { text: 'Offerte di Lavoro', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: 'T-Shirt Shop', link: 'https://vue.threadless.com/' }
        ]
      },
      {
        text: 'Librerie Ufficiali',
        items: [
          { text: 'Vue Router', link: 'https://router.vuejs.org/' },
          { text: 'Pinia', link: 'https://pinia.vuejs.org/' },
          { text: 'Tooling Guide', link: '/guide/scaling-up/tooling.html' }
        ]
      },
      {
        text: 'Video-corsi',
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
        text: 'Aiuto',
        items: [
          {
            text: 'Chat Discord',
            link: 'https://discord.com/invite/HBherRA'
          },
          {
            text: 'Discussioni GitHub',
            link: 'https://github.com/vuejs/core/discussions'
          },
          { text: 'Comunità degli Sviluppatori', link: 'https://dev.to/t/vue' }
        ]
      },
      {
        text: 'Notizie',
        items: [
          { text: 'Blog', link: 'https://blog.vuejs.org/' },
          { text: 'Twitter', link: 'https://twitter.com/vuejs' },
          { text: 'Eventi', link: 'https://events.vuejs.org/' },
          { text: 'Newsletters', link: '/ecosystem/newsletters' }
        ]
      }
    ]
  },
  {
    text: 'About',
    activeMatch: `^/about/`,
    items: [
      { text: 'FAQ', link: '/about/faq' },
      { text: 'Team', link: '/about/team' },
      { text: 'Releases', link: '/about/releases' },
      {
        text: 'Guida della Comunità',
        link: '/about/community-guide'
      },
      { text: 'Codice di condotta', link: '/about/coc' },
      {
        text: 'Il Documentario',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
  {
    text: 'Sponsor',
    link: '/sponsor/'
  },
  {
    text: 'Partners',
    link: '/partners/',
    activeMatch: `^/partners/`
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: 'Guida introduttiva',
      items: [
        { text: 'Panoramica', link: '/guide/introduction' },
        {
          text: 'Avvio rapido',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: 'Gli Elementi Essenziali',
      items: [
        {
          text: 'Creare un\'applicazione',
          link: '/guide/essentials/application'
        },
        {
          text: 'La Sintassi del Template',
          link: '/guide/essentials/template-syntax'
        },
        {
          text: 'Le basi della Reattività',
          link: '/guide/essentials/reactivity-fundamentals'
        },
        {
          text: 'Le Computed Properties',
          link: '/guide/essentials/computed'
        },
        {
          text: 'Binding per Classi e Stili CSS',
          link: '/guide/essentials/class-and-style'
        },
        {
          text: 'Rendering Condizionale',
          link: '/guide/essentials/conditional'
        },
        { text: 'Il Rendering delle Liste', link: '/guide/essentials/list' },
        {
          text: 'La Gestione degli Eventi',
          link: '/guide/essentials/event-handling'
        },
        { text: 'Binding per gli Input dei Form', link: '/guide/essentials/forms' },
        {
          text: 'Gli Hook del Ciclo di Vita',
          link: '/guide/essentials/lifecycle'
        },
        { text: 'I Watcher', link: '/guide/essentials/watchers' },
        { text: 'I Ref del Template', link: '/guide/essentials/template-refs' },
        {
          text: 'Nozioni base sui Componenti',
          link: '/guide/essentials/component-basics'
        }
      ]
    },
    {
      text: 'I Componenti nel dettaglio',
      items: [
        {
          text: 'La Registrazione',
          link: '/guide/components/registration'
        },
        { text: 'Le Props', link: '/guide/components/props' },
        { text: 'Gli Eventi', link: '/guide/components/events' },
        { text: 'Il v-model nei componenti', link: '/guide/components/v-model' },
        {
          text: 'Gli Attributi Trasferibili (Fallthrough)',
          link: '/guide/components/attrs'
        },
        { text: 'Gli Slot', link: '/guide/components/slots' },
        {
          text: 'Provide / inject',
          link: '/guide/components/provide-inject'
        },
        {
          text: 'I Componenti Asincroni',
          link: '/guide/components/async'
        }
      ]
    },
    {
      text: 'Il Riutilizzo del Codice',
      items: [
        {
          text: 'I Composables',
          link: '/guide/reusability/composables'
        },
        {
          text: 'Le Direttive Personalizzate',
          link: '/guide/reusability/custom-directives'
        },
        { text: 'I Plugin', link: '/guide/reusability/plugins' }
      ]
    },
    {
      text: 'I Componenti nativi',
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
      text: 'Scalabilità per progetti complessi',
      items: [
        { text: 'I Componenti Single-File', link: '/guide/scaling-up/sfc' },
        { text: 'Gli Strumenti per lo sviluppo', link: '/guide/scaling-up/tooling' },
        { text: 'Il Routing', link: '/guide/scaling-up/routing' },
        {
          text: 'La Gestione dello Stato',
          link: '/guide/scaling-up/state-management'
        },
        { text: 'I Test nel dettaglio', link: '/guide/scaling-up/testing' },
        {
          text: 'Il Rendering Server-Side (SSR)',
          link: '/guide/scaling-up/ssr'
        }
      ]
    },
    {
      text: 'Best Practices',
      items: [
        {
          text: 'Rilascio in Produzione',
          link: '/guide/best-practices/production-deployment'
        },
        {
          text: 'Performance',
          link: '/guide/best-practices/performance'
        },
        {
          text: 'Accessibilità Web',
          link: '/guide/best-practices/accessibility'
        },
        {
          text: 'Sicurezza',
          link: '/guide/best-practices/security'
        }
      ]
    },
    {
      text: 'TypeScript',
      items: [
        { text: 'Panoramica', link: '/guide/typescript/overview' },
        {
          text: 'TS con Composition API',
          link: '/guide/typescript/composition-api'
        },
        {
          text: 'TS con Options API',
          link: '/guide/typescript/options-api'
        }
      ]
    },
    {
      text: 'Argomenti Extra',
      items: [
        {
          text: 'Modi di utilizzare Vue',
          link: '/guide/extras/ways-of-using-vue'
        },
        {
          text: 'FAQ sulla Composition API',
          link: '/guide/extras/composition-api-faq'
        },
        {
          text: 'La Reattività in dettaglio',
          link: '/guide/extras/reactivity-in-depth'
        },
        {
          text: 'Il Meccanismo di Rendering',
          link: '/guide/extras/rendering-mechanism'
        },
        {
          text: 'Le Render Function e JSX',
          link: '/guide/extras/render-function'
        },
        {
          text: 'Vue e i Web Components',
          link: '/guide/extras/web-components'
        },
        {
          text: 'Tecniche di Animazione',
          link: '/guide/extras/animation'
        }
        // {
        //   text: 'Building a Library for Vue',
        //   link: '/guide/extras/building-a-library'
        // },
        // {
        //   text: 'Vue for React Devs',
        //   link: '/guide/extras/vue-for-react-devs'
        // }
      ]
    }
  ],
  '/api/': [
    {
      text: 'API Globali',
      items: [
        { text: 'Applicazione', link: '/api/application' },
        {
          text: 'Generale',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'Composition API',
      items: [
        { text: 'setup()', link: '/api/composition-api-setup' },
        {
          text: 'Reactivity: Il Core',
          link: '/api/reactivity-core'
        },
        {
          text: 'Reactivity: Utilità',
          link: '/api/reactivity-utilities'
        },
        {
          text: 'Reactivity: Uso Avanzato',
          link: '/api/reactivity-advanced'
        },
        {
          text: 'Hook del Ciclo di Vita',
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
        { text: 'Options: Lo Stato', link: '/api/options-state' },
        { text: 'Options: Rendering', link: '/api/options-rendering' },
        {
          text: 'Options: Ciclo di Vita',
          link: '/api/options-lifecycle'
        },
        {
          text: 'Options: Composizione',
          link: '/api/options-composition'
        },
        { text: 'Options: Varie', link: '/api/options-misc' },
        {
          text: 'Istanza del Componente',
          link: '/api/component-instance'
        }
      ]
    },
    {
      text: 'API Native',
      items: [
        { text: 'Direttive', link: '/api/built-in-directives' },
        { text: 'Componenti', link: '/api/built-in-components' },
        {
          text: 'Elementi Speciali',
          link: '/api/built-in-special-elements'
        },
        {
          text: 'Attributi Speciali',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'Componente Single-File',
      items: [
        { text: 'Specifiche della Sintassi', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'Funzionalità CSS', link: '/api/sfc-css-features' }
      ]
    },
    {
      text: 'API Avanzate',
      items: [
        { text: 'Render Function', link: '/api/render-function' },
        { text: 'Rendering Server Side', link: '/api/ssr' },
        { text: 'Types delle Utility TypeScript', link: '/api/utility-types' },
        { text: 'Renderer Personalizzato', link: '/api/custom-renderer' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'Base',
      items: [
        {
          text: 'Ciao Mondo',
          link: '/examples/#hello-world'
        },
        {
          text: 'Gestione dell\'Input dell\'Utente',
          link: '/examples/#handling-input'
        },
        {
          text: 'Binding di Attributi',
          link: '/examples/#attribute-bindings'
        },
        {
          text: 'Op. Condizionali e Cicli',
          link: '/examples/#conditionals-and-loops'
        },
        {
          text: 'Binding di Form',
          link: '/examples/#form-bindings'
        },
        {
          text: 'Componente Semplice',
          link: '/examples/#simple-component'
        }
      ]
    },
    {
      text: 'Utili',
      items: [
        {
          text: 'Editor di Markdown',
          link: '/examples/#markdown'
        },
        {
          text: 'Fetching di Dati',
          link: '/examples/#fetching-data'
        },
        {
          text: 'Griglia con Ordinamento e Filtri',
          link: '/examples/#grid'
        },
        {
          text: 'Visualizzazione ad Albero',
          link: '/examples/#tree'
        },
        {
          text: 'Grafico SVG',
          link: '/examples/#svg'
        },
        {
          text: 'Modale con Transizioni',
          link: '/examples/#modal'
        },
        {
          text: 'Lista con Transizioni',
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
          text: 'Contatore',
          link: '/examples/#counter'
        },
        {
          text: 'Convertitore di Temperatura',
          link: '/examples/#temperature-converter'
        },
        {
          text: 'Prenotazione Volo',
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
          text: 'Celle',
          link: '/examples/#cells'
        }
      ]
    }
  ],
  '/style-guide/': [
    {
      text: 'Style Guide',
      items: [
        {
          text: 'Panoramica',
          link: '/style-guide/'
        },
        {
          text: 'A - Essenziale',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'B - Fortemente Raccomandato',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'C - Raccomandato',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'D - Usare con Cautela',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

// Placeholder of the i18n config for @vuejs-translations.
 const i18n: ThemeConfig['i18n'] = {
  previous: 'Precedente',
  next: 'Successivo',
  toc: 'In questa pagina',
  search: 'Ricerca',
  menu: 'Menu',
  returnToTop: 'Torna in cima',
  appearance: 'Aspetto',
  pageNotFound: 'Pagina non trovata',
  deadLink: {
    before: 'Hai trovato un link morto : ',
    after: ''
  },
  deadLinkReport: {
    before: 'Grazie per ',
    link: 'farcelo sapere',
    after: ' per aiutarci a risolvere quanto prima.'
  },
  footerLicense: {
    before: '',
    after: ''
  },

  // aria labels
  // typo issue https://github.com/vuejs/theme/issues/75
  // ariaAnnouncer: {
  //   before: '',
  //   after: 'a chargé'
  // },
  ariaDarkMode: 'Modalità scura',
  ariaSkipToContent: 'Passa al contenuto',
  ariaMainNav: 'Navigazione principale',
  ariaMobileNav: 'Navigazione da mobile',
  ariaSidebarNav: 'Navigazione secondaria' 
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'it-IT',
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],

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
    ],
    [
      'script',
      {
        src: 'https://vueschool.io/banner.js?affiliate=vuejs&type=top',
        async: 'true'
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,
    // Placeholder of the i18n config for @vuejs-translations.
    i18n,

    localeLinks: [
      {
        link: 'https://cn.vuejs.org',
        text: '简体中文',
        repo: 'https://github.com/vuejs-translations/docs-zh-cn'
      },
      {
        link: 'https://ja.vuejs.org',
        text: '日本語',
        repo: 'https://github.com/vuejs-translations/docs-ja'
      },
      {
        link: 'https://ua.vuejs.org',
        text: 'Українська',
        repo: 'https://github.com/vuejs-translations/docs-uk'
      },
      {
        link: 'https://fr.vuejs.org',
        text: 'Français',
        repo: 'https://github.com/vuejs-translations/docs-fr'
      },
      {
        link: 'https://ko.vuejs.org',
        text: '한국어',
        repo: 'https://github.com/vuejs-translations/docs-ko'
      },
      {
        link: 'https://pt.vuejs.org',
        text: 'Português',
        repo: 'https://github.com/vuejs-translations/docs-pt'
      },
      {
        link: '/translations/',
        text: 'Help Us Translate!',
        isTranslationsDesc: true
      }
    ],

    algolia: {
      indexName: 'vuejs',
      appId: 'ML0LEBN7FQ',
      apiKey: 'f49cbd92a74532cc55cfbffa5e5a7d01',
      searchParameters: {
        facetFilters: ['version:v3']
      }
    },

    carbonAds: {
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/' },
      { icon: 'twitter', link: 'https://twitter.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/HBherRA' }
    ],

    editLink: {
      repo: 'phox081/docs-it',
      text: 'Modifica questa pagina su GitHub'
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
      md.use(headerPlugin)
        // .use(textAdPlugin)
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
        // for when developing with locally linked theme
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
  }
})
