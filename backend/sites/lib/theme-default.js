export default function(site, config) {
  config.modules = {
    ...config.modules,
    'theme-default': {
      options: {
        shortName: site.shortName
      }
    }
  };
};
