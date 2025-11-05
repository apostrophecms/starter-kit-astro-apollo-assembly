import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import apostrophe from '@apostrophecms/apostrophe-astro';

// https://astro.build/config
export default defineConfig({
  output: "server",
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
    // Required for some hosting, like Heroku
    host: true
  },
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    apostrophe({
      // Yes, just localhost. This is the simplest and most efficient mode of operation:
      // apostrophe and astro on the same server. Individual sites such as the dashboard
      // or a particular customer site will still automatically be distinguished via the Host header.
      // Don't try to use dashboard.localhost here as that will confuse deployment environments
      // where subdomains of localhost don't automatically work
      aposHost: 'http://localhost:3000',
      widgetsMapping: './src/widgets',
      templatesMapping: './src/templates',
      includeResponseHeaders: [
        'content-security-policy',
        'strict-transport-security',
        'x-frame-options',
        'referrer-policy',
        'cache-control'
      ],
      excludeRequestHeaders: [
        // For hosting on multiple servers, block the host header
        // 'host'
      ]
    }),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true
        }
      }
    },
    ssr: {
      // Do not externalize the @apostrophecms/apostrophe-astro plugin, we need
      // to be able to use virtual: URLs there
      noExternal: ['@apostrophecms/apostrophe-astro']
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      }
    }
  }
});
