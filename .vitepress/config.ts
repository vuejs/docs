import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
import { jobsPlugin } from './jobsMdPlugin'

const nav: ThemeConfig['nav'] = [
  {
    text: 'Документация',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      { text: 'Руководство', link: '/guide/introduction' },
      { text: 'Интерактивный учебник', link: '/tutorial/' },
      { text: 'Примеры', link: '/examples/' },
      { text: 'Быстрый старт', link: '/guide/quick-start' },
      // { text: 'Style Guide', link: '/style-guide/' },
      {
        text: 'Документация для Vue 2',
        link: 'https://ru.vuejs.org/'
      },
      {
        text: 'Руководство по миграции с Vue 2',
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
    text: 'Песочница',
    link: 'https://sfc.vuejs.org'
  },
  {
    text: 'Экосистема',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Ресурсы',
        items: [
          { text: 'Партнёры', link: '/partners/' },
          { text: 'Темы', link: '/ecosystem/themes' },
          { text: 'Вакансии', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: 'Магазин футболок', link: 'https://vue.threadless.com/' }
        ]
      },
      {
        text: 'Официальные библиотеки',
        items: [
          { text: 'Vue Router', link: 'https://router.vuejs.org/' },
          { text: 'Pinia', link: 'https://pinia.vuejs.org/' },
          { text: 'Инструментарий', link: '/guide/scaling-up/tooling.html' }
        ]
      },
      {
        text: 'Видео-курсы',
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
        text: 'Помощь',
        items: [
          {
            text: 'Чат в Discord',
            link: 'https://discord.com/invite/HBherRA'
          },
          {
            text: 'Обсуждения в GitHub',
            link: 'https://github.com/vuejs/core/discussions'
          },
          { text: 'Сообщество разработчиков', link: 'https://dev.to/t/vue' }
        ]
      },
      {
        text: 'Новости',
        items: [
          { text: 'Блог', link: 'https://blog.vuejs.org/' },
          { text: 'Twitter', link: 'https://twitter.com/vuejs' },
          { text: 'Рассылка', link: 'https://news.vuejs.org/' },
          { text: 'События', link: 'https://events.vuejs.org/' }
        ]
      }
    ]
  },
  {
    text: 'О нас',
    activeMatch: `^/about/`,
    items: [
      { text: 'FAQ', link: '/about/faq' },
      { text: 'Команда', link: '/about/team' },
      { text: 'Релизы', link: '/about/releases' },
      {
        text: 'Community Guide',
        link: '/about/community-guide'
      },
      { text: 'Code of Conduct', link: '/about/coc' },
      {
        text: 'Документальный фильм',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
  {
    text: 'Спонсоры',
    link: '/sponsor/'
  },
  {
    text: 'Партнёры',
    link: '/partners/',
    activeMatch: `^/partners/`
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: 'Приступая к изучению',
      items: [
        { text: 'Введение', link: '/guide/introduction' },
        {
          text: 'Быстрый старт',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: 'Основы',
      items: [
        {
          text: 'Создание приложения',
          link: '/guide/essentials/application'
        },
        {
          text: 'Синтаксис шаблонов',
          link: '/guide/essentials/template-syntax'
        },
        {
          text: 'Основы реактивности',
          link: '/guide/essentials/reactivity-fundamentals'
        },
        {
          text: 'Вычисляемые свойства',
          link: '/guide/essentials/computed'
        },
        {
          text: 'Работа с классами и стилями',
          link: '/guide/essentials/class-and-style'
        },
        {
          text: 'Условная отрисовка',
          link: '/guide/essentials/conditional'
        },
        { text: 'Отрисовка списков', link: '/guide/essentials/list' },
        {
          text: 'Обработка событий',
          link: '/guide/essentials/event-handling'
        },
        { text: 'Работа с формами', link: '/guide/essentials/forms' },
        {
          text: 'Хуки жизненного цикла',
          link: '/guide/essentials/lifecycle'
        },
        { text: 'Наблюдатели', link: '/guide/essentials/watchers' },
        { text: 'Ссылки на элементы шаблона', link: '/guide/essentials/template-refs' },
        {
          text: 'Основы компонентов',
          link: '/guide/essentials/component-basics'
        }
      ]
    },
    {
      text: 'Продвинутые компоненты',
      items: [
        {
          text: 'Регистрация компонентов',
          link: '/guide/components/registration'
        },
        { text: 'Входные параметры', link: '/guide/components/props' },
        { text: 'События', link: '/guide/components/events' },
        {
          text: 'Передача обычных атрибутов',
          link: '/guide/components/attrs'
        },
        { text: 'Слоты', link: '/guide/components/slots' },
        {
          text: 'Provide / inject',
          link: '/guide/components/provide-inject'
        },
        {
          text: 'Асинхронные компоненты',
          link: '/guide/components/async'
        }
      ]
    },
    {
      text: 'Переиспользование',
      items: [
        {
          text: 'Composables',
          link: '/guide/reusability/composables'
        },
        {
          text: 'Пользовательские директивы',
          link: '/guide/reusability/custom-directives'
        },
        { text: 'Плагины', link: '/guide/reusability/plugins' }
      ]
    },
    {
      text: 'Встроенные компоненты',
      items: [
        { text: 'Transition', link: '/guide/built-ins/transition' },
        {
          text: 'Переходы в списках',
          link: '/guide/built-ins/transition-group'
        },
        { text: 'Сохранение состояния', link: '/guide/built-ins/keep-alive' },
        { text: 'Телепорт', link: '/guide/built-ins/teleport' },
        { text: 'Suspense', link: '/guide/built-ins/suspense' }
      ]
    },
    {
      text: 'Масштабирование',
      items: [
        { text: 'Однофайловые компоненты', link: '/guide/scaling-up/sfc' },
        { text: 'Инструментарий', link: '/guide/scaling-up/tooling' },
        { text: 'Роутинг', link: '/guide/scaling-up/routing' },
        {
          text: 'Управление состоянием приложения',
          link: '/guide/scaling-up/state-management'
        },
        { text: 'Тестирование', link: '/guide/scaling-up/testing' },
        {
          text: 'Отрисовка на стороне сервера',
          link: '/guide/scaling-up/ssr'
        }
      ]
    },
    {
      text: 'Лучшие практики',
      items: [
        {
          text: 'Публикация на production',
          link: '/guide/best-practices/production-deployment'
        },
        {
          text: 'Производительность',
          link: '/guide/best-practices/performance'
        },
        {
          text: 'Доступность',
          link: '/guide/best-practices/accessibility'
        },
        {
          text: 'Безопасность',
          link: '/guide/best-practices/security'
        }
      ]
    },
    {
      text: 'TypeScript',
      items: [
        { text: 'Обзор', link: '/guide/typescript/overview' },
        {
          text: 'Использование с Composition API',
          link: '/guide/typescript/composition-api'
        },
        {
          text: 'Использование с Options API',
          link: '/guide/typescript/options-api'
        }
      ]
    },
    {
      text: 'Дополнительные темы',
      items: [
        {
          text: 'Способы использования Vue',
          link: '/guide/extras/ways-of-using-vue'
        },
        {
          text: 'FAQ по Composition API',
          link: '/guide/extras/composition-api-faq'
        },
        {
          text: 'Подробнее о реактивности',
          link: '/guide/extras/reactivity-in-depth'
        },
        {
          text: 'Механизмы отрисовки',
          link: '/guide/extras/rendering-mechanism'
        },
        {
          text: 'Render-функции & JSX',
          link: '/guide/extras/render-function'
        },
        {
          text: 'Vue и веб-компоненты',
          link: '/guide/extras/web-components'
        },
        {
          text: 'Техники анимации',
          link: '/guide/extras/animation'
        },
        {
          text: 'Трансформация реактивности',
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
      text: 'Глобальное API',
      items: [
        { text: 'Приложение', link: '/api/application' },
        {
          text: 'Основное',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'Composition API',
      items: [
        { text: 'setup()', link: '/api/composition-api-setup' },
        {
          text: 'Реактивность: Основное',
          link: '/api/reactivity-core'
        },
        {
          text: 'Реактивность: Утилиты',
          link: '/api/reactivity-utilities'
        },
        {
          text: 'Реактивность: Продвинутая',
          link: '/api/reactivity-advanced'
        },
        {
          text: 'Хуки жизненного цикла',
          link: '/api/composition-api-lifecycle'
        },
        {
          text: 'Внедрение зависимостей',
          link: '/api/composition-api-dependency-injection'
        }
      ]
    },
    {
      text: 'Options API',
      items: [
        { text: 'Опции: Состояние', link: '/api/options-state' },
        { text: 'Опции: Отрисовка', link: '/api/options-rendering' },
        {
          text: 'Опции: Жизненный цикл',
          link: '/api/options-lifecycle'
        },
        {
          text: 'Опции: Композиция',
          link: '/api/options-composition'
        },
        { text: 'Опции: Прочее', link: '/api/options-misc' },
        {
          text: 'Экземпляр компонента',
          link: '/api/component-instance'
        }
      ]
    },
    {
      text: 'Встроенное',
      items: [
        { text: 'Директивы', link: '/api/built-in-directives' },
        { text: 'Компоненты', link: '/api/built-in-components' },
        {
          text: 'Специальные элементы',
          link: '/api/built-in-special-elements'
        },
        {
          text: 'Специальные атрибуты',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'Однофайловый компонент',
      items: [
        { text: 'Спецификация синтаксиса', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'Возможности CSS', link: '/api/sfc-css-features' }
      ]
    },
    {
      text: 'Продвинутое API',
      items: [
        { text: 'Render-функция', link: '/api/render-function' },
        { text: 'Отрисовка на стороне сервера', link: '/api/ssr' },
        { text: 'Вспомогательные типы TypeScript', link: '/api/utility-types' },
        { text: 'Пользовательский рендерер', link: '/api/custom-renderer' }
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
      text: 'Style Guide',
      items: [
        {
          text: 'Overview',
          link: '/style-guide/'
        },
        {
          text: 'A - Essential',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'B - Strongly Recommended',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'C - Recommended',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'D - Use with Caution',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

const i18n: ThemeConfig['i18n'] = {
  search: 'Поиск',
  menu: 'Меню',
  toc: 'Содержание',
  returnToTop: 'Вернуться к началу',
  appearance: 'Внешний вид',
  previous: 'Предыдущая',
  next: 'Следующая',
  pageNotFound: 'Страница не найдена',
  deadLink: {
    before: 'Вы перешли по несуществующей ссылке: ',
    after: '.'
  },
  deadLinkReport: {
    before: 'Можно  ',
    link: 'указать нам на неё',
    after: ', чтобы мы смогли её исправить'
  },
  footerLicense: {
    before: '',
    after: ''
  },

  // aria labels
  ariaAnnouncer: {
    before: '',
    after: 'Уже загружено'
  },
  ariaDarkMode: 'Переключение в тёмный режим',
  ariaSkip: 'Перейти к содержанию',
  ariaTOC: 'Оглавление текущей страницы',
  ariaMainNav: 'Основная навигация',
  ariaMobileNav: 'Навигация по мобильной версии',
  ariaSidebarNav: 'Навигация в боковой панели',
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'ru-RU',
  title: 'Vue.js',
  description: 'Vue.js - Прогрессивный JavaScript-фреймворк',
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
    // [
    //   'script',
    //   {
    //     src: 'https://cdn.usefathom.com/script.js',
    //     'data-site': 'XNOLWPLB',
    //     'data-spa': 'auto',
    //     defer: ''
    //   }
    // ]
  ],

  themeConfig: {
    nav,
    sidebar,
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
        link: '/translations/',
        text: 'Переводы',
        isTranslationsDesc: true
      }
    ],

    // algolia: {
    //   indexName: 'vuejs_ru',
    //   appId: 'ML0LEBN7FQ',
    //   apiKey: 'f49cbd92a74532cc55cfbffa5e5a7d01',
    //   searchParameters: {
    //     facetFilters: ['version:v3']
    //   }
    // },

    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/' },
      { icon: 'twitter', link: 'https://twitter.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/HBherRA' }
    ],

    editLink: {
      repo: 'translation-gang/docs-ru',
      text: 'Исправить эту страницу на GitHub'
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
