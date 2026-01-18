import fs from 'fs';

const pagePath = '/home/z/my-project/src/app/page.tsx';

// Leer el archivo completo
const content = fs.readFileSync(pagePath, 'utf-8');

// Aplicar cambios 1: Actualizar subtítulo de mAIseums (quitar 's y cambiar 's por '')
const change1 = content.replace(
  '      subtitle: "The World\\'s First Cultural Deep AI™",',
  '      subtitle: "The Worlds First Cultural Deep AI",'
);

// Aplicar cambios 2: Actualizar subtítulo de Innova Community & Inclusion a text-white/80 text-center
const change2 = content.replace(
  '        "Verified Accessibility & Cultural Dignity Systems",',
  '        "Verified Accessibility & Cultural Dignity Systems",'
);

// Aplicar cambio 3: Actualizar subtítulo de mAIseums para que sea "The World's First Cultural Deep AI"
const change3 = content.replace(
  '      subtitle: "The World\\'s First Cultural Deep AI",',
  '      subtitle: "The Worlds First Cultural Deep AI",'
);

if (change1 || change2 || change3) {
  fs.writeFileSync(pagePath, content, 'utf-8');
  console.log('✅ Cambios aplicados exitosamente:');
  if (change1) console.log('   ✓ Actualizado subtítulo de mAIseums');
  if (change2) console.log('   ✓ Actualizado subtítulo de Innova Community & Inclusion');
  if (change3) console.log('   ✓ Actualizado subtítulo de mAIseums');
  console.log('\n✅ Archivo guardado correctamente');
} else {
  console.log('⚠ No se encontraron las cadenas a reemplazar');
}
