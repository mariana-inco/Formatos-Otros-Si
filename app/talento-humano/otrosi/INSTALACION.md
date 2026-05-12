/**
 * INSTALACIÓN Y VERIFICACIÓN
 * Pasos para asegurar que el módulo funciona correctamente
 */

# 📦 Instalación Completa

## Paso 1: Instalar Dependencias Principales

```bash
npm install next@15 react react-dom typescript zod @hookform/resolvers react-hook-form jspdf
```

## Paso 2: Instalar Dependencias de Desarrollo

```bash
npm install -D @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer
```

## Paso 3: Configurar Tailwind CSS

Si ya está configurado, omitir este paso.

```bash
npx tailwindcss init -p
```

Actualizar `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
```

## Paso 4: Verificar Estructura de Directorios

```
app/
└── talento-humano/
    └── otrosi/
        ├── page.tsx
        ├── README.md
        ├── GUIA_RAPIDA.md
        ├── FAQ.md
        ├── BUENAS_PRACTICAS.md
        ├── components/
        │   ├── CamposComunes.tsx
        │   ├── CamposDinamicos.tsx
        │   └── FormActions.tsx
        ├── schemas/
        │   └── otrosi.schema.ts
        ├── config/
        │   └── fieldConfig.ts
        ├── types/
        │   └── otrosi.types.ts
        ├── utils/
        │   ├── generatePdf.ts
        │   ├── almacenamiento.ts
        │   ├── formatos.ts
        │   └── validaciones.ts
        └── data/
            ├── empleados.ts
            └── ejemplos.ts
```

## Paso 5: Verificar package.json

Tu `package.json` debe tener estas dependencias:

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "react-hook-form": "^7.48.0",
    "jspdf": "^2.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

Si faltan, ejecutar:
```bash
npm install [paquete-faltante]
```

## Paso 6: Verificar tsconfig.json

Debe incluir:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

# ✅ Verificación

## Test 1: Compilación TypeScript

```bash
npx tsc --noEmit
```

Debería terminar sin errores.

## Test 2: Build de Next.js

```bash
npm run build
```

Debería completarse sin errores. Output:
```
Route (app)                              Size     First Load JS
...
/talento-humano/otrosi                   XXX KB   XXX KB
```

## Test 3: Iniciar servidor

```bash
npm run dev
```

Output esperado:
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in XXXXX ms
```

## Test 4: Acceder a la página

1. Abrir http://localhost:3000/talento-humano/otrosi
2. Verificar que se carga el formulario
3. Verificar que aparecen todos los campos

## Test 5: Prueba de Formulario

1. Seleccionar tipo de otrosí "Cambio de Cargo"
2. Llenar campos:
   - Tipo de Documento: Cédula
   - Número: 1025630234
   - Nombre: Juan Pérez
   - Lugar: Mosquera
   - Fecha: Hoy
   - Cargo Nuevo: Desarrollador Senior
   - Fecha Inicio: Mañana
3. Clickear "Guardar"
4. Verificar mensaje de éxito ✅
5. Clickear "Generar PDF"
6. Verificar que se descarga archivo PDF

## Test 6: Validación

1. Limpiar el formulario
2. Dejar campos vacíos
3. Clickear "Guardar"
4. Verificar mensajes de error en rojo junto a campos

## Test 7: localStorage

En DevTools (F12):
1. Application tab
2. Storage → LocalStorage
3. http://localhost:3000
4. Verificar clave `otrosies_almacenados`
5. Expandir para ver datos guardados

---

# 🐛 Verificación de Errores Comunes

## Error: "Cannot find module 'jspdf'"

```bash
npm install jspdf @types/jspdf
```

## Error: "Module not found: Can't resolve 'react-hook-form'"

```bash
npm install react-hook-form @hookform/resolvers
```

## Error: "Tailwind classes not working"

Verificar en `tailwind.config.ts`:
```typescript
content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}', // ¿Incluye los archivos?
]
```

## Error: TypeScript "Type 'string' is not assignable to type 'TipoOtrosi'"

En page.tsx, asegurar:
```typescript
const tipoSeleccionado = watch('tipoOtrosi');

useEffect(() => {
  if (tipoSeleccionado) {
    setTipoOtrosi(tipoSeleccionado as TipoOtrosi); // ← Importante
  }
}, [tipoSeleccionado]);
```

## Error: "localStorage is not defined"

Agregar `'use client'` al inicio del archivo:
```typescript
'use client';

import { ... }
```

## Error: PDF se ve cortado o mal

En `utils/generatePdf.ts`:
```typescript
const margenIzq = 20;
const margenDer = 20;
const anchoDisponible = 210 - margenIzq - margenDer; // Aumentar márgenes si es necesario
```

---

# 🚀 Checklist de Verificación Final

Antes de usar en producción, verificar:

- [ ] `npm install` completado sin errores
- [ ] `npm run build` sin errores
- [ ] `npm run dev` inicia correctamente
- [ ] Formulario se carga en http://localhost:3000/talento-humano/otrosi
- [ ] Campos comunes visibles
- [ ] Al seleccionar tipo, aparecen campos específicos
- [ ] Validaciones muestran errores
- [ ] Guardar guarda datos en localStorage
- [ ] Generar PDF descarga archivo
- [ ] TypeScript sin errores (`npx tsc --noEmit`)
- [ ] Todos los componentes importan correctamente
- [ ] Las funciones de formato funcionan
- [ ] La búsqueda de empleados funciona

---

# 📋 Dependencias Opcionales

Para agregar funcionalidades extra:

### Notificaciones/Toast
```bash
npm install sonner
# o
npm install react-toastify
```

### Exportar a Excel
```bash
npm install xlsx
```

### Autenticación
```bash
npm install next-auth
```

### Validación de email
```bash
npm install email-validator
```

### Firma digital
```bash
npm install signature_pad
```

---

# 📊 Verificar Compatibilidad

```bash
# Node version
node --version
# Debe ser v18 o mayor

# npm version
npm --version
# Debe ser v8 o mayor

# Next.js version
npm list next
# Debe mostrar 15.x.x

# TypeScript version
npx tsc --version
# Debe mostrar 5.x.x o mayor
```

---

# 🔧 Solucionar Problemas de Instalación

## Si la instalación falla

```bash
# 1. Limpiar caché de npm
npm cache clean --force

# 2. Eliminar node_modules y package-lock
rm -rf node_modules package-lock.json

# 3. Reinstalar
npm install

# 4. Si sigue fallando, verificar Node
node --version
npm --version
```

## Si el servidor no inicia

```bash
# 1. Verificar que el puerto 3000 está libre
lsof -i :3000

# 2. Si está en uso, cambiar puerto
npm run dev -- -p 3001

# 3. Si aún hay problemas, limpiar build
rm -rf .next
npm run dev
```

## Si los estilos no aparecen

```bash
# 1. Verificar tailwind.config.ts
cat tailwind.config.ts

# 2. Verificar content paths
# Debe incluir: './app/**/*.{js,ts,jsx,tsx,mdx}'

# 3. Rebuildar
npm run build
npm run dev
```

---

# 📞 Verificación de Setup

Ejecutar este script para verificar todo:

```bash
#!/bin/bash
echo "🔍 Verificando instalación..."

echo "✓ Node version:"
node --version

echo "✓ npm version:"
npm --version

echo "✓ Dependencias instaladas:"
npm list --depth=0

echo "✓ TypeScript check:"
npx tsc --noEmit

echo "✓ Next.js build:"
npm run build

echo "✅ ¡Todo listo para desarrollar!"
```

---

# 🎯 Próximos Pasos

1. ✅ Instalar dependencias
2. ✅ Verificar setup
3. Leer README.md
4. Revisar ejemplos en data/ejemplos.ts
5. Empezar a desarrollar

---

**Última actualización:** 2026-05-11  
**Versión:** 1.0.0
