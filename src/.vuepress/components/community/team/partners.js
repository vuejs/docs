import { shuffle } from 'lodash'

export default shuffle([
  {
    name: 'Maria Lamardo',
    title: 'Front End Engineer at Pendo',
    city: 'Raleigh, NC, USA',
    languages: ['en', 'es'],
    work: {
      role: 'Front End Engineer',
      org: 'Pendo'
    },
    github: 'mlama007',
    twitter: 'MariaLamardo',
    reposPersonal: ['vuejs/events']
  },
  {
    name: 'Pratik Patel',
    title: 'Organizer of VueConf US',
    city: 'Atlanta, GA, USA',
    languages: ['en'],
    work: {
      role: 'Organizer',
      org: 'VueConf US'
    },
    twitter: 'prpatel',
    links: ['https://us.vuejs.org/']
  },
  {
    name: 'Vincent Mayers',
    title: 'Organizer of VueConf US',
    city: 'Atlanta, GA, USA',
    languages: ['en'],
    work: {
      role: 'Organizer',
      org: 'VueConf US'
    },
    twitter: 'vincentmayers',
    links: ['https://us.vuejs.org/']
  },
  {
    name: 'Luke Thomas',
    title: 'Creator of Vue.js Amsterdam',
    city: 'Amsterdam, Netherlands',
    languages: ['nl', 'en', 'de'],
    work: {
      role: 'Creator',
      org: 'Vue.js Amsterdam'
    },
    twitter: 'lukevscostas',
    linkedin: 'luke-kenneth-thomas-578b3916a',
    links: ['https://vuejs.amsterdam']
  },
  {
    name: 'Jos Gerards',
    title: 'Organizer and Host of Vue.js Amsterdam & Frontend Love',
    city: 'Amsterdam, Netherlands',
    languages: ['nl', 'en', 'de'],
    work: {
      role: 'Event Manager',
      org: 'Vue.js Amsterdam'
    },
    twitter: 'josgerards88',
    linkedin: 'josgerards',
    links: ['https://vuejs.amsterdam']
  },
  {
    name: 'Jen Looper',
    title: 'Queen Fox',
    city: 'Boston, MA, USA',
    languages: ['en', 'fr'],
    work: {
      role: 'CEO',
      org: 'Vue Vixens'
    },
    github: 'jlooper',
    twitter: 'jenlooper',
    links: ['https://vuevixens.org/', 'https://nativescript-vue.org/']
  },
  {
    name: 'Alex Jover',
    title: 'Vue Components Squeezer',
    city: 'Alicante, Spain',
    languages: ['es', 'en'],
    work: {
      role: 'Web, PWA and Performance Consultant',
      org: 'Freelance'
    },
    github: 'alexjoverm',
    twitter: 'alexjoverm',
    reposPersonal: ['v-runtime-template', 'v-lazy-image', 'vue-testing-series'],
    links: ['https://alexjover.com']
  },
  {
    name: 'Sebastien Chopin',
    title: '#1 Nuxt Brother',
    city: 'Bordeaux, France',
    languages: ['fr', 'en'],
    github: 'Atinux',
    twitter: 'Atinux',
    work: {
      org: 'NuxtJS',
      orgUrl: 'https://nuxtjs.org'
    },
    reposPersonal: ['nuxt/*', 'nuxt-community/*', 'nuxt/vue-meta']
  },
  {
    name: 'Alexandre Chopin',
    title: '#1 Nuxt Brother',
    city: 'Bordeaux, France',
    languages: ['fr', 'en'],
    github: 'alexchopin',
    twitter: 'iamnuxt',
    work: {
      org: 'NuxtJS',
      orgUrl: 'https://nuxtjs.org'
    },
    reposPersonal: ['nuxt/*', 'nuxt-community/*', 'vue-flexboxgrid']
  },
  {
    name: 'Khary Sharpe',
    title: 'Viral Newscaster',
    city: 'Kingston, Jamaica',
    languages: ['en'],
    github: 'kharysharpe',
    twitter: 'kharysharpe',
    links: ['https://twitter.com/VueJsNews', 'http://www.kharysharpe.com/']
  },
  {
    name: 'Pooya Parsa',
    title: 'Nuxtification Modularizer',
    city: 'Tehran, Iran',
    languages: ['fa', 'en'],
    github: 'pi0',
    twitter: '_pi0_',
    work: {
      role: 'Technical Advisor',
      org: 'Fandogh (AUT University)',
      orgUrl: 'https://fandogh.org'
    },
    reposPersonal: ['nuxt/*', 'nuxt-community/*', 'bootstrap-vue/*']
  },
  {
    name: 'Xin Du',
    title: 'Nuxpert',
    city: 'Dublin, Ireland',
    languages: ['zh', 'en'],
    github: 'clarkdo',
    twitter: 'ClarkDu_',
    reposPersonal: ['nuxt/*', 'nuxt-community/*']
  },
  {
    name: 'Yi Yang',
    city: 'Shanghai, China',
    title: 'Interface Elementologist',
    languages: ['zh', 'en'],
    github: 'Leopoldthecoder',
    work: {
      org: 'ele.me',
      orgUrl: 'https://www.ele.me'
    },
    reposPersonal: ['elemefe/element', 'elemefe/mint-ui']
  },
  {
    name: 'Bruno Lesieur',
    title: 'French Community Director',
    city: 'Annecy, France',
    languages: ['fr', 'en'],
    github: 'Haeresis',
    twitter: 'ZetesEthique',
    work: {
      role: 'Cofounder',
      org: 'Orchard ID',
      orgUrl: 'https://www.orchard-id.com/'
    },
    reposPersonal: ['vuejs-fr/*', 'Haeresis/node-atlas-hello-vue'],
    links: ['https://node-atlas.js.org/', 'https://blog.lesieur.name/']
  },
  {
    name: 'ChangJoo Park',
    title: 'Vuenthusiastic Korean Community Organizer',
    city: 'Seoul, South Korea',
    languages: ['ko', 'en'],
    github: 'changjoo-park',
    twitter: 'pcjpcj2',
    reposPersonal: [
      'vuejs-kr/kr.vuejs.org',
      'ChangJoo-Park/vue-component-generator'
    ],
    links: ['https://vuejs-kr.github.io', 'https://twitter.com/pcjpcj2']
  },
  {
    name: 'Erick Petrucelli',
    title: 'Perfectionist Chief Translator for Portuguese',
    city: 'Taquaritinga, Brazil',
    languages: ['pt', 'en'],
    github: 'ErickPetru',
    twitter: 'erickpetru',
    work: {
      role: 'Teacher',
      org: 'Fatec Taquaritinga',
      orgUrl: 'http://www.fatectq.edu.br/'
    },
    reposPersonal: ['vuejs-br/br.vuejs.org', 'ErickPetru/vue-feathers-chat']
  },
  {
    name: 'Razvan Stoenescu',
    title: 'Deep Space Quasar Creator',
    city: 'Bucharest, Romania',
    languages: ['ro', 'en'],
    github: 'rstoenescu',
    twitter: 'quasarframework',
    work: {
      role: 'Author',
      org: 'Quasar Framework',
      orgUrl: 'http://quasar.dev/'
    },
    reposPersonal: [
      'quasarframework/quasar'
    ],
    links: ['https://quasar.dev']
  },
  {
    name: 'Jilson Thomas',
    title: 'Vue Promoter and VueJobs Guy',
    city: 'Toronto, Canada',
    languages: ['en'],
    github: 'JillzTom',
    twitter: 'jilsonthomas',
    work: {
      role: 'Senior Frontend Developer',
      org: 'Nominator',
      orgUrl: 'https://nominator.com/'
    },
    links: ['https://vuejobs.com']
  },
  {
    name: 'Israel Ortuño',
    title: 'VueJobs Buccaneer',
    city: 'Alicante, Spain',
    languages: ['es', 'en'],
    github: 'IsraelOrtuno',
    twitter: 'IsraelOrtuno',
    work: {
      role: 'Full Stack Web Developer',
      org: 'Freelance'
    },
    links: ['https://vuejobs.com']
  },
  {
    name: 'John Leider',
    title: 'Vuetiful Framework Sculptor',
    city: 'Fort Worth, TX, USA',
    languages: ['en'],
    github: 'vuetifyjs',
    twitter: 'vuetifyjs',
    work: {
      role: 'CEO',
      org: 'Vuetify LLC',
      orgUrl: 'https://vuetifyjs.com'
    },
    reposPersonal: ['vuetifyjs/vuetify']
  },
  {
    name: 'Grigoriy Beziuk',
    title: 'Translation Gang Leader',
    city: 'Moscow, Russia',
    languages: ['ru', 'de', 'en'],
    github: 'gbezyuk',
    work: {
      role: 'Full Stack Web Developer',
      org: 'Self Employed',
      orgUrl: 'http://gbezyuk.ru'
    },
    reposPersonal: ['translation-gang/ru.vuejs.org']
  },
  {
    name: 'Alexander Sokolov',
    title: 'Russian Translation Sharp Eye',
    city: 'Krasnodar, Russia',
    languages: ['ru', 'en'],
    github: 'Alex-Sokolov',
    reposPersonal: ['translation-gang/ru.vuejs.org']
  },
  {
    name: 'Anthony Gore',
    title: '',
    city: 'Sydney, Australia',
    languages: ['en'],
    github: 'anthonygore',
    twitter: 'anthonygore',
    work: {
      role: 'Author',
      org: 'Vue.js Developers',
      orgUrl: 'https://vuejsdevelopers.com/'
    },
    links: ['https://vuejsdevelopers.com']
  },
  {
    name: 'EGOIST',
    title: 'Build Tool Simplificator',
    city: 'Chengdu, China',
    languages: ['zh', 'en'],
    github: 'egoist',
    twitter: '_egoistlily',
    reposPersonal: ['poi', 'ream', 'vue-play']
  },
  {
    name: 'Alex Kyriakidis',
    title: 'Vueducator Extraordinaire',
    city: 'Thessaloniki, Greece',
    languages: ['el', 'en'],
    github: 'hootlex',
    twitter: 'hootlex',
    work: {
      role: 'Consultant / Author'
    },
    reposPersonal: ['vuejs-paginator', 'vuedo/vuedo', 'the-majesty-of-vuejs-2'],
    links: ['https://vuejsfeed.com/', 'https://vueschool.io/']
  },
  {
    name: 'Rolf Haug',
    title: 'Educator & Consultant',
    city: 'Oslo, Norway',
    languages: ['en', 'no'],
    github: 'rahaug',
    twitter: 'rahaug',
    work: {
      role: 'Educator & Co-founder',
      org: 'Vue School',
      orgUrl: 'https://vueschool.io/'
    },
    links: ['https://vueschool.io/', 'https://rah.no']
  },
  {
    name: 'Andrew Tomaka',
    title: 'The Server Server',
    city: 'East Lansing, MI, USA',
    languages: ['en'],
    github: 'atomaka',
    twitter: 'atomaka',
    reposOfficial: ['vuejs/*'],
    work: {
      org: 'Michigan State University',
      orgUrl: 'https://msu.edu/'
    },
    links: ['https://atomaka.com/']
  },
  {
    name: 'Blake Newman',
    title: 'Performance Specializer & Code Deleter',
    city: 'London, UK',
    languages: ['en'],
    work: {
      role: 'Software Engineer',
      org: 'Attest',
      orgUrl: 'https://www.askattest.com/'
    },
    github: 'blake-newman',
    twitter: 'blakenewman',
    links: ['https://vuejs.london']
  },
  {
    name: 'Filip Rakowski',
    title: 'eCommerce & PWA mastah',
    city: 'Wrocław, Poland',
    languages: ['pl', 'en'],
    github: 'filrak',
    twitter: 'filrakowski',
    work: {
      role: 'Co-founder of Vue Storefront',
      org: 'Divante',
      orgUrl: 'https://divante.co/'
    },
    reposPersonal: ['DivanteLtd/vue-storefront', 'DivanteLtd/storefront-ui'],
    links: ['https://vuestorefront.io', 'https://storefrontui.io']
  },
  {
    name: 'Gregg Pollack',
    title: '',
    city: 'Orlando, FL, USA',
    languages: ['en'],
    github: 'gregg',
    twitter: 'greggpollack',
    work: {
      role: 'Vue Instructor',
      org: 'Vue Mastery',
      orgUrl: 'https://www.vuemastery.com/'
    },
    links: ['https://www.vuemastery.com', 'https://news.vuejs.org/']
  },
  {
    name: 'Adam Jahr',
    title: '',
    city: 'Orlando, FL, USA',
    languages: ['en'],
    github: 'atomjar',
    twitter: 'adamjahr',
    work: {
      role: 'Vue Instructor',
      org: 'Vue Mastery',
      orgUrl: 'https://www.vuemastery.com/'
    },
    links: ['https://www.vuemastery.com', 'https://news.vuejs.org/']
  }
])
