import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const outputDir = './public/images';

const zai = await ZAI.create();

const images = [
  {
    name: 'hero',
    prompt: 'Epic cinematic wide shot of grand museum interior, vast institutional space with soaring ceilings and monumental columns, visitors walking through museum galleries, warm ambient lighting streaming through architectural windows, mood of quiet authority and grandeur, dark charcoal tones with warm golden light accents, high quality professional architectural photography, dramatic lighting',
    size: '1440x720'
  },
  {
    name: 'institutional',
    prompt: 'Cinematic interior of grand museum archives and collections, shelves lined with cultural artifacts, institutional architecture with structural lines and geometric overlays, vast archival space with rows of cultural displays, mood of permanence and heritage, dramatic lighting from above, dark and elegant atmosphere, professional museum photography',
    size: '1344x768'
  },
  {
    name: 'challenge',
    prompt: 'Abstract visualization showing disconnected digital systems merging with physical museum environment, fragmented data visualization overlaid on museum gallery spaces, glowing data streams dissolving into architectural structure, mood of complexity and unresolved tension, dark cinematic lighting with blue and steel accents, conceptual art style',
    size: '1344x768'
  },
  {
    name: 'approach',
    prompt: 'Cinematic shot of modern museum space with abstract geometric system patterns integrated into architecture, precise grid lines mapped onto cultural spaces, calm architectural rhythm and depth, futuristic yet institutional aesthetic, dark moody lighting with soft illumination, architectural visualization style',
    size: '1344x768'
  },
  {
    name: 'canadian-museums',
    prompt: 'Cinematic wide shot of Canadian national museum exterior with dramatic Canadian landscape backdrop, families and diverse visitors exploring museum entrance, natural golden hour lighting, warm and authoritative yet welcoming atmosphere, epic landscape photography, grand institutional architecture',
    size: '1344x768'
  },
  {
    name: 'innova-tickets',
    prompt: 'Cinematic architectural shot of grand museum entrance with modern ticketing systems, people flowing through controlled access points with elegant movement, abstract visualization of digital access control integrated into physical space, professional architectural photography, dark dramatic lighting with steel blue tones',
    size: '1344x768'
  },
  {
    name: 'maiseums',
    prompt: 'Dark luminous cinematic environment with museum artifacts emerging from glowing data fields, holographic data visualization surrounding cultural objects, visitors interacting with knowledge in three-dimensional space, mood of intelligence and discovery, deep blue and steel tones with luminous gold accents, sci-fi architectural style',
    size: '1344x768'
  },
  {
    name: 'inclusion',
    prompt: 'Cinematic shot of dignified museum accessibility spaces, diverse people with disabilities comfortably accessing cultural institutions, calm prepared environment with inclusive design features, natural warm lighting, atmosphere of dignity and accessibility, documentary style photography, warm undertones in dark palette',
    size: '1344x768'
  },
  {
    name: 'what-we-do',
    prompt: 'Cinematic interior of modern office spaces within cultural institution, professionals working collaboratively in grand architecture, strategic planning and execution visualized spatially, calm authoritative atmosphere with natural light streaming through windows, professional architectural photography, dark and elegant',
    size: '1344x768'
  },
  {
    name: 'global-vision',
    prompt: 'Epic cinematic wide shot showing famous global cultural landmarks unified in single composition - Louvre in Paris, British Museum in London, Smithsonian in Washington, Hermitage in St. Petersburg, connected by elegant visual language, dramatic sky, sense of global scale and inevitability, panoramic landscape photography, cinematic quality',
    size: '1440x720'
  }
];

async function generateImage(prompt, size, outputPath) {
  try {
    console.log(`Generating: ${outputPath}...`);

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

    console.log(`✓ Generated: ${outputPath} (${(buffer.length / 1024).toFixed(2)} KB)`);
    return { success: true, path: outputPath };
  } catch (error) {
    console.error(`✗ Failed: ${outputPath} - ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function generateAllImages() {
  console.log('Generating new museum-themed images with better visibility...\n');

  let successCount = 0;
  let failCount = 0;

  for (const image of images) {
    const outputPath = `${outputDir}/${image.name}.png`;
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
