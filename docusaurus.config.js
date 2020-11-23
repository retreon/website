module.exports = {
  title: 'Retreon',
  tagline: 'A toolkit for building better redux apps.',
  url: 'https://retreon.github.io',
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
          href: 'https://github.com/retreon/retreon',
          label: 'GitHub',
          position: 'right',
        },
      ],
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
            'https://github.com/retreon/website/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
