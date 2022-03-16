import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
import type { Config } from '@vue/theme'
import { UserConfig } from 'vitepress'

const nav = [
  {
    text: 'المستندات',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      { text: 'الدليل', link: '/guide/introduction' },
      { text: 'الدليل التطبيقي', link: '/tutorial/' },
      { text: 'الأمثلة', link: '/examples/' },
      { text: 'انطلاقة سريعة', link: '/guide/quick-start' },
      { text: 'دليل الأسلوب', link: '/style-guide/' },
      {
        text: ' Vue 2 الترقية من',
        link: 'https://v3-migration.vuejs.org/'
      }
    ]
  },
  {
    text: 'API مراجع',
    activeMatch: `^/api/`,
    link: '/api/'
  },
  {
    text: 'التجربة',
    link: 'https://sfc.vuejs.org'
  },
  {
    text: 'بيئة العمل',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'الموارد',
        items: [
          { text: 'شركاء', link: '/ecosystem/partners' },
          { text: '(Themes) قوالب', link: '/ecosystem/themes' },
          { text: 'وظائف', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: 'شراء تيشيرت', link: 'https://vue.threadless.com/' }
        ]
      },
      {
        text: 'دروس عبر الفيديو',
        items: [
          {
            text: 'Vue Mastery منصة',
            link: 'https://www.vuemastery.com/courses/'
          },
          {
            text: 'Vue School منصة',
            link: 'https://vueschool.io/?friend=vuejs&utm_source=Vuejs.org&utm_medium=Link&utm_content=Navbar%20Dropdown'
          }
        ]
      },
      {
        text: 'مساعدة',
        items: [
          {
            text: 'دردشة عبر منصة ديسكورد',
            link: 'https://discord.com/invite/HBherRA'
          },
          { text: 'المنتدى', link: 'https://forum.vuejs.org/' },
          { text: 'DEV Community على منصة vue وسم ', link: 'https://dev.to/t/vue' }
        ]
      },
      {
        text: 'المستجدات',
        items: [
          { text: 'المدونة', link: 'https://blog.vuejs.org/' },
          { text: 'تويتر', link: 'https://twitter.com/vuejs' },
          { text: 'النشرة البريدية', link: 'https://news.vuejs.org/' },
          { text: 'الفعاليات و المؤتمرات', link: 'https://events.vuejs.org/' }
        ]
      }
    ]
  },
  {
    text: 'حول',
    activeMatch: `^/about/`,
    items: [
      { text: 'الأسئلة الشائعة', link: '/about/faq' },
      { text: 'الفريق', link: '/about/team' },
      { text: 'الإصدارات', link: '/about/releases' },
      {
        text: 'دليل المجتمع',
        link: '/about/community-guide'
      },
      { text: 'القواعد السلوكية', link: '/about/coc' },
      {
        text: 'الوثائقي',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
  {
    text: 'الممولون',
    link: '/sponsor/'
  }
]

export const sidebar = {
  '/guide/': [
    {
      text: 'ابدأ',
      items: [
        { text: 'المقدمة', link: '/guide/introduction' },
        {
          text: 'انطلاقة سريعة',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: 'مبادئ أساسية',
      items: [
        {
          text: 'إنشاء تطبيق',
          link: '/guide/essentials/application'
        },
        {
          text: ' صيغة القالب ',
          link: '/guide/essentials/template-syntax'
        },
        {
          text: 'أساسيات التفاعل',
          link: '/guide/essentials/reactivity-fundamentals'
        },
        {
          text: 'الخصائص المحسوبة',
          link: '/guide/essentials/computed'
        },
        {
          text: 'ربط التنسيقات و الأصناف',
          link: '/guide/essentials/class-and-style'
        },
        {
          text: 'التصيير الشرطي',
          link: '/guide/essentials/conditional'
        },
        { text: 'تصيير القوائم', link: '/guide/essentials/list' },
        {
          text: 'معالجة الأحداث',
          link: '/guide/essentials/event-handling'
        },
        { text: 'ربط مداخل النموذج', link: '/guide/essentials/forms' },
        {
          text: 'خطافات دورة الحياة',
          link: '/guide/essentials/lifecycle'
        },
        { text: 'الخصائص المراقبة', link: '/guide/essentials/watchers' },
        { text: 'Refs مراجع القالب', link: '/guide/essentials/template-refs' },
        {
          text: 'أساسيات المكونات',
          link: '/guide/essentials/component-basics'
        }
      ]
    },
    {
      text: 'المكونات بالتفصيل',
      items: [
        {
          text: 'التسجيل',
          link: '/guide/components/registration'
        },
        { text: 'الخاصيات', link: '/guide/components/props' },
        { text: 'الأحداث', link: '/guide/components/events' },
        {
          text: 'السمات الإحتياطية',
          link: '/guide/components/attrs'
        },
        { text: 'الفتحات', link: '/guide/components/slots' },
        {
          text: 'تزويد/حقن',
          link: '/guide/components/provide-inject'
        },
        {
          text: 'المكونات اللاتزامنية',
          link: '/guide/components/async'
        }
      ]
    },
    {
      text: 'إعادة الإستخدام',
      items: [
        {
          text: 'التركيبات',
          link: '/guide/reusability/composables'
        },
        {
          text: 'سمات مُوجهة مخصصة',
          link: '/guide/reusability/custom-directives'
        },
        { text: 'الإضافات', link: '/guide/reusability/plugins' }
      ]
    },
    {
      text: 'مكونات مدمجة',
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
      text: 'الإرتقاء و التدرج',
      items: [
        { text: '(SFC) المكونات أحادية المستند', link: '/guide/scaling-up/sfc' },
        { text: 'الأدوات', link: '/guide/scaling-up/tooling' },
        { text: 'التوجيه', link: '/guide/scaling-up/routing' },
        {
          text: 'تسيير الحالة',
          link: '/guide/scaling-up/state-management'
        },
        { text: 'الإختبار', link: '/guide/scaling-up/testing' },
        {
          text: '(SSR) التصيير من الخادم',
          link: '/guide/scaling-up/ssr'
        }
      ]
    },
    {
      text: 'أحسن الممارسات',
      items: [
        {
          text: 'النشر الإنتاجي',
          link: '/guide/best-practices/production-deployment'
        },
        {
          text: 'الكفاءة',
          link: '/guide/best-practices/performance'
        },
        {
          text: 'شمولية الوصول',
          link: '/guide/best-practices/accessibility'
        },
        {
          text: 'الأمن',
          link: '/guide/best-practices/security'
        }
      ]
    },
    {
      text: 'التايبسكريبت',
      items: [
        { text: 'نظرة شاملة', link: '/guide/typescript/overview' },
        {
          text: 'و واجهة برمجة التطبيقات بالتكوين TS',
          link: '/guide/typescript/composition-api'
        },
        {
          text: 'و واجهة برمجة التطبيقات بالخيارات TS',
        
          link: '/guide/typescript/options-api'
        }
      ]
    },
    {
      text: 'مواضيع اضافية',
      items: [
        {
          text: 'Vue طرق استخام',
          link: '/guide/extras/ways-of-using-vue'
        },
        {
          text: 'الأسئلة الشائعة عن برمجة واجهة التطبيقات بالتكوين',
          link: '/guide/extras/composition-api-faq'
        },
        {
          text: 'التفاعلية بالتفصيل',
          link: '/guide/extras/reactivity-in-depth'
        },
        {
          text: 'آلية التصيير',
          link: '/guide/extras/rendering-mechanism'
        },
        {
          text: 'JSXدوال التصيير و ال',
          link: '/guide/extras/render-function'
        },
        {
          text: 'و مكونات الويب Vue',
          link: '/guide/extras/web-components'
        },
        {
          text: 'تقنيات التحريك',
          link: '/guide/extras/animation'
        },
        {
          text: 'تحويل التفاعل',
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
      text: 'واجهة برمجة التطبيقات العامة',
      items: [
        { text: 'التطبيق', link: '/api/application' },
        {
          text: 'عام',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'واجهة برمجة التطبيقات بالتكوين',
      items: [
        { text: 'setup()دالةال', link: '/api/composition-api-setup' },
        {
          text: 'التفاعلية: الأساسيات',
          link: '/api/reactivity-core'
        },
        {
          text: 'التفاعلية : الأدوات',
          link: '/api/reactivity-utilities'
        },
        {
          text: 'التفاعلية: الدليل المتقدم',
          link: '/api/reactivity-advanced'
        },
        {
          text: 'خطافات دورة الحياة',
          link: '/api/composition-api-lifecycle'
        },
        {
          text: 'حقن الإعتمادية',
          link: '/api/composition-api-dependency-injection'
        }
      ]
    },
    {
      text: 'واجهة برمجة التطبيقات بالخيارات',
      items: [
        { text: 'الخيارات : الحالة', link: '/api/options-state' },
        { text: 'الخيارات : التصيير', link: '/api/options-rendering' },
        {
          text: 'الخيارات : دورة الحياة',
          link: '/api/options-lifecycle'
        },
        {
          text: 'الخيارات : التركيب',
          link: '/api/options-composition'
        },
        { text: 'الخيارات : متفرقة', link: '/api/options-misc' },
        {
          text: 'نسخة مكون',
          link: '/api/component-instance'
        }
      ]
    },
    {
      text: 'عناصر مدمجة',
      items: [
        { text: 'السمات الموجهة', link: '/api/built-in-directives' },
        { text: 'المكونات', link: '/api/built-in-components' },
        {
          text: 'عناصر خاصة',
          link: '/api/built-in-special-elements'
        },
        {
          text: 'سمات خاصة',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'المكونات أحادية المستند',
      items: [
        { text: 'مواصفات الصيغة', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'CSSميزات ال', link: '/api/sfc-css-features' }
      ]
    },
    {
      text: 'واجهة برمجة التطبيقات متقدمة',
      items: [
        { text: 'دالة التصيير', link: '/api/render-function' },
        { text: 'التصيير من الخادم', link: '/api/ssr' },
        { text: 'TypeScriptأدوات النوع ل', link: '/api/utility-types' },
        { text: 'مصير مخصص', link: '/api/custom-renderer' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'أمثلة قاعدية ',
      items: [
        {
          text: 'مرحبا',
          link: '/examples/#hello-world'
        },
        {
          text: 'معالجة إدخالات المستخدم',
          link: '/examples/#handling-input'
        },
        {
          text: 'ربط السمات',
          link: '/examples/#attribute-bindings'
        },
        {
          text: 'الشروط و الحلقات',
          link: '/examples/#conditionals-and-loops'
        },
        {
          text: 'ربط النماذج',
          link: '/examples/#form-bindings'
        },
        {
          text: 'مكون بسيط',
          link: '/examples/#simple-component'
        }
      ]
    },
    {
      text: 'أمثلة تطبيقية',
      items: [
        {
          text: 'Markdown محرر',
          link: '/examples/#markdown'
        },
        {
          text: 'بحث عن بيانات',
          link: '/examples/#fetching-data'
        },
        {
          text: 'جدول مع خاصية الترتيب و البحث',
          link: '/examples/#grid'
        },
        {
          text: 'واجهة عرض شجرية',
          link: '/examples/#tree'
        },
        {
          text: 'SVG مخطط',
          link: '/examples/#svg'
        },
        {
          text: '  نافذة منبثقة مع خاصية الإنتقال', 
          link: '/examples/#modal'
        },
        {
          text: 'قائمة مع خاصية الإنتقال',
          link: '/examples/#list-transition'
        },
        {
          text: 'MVCقائمة مهام بال',
          link: '/examples/#todomvc'
        }
      ]
    },
    {
      // https://eugenkiss.github.io/7guis/
      text: '7 GUIs واجهات مستخدم رسومية  ',
      items: [
        {
          text: 'عداد',
          link: '/examples/#counter'
        },
        {
          text: 'محول درجة الحرارة',
          link: '/examples/#temperature-converter'
        },
        {
          text: 'حجز رحلات طيران',
          link: '/examples/#flight-booker'
        },
        {
          text: 'مؤقت',
          link: '/examples/#timer'
        },
        {
          text: 'CRUD',
          link: '/examples/#crud'
        },
        {
          text: 'راسم دائرة',
          link: '/examples/#circle-drawer'
        },
        {
          text: 'خلايا',
          link: '/examples/#cells'
        }
      ]
    }
  ],
  '/style-guide/': [
    {
      text: 'دليل الأسلوب',
      items: [
        {
          text: 'نظرة شاملة',
          link: '/style-guide/'
        },
        {
          text: 'أ - قواعد أساسية',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'ب - مقترح بقوة',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'ج - مقترح',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'د - استخدام بحذر',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

export default defineConfigWithTheme<Config>({
  extends: baseConfig as () => UserConfig<Config>,

  lang: 'en-US',
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],
  scrollOffset: 'header',

  head: [
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
      searchParameters: {
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
      text: 'Edit this page on GitHub'
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
      chunkSizeWarningLimit: Infinity,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunks/[name].[hash].js',
          manualChunks(id, ctx) {
            if (id.includes('gsap')) {
              return 'gsap'
            }
            if (id.includes('dynamics.js')) {
              return 'dynamics'
            }
            return moveToVendor(id, ctx)
          }
        }
      }
    },
    json: {
      stringify: true
    }
  },

  vue: {
    reactivityTransform: true
  }
})

const cache = new Map<string, boolean>()

/**
 * This is temporarily copied from Vite - which should be exported in a
 * future release.
 *
 * @TODO when this is exported by Vite, VitePress should ship a better
 * manual chunk strategy to split chunks for deps that are imported by
 * multiple pages but not all.
 */
function moveToVendor(id: string, { getModuleInfo }: any) {
  if (
    id.includes('node_modules') &&
    !/\.css($|\\?)/.test(id) &&
    staticImportedByEntry(id, getModuleInfo, cache)
  ) {
    return 'vendor'
  }
}

function staticImportedByEntry(
  id: string,
  getModuleInfo: any,
  cache: Map<string, boolean>,
  importStack: string[] = []
): boolean {
  if (cache.has(id)) {
    return cache.get(id) as boolean
  }
  if (importStack.includes(id)) {
    // circular deps!
    cache.set(id, false)
    return false
  }
  const mod = getModuleInfo(id)
  if (!mod) {
    cache.set(id, false)
    return false
  }

  if (mod.isEntry) {
    cache.set(id, true)
    return true
  }
  const someImporterIs = mod.importers.some((importer: string) =>
    staticImportedByEntry(
      importer,
      getModuleInfo,
      cache,
      importStack.concat(id)
    )
  )
  cache.set(id, someImporterIs)
  return someImporterIs
}
