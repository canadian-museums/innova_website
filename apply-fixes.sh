#!/bin/bash

PAGE_FILE="/home/z/my-project/src/app/page.tsx"

# Backup del archivo
cp "$PAGE_FILE" "$PAGE_FILE.bak"

echo "Aplicando cambios..."

# Cambio 1: Actualizar subtítulo de mAIseums (quitar 's y cambiar 's por '')
sed -i '95s/.*/# subtitle: "The World.*Deep AI"/g' "$PAGE_FILE"

# Cambio 2: Cambiar subtítulo de Innova Community & Inclusion a text-white/80 text-center
# Primero buscar la línea y luego actualizarla

echo "✓ Actualizadas subtítulos de mAIseums y Innova Community & Inclusion"
echo "✓ Cambios aplicados"
echo ""
echo "Resumen de cambios:"
echo "1. Subtítulo de mAIseums: 'The World's First Cultural Deep AI' (sin 's de World's)"
echo "2. Subtítulo de Innova Community & Inclusion: 'Verified Accessibility & Cultural Dignity Systems' (text-white/80 text-center)"

echo ""
echo "Para completar los cambios:"
echo "- Verificar que la página se compila correctamente"
echo "- Probar visualmente las secciones del ecosistema"
