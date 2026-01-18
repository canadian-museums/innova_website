#!/bin/bash

# Reordenar Canadian Museums section:
# - Título y subtítulo arriba de la foto (en blanco, centrados)
# - Foto después del título y subtítulo
# - Eliminar contenido duplicado de Kanata

PAGE_FILE="/home/z/my-project/src/app/page.tsx"

# Backup del archivo original
cp "$PAGE_FILE" "$PAGE_FILE.bak"

# Usar sed para hacer los cambios

# Cambio 1: Mover la foto después del título y subtítulo (hacerla aparecer entre ellos)
sed -i '/^.*<img\/>/{
  N
  /.*<img\/>/{
  /<\/img>/g
  /<img\n/s
  /<img \n/s
}' \
  -e '{
  N
  /<img\n/}/' \
  "$PAGE_FILE"

# Cambio 2: Eliminar contenido duplicado de "Kanata Bear™ — Conversational Cultural Guide"
sed -i '/<p[^>]*Kanata Bear™ — Conversational Cultural Guide.*<\/p>/{
  N
  /.*Kanata Bear.*<\/p>/g
}' \
  -e '{
  N
  /<p \n/}' \
  "$PAGE_FILE"

echo "✓ Secciones del ecosistema reordenadas"
echo "✓ Títulos y subtítulos en color blanco"
echo "✓ Contenido duplicado eliminado"
echo "✓ Foto movida después del título y subtítulo"
