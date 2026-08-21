# charlieharman.com

Static portfolio for Charlie Harman, built with Astro and TypeScript.

Requires Node.js 22.12 or newer.

## Local development

```bash
npm install
npm run dev
```

Validation and production output:

```bash
npm run check
npm run build
npm run audit:site
```

The static site is generated in `dist/`.

## Cloudflare Pages deployment

1. Push this repository to the Git provider connected to Cloudflare.
2. In **Workers & Pages**, create a Pages application and select this repository.
3. Use `npm run build` as the build command and `dist` as the output directory. Set `NODE_VERSION` to `22` (at least `22.12.0`). No server adapter is required.
4. Deploy, then open the Pages project’s **Custom domains** panel and add `charlieharman.com` (and optionally `www.charlieharman.com` with a redirect to the apex).
5. If the domain already uses Cloudflare DNS, Pages provisions the required record and certificate. For external DNS, follow the CNAME target shown by Pages.
6. After DNS and TLS are active, verify `/`, all project routes, `/sitemap-index.xml`, `/robots.txt`, and the custom 404 on the production hostname.

Reference: [Cloudflare Pages — Deploy an Astro site](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)

## Content and privacy

Project records live in `src/content/projects/` and are validated by `src/content.config.ts`. GhostGrid and homelab material is intentionally generalized. Do not add real hostnames, private URLs, credentials, customer data, topology, or control endpoints to public content or assets.

The initial release intentionally has no analytics, accounts, payments, CMS, contact backend, public résumé, or unverified profile links.
