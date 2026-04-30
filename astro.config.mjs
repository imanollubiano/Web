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
    inlineStylesheets: 'always',
  },

  integrations: [
    sitemap({
      serialize(item) {
        if (item.url === 'https://imanol.info/') {
          item.priority   = 1.0;
          item.changefreq = 'monthly';
        } else if (item.url.startsWith('https://imanol.info/blog/')) {
          item.priority   = 0.8;
          item.changefreq = 'yearly';
        } else {
          item.priority   = 0.6;
          item.changefreq = 'monthly';
        }
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
});