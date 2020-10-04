import { shuffle } from 'lodash'

const members = [
  {
    name: 'Evan You',
    title: 'Benevolent Dictator For Life',
    city: 'Jersey City, NJ, USA',
    languages: ['zh', 'en'],
    github: 'yyx990803',
    twitter: 'youyuxi',
    work: {
      role: 'Creator',
      org: 'Vue.js'
    },
    reposOfficial: ['vuejs/*', 'vuejs-templates/*'],
    links: ['https://www.patreon.com/evanyou']
  }
].concat(
  shuffle([
    {
      name: 'Eduardo',
      title: 'Real-Time Rerouter',
      city: 'Paris, France',
      languages: ['es', 'fr', 'en'],
      github: 'posva',
      twitter: 'posva',
      work: {
        role: 'Freelance Developer & Consultant'
      },
      reposOfficial: ['vuefire', 'vue-router'],
      reposPersonal: ['vuex-mock-store', 'vue-promised', 'vue-motion'],
      links: ['https://www.patreon.com/posva']
    },
    {
      name: 'Sodatea',
      city: 'Hangzhou, China',
      languages: ['zh', 'en'],
      github: 'sodatea',
      twitter: 'haoqunjiang',
      reposOfficial: ['vue-cli', 'vue-loader']
    },
    {
      name: 'Pine Wu',
      city: 'Shanghai, China',
      languages: ['zh', 'en', 'jp'],
      github: 'octref',
      twitter: 'octref',
      work: {
        role: 'Nomad'
      },
      reposOfficial: ['vetur']
    },
    {
      name: 'Jinjiang',
      city: 'Singapore',
      languages: ['zh', 'en'],
      github: 'jinjiang',
      twitter: 'zhaojinjiang',
      reposOfficial: ['cn.vuejs.org', 'vue-docs-zh-cn'],
      reposPersonal: [
        'vue-a11y-utils',
        'vue-mark-display',
        'mark2slides',
        'vue-keyboard-over'
      ]
    },
    {
      name: 'Katashin',
      title: 'One of a Type State Manager',
      city: 'Singapore',
      languages: ['jp', 'en'],
      work: {
        role: 'Software Engineer',
        org: 'ClassDo',
        orgUrl: 'https://classdo.com'
      },
      github: 'ktsn',
      twitter: 'ktsn',
      reposOfficial: ['vuex', 'vue-class-component'],
      reposPersonal: ['vue-designer']
    },
    {
      name: 'Kazupon',
      title: 'Validated Internationalizing Missionary',
      city: 'Tokyo, Japan',
      languages: ['jp', 'en'],
      github: 'kazupon',
      twitter: 'kazu_pon',
      work: {
        role: 'Engineer',
        org: 'PLAID, Inc.',
        orgUrl: 'https://plaid.co.jp'
      },
      reposOfficial: ['vuejs.org', 'jp.vuejs.org'],
      reposPersonal: [
        'vue-i18n',
        'vue-cli-plugin-i18n',
        'vue-i18n-loader',
        'eslint-plugin-vue-i18n',
        'vue-i18n-extensions',
        'vue-cli-plugin-p11n'
      ],
      links: ['https://www.patreon.com/kazupon']
    },
    {
      name: 'Rahul Kadyan',
      title: 'Ecosystem Glue Chemist',
      city: 'Bangalore, India',
      languages: ['hi', 'en'],
      work: {
        role: 'Software Engineer',
        org: 'Myntra',
        orgUrl: 'https://www.myntra.com/'
      },
      github: 'znck',
      twitter: 'znck0',
      reposOfficial: ['rollup-plugin-vue', 'vue-issue-helper'],
      reposPersonal: ['keynote', 'bootstrap-for-vue', 'vue-interop'],
      links: ['https://znck.me', 'https://www.codementor.io/znck']
    },
    {
      name: 'Linusborg',
      title: 'Hive-Mind Community Wrangler (Probably a Bot)',
      city: 'Mannheim, Germany',
      languages: ['de', 'en'],
      github: 'LinusBorg',
      twitter: 'Linus_Borg',
      reposOfficial: ['vuejs/*'],
      reposPersonal: ['portal-vue'],
      links: ['https://forum.vuejs.org/']
    },
    {
      name: 'Guillaume Chau',
      title: 'Client-Server Astronaut',
      city: 'Lyon, France',
      languages: ['fr', 'en'],
      github: 'Akryum',
      twitter: 'Akryum',
      work: {
        role: 'Frontend Developer',
        org: 'Livestorm',
        orgUrl: 'https://livestorm.co/'
      },
      reposOfficial: ['vue-devtools', 'vue-cli', 'vue-curated'],
      reposPersonal: [
        'vue-apollo',
        'vue-meteor',
        'vue-virtual-scroller',
        'v-tooltip'
      ],
      links: ['http://patreon.com/akryum']
    },
    {
      name: 'Sarah Drasner',
      city: 'Denver, CO, USA',
      languages: ['en'],
      work: {
        role: 'VP of Developer Experience',
        org: 'Netlify',
        orgUrl: 'https://url.netlify.com/HJ8X2mxP8'
      },
      github: 'sdras',
      twitter: 'sarah_edo',
      codepen: 'sdras',
      reposOfficial: ['vuejs.org'],
      reposPersonal: [
        'vue-vscode-snippets',
        'intro-to-vue',
        'vue-vscode-extensionpack',
        'ecommerce-netlify'
      ],
      links: ['https://sarah.dev/']
    },
    {
      name: 'Damian Dulisz',
      title: 'Dark Mage of Plugins, News, and Confs',
      city: 'Wrocław, Poland',
      languages: ['pl', 'en'],
      github: 'shentao',
      twitter: 'DamianDulisz',
      work: {
        role: 'Consultant'
      },
      reposOfficial: ['news.vuejs.org'],
      reposPersonal: ['shentao/vue-multiselect', 'shentao/vue-global-events']
    },
    {
      name: 'Michał Sajnóg',
      city: 'Poznań, Poland',
      languages: ['pl', 'en'],
      github: 'michalsnik',
      twitter: 'michalsnik',
      work: {
        role: 'Senior Frontend Developer / Team Leader',
        org: 'Netguru',
        orgUrl: 'https://netguru.co/'
      },
      reposOfficial: ['eslint-plugin-vue', 'vue-devtools'],
      reposPersonal: ['vue-computed-helpers', 'vue-content-placeholders']
    },
    {
      name: 'GU Yiling',
      city: 'Shanghai, China',
      languages: ['zh', 'en'],
      work: {
        role: 'Senior web developer',
        org: 'Baidu, inc.',
        orgUrl: 'https://www.baidu.com/'
      },
      github: 'Justineo',
      twitter: '_justineo',
      reposOfficial: ['vue', 'cn.vuejs.org'],
      reposPersonal: [
        'Justineo/vue-awesome',
        'ecomfe/vue-echarts',
        'ecomfe/veui'
      ]
    },
    {
      name: 'ULIVZ',
      city: 'Hangzhou, China',
      languages: ['zh', 'en'],
      work: {
        role: 'Senior Frontend Developer',
        org: 'AntFinancial',
        orgUrl: 'https://www.antfin.com'
      },
      github: 'ulivz',
      twitter: '_ulivz',
      reposOfficial: ['vuepress']
    },
    {
      name: 'Phan An',
      title: 'Backend Designer & Process Poet',
      city: 'Munich, Germany',
      languages: ['vi', 'en'],
      github: 'phanan',
      twitter: 'notphanan',
      work: {
        role: 'Engineering Team Lead',
        org: 'InterNations',
        orgUrl: 'https://www.internations.org/'
      },
      reposOfficial: ['vuejs.org'],
      reposPersonal: ['vuequery', 'vue-google-signin-button'],
      links: ['https://vi.vuejs.org', 'https://phanan.net/']
    },
    {
      name: 'Natalia Tepluhina',
      title: 'Fox Tech Guru',
      city: 'Kyiv, Ukraine',
      languages: ['uk', 'ru', 'en'],
      reposOfficial: ['vuejs.org', 'vue-cli'],
      work: {
        role: 'Staff Frontend Engineer',
        org: 'GitLab',
        orgUrl: 'https://gitlab.com/'
      },
      github: 'NataliaTepluhina',
      twitter: 'N_Tepluhina'
    },
    {
      name: 'Yosuke Ota',
      city: 'Kanagawa, Japan',
      languages: ['jp'],
      github: 'ota-meshi',
      twitter: 'omoteota',
      work: {
        role: 'Lead Web Engineer',
        org: 'Future Corporation',
        orgUrl: 'https://www.future.co.jp/'
      },
      reposOfficial: ['eslint-plugin-vue']
    },
    {
      name: 'Ben Hong',
      city: 'Washington, DC, USA',
      languages: ['en', 'zh'],
      work: {
        role: 'Developer Experience (DX) Engineer',
        org: 'Cypress.io'
      },
      reposOfficial: ['vuejs.org', 'vuepress', 'vuejs/events'],
      github: 'bencodezen',
      twitter: 'bencodezen',
      links: ['https://bencodezen.io/']
    },
    {
      name: 'Kia King Ishii',
      title: 'The optimist web designer/developer',
      city: 'Kanagawa, Japan',
      languages: ['en', 'jp'],
      work: {
        role: 'Tech Talent',
        org: 'Global Brain',
        orgUrl: 'https://globalbrains.com/'
      },
      github: 'kiaking',
      twitter: 'KiaKing85',
      reposOfficial: ['vuex'],
      reposPersonal: ['vuex-orm/*']
    },
    {
      name: 'Anthony Fu',
      city: 'Taipei, Taiwan',
      languages: ['zh', 'en'],
      github: 'antfu',
      twitter: 'antfu7',
      reposOfficial: ['composition-api'],
      reposPersonal: ['antfu/vueuse', 'antfu/vue-demi', 'vue-reactivity/*']
    }
  ])
)

export default members
