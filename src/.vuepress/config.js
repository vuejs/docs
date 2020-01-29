module.exports = {
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',
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
      { text: 'Community', link: '/community/' }
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
          children: ['component-registration', 'component-props']
        }
      ]
    }
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
