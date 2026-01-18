import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const outputDir = './public/images';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const zai = await ZAI.create();

// Image prompts for each section
const images = [
  {
    name: 'hero',
    prompt: 'Cinematic wide shot of grand museum architecture blending with abstract geometric data visualization lines, human figures walking through vast institutional space at scale, subtle data overlays integrated into physical environment, mood of quiet authority and intelligence in motion, dark moody lighting, charcoal and steel blue tones, no white space, high quality, professional photography style',
    size: '1440x720'
  },
  {
    name: 'institutional',
    prompt: 'Monumental cultural architecture interior, grand archives and collections, institutional spaces with soaring ceilings and monumental columns, structural lines and grids overlaid as subtle system schematics, visual metaphor of culture as engineered space, dark cinematic lighting, obsidian and steel tones, high quality, professional architectural photography',
    size: '1344x768'
  },
  {
    name: 'challenge',
    prompt: 'Layered imagery of disconnected digital systems, interfaces dissolving into architectural space, broken data lines overlaying physical museum environment, mood of complexity and unresolved tension, fragmented digital elements merging with physical space, dark atmosphere with steel blue undertones, no stock imagery, high quality, conceptual art style',
    size: '1344x768'
  },
  {
    name: 'approach',
    prompt: 'Abstract systems mapped onto real cultural spaces, calm and precise geometric visualization, architectural rhythm and depth, data flow lines integrated with museum architecture, systematic visualization of cultural infrastructure, dark luminous environment, midnight blue and steel tones, high quality, architectural visualization style',
    size: '1344x768'
  },
  {
    name: 'canadian-museums',
    prompt: 'Canadian national landscapes with museums, families and visitors exploring cultural spaces together, warm human presence in vast institutional settings, Kanata bear represented symbolically and abstractly not cartoonish, warm yet authoritative tone, natural light streaming through grand windows, cinematic quality, professional photography style, dark rich tones with subtle warmth',
    size: '1344x768'
  },
  {
    name: 'innova-tickets',
    prompt: 'Architectural entrances and thresholds of cultural institutions, movement and flow of people through controlled access points, abstract visualization of real-time intelligence and data flow, grand museum entrances with modern ticketing systems, architectural depth, dark cinematic lighting, steel blue and charcoal tones, high quality, architectural photography',
    size: '1344x768'
  },
  {
    name: 'maiseums',
    prompt: 'Dark luminous environment with cultural artifacts emerging from glowing data fields, museum pieces illuminated by soft ethereal light, knowledge visualization spatial, humans interacting with cultural data in three-dimensional space, holographic data overlays, mood of intelligence and discovery, deep blue and steel tones with luminous accents, high quality, conceptual sci-fi architectural style',
    size: '1344x768'
  },
  {
    name: 'inclusion',
    prompt: 'Dignified human-centered imagery, calm prepared museum environments, diverse people with disabilities accessing cultural spaces, no performative inclusion tropes, atmosphere of dignity and accessibility, architectural elements supporting inclusive design, natural lighting, warm undertones in dark palette, high quality, documentary style photography',
    size: '1344x768'
  },
  {
    name: 'what-we-do',
    prompt: 'Teams working within institutional settings, strategy and architecture visualization, calm authoritative atmosphere of professional collaboration, modern office spaces within cultural institution, people at work in grand architecture, execution of cultural systems design, no sales energy or startup aesthetics, dark cinematic mood, steel and charcoal tones, high quality, professional photography',
    size: '1344x768'
  },
  {
    name: 'global-vision',
    prompt: 'Global cultural landmarks from around the world unified in single composition, Louvre, British Museum, Smithsonian, Hermitage, and other iconic institutions, unified visual language across geographies, sense of inevitability and global scale, dark cinematic lighting, consistent palette of obsidian and midnight blue with steel accents, high quality, epic landscape photography',
    size: '1440x720'
  }
];

async function generateImage(prompt, size, outputPath) {
  try {
    console.log(`Generating: ${path.basename(outputPath)}...`);

    const response = await zai.images.generations.create({
      prompt: prompt,
      size: size
    });

    if (!response.data || !response.data[0] || !response.data[0].base64) {
      throw new Error('Invalid response from image generation API');
    }

    const imageBase64 = response.data[0].base64;
    const buffer = Buffer.from(imageBase64, 'base64');
    fs.writeFileSync(outputPath, buffer);

    console.log(`✓ Generated: ${path.basename(outputPath)} (${(buffer.length / 1024).toFixed(2)} KB)`);
    return { success: true, path: outputPath };
  } catch (error) {
    console.error(`✗ Failed: ${path.basename(outputPath)} - ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function generateAllImages() {
  console.log('Starting cinematic image generation for Innova Museums website...\n');

  let successCount = 0;
  let failCount = 0;

  for (const image of images) {
    const outputPath = path.join(outputDir, `${image.name}.png`);

    const result = await generateImage(image.prompt, image.size, outputPath);

    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }

    // Small delay between generations
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\nGeneration complete: ${successCount}/${images.length} images generated successfully`);

  if (failCount > 0) {
    console.log(`${failCount} images failed to generate`);
  }
}

// Run generation
generateAllImages().catch(console.error);
