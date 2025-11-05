/**
 * Shared Sites configuration
 *
 * Enabling and configuring a module here will allow the
 * module to be used as configured on all sites.
 *
 * Apostrophe configuration for your hosted sites.
 * Just one config for all of them; per-site config could be
 * user editable settings in @apostrophecms/global.
 * You can also do much more in `sites/lib/modules`,
 * following Apostrophe's usual patterns
 */

// Helper function to get translation and SEO modules
const getTranslationAndSeoModules = () => {
  const entries = [];

  // NOTE: if you set one of the environment variable below
  // please restart the backend server with APOS_DEV=1
  // It will rebuild the admin UI with the new components
  const hasOpenAI = process.env.OPENAI_API_KEY;
  const deepl = process.env.APOS_DEEPL_API_SECRET;
  const google = process.env.APOS_GOOGLE_API_SECRET;
  const azure = process.env.APOS_AZURE_API_SECRET;

  const translationEnabled = !!(deepl || google || azure);

  // More explicit approach for provider selection
  let translationProvider = null;
  if (deepl) {
    translationProvider = 'deepl';
  } else if (google) {
    translationProvider = 'google';
  } else if (azure) {
    translationProvider = 'azure';
  }

  if (hasOpenAI || translationEnabled) {
    // Always comes first if any of the modules are present
    entries.push([
      '@apostrophecms-pro/automatic-translation',
      {
        options: {
          enabled: translationEnabled,
          ...(translationProvider && { provider: translationProvider })
        }
      }
    ]);

    if (translationProvider) {
      entries.push([
        `@apostrophecms-pro/automatic-translation-${translationProvider}`,
        {}
      ]);
    }

    // Only add import-export-translation when automatic translation
    // is disabled (manual mode)
    if (!translationEnabled) {
      entries.push([ '@apostrophecms-pro/import-export-translation', {} ]);
    }
  }

  if (hasOpenAI) {
    entries.push([
      '@apostrophecms-pro/seo-assistant',
      {
        options: {
          provider: 'openai'
        }
      }
    ]);

    entries.push([ '@apostrophecms-pro/seo-assistant-openai', {} ]);
  }

  return Object.fromEntries(entries);
};

export default async function (site) {
  const config = {
    root: import.meta,
    // Theme name is globally available as apos.options.theme
    theme: site.theme,
    nestedModuleSubdirs: true,
    modules: {
      // Apostrophe module configuration
      // *******************************
      //
      // Most configuration occurs in the respective modules' directories.
      // See modules/@apostrophecms/page/index.js for an example.
      //
      // Any modules that are not present by default in Apostrophe must at least
      // have a minimal configuration here to turn them on: `moduleName: {}`

      // *********************************
      '@apostrophecms/vite': {},

      '@apostrophecms/uploadfs': {},
      '@apostrophecms/express': {},

      // `className` options set custom CSS classes for Apostrophe core widgets.
      '@apostrophecms/rich-text-widget': {},
      '@apostrophecms/image-widget': {},
      '@apostrophecms/video-widget': {},
      '@apostrophecms/asset': {},

      // helpers
      // Adds OpenGraph tags
      '@apostrophecms/open-graph': {},
      // Adds SEO Fields
      '@apostrophecms/seo': {},
      // Adds a page favicon
      '@apostrophecms/favicon': {},

      // pieces
      article: {},
      author: {},

      // pages
      'default-page': {},
      'article-page': {},

      // widgets
      'grid-layout-widget': {},
      'accordion-widget': {},
      'card-widget': {},
      'hero-widget': {},
      'link-widget': {},
      'slideshow-widget': {},
      'rows-widget': {},

      /*
      ==========================
      OPTIONAL PRO MODULES
      Some modules require options, such as credentials or provider config.
      ==========================
      */

      /*
       ℹ️For Advanced Permissions
      */
      '@apostrophecms-pro/advanced-permission-group': {},
      '@apostrophecms-pro/advanced-permission': {},

      /*
       ℹ️ The `@apostrophecms-pro/automatic-translation` module is needed
         for both SEO Assistant and Import Export Translations modules
       ℹ️ The provider will be set automatically by the environment variable
         and the helper method above. See the repo README for details
       ℹ️ The `@apostrophecms-pro/import-export-translation` doesn't require a key
      */
      ...getTranslationAndSeoModules(),

      '@apostrophecms-pro/document-versions': {},
      '@apostrophecms-pro/doc-template-library': {},
      '@apostrophecms-pro/section-template-library': {},
      '@apostrophecms-pro/section-template-tag': {},
      '@apostrophecms-pro/palette': {}
    }
  };

  /**
   * Allow each theme to modify the configuration object,
   * enabling additional modules etc.
   */
  const { default: theme } = await import(`./lib/theme-${site.theme}.js`);
  theme(site, config);

  return config;
};
