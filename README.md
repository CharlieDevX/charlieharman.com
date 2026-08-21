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

## Cloudflare Workers deployment

The site deploys to Cloudflare Workers static assets via Workers Builds. Configuration lives in
`wrangler.jsonc` (`assets.directory` is `./dist`) and `.node-version` pins the build image to Node 22.

1. Push this repository to the Git provider connected to Cloudflare.
2. In **Workers & Pages**, create an application and import this repository.
3. Use `npm run build` as the build command and `npx wrangler deploy` as the deploy command. The
   output directory and Node version come from `wrangler.jsonc` and `.node-version`, not the
   dashboard. No server adapter is required — `astro.config.mjs` is `output: 'static'`.
4. Deploy. Every push to `main` rebuilds and republishes automatically.
5. Open the Worker's **Domains & Routes** panel and add `charlieharman.com` (and optionally
   `www.charlieharman.com` redirecting to the apex). With the domain already on Cloudflare DNS, the
   record and TLS certificate are provisioned automatically.
6. After DNS and TLS are active, verify `/`, all project routes, `/sitemap-index.xml`, `/robots.txt`,
   and the custom 404 on the production hostname.

Reference: [Cloudflare Workers — Astro framework guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)

## Content and privacy

Project records live in `src/content/projects/` and are validated by `src/content.config.ts`. GhostGrid and homelab material is intentionally generalized. Do not add real hostnames, private URLs, credentials, customer data, topology, or control endpoints to public content or assets.

The initial release intentionally has no analytics, accounts, payments, CMS, contact backend, public résumé, or unverified profile links.
