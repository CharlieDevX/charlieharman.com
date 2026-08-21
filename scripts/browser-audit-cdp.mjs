const [webSocketUrl, baseUrl = 'http://127.0.0.1:4321'] = process.argv.slice(2);

if (!webSocketUrl) {
  console.error('Usage: node scripts/browser-audit-cdp.mjs <websocket> [base-url]');
  process.exit(1);
}

const routes = [
  '/',
  '/projects/',
  '/projects/howie-helper/',
  '/projects/ghostgrid/',
  '/projects/homelab/',
  '/about/',
  '/contact/',
  '/404.html',
];
const viewports = [320, 768, 1440];
const socket = new WebSocket(webSocketUrl);
const pending = new Map();
let messageId = 0;

const opened = new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

function command(method, params = {}) {
  const id = ++messageId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

await opened;
await command('Page.enable');
await command('Emulation.setEmulatedMedia', {
  features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
});

const failures = [];

for (const width of viewports) {
  await command('Emulation.setDeviceMetricsOverride', {
    width,
    height: width <= 320 ? 720 : 1000,
    deviceScaleFactor: 1,
    mobile: width <= 768,
    screenWidth: width,
    screenHeight: width <= 320 ? 720 : 1000,
  });

  for (const route of routes) {
    await command('Page.navigate', { url: new URL(route, baseUrl).href });
    await new Promise((resolve) => setTimeout(resolve, 250));

    const result = await command('Runtime.evaluate', {
      expression: `(() => {
        const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((heading) => Number(heading.tagName[1]));
        const skippedHeading = headings.some((level, index) => index > 0 && level > headings[index - 1] + 1);
        const linksWithoutNames = [...document.querySelectorAll('a[href]')]
          .filter((link) => link.getAttribute('aria-hidden') !== 'true')
          .filter((link) => !(link.getAttribute('aria-label') || link.textContent.trim())).length;
        const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
        const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
        const navLink = document.querySelector('.site-header nav a');
        navLink?.focus();
        const focusStyle = navLink ? getComputedStyle(navLink) : null;
        const motionTarget = document.querySelector('.button') || document.querySelector('a');
        const motionStyle = motionTarget ? getComputedStyle(motionTarget) : null;
        return {
          innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          h1Count: document.querySelectorAll('h1').length,
          skippedHeading,
          linksWithoutNames,
          imagesWithoutAlt: document.querySelectorAll('img:not([alt])').length,
          duplicateIds: [...new Set(duplicateIds)],
          hasMain: Boolean(document.querySelector('main')),
          hasNavLabel: Boolean(document.querySelector('nav[aria-label]')),
          lang: document.documentElement.lang,
          reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
          transitionDuration: motionStyle?.transitionDuration || '',
          focusVisible: Boolean(navLink?.matches(':focus-visible')),
          focusOutline: focusStyle?.outlineStyle || '',
          title: document.title,
        };
      })()`,
      returnByValue: true,
    });

    const audit = result.result.value;
    const label = `${route} at ${width}px`;
    if (audit.innerWidth !== width) failures.push(`${label}: viewport is ${audit.innerWidth}px`);
    if (audit.scrollWidth > width) failures.push(`${label}: horizontal overflow to ${audit.scrollWidth}px`);
    if (audit.h1Count !== 1) failures.push(`${label}: found ${audit.h1Count} h1 elements`);
    if (audit.skippedHeading) failures.push(`${label}: skipped heading level`);
    if (audit.linksWithoutNames) failures.push(`${label}: ${audit.linksWithoutNames} unnamed link(s)`);
    if (audit.imagesWithoutAlt) failures.push(`${label}: ${audit.imagesWithoutAlt} image(s) without alt`);
    if (audit.duplicateIds.length) failures.push(`${label}: duplicate IDs ${audit.duplicateIds.join(', ')}`);
    if (!audit.hasMain || !audit.hasNavLabel || audit.lang !== 'en') failures.push(`${label}: landmark or language issue`);
    if (!audit.reducedMotion || Number.parseFloat(audit.transitionDuration) > 0.001) failures.push(`${label}: reduced-motion override is not active`);
    if (!audit.focusVisible || audit.focusOutline === 'none') failures.push(`${label}: focus-visible outline is not active`);
  }
}

socket.close();

if (failures.length) {
  console.error(`Browser audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Browser audit passed: ${routes.length} routes × ${viewports.length} viewports, with no overflow, heading, naming, landmark, image-alt, duplicate-ID, focus, or reduced-motion issues.`);
