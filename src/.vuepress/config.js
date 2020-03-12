const sidebar = {
  guide: [
    {
      title: 'Essentials',
      collapsable: false,
      children: [
        '/guide/installation',
        '/guide/introduction',
        '/guide/instance',
        '/guide/template-syntax',
        '/guide/computed',
        '/guide/class-and-style',
        '/guide/conditional',
        '/guide/list',
        '/guide/events',
        '/guide/forms',
        '/guide/component-basics'
      ]
    },
    {
      title: 'Components In-Depth',
      collapsable: false,
      children: [
        '/guide/component-registration',
        '/guide/component-props',
        '/guide/component-custom-events',
        '/guide/component-slots',
        '/guide/component-provide-inject'
      ]
    }
  ]
}

module.exports = {
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',
  head: [
    ['link', {
      href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
      rel: 'stylesheet'
    }]
  ],
  themeConfig: {
    nav: [
      {
        text: 'Docs',
        ariaLabel: 'Documentation Menu',
        items: [
          { text: 'Guide', link: '/guide/introduction' },
          { text: 'Styleguide', link: '/styleguide/' },
          { text: 'Tooling', link: '/tooling/' }
        ]
      },
      { text: 'API Reference', link: '/api/' },
      {
        text: 'Examples',
        ariaLabel: 'Examples Menu',
        items: [
          { text: 'Examples', link: '/examples/' },
          { text: 'Cookbook', link: '/cookbook/' }
        ]
      },
      {
        text: 'Community',
        ariaLabel: 'Community Menu',
        items: [
          { text: 'Team', link: '/community/team/' },
          { text: 'Partners', link: '/community/partners/' }
        ]
      }
    ],
    sidebarDepth: 2,
    sidebar: {
      '/guide/': sidebar.guide,
      '/community/': sidebar.guide
    },
    smoothScroll: false
  },
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        '/': {
          message: 'New content is available.',
          buttonText: 'Refresh'
        }
      }
    }
  }
}
