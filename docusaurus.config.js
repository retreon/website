module.exports = {
  title: 'Retreon',
  tagline: 'A toolkit for building better redux apps.',
  url: 'https://retreon.archetype.foundation',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'retreon',
  projectName: 'retreon',
  themeConfig: {
    navbar: {
      title: 'Retreon',
      logo: {
        alt: 'Retreon Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/creating-actions',
          label: 'API',
          position: 'right',
        },
        {
          href: 'https://github.com/retreon/retreon',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    algolia: {
      apiKey: 'bcc4f4a52b8e9c5dc8bf70aebbb86daf',
      indexName: 'archetype',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl:
            'https://github.com/retreon/website/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
