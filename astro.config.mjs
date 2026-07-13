import { defineConfig } from 'astro/config';

// Marketing pages that predate this setup live verbatim in public/ so they
// deploy byte-identical. New pages (the affiliate dashboard under /dash) are
// built from src/pages.
export default defineConfig({
  site: 'https://rewiremission.com',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  // Old tool pages were removed; send stragglers home.
  redirects: {
    '/tools': '/',
    '/tools/should-i-text-them': '/'
  }
});
