import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

const sizes = [192, 384, 512];

async function generateIcons() {
  const sourceIcon = join(publicDir, 'icon.png');

  for (const size of sizes) {
    // Create square icon with padding/centering
    await sharp(sourceIcon)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 26, g: 26, b: 46, alpha: 1 } // #1a1a2e
      })
      .png()
      .toFile(join(publicDir, `icon-${size}x${size}.png`));

    console.log(`Created icon-${size}x${size}.png`);
  }

  // Create maskable icon (with extra padding for safe zone)
  const maskableSize = 512;
  const innerSize = Math.floor(maskableSize * 0.8); // 80% of the size for safe zone

  await sharp(sourceIcon)
    .resize(innerSize, innerSize, {
      fit: 'contain',
      background: { r: 26, g: 26, b: 46, alpha: 1 }
    })
    .extend({
      top: Math.floor((maskableSize - innerSize) / 2),
      bottom: Math.ceil((maskableSize - innerSize) / 2),
      left: Math.floor((maskableSize - innerSize) / 2),
      right: Math.ceil((maskableSize - innerSize) / 2),
      background: { r: 26, g: 26, b: 46, alpha: 1 }
    })
    .png()
    .toFile(join(publicDir, 'icon-maskable-512x512.png'));

  console.log('Created icon-maskable-512x512.png');

  // Create apple touch icon (180x180)
  await sharp(sourceIcon)
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 26, g: 26, b: 46, alpha: 1 }
    })
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));

  console.log('Created apple-touch-icon.png');

  console.log('\nAll icons generated successfully!');
}

generateIcons().catch(console.error);
