import { writeFileSync } from 'node:fs';

const [webSocketUrl, pageUrl, outputPath, widthArg, heightArg] = process.argv.slice(2);
const width = Number(widthArg);
const height = Number(heightArg);

if (!webSocketUrl || !pageUrl || !outputPath || !width || !height) {
  console.error('Usage: node scripts/capture-cdp.mjs <websocket> <url> <output> <width> <height>');
  process.exit(1);
}

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
await command('Emulation.setDeviceMetricsOverride', {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: width,
  screenHeight: height,
});
await command('Page.navigate', { url: pageUrl });
await new Promise((resolve) => setTimeout(resolve, 700));

const metrics = await command('Runtime.evaluate', {
  expression: '({innerWidth, innerHeight, scrollWidth: document.documentElement.scrollWidth, title: document.title})',
  returnByValue: true,
});
const screenshot = await command('Page.captureScreenshot', {
  format: 'png',
  captureBeyondViewport: false,
  fromSurface: true,
});

writeFileSync(outputPath, Buffer.from(screenshot.data, 'base64'));
socket.close();

const value = metrics.result.value;
console.log(`${value.title}: ${value.innerWidth}x${value.innerHeight}, scroll width ${value.scrollWidth}, saved ${outputPath}`);
