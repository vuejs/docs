import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'

const nav: ThemeConfig['nav'] = [
  {
    text: 'Документація',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      { text: 'Гід', link: '/guide/introduction' },
      { text: 'Посібник', link: '/tutorial/' },
      { text: 'Приклади', link: '/examples/' },
      { text: 'Швидкий старт', link: '/guide/quick-start' },
      // { text: 'Style Guide', link: '/style-guide/' },
      {
        text: 'Документація по Vue 2',
        link: 'https://v2.vuejs.org.ua'
      },
      {
        text: 'Міграція з Vue 2',
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
    text: 'Пісочниця',
    link: 'https://sfc.vuejs.org'
  },
  {
    text: 'Екосистема',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Ресурси',
        items: [
          { text: 'Партнери', link: '/partners/' },
          { text: 'Теми', link: '/ecosystem/themes' },
          { text: 'Вакансії', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: 'Магазин футболок', link: 'https://vue.threadless.com/' }
        ]
      },
      {
        text: 'Офіційні бібліотеки',
        items: [
          { text: 'Vue Router', link: 'https://router.vuejs.org/' },
          { text: 'Pinia', link: 'https://pinia.vuejs.org/' },
          { text: 'Tooling Guide', link: '/guide/scaling-up/tooling.html' }
        ]
      },
      {
        text: 'Відео курси',
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
        text: 'Допомога',
        items: [
          {
            text: 'Чат Discord',
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
        text: 'Новини',
        items: [
          { text: 'Блог', link: 'https://blog.vuejs.org/' },
          { text: 'Twitter', link: 'https://twitter.com/vuejs' },
          { text: 'Інформаційний бюлетень', link: 'https://news.vuejs.org/' },
          { text: 'Події', link: 'https://events.vuejs.org/' }
        ]
      }
    ]
  },
  {
    text: 'Довідка',
    activeMatch: `^/about/`,
    items: [
      { text: 'ЧаПи', link: '/about/faq' },
      { text: 'Команда', link: '/about/team' },
      { text: 'Випуски', link: '/about/releases' },
      {
        text: 'Гід спільноти',
        link: '/about/community-guide'
      },
      { text: 'Кодекс честі', link: '/about/coc' },
      {
        text: 'Документальний фільм',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
  {
    text: 'Спонсорство',
    link: '/sponsor/'
  },
  {
    text: 'Партнери',
    link: '/partners/',
    activeMatch: `^/partners/`
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: 'Початок',
      items: [
        { text: 'Вступ', link: '/guide/introduction' },
        {
          text: 'Швидкий старт',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: 'Основи',
      items: [
        {
          text: 'Створення додатку',
          link: '/guide/essentials/application'
        },
        {
          text: 'Синтаксис шаблону',
          link: '/guide/essentials/template-syntax'
        },
        {
          text: 'Основи реактивності',
          link: '/guide/essentials/reactivity-fundamentals'
        },
        {
          text: 'Обчислювані властивості',
          link: '/guide/essentials/computed'
        },
        {
          text: 'Прив\'язування класів та стилів',
          link: '/guide/essentials/class-and-style'
        },
        {
          text: 'Умовний рендеринг',
          link: '/guide/essentials/conditional'
        },
        { text: 'Рендеринг списків', link: '/guide/essentials/list' },
        {
          text: 'Обробка подій',
          link: '/guide/essentials/event-handling'
        },
        { text: 'Прив\'язування елементів форми', link: '/guide/essentials/forms' },
        {
          text: 'Хуки життєвого циклу',
          link: '/guide/essentials/lifecycle'
        },
        { text: 'Спостерігачі', link: '/guide/essentials/watchers' },
        { text: 'Референції в шаблонах', link: '/guide/essentials/template-refs' },
        {
          text: 'Основи компонентів',
          link: '/guide/essentials/component-basics'
        }
      ]
    },
    {
      text: 'Компоненти поглиблено',
      items: [
        {
          text: 'Реєстрація',
          link: '/guide/components/registration'
        },
        { text: 'Реквізити', link: '/guide/components/props' },
        { text: 'Події', link: '/guide/components/events' },
        { text: 'v-model з компонентами', link: '/guide/components/v-model' },
        {
          text: 'Прохідні атрибути',
          link: '/guide/components/attrs'
        },
        { text: 'Слоти', link: '/guide/components/slots' },
        {
          text: 'Provide / inject',
          link: '/guide/components/provide-inject'
        },
        {
          text: 'Асинхронні компоненти',
          link: '/guide/components/async'
        }
      ]
    },
    {
      text: 'Повторне використання',
      items: [
        {
          text: 'Композиційні функції',
          link: '/guide/reusability/composables'
        },
        {
          text: 'Спеціальні директиви',
          link: '/guide/reusability/custom-directives'
        },
        { text: 'Плагіни', link: '/guide/reusability/plugins' }
      ]
    },
    {
      text: 'Вбудовані компоненти',
      items: [
        { text: 'Переходи', link: '/guide/built-ins/transition' },
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
      text: 'Масштабування',
      items: [
        { text: 'Одно-файлові компоненти', link: '/guide/scaling-up/sfc' },
        { text: 'Інструменти', link: '/guide/scaling-up/tooling' },
        { text: 'Маршрутизація', link: '/guide/scaling-up/routing' },
        {
          text: 'Керування станом',
          link: '/guide/scaling-up/state-management'
        },
        { text: 'Тестування', link: '/guide/scaling-up/testing' },
        {
          text: 'Рендеринг на стороні сервера (SSR)',
          link: '/guide/scaling-up/ssr'
        }
      ]
    },
    {
      text: 'Найкращі практики',
      items: [
        {
          text: 'Розгортання продакшну',
          link: '/guide/best-practices/production-deployment'
        },
        {
          text: 'Продуктивність',
          link: '/guide/best-practices/performance'
        },
        {
          text: 'Доступність',
          link: '/guide/best-practices/accessibility'
        },
        {
          text: 'Безпека',
          link: '/guide/best-practices/security'
        }
      ]
    },
    {
      text: 'TypeScript',
      items: [
        { text: 'Огляд', link: '/guide/typescript/overview' },
        {
          text: 'TS з композиційним API',
          link: '/guide/typescript/composition-api'
        },
        {
          text: 'TS з опційним API',
          link: '/guide/typescript/options-api'
        }
      ]
    },
    {
      text: 'Додаткові теми',
      items: [
        {
          text: 'Способи використання Vue',
          link: '/guide/extras/ways-of-using-vue'
        },
        {
          text: 'ЧаПи по Композиційному API',
          link: '/guide/extras/composition-api-faq'
        },
        {
          text: 'Реактивність поглиблено',
          link: '/guide/extras/reactivity-in-depth'
        },
        {
          text: 'Механізм рендерингу',
          link: '/guide/extras/rendering-mechanism'
        },
        {
          text: 'Функції рендерингу та JSX',
          link: '/guide/extras/render-function'
        },
        {
          text: 'Vue та Веб Компоненти',
          link: '/guide/extras/web-components'
        },
        {
          text: 'Техніки анімації',
          link: '/guide/extras/animation'
        },
        {
          text: 'Трансформація реактивності',
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
      text: 'Глобальний API',
      items: [
        { text: 'Додаток', link: '/api/application' },
        {
          text: 'Загальне',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'Композиційний API',
      items: [
        { text: 'setup()', link: '/api/composition-api-setup' },
        {
          text: 'Реактивність: Основи',
          link: '/api/reactivity-core'
        },
        {
          text: 'Реактивність: Утиліти',
          link: '/api/reactivity-utilities'
        },
        {
          text: 'Реактивність: Розширено',
          link: '/api/reactivity-advanced'
        },
        {
          text: 'Хуки життєвого циклу',
          link: '/api/composition-api-lifecycle'
        },
        {
          text: 'Ін`єкція залежностей',
          link: '/api/composition-api-dependency-injection'
        }
      ]
    },
    {
      text: 'Опційний API',
      items: [
        { text: 'Опції: Стан', link: '/api/options-state' },
        { text: 'Опції: Рендеринг', link: '/api/options-rendering' },
        {
          text: 'Опції: Життєвий цикл',
          link: '/api/options-lifecycle'
        },
        {
          text: 'Опції: Композиція',
          link: '/api/options-composition'
        },
        { text: 'Опції: Різне', link: '/api/options-misc' },
        {
          text: 'Екземпляр компонента',
          link: '/api/component-instance'
        }
      ]
    },
    {
      text: 'Вбудоване',
      items: [
        { text: 'Директиви', link: '/api/built-in-directives' },
        { text: 'Компоненти', link: '/api/built-in-components' },
        {
          text: 'Спеціальні елементи',
          link: '/api/built-in-special-elements'
        },
        {
          text: 'Спеціальні атрибути',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'Одно-файлові компоненти',
      items: [
        { text: 'Специфікація синтаксису', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'Можливості CSS', link: '/api/sfc-css-features' }
      ]
    },
    {
      text: 'Розширені API',
      items: [
        { text: 'Функції рендерингу', link: '/api/render-function' },
        { text: 'Рендеринг на стороні сервера', link: '/api/ssr' },
        { text: 'Утилітарні типи TypeScript', link: '/api/utility-types' },
        { text: 'Спеціальний рендерер', link: '/api/custom-renderer' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'Основи',
      items: [
        {
          text: 'Привіт, світ',
          link: '/examples/#hello-world'
        },
        {
          text: 'Керування діями користувача',
          link: '/examples/#handling-input'
        },
        {
          text: 'Прив\'язування атрибутів',
          link: '/examples/#attribute-bindings'
        },
        {
          text: 'Умови та цикли',
          link: '/examples/#conditionals-and-loops'
        },
        {
          text: 'Прив\'язування форм',
          link: '/examples/#form-bindings'
        },
        {
          text: 'Простенька компонента',
          link: '/examples/#simple-component'
        }
      ]
    },
    {
      text: 'Практичні завдання',
      items: [
        {
          text: 'Редактор Markdown',
          link: '/examples/#markdown'
        },
        {
          text: 'Отримання даних з серверу',
          link: '/examples/#fetching-data'
        },
        {
          text: 'Таблиця з сортуванням та фільтрацією',
          link: '/examples/#grid'
        },
        {
          text: 'Деревовидне відображення',
          link: '/examples/#tree'
        },
        {
          text: 'SVG графік',
          link: '/examples/#svg'
        },
        {
          text: 'Модальне вікно з переходами',
          link: '/examples/#modal'
        },
        {
          text: 'Список з переходами',
          link: '/examples/#list-transition'
        },
        {
          text: 'Список завдань',
          link: '/examples/#todomvc'
        }
      ]
    },
    {
      // https://eugenkiss.github.io/7guis/
      text: '7 користувацьких інтерфейсів',
      items: [
        {
          text: 'Лічильник',
          link: '/examples/#counter'
        },
        {
          text: 'Конвертер температури',
          link: '/examples/#temperature-converter'
        },
        {
          text: 'Бронювання літаків',
          link: '/examples/#flight-booker'
        },
        {
          text: 'Таймер',
          link: '/examples/#timer'
        },
        {
          text: 'CRUD система',
          link: '/examples/#crud'
        },
        {
          text: 'Малювання кругів',
          link: '/examples/#circle-drawer'
        },
        {
          text: 'Табличний процесор',
          link: '/examples/#cells'
        }
      ]
    }
  ],
  '/style-guide/': [
    {
      text: 'Гід по стилях',
      items: [
        {
          text: 'Огляд',
          link: '/style-guide/'
        },
        {
          text: 'А - Найнеобхідніше',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'Б - Настійно рекомендовано',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'В - Рекомендовано',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'Г - Використовувати з обережністю',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

// Placeholder of the i18n config for @vuejs-translations.
// const i18n: ThemeConfig['i18n'] = {
// }

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'uk-UA',
  title: 'Vue.js',
  description: 'Vue.js - Прогресивний фрейморк на JavaScript',
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
    ],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-2918085-50'
      }
    ],
    [
      'script',
      {},
      `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-2918085-50');
      `
    ],
  ],

  themeConfig: {
    nav,
    sidebar,
    // Placeholder of the i18n config for @vuejs-translations.
    // i18n,

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
        link: '/translations/',
        text: 'Допоможіть нам перекласти!',
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

    i18n: {
      search: 'Пошук',
      menu: 'Меню',
      toc: 'На цій сторінці',
      returnToTop: 'Повернутися до початку',
      appearance: 'Зовнішній вигляд',
      previous: 'Попередня сторінка',
      next: 'Наступна сторінка',
      pageNotFound: 'Сторінку не знайдено',
      deadLink: {
        before: 'Ви відкрили посилання, якого не існує:',
        after: '',
      },
      deadLinkReport: {
        before: 'Будь ласка,',
        link: 'повідомте нас,',
        after: 'щоб ми могли це виправити'
      },
      footerLicense: {
        before: '',
        after: ''
      },
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
      repo: 'vuejs-translations/docs-uk',
      text: 'Редагувати цю сторінку на GitHub'
    },

    footer: {
      license: {
        text: 'Ліцензія MIT',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Всі права збережено © 2014-${new Date().getFullYear()} Evan You`
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin)
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
  },

  vue: {
    reactivityTransform: true
  }
})
