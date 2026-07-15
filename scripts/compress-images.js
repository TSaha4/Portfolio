const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('Error: "sharp" library is required. Please install it first using "npm install sharp".');
  process.exit(1);
}

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const PROJECT_IMGS_DIR = path.join(PUBLIC_DIR, 'project_imgs');

// Configurations for image resizing and compression
const imgConfigs = [
  // Project images
  { src: path.join(PROJECT_IMGS_DIR, 'drone.png'), dest: path.join(PROJECT_IMGS_DIR, 'drone.webp'), maxWidth: 1200 },
  { src: path.join(PROJECT_IMGS_DIR, 'latch.png'), dest: path.join(PROJECT_IMGS_DIR, 'latch.webp'), maxWidth: 1200 },
  { src: path.join(PROJECT_IMGS_DIR, 'upryt.png'), dest: path.join(PROJECT_IMGS_DIR, 'upryt.webp'), maxWidth: 1200 },
  { src: path.join(PROJECT_IMGS_DIR, 'medibot.png'), dest: path.join(PROJECT_IMGS_DIR, 'medibot.webp'), maxWidth: 1200 },
  { src: path.join(PROJECT_IMGS_DIR, 'college.png'), dest: path.join(PROJECT_IMGS_DIR, 'college.webp'), maxWidth: 1200 },
  { src: path.join(PROJECT_IMGS_DIR, 'ntpc.png'), dest: path.join(PROJECT_IMGS_DIR, 'ntpc.webp'), maxWidth: 1200 },
  { src: path.join(PROJECT_IMGS_DIR, 'monogram.png'), dest: path.join(PROJECT_IMGS_DIR, 'monogram.webp'), maxWidth: 200 },
  
  // General public images
  { src: path.join(PUBLIC_DIR, 'profile.jpg'), dest: path.join(PUBLIC_DIR, 'profile.webp'), maxWidth: 600 },
  { src: path.join(PUBLIC_DIR, 'NTPC-logo.png'), dest: path.join(PUBLIC_DIR, 'NTPC-logo.webp'), maxWidth: 200 },
];

async function optimizeImages() {
  console.log('Starting image optimization process...');
  
  for (const config of imgConfigs) {
    if (!fs.existsSync(config.src)) {
      console.warn(`Warning: Source image not found at ${config.src}. Skipping.`);
      continue;
    }

    const startSize = fs.statSync(config.src).size;
    console.log(`Optimizing: ${path.basename(config.src)} (${(startSize / 1024 / 1024).toFixed(2)} MB)`);

    try {
      // Load image metadata to get current dimensions
      const image = sharp(config.src);
      const metadata = await image.metadata();

      let pipeline = image;
      if (metadata.width && metadata.width > config.maxWidth) {
        pipeline = pipeline.resize({ width: config.maxWidth, fit: 'inside', withoutEnlargement: true });
      }

      // Convert to webp with quality 85 (visually lossless)
      await pipeline.webp({ quality: 85 }).toFile(config.dest);

      const endSize = fs.statSync(config.dest).size;
      const reduction = ((1 - endSize / startSize) * 100).toFixed(1);
      console.log(`Success: ${path.basename(config.dest)} created. Size: ${(endSize / 1024).toFixed(1)} KB (Reduced by ${reduction}%)`);

      // Delete the original file to keep workspace clean
      fs.unlinkSync(config.src);
      console.log(`Deleted original: ${path.basename(config.src)}`);
    } catch (error) {
      console.error(`Error processing ${path.basename(config.src)}:`, error);
    }
  }

  console.log('Image optimization process complete.');
}

optimizeImages();
