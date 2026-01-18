import fs from 'fs';

const pagePath = '/home/z/my-project/src/app/page.tsx';

// Read the file
let content = fs.readFileSync(pagePath, 'utf-8');

// Remove mx-auto from all 3 ecosystem images (Canadian Museums, Innova Tickets, mAIseums)
// This will make them fit within the column width instead of expanding to full container width

// Remove mx-auto from Canadian Museums image
if (content.includes('className="w-full h-56 sm:h-72 object-contain mx-auto"')) {
  content = content.replace(
    'className="w-full h-56 sm:h-72 object-contain mx-auto"',
    'className="w-full h-56 sm:h-72 object-contain"'
  );
}

// Remove mx-auto from Innova Tickets image
if (content.includes('className="w-full h-56 sm:h-72 object-contain mx-auto"')) {
  content = content.replace(
    'className="w-full h-56 sm:h-72 object-contain mx-auto"',
    'className="w-full h-56 sm:h-72 object-contain"'
  );
}

// Remove mx-auto from mAIseums image
if (content.includes('className="w-full h-56 sm:h-72 object-contain mx-auto"')) {
  content = content.replace(
    'className="w-full h-56 sm:h-72 object-contain mx-auto"',
    'className="w-full h-56 sm:h-72 object-contain"'
  );
}

if (content !== fs.readFileSync(pagePath, 'utf-8')) {
  fs.writeFileSync(pagePath, content, 'utf-8');
  console.log('✓ Removed mx-auto from ecosystem images for uniform width');
} else {
  console.log('⚠ No changes needed - mx-auto already removed from ecosystem images');
}
