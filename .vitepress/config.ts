import fs from 'fs'
import path from 'path'
import {
  defineConfigWithTheme,
  type HeadConfig,
  type Plugin
} from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import llmstxt from 'vitepress-plugin-llms'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'
import {
  groupIconMdPlugin,
  groupIconVitePlugin
} from 'vitepress-plugin-group-icons'

const nav: ThemeConfig['nav'] = [
  {
    text: 'Belgeler',
    activeMatch: `^/(guide|tutorial|examples|api|glossary|error-reference)/`,
    items: [
      { text: 'Hızlı Başlangıç', link: '/guide/quick-start' },
      { text: 'Kılavuz', link: '/guide/introduction' },
      { text: 'Öğretici', link: '/tutorial/' },
      { text: 'Örnekler', link: '/examples/' },
      { text: 'API', link: '/api/' },
      // { text: 'Stil Kılavuzu', link: '/style-guide/' },
      { text: 'Sözlük', link: '/glossary/' },
      { text: 'Hata Referansı', link: '/error-reference/' },
      {
        text: 'Vue 2 Belgeleri',
        link: 'https://v2.vuejs.org'
      },
      {
        text: "Vue 2'den Geçiş",
        link: 'https://v3-migration.vuejs.org/'
      }
    ]
  },
  {
    text: 'Playground',
    link: 'https://play.vuejs.org'
  },
  {
    text: 'Ekosistem',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Kaynaklar',
        items: [
          { text: 'Temalar', link: '/ecosystem/themes' },
          { text: 'Arayüz Bileşenleri', link: 'https://ui-libs.vercel.app/' },
          {
            text: 'Eklenti Koleksiyonu',
            link: 'https://www.vue-plugins.org/'
          },
          {
            text: 'Sertifikasyon',
            link: 'https://certificates.dev/vuejs/?ref=vuejs-nav'
          },
          { text: 'İş İlanları', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: 'Tişört Mağazası', link: 'https://vue.threadless.com/' }
        ]
      },
      {
        text: 'Resmi Kütüphaneler',
        items: [
          { text: 'Vue Router', link: 'https://router.vuejs.org/' },
          { text: 'Pinia', link: 'https://pinia.vuejs.org/' },
          { text: 'Araçlar Rehberi', link: '/guide/scaling-up/tooling.html' }
        ]
      },
      {
        text: 'Video Kursları',
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
        text: 'Yardım',
        items: [
          {
            text: 'Discord Sohbeti',
            link: 'https://discord.com/invite/HBherRA'
          },
          {
            text: 'GitHub Tartışmaları',
            link: 'https://github.com/vuejs/core/discussions'
          },
          { text: 'DEV Topluluğu', link: 'https://dev.to/t/vue' }
        ]
      },
      {
        text: 'Haberler',
        items: [
          { text: 'Blog', link: 'https://blog.vuejs.org/' },
          { text: 'Twitter', link: 'https://x.com/vuejs' },
          { text: 'Etkinlikler', link: 'https://events.vuejs.org/' },
          { text: 'Bültenler', link: '/ecosystem/newsletters' }
        ]
      }
    ]
  },
  {
    text: 'Hakkında',
    activeMatch: `^/about/`,
    items: [
      { text: 'SSS', link: '/about/faq' },
      { text: 'Ekip', link: '/about/team' },
      { text: 'Sürümler', link: '/about/releases' },
      {
        text: 'Topluluk Rehberi',
        link: '/about/community-guide'
      },
      { text: 'Davranış Kuralları', link: '/about/coc' },
      { text: 'Gizlilik Politikası', link: '/about/privacy' },
      {
        text: 'Belgesel',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
  {
    text: 'Destek',
    activeMatch: `^/(sponsor|partners)/`,
    items: [
      { text: 'Sponsorluk', link: '/sponsor/' },
      { text: 'Ortaklar', link: '/partners/' }
    ]
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: 'Başlarken',
      items: [
        { text: 'Giriş', link: '/guide/introduction' },
        {
          text: 'Hızlı Başlangıç',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: 'Temeller',
      items: [
        {
          text: 'Uygulama Oluşturma',
          link: '/guide/essentials/application'
        },
        {
          text: 'Şablon Sözdizimi',
          link: '/guide/essentials/template-syntax'
        },
        {
          text: 'Reaktivite Temelleri',
          link: '/guide/essentials/reactivity-fundamentals'
        },
        {
          text: 'Hesaplanmış Özellikler',
          link: '/guide/essentials/computed'
        },
        {
          text: 'Sınıf ve Stil Bağlamaları',
          link: '/guide/essentials/class-and-style'
        },
        {
          text: 'Koşullu İşleme',
          link: '/guide/essentials/conditional'
        },
        { text: 'Liste İşleme', link: '/guide/essentials/list' },
        {
          text: 'Olay İşleme',
          link: '/guide/essentials/event-handling'
        },
        { text: 'Form Girdisi Bağlamaları', link: '/guide/essentials/forms' },
        { text: 'İzleyiciler', link: '/guide/essentials/watchers' },
        { text: 'Şablon Refleri', link: '/guide/essentials/template-refs' },
        {
          text: 'Bileşen Temelleri',
          link: '/guide/essentials/component-basics'
        },
        {
          text: 'Yaşam Döngüsü Kancaları',
          link: '/guide/essentials/lifecycle'
        }
      ]
    },
    {
      text: 'Bileşenler Ayrıntılı',
      items: [
        {
          text: 'Kayıt',
          link: '/guide/components/registration'
        },
        { text: 'Props', link: '/guide/components/props' },
        { text: 'Olaylar', link: '/guide/components/events' },
        { text: 'Bileşen v-model', link: '/guide/components/v-model' },
        {
          text: 'Geçiş Öznitelikleri',
          link: '/guide/components/attrs'
        },
        { text: 'Yuvalar', link: '/guide/components/slots' },
        {
          text: 'Provide / inject',
          link: '/guide/components/provide-inject'
        },
        {
          text: 'Eşzamansız Bileşenler',
          link: '/guide/components/async'
        }
      ]
    },
    {
      text: 'Yeniden Kullanım',
      items: [
        {
          text: 'Composable’lar',
          link: '/guide/reusability/composables'
        },
        {
          text: 'Özel Direktifler',
          link: '/guide/reusability/custom-directives'
        },
        { text: 'Eklentiler', link: '/guide/reusability/plugins' }
      ]
    },
    {
      text: 'Yerleşik Bileşenler',
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
      text: 'Ölçeklendirme',
      items: [
        { text: 'Tek Dosya Bileşenleri', link: '/guide/scaling-up/sfc' },
        { text: 'Araçlar', link: '/guide/scaling-up/tooling' },
        { text: 'Yönlendirme', link: '/guide/scaling-up/routing' },
        {
          text: 'Durum Yönetimi',
          link: '/guide/scaling-up/state-management'
        },
        { text: 'Test', link: '/guide/scaling-up/testing' },
        {
          text: 'Sunucu Taraflı İşleme (SSR)',
          link: '/guide/scaling-up/ssr'
        }
      ]
    },
    {
      text: 'En İyi Uygulamalar',
      items: [
        {
          text: 'Üretim Dağıtımı',
          link: '/guide/best-practices/production-deployment'
        },
        {
          text: 'Performans',
          link: '/guide/best-practices/performance'
        },
        {
          text: 'Erişilebilirlik',
          link: '/guide/best-practices/accessibility'
        },
        {
          text: 'Güvenlik',
          link: '/guide/best-practices/security'
        }
      ]
    },
    {
      text: 'TypeScript',
      items: [
        { text: 'Genel Bakış', link: '/guide/typescript/overview' },
        {
          text: 'Composition API ile TS',
          link: '/guide/typescript/composition-api'
        },
        {
          text: 'Options API ile TS',
          link: '/guide/typescript/options-api'
        }
      ]
    },
    {
      text: 'Ek Konular',
      items: [
        {
          text: 'Vue Kullanım Şekilleri',
          link: '/guide/extras/ways-of-using-vue'
        },
        {
          text: 'Composition API SSS',
          link: '/guide/extras/composition-api-faq'
        },
        {
          text: 'Reaktivite Derinlemesine',
          link: '/guide/extras/reactivity-in-depth'
        },
        {
          text: 'İşleme Mekanizması',
          link: '/guide/extras/rendering-mechanism'
        },
        {
          text: 'Render Fonksiyonları ve JSX',
          link: '/guide/extras/render-function'
        },
        {
          text: 'Vue ve Web Bileşenleri',
          link: '/guide/extras/web-components'
        },
        {
          text: 'Animasyon Teknikleri',
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
      text: 'Genel API',
      items: [
        { text: 'Uygulama', link: '/api/application' },
        {
          text: 'Genel',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'Composition API',
      items: [
        { text: 'setup()', link: '/api/composition-api-setup' },
        {
          text: 'Reaktivite: Çekirdek',
          link: '/api/reactivity-core'
        },
        {
          text: 'Reaktivite: Yardımcılar',
          link: '/api/reactivity-utilities'
        },
        {
          text: 'Reaktivite: İleri',
          link: '/api/reactivity-advanced'
        },
        {
          text: 'Yaşam Döngüsü Kancaları',
          link: '/api/composition-api-lifecycle'
        },
        {
          text: 'Bağımlılık Enjeksiyonu',
          link: '/api/composition-api-dependency-injection'
        },
        {
          text: 'Yardımcılar',
          link: '/api/composition-api-helpers'
        }
      ]
    },
    {
      text: 'Options API',
      items: [
        { text: 'Seçenekler: Durum', link: '/api/options-state' },
        { text: 'Seçenekler: İşleme', link: '/api/options-rendering' },
        {
          text: 'Seçenekler: Yaşam Döngüsü',
          link: '/api/options-lifecycle'
        },
        {
          text: 'Seçenekler: Bileşim',
          link: '/api/options-composition'
        },
        { text: 'Seçenekler: Diğer', link: '/api/options-misc' },
        {
          text: 'Bileşen Örneği',
          link: '/api/component-instance'
        }
      ]
    },
    {
      text: 'Yerleşikler',
      items: [
        { text: 'Direktifler', link: '/api/built-in-directives' },
        { text: 'Bileşenler', link: '/api/built-in-components' },
        {
          text: 'Özel Öğeler',
          link: '/api/built-in-special-elements'
        },
        {
          text: 'Özel Öznitelikler',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'Tek Dosya Bileşeni',
      items: [
        { text: 'Sözdizimi Özeti', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'CSS Özellikleri', link: '/api/sfc-css-features' }
      ]
    },
    {
      text: 'İleri Düzey API’ler',
      items: [
        { text: 'Özel Öğeler', link: '/api/custom-elements' },
        { text: 'Render Fonksiyonu', link: '/api/render-function' },
        { text: 'Sunucu Taraflı İşleme', link: '/api/ssr' },
        { text: 'TypeScript Yardımcı Türleri', link: '/api/utility-types' },
        { text: 'Özel İşleyici', link: '/api/custom-renderer' },
        { text: 'Derleme Zamanı Bayrakları', link: '/api/compile-time-flags' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'Temel',
      items: [
        {
          text: 'Merhaba Dünya',
          link: '/examples/#hello-world'
        },
        {
          text: 'Kullanıcı Girdisi',
          link: '/examples/#handling-input'
        },
        {
          text: 'Öznitelik Bağlamaları',
          link: '/examples/#attribute-bindings'
        },
        {
          text: 'Koşullar ve Döngüler',
          link: '/examples/#conditionals-and-loops'
        },
        {
          text: 'Form Bağlamaları',
          link: '/examples/#form-bindings'
        },
        {
          text: 'Basit Bileşen',
          link: '/examples/#simple-component'
        }
      ]
    },
    {
      text: 'Uygulamalı',
      items: [
        {
          text: 'Markdown Düzenleyici',
          link: '/examples/#markdown'
        },
        {
          text: 'Veri Getirme',
          link: '/examples/#fetching-data'
        },
        {
          text: 'Sıralama ve Filtreli Izgara',
          link: '/examples/#grid'
        },
        {
          text: 'Ağaç Görünümü',
          link: '/examples/#tree'
        },
        {
          text: 'SVG Grafiği',
          link: '/examples/#svg'
        },
        {
          text: 'Geçişli Modal',
          link: '/examples/#modal'
        },
        {
          text: 'Geçişli Liste',
          link: '/examples/#list-transition'
        }
      ]
    },
    {
      // https://eugenkiss.github.io/7guis/
      text: '7 GUIs',
      items: [
        {
          text: 'Sayaç',
          link: '/examples/#counter'
        },
        {
          text: 'Sıcaklık Dönüştürücü',
          link: '/examples/#temperature-converter'
        },
        {
          text: 'Uçuş Rezervasyonu',
          link: '/examples/#flight-booker'
        },
        {
          text: 'Zamanlayıcı',
          link: '/examples/#timer'
        },
        {
          text: 'CRUD',
          link: '/examples/#crud'
        },
        {
          text: 'Daire Çizici',
          link: '/examples/#circle-drawer'
        },
        {
          text: 'Hücreler',
          link: '/examples/#cells'
        }
      ]
    }
  ],
  '/style-guide/': [
    {
      text: 'Stil Kılavuzu',
      items: [
        {
          text: 'Genel Bakış',
          link: '/style-guide/'
        },
        {
          text: 'A - Zorunlu',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'B - Şiddetle Önerilen',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'C - Önerilen',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'D - Dikkatli Kullanın',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

// Placeholder of the i18n config for @vuejs-translations.
// const i18n: ThemeConfig['i18n'] = {
// }

function inlineScript(file: string): HeadConfig {
  return [
    'script',
    {},
    fs.readFileSync(
      path.resolve(__dirname, `./inlined-scripts/${file}`),
      'utf-8'
    )
  ]
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  sitemap: {
    hostname: 'https://vuejs.org'
  },

  lang: 'tr',
  title: 'Vue.js',
  description: 'Vue.js — İlerici JavaScript Çatısı',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:url', content: 'https://vuejs.org/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Vue.js' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Vue.js — İlerici JavaScript Çatısı'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://vuejs.org/images/logo.png'
      }
    ],
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://automation.vuejs.org'
      }
    ],
    inlineScript('restorePreference.js'),
    inlineScript('uwu.js'),
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
        src: 'https://media.bitterbrains.com/main.js?from=vuejs&type=top',
        async: 'true'
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,

    i18n: {
      search: 'Ara',
      menu: 'Menü',
      toc: 'Bu sayfada',
      returnToTop: 'Yukarı dön',
      appearance: 'Görünüm',
      previous: 'Önceki',
      next: 'Sonraki',
      pageNotFound: 'Sayfa bulunamadı',
      locales: 'Diller',
      joinTranslation: 'Çeviriye katılın',
      deadLink: {
        before: 'Çalışmayan bir bağlantı: ',
        after: ''
      },
      deadLinkReport: {
        before: 'Lütfen ',
        link: 'bize bildirin',
        after: ', düzeltelim.'
      },
      footerLicense: {
        before: 'Şu lisans altında yayınlanmıştır: ',
        after: ''
      },
      ariaAnnouncer: {
        before: '',
        after: ' yüklendi'
      },
      ariaDarkMode: 'Karanlık modu değiştir',
      ariaSkipToContent: 'İçeriğe atla',
      ariaToC: 'Sayfa içindekiler',
      ariaMainNav: 'Ana navigasyon',
      ariaMobileNav: 'Mobil navigasyon',
      ariaSidebarNav: 'Kenar çubuğu navigasyonu',
      ariaLanguage: 'Dil seçin',
      ariaRepo: {
        before: '',
        after: ' deposu'
      }
    },

    localeLinks: [
      {
        link: 'https://vuejs.org',
        text: 'English',
        repo: 'https://github.com/vuejs/docs'
      },
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
        link: 'https://bn.vuejs.org',
        text: 'বাংলা',
        repo: 'https://github.com/vuejs-translations/docs-bn'
      },
      {
        link: 'https://it.vuejs.org',
        text: 'Italiano',
        repo: 'https://github.com/vuejs-translations/docs-it'
      },
      {
        link: 'https://fa.vuejs.org',
        text: 'فارسی',
        repo: 'https://github.com/vuejs-translations/docs-fa'
      },
      {
        link: 'https://ru.vuejs.org',
        text: 'Русский',
        repo: 'https://github.com/vuejs-translations/docs-ru'
      },
      {
        link: 'https://cs.vuejs.org',
        text: 'Čeština',
        repo: 'https://github.com/vuejs-translations/docs-cs'
      },
      {
        link: 'https://zh-hk.vuejs.org',
        text: '繁體中文',
        repo: 'https://github.com/vuejs-translations/docs-zh-hk'
      },
      {
        link: 'https://pl.vuejs.org',
        text: 'Polski',
        repo: 'https://github.com/vuejs-translations/docs-pl'
      },
      {
        link: '/translations/',
        text: 'Çeviriye yardım edin!',
        isTranslationsDesc: true
      }
    ],

    algolia: {
      indexName: 'vuejs',
      appId: 'ML0LEBN7FQ',
      apiKey: '10e7a8b13e6aec4007343338ab134e05',
      searchParameters: {
        facetFilters: ['version:v3']
      },
      translations: {
        button: {
          buttonText: 'Ara',
          buttonAriaLabel: 'Ara'
        }
      }
    },

    carbonAds: {
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/' },
      { icon: 'twitter', link: 'https://x.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/vue' }
    ],

    editLink: {
      repo: 'vuejs/docs',
      text: 'Bu sayfayı GitHub’da düzenle'
    },

    footer: {
      license: {
        text: 'MIT Lisansı',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Telif hakkı © 2014–${new Date().getFullYear()} Evan You`
    }
  },

  markdown: {
    theme: 'github-dark',
    config(md) {
      md.use(headerPlugin).use(groupIconMdPlugin)
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
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    },
    plugins: [
      llmstxt({
        ignoreFiles: [
          'about/team/**/*',
          'about/team.md',
          'about/privacy.md',
          'about/coc.md',
          'developers/**/*',
          'ecosystem/themes.md',
          'examples/**/*',
          'partners/**/*',
          'sponsor/**/*',
          'index.md'
        ],
        customLLMsTxtTemplate: `\
# Vue.js

Vue.js — İlerici JavaScript Çatısı

## İçindekiler

{toc}`
      }) as Plugin,
      groupIconVitePlugin({
        customIcon: {
          cypress: 'vscode-icons:file-type-cypress',
          'testing library': 'logos:testing-library'
        }
      }) as Plugin
    ]
  }
})
