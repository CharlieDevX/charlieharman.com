import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://charlieharman.com',
  output: 'static',
  integrations: [
    // /ghostgrid-privacy/ is reachable by direct URL only; keep it out of the sitemap.
    sitemap({ filter: (page) => !page.includes('/ghostgrid-privacy') }),
  ],
  build: {
    format: 'directory',
  },
});
