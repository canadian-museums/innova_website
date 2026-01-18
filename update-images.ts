import fs from 'fs';

const pagePath = '/home/z/my-project/src/app/page.tsx';

// Read the file
let content = fs.readFileSync(pagePath, 'utf-8');

// Update 1: Canadian Museums - change object-cover to object-contain
content = content.replace(
  /className="w-full h-64 sm:h-80 object-cover mb-6"/,
  'className="w-full h-64 sm:h-80 object-contain mb-6"'
);

// Update 2: Innova Tickets - change object-cover to object-contain
content = content.replace(
  /className="w-full h-64 sm:h-80 object-cover mb-6"/g,
  'className="w-full h-64 sm:h-80 object-contain mb-6"'
);

// Update 3: mAIseums - change object-cover to object-contain
content = content.replace(
  /className="w-full h-64 sm:h-80 object-cover mb-6"/g,
  'className="w-full h-64 sm:h-80 object-contain mb-6"'
);

// Write back to file
fs.writeFileSync(pagePath, content, 'utf-8');

console.log('✓ Updated all 3 ecosystem images to use object-contain for full visibility');
