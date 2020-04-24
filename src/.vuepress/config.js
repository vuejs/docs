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
        '/guide/component-basics',
      ],
    },
    {
      title: 'Components In-Depth',
      collapsable: false,
      children: [
        '/guide/component-registration',
        '/guide/component-props',
        '/guide/component-custom-events',
        '/guide/component-slots',
        '/guide/component-provide-inject',
        '/guide/component-dynamic-async',
      ],
    },
    {
      title: 'Reusability & Composition',
      collapsable: false,
      children: ['/guide/mixins', '/guide/custom-directive']
    },
    {
      title: 'Migration to Vue 3',
      collapsable: true,
      children: ['migration'],
    },
    {
      title: 'Contribute to the Docs',
      collapsable: true,
      children: ['writing-guide'],
    },
  ],
}

module.exports = {
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',
  head: [
    [
      'link',
      {
        href:
          'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        rel: 'stylesheet',
      },
    ],
  ],
  themeConfig: {
    nav: [
      {
        text: 'Docs',
        ariaLabel: 'Documentation Menu',
        items: [
          { text: 'Guide', link: '/guide/introduction' },
          { text: 'Style Guide', link: '/style-guide/' },
          { text: 'Tooling', link: '/tooling/' },
        ],
      },
      { text: 'API Reference', link: '/api/' },
      {
        text: 'Examples',
        ariaLabel: 'Examples Menu',
        items: [
          { text: 'Examples', link: '/examples/' },
          { text: 'Cookbook', link: '/cookbook/' },
        ],
      },
      {
        text: 'Community',
        ariaLabel: 'Community Menu',
        items: [
          { text: 'Team', link: '/community/team/' },
          { text: 'Partners', link: '/community/partners/' },
          { text: 'Join', link: '/community/join/' },
          { text: 'Themes', link: '/community/themes/' },
        ],
      },
    ],
    sidebarDepth: 2,
    sidebar: {
      '/guide/': sidebar.guide,
      '/community/': sidebar.guide,
    },
    smoothScroll: false,
  },
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        '/': {
          message: 'New content is available.',
          buttonText: 'Refresh',
        },
      },
    },
  },
  markdown: {
    /** @param {import('markdown-it')} md */
    extendMarkdown: (md) => {
      md.options.highlight = require('./markdown/highlight')(
        md.options.highlight
      )
    },
  },
}
