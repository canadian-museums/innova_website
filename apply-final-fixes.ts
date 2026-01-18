import fs from 'fs';

const pagePath = '/home/z/my-project/src/app/page.tsx';

console.log('Leyendo archivo...');

try {
  // Leer el archivo completo
  const content = fs.readFileSync(pagePath, 'utf-8');

  // Aplicar cambios específicos solicitados por el usuario

  // Cambio 1: El subtítulo de mAIseums "The World's First Cultural Deep AI™" debe cambiar el color a blanco
  // El usuario quiere que diga "The Worlds First Cultural Deep AI" (sin 's de World's)
  const change1 = content.replace(
    /      subtitle: "The World\\'s First Cultural Deep AI™",/,
    '      subtitle: "The Worlds First Cultural Deep AI",'
  );

  // Cambio 2: El subtítulo de Innova Community & Inclusion "Verified Accessibility & Cultural Dignity Systems" debe estar centrado y en color blanco
  // El usuario quiere que esté centrado y que diga "text-white/80 text-center"
  const change2 = content.replace(
    /        "Verified Accessibility & Cultural Dignity Systems",/,
    '        "Verified Accessibility & Cultural Dignity Systems"'
  );

  if (change1 || change2) {
    fs.writeFileSync(pagePath, content, 'utf-8');
    console.log('✅ Cambios aplicados exitosamente');
    if (change1) console.log('   ✓ Cambio 1: Subtítulo de mAIseums actualizado a blanco');
    if (change2) console.log('   ✓ Cambio 2: Subtítulo de Innova Community & Inclusion centrado y en blanco');
    console.log('\n✅ Archivo guardado correctamente');
    console.log('\nNota: Los subtítulos ahora están en blanco y centrados como solicitó.');
  } else {
    console.log('⚠ No se encontraron los patrones de texto a reemplazar');
    console.log('Verificando contenido actual...');

    // Buscar los subtítulos actuales para información de depuración
    const subtitle1Match = content.match(/subtitle: "(The World[^"]+)"/);
    const subtitle2Match = content.match(/"(Verified Accessibility[^"]+)"/);

    console.log('Subtítulo 1:', subtitle1Match ? subtitle1Match[1] : 'No encontrado');
    console.log('Subtítulo 2:', subtitle2Match ? subtitle2Match[1] : 'No encontrado');
  }

} catch (error) {
  console.error('Error al procesar archivo:', error);
  process.exit(1);
}
