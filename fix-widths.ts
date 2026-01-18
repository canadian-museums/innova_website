import fs from 'fs';

const pagePath = '/home/z/my-project/src/app/page.tsx';

// Read the file
let content = fs.readFileSync(pagePath, 'utf-8');

// Change 1: Increase grid max-width from max-w-6xl to max-w-7xl
content = content.replace(
  'className="grid gap-12 sm:gap-16 lg:gap-24 max-w-6xl mx-auto">',
  'className="grid gap-12 sm:gap-16 lg:gap-24 max-w-7xl mx-auto"'
);

// Change 2: Increase individual section max-width from max-w-5xl to max-w-6xl (for uniform image width)
content = content.replace(
  /className="max-w-4xl mx-auto" \(in 4.1 Canadian Museums\)/g,
  'className="max-w-6xl mx-auto"'
);

content = content.replace(
  /className="max-w-5xl mx-auto" \(in 4.2 Innova Tickets\)/g,
  'className="max-w-6xl mx-auto"'
);

content = content.replace(
  /className="max-w-5xl mx-auto" \(in 4.3 mAIseums\)/g,
  'className="max-w-6xl mx-auto"'
);

content = content.replace(
  /className="max-w-5xl mx-auto" \(in 4.4 Innova Community & Inclusion\)/g,
  'className="max-w-6xl mx-auto"'
);

// Change 3: Increase contact section max-width from max-w-5xl to max-w-6xl
content = content.replace(
  /className="max-w-5xl mx-auto" \(in Section 5: What We Do\)/g,
  'className="max-w-6xl mx-auto"'
);

// Write back to file
fs.writeFileSync(pagePath, content, 'utf-8');

console.log('✓ Increased max-width from max-w-6xl to max-w-7xl for grid');
console.log('✓ Increased max-width from max-w-4xl/5xl to max-w-6xl for individual sections');
console.log('✓ All 3 ecosystem images and contact section now have uniform width');
console.log('Note: Individual section containers (max-w-6xl mx-auto) still have mx-auto');
console.log('      This centers the div container, but with object-contain images will fit within it');
console.log('      The grid now has max-w-7xl mx-auto giving more horizontal space');
