import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { CONTACT_EMAIL } from '../src/config.mjs';

const root = new URL('../dist/', import.meta.url).pathname;
const expectedRoutes = [
  '/',
  '/projects/',
  '/projects/howie-helper/',
  '/projects/ghostgrid/',
  '/projects/homelab/',
  '/about/',
  '/contact/',
  '/ghostgrid-privacy/',
  '/404.html',
];

const errors = [];
const htmlFiles = [];

function collect(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) collect(path);
    if (entry.isFile() && extname(path) === '.html') htmlFiles.push(path);
  }
}

function routeTarget(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (cleanPath === '/') return join(root, 'index.html');
  if (cleanPath.endsWith('/')) return join(root, cleanPath, 'index.html');
  return join(root, cleanPath);
}

function count(source, expression) {
  return [...source.matchAll(expression)].length;
}

if (!existsSync(root)) {
  console.error('dist/ does not exist. Run npm run build first.');
  process.exit(1);
}

collect(root);

for (const route of expectedRoutes) {
  const target = routeTarget(route);
  if (!existsSync(target)) errors.push(`Missing expected route: ${route}`);
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const label = relative(root, file);

  const requirements = [
    ['one <title>', count(html, /<title>[^<]+<\/title>/gi) === 1],
    ['one description', count(html, /<meta name="description" content="[^"]+">/gi) === 1],
    ['one canonical', count(html, /<link rel="canonical" href="https:\/\/charlieharman\.com\/[^"]*">/gi) === 1],
    ['Open Graph title', count(html, /<meta property="og:title" content="[^"]+">/gi) === 1],
    ['Open Graph description', count(html, /<meta property="og:description" content="[^"]+">/gi) === 1],
    ['Open Graph image', count(html, /<meta property="og:image" content="https:\/\/charlieharman\.com\/og-default\.png">/gi) === 1],
    ['Twitter card', count(html, /<meta name="twitter:card" content="summary_large_image">/gi) === 1],
    ['exactly one h1', count(html, /<h1(?:\s[^>]*)?>/gi) === 1],
  ];

  for (const [requirement, passed] of requirements) {
    if (!passed) errors.push(`${label}: expected ${requirement}`);
  }

  for (const hrefMatch of html.matchAll(/<a\b[^>]*\shref="([^"]+)"[^>]*>/gi)) {
    const href = hrefMatch[1];
    const anchor = hrefMatch[0];

    if (href.startsWith('/')) {
      if (!existsSync(routeTarget(href))) errors.push(`${label}: broken internal link ${href}`);
    }

    if (/^https?:\/\//.test(href) && !href.startsWith('https://howiehelper.app')) {
      errors.push(`${label}: unapproved external link ${href}`);
    }

    if (/^https?:\/\//.test(href) && (!/target="_blank"/.test(anchor) || !/rel="noreferrer"/.test(anchor))) {
      errors.push(`${label}: external link lacks target/rel treatment ${href}`);
    }
  }
}

const builtText = htmlFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
const forbidden = [
  'api.howiehelper.app',
  'powersync.howiehelper.app',
  'localhost',
  '127.0.0.1',
  'example.com',
  'github.com',
  'linkedin.com',
  'href="#"',
  'TODO',
  'hoffmann555@outlook.com',
];

for (const value of forbidden) {
  if (builtText.toLowerCase().includes(value.toLowerCase())) errors.push(`Built output contains forbidden placeholder/private value: ${value}`);
}

if (!builtText.includes(`mailto:${CONTACT_EMAIL}`)) errors.push('Public email action is missing.');
if (!builtText.includes('href="https://howiehelper.app"')) errors.push('Howie Helper public app link is missing.');
if (!existsSync(join(root, 'robots.txt'))) errors.push('robots.txt is missing.');
if (!existsSync(join(root, 'sitemap-index.xml'))) errors.push('sitemap-index.xml is missing.');
if (!existsSync(join(root, 'favicon.svg'))) errors.push('favicon.svg is missing.');
if (!existsSync(join(root, 'og-default.png'))) errors.push('Open Graph image is missing.');

if (errors.length) {
  console.error(`Site audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Site audit passed: ${htmlFiles.length} HTML pages, ${expectedRoutes.length} expected routes, metadata, internal links, public actions, and privacy checks.`);
