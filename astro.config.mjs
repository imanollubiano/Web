import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://imanol.info',
  output: 'static',
  compressHTML: true,

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  build: {
    inlineStylesheets: 'auto',
  },

  integrations: [sitemap()],
});