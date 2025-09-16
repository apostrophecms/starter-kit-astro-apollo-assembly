// This configures the @apostrophecms/page module to add a "home" page type to the
// pages menu

export default {
  options: {
    builders: {
      children: true,
      ancestors: {
        children: {
          depth: 2,
          relationships: false
        }
      }
    },
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: 'article-page',
        label: 'Article Page'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      }
    ]
  },
  handlers(self, options) {
    return {
      '@apostrophecms/page:beforeSend': {
        setTheme(req) {
          req.data.theme = self.apos.options.theme;
        }
      }
    };
  }
};
