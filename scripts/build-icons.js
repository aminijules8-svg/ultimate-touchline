// scripts/build-icons.js
// Regenerates all brand raster assets from public/brand/touchline-icon.svg
// Run: node scripts/build-icons.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ICON = path.join(ROOT, 'public/brand/touchline-icon.svg');
const OUT = path.join(ROOT, 'public/brand');
const SRC = sharp(ICON);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  // Favicons
  await SRC.clone().resize(32).toFile(path.join(OUT, 'favicon-32.png'));
  await SRC.clone().resize(48).toFile(path.join(OUT, 'favicon-48.png'));
  await SRC.clone().resize(64).toFile(path.join(OUT, 'favicon-64.png'));

  // Apple touch icon 180x180 (icon is square, use as-is)
  await SRC.clone().resize(180).toFile(path.join(OUT, 'apple-touch-icon.png'));

  // PWA icons
  await SRC.clone().resize(192).toFile(path.join(OUT, 'icon-192.png'));
  await SRC.clone().resize(512).toFile(path.join(OUT, 'icon-512.png'));

  // Maskable icon 512 with safe-zone padding (icon designed at 512; pad to 1024 then crop 512 centre)
  const padded = await SRC.clone().resize(1024).toBuffer();
  await sharp({ create: { width: 1024, height: 1024, channels: 4, background: '#0A1C15' } })
    .composite([{ input: padded, blend: 'over' }])
    .resize(512)
    .toFile(path.join(OUT, 'icon-maskable-512.png'));

  // favicon.svg (copy of icon)
  fs.copyFileSync(ICON, path.join(OUT, 'favicon.svg'));

  // Monochrome mask icon (single colour)
  const monoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><rect width="512" height="512" rx="116" fill="#000"/><rect x="232" y="150" width="48" height="230" rx="24" fill="#fff"/><rect x="116" y="150" width="280" height="48" rx="24" fill="#fff"/><circle cx="352" cy="312" r="30" fill="#fff"/></svg>`;
  fs.writeFileSync(path.join(OUT, 'icon-mask.svg'), monoSvg);

  // OG image 1200x630 — dark logo centred with tagline
  const darkLogo = path.join(OUT, 'touchline-logo-dark.svg');
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: '#0A1C15' },
  })
    .composite([
      { input: await sharp(darkLogo).resize(760).toBuffer(), top: 60, left: 220 },
    ])
    .jpeg({ quality: 92 })
    .toFile(path.join(OUT, 'og-image.png'));

  console.log('Icons built OK');
})().catch((e) => { console.error(e); process.exit(1); });