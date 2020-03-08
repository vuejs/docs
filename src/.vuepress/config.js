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
          { text: 'Team', link: '/community/team/' }
        ]
      }
    ],
    sidebarDepth: 2,
    sidebar: {
      '/guide/': [
        {
          title: 'Essentials',
          collapsable: true,
          children: [
            'installation',
            'introduction',
            'instance',
            'template-syntax',
            'computed',
            'class-and-style',
            'conditional',
            'list',
            'events',
            'forms',
            'component-basics'
          ]
        },
        {
          title: 'Components In-Depth',
          collapsable: true,
          children: [
            'component-registration',
            'component-props',
            'component-custom-events',
            'component-slots'
          ]
        }
      ]
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
