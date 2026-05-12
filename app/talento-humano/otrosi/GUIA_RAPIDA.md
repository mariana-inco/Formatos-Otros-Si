/**
 * Guía Rápida de Desarrollo
 * Referencia rápida para desarrolladores
 */

## 🚀 START AQUÍ

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Ir a http://localhost:3000/talento-humano/otrosi
```

## 📋 Checklist para Agregar Nueva Funcionalidad

### Agregar nuevo tipo de otrosí

```
1. [ ] types/otrosi.types.ts - Agregar tipo y interfaces
2. [ ] config/fieldConfig.ts - Agregar configuración de campos
3. [ ] schemas/otrosi.schema.ts - Agregar schema de validación
4. [ ] utils/generatePdf.ts - Agregar lógica para PDF
5. [ ] data/ejemplos.ts - Agregar ejemplo
6. [ ] components/CamposDinamicos.tsx - Verificar renderizado
7. [ ] Testear en navegador
```

### Agregar nuevo campo a tipo existente

```
1. [ ] config/fieldConfig.ts - Agregar al array de camposPorTipo
2. [ ] config/fieldConfig.ts - Agregar configuración del campo
3. [ ] schemas/otrosi.schema.ts - Agregar validación al schema
4. [ ] types/otrosi.types.ts - Actualizar interfaz del tipo
5. [ ] utils/generatePdf.ts - Mostrar en PDF
6. [ ] Testear formulario completo
```

## 🔍 Troubleshooting Común

### Problema: Campos no se muestran
**Solución:**
```typescript
// Verificar en config/fieldConfig.ts
export const camposPorTipo = {
  tu_tipo: ['campo1', 'campo2', ...] // ¿Están aquí?
};

// Verificar en components/CamposDinamicos.tsx
console.log('Campos a mostrar:', camposRequeridos); // Debug
```

### Problema: Errores de validación no se muestran
**Solución:**
```typescript
// Verificar que el error esté siendo capturado
{error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}

// Verificar estructura en schema
campo: z.string().min(3, 'Mensaje aquí') // ¿Tiene mensaje?
```

### Problema: PDF se ve roto
**Solución:**
```typescript
// Verificar márgenes en utils/generatePdf.ts
const margenIzq = 20; // Aumentar si se corta
const margenDer = 20;
const anchoDisponible = 210 - margenIzq - margenDer;

// Dividir en páginas si es muy largo
if (posicionY > 250) {
  doc.addPage();
  posicionY = 20;
}
```

### Problema: localStorage lleno
**Solución:**
```typescript
// Limpiar manualmente
localStorage.removeItem('otrosies_almacenados');

// O implementar paginación
const todos = obtenerTodos();
const ultimos = todos.slice(-10); // Solo últimos 10
```

## 🎨 Personalización Rápida

### Cambiar color primario (azul → púrpura)

1. En todos los .tsx:
```bash
grep -r "blue-" app/talento-humano/otrosi/ --include="*.tsx" | wc -l
# Reemplazar blue por purple
```

2. En fieldConfig.ts (si hay):
```typescript
// Colores de UI están en componentes, no en config
```

### Cambiar empresa en PDF
```typescript
// En utils/generatePdf.ts, función agregarEncabezado()
doc.text('TU EMPRESA AQUÍ', margenIzq + 2, posY + 5);
doc.text('NIT: 123.456.789-0', margenIzq + 2, posY + 17);
```

### Cambiar lugar por defecto
```typescript
// En page.tsx, en defaultValues
lugarFirma: 'Tu ciudad aquí' // Era 'Mosquera'
```

## 📊 Estructura de Datos

```json
{
  "otrosises_almacenados": [
    {
      "id": "otrosi_1234567890_abcdef123",
      "datos": {
        "tipoOtrosi": "cambio_cargo",
        "numeroDocumento": "1025630234",
        "nombreEmpleado": "Juan Pérez",
        ...
      },
      "fechaCreacion": "2026-05-11T10:30:00.000Z",
      "fechaActualizacion": "2026-05-11T10:30:00.000Z",
      "estado": "borrador"
    }
  ]
}
```

## 🔧 Variables de Configuración

```typescript
// En config/fieldConfig.ts
export const configuracionCampos = {
  numeroDocumento: {
    label: 'Número de Documento', // Texto visible
    placeholder: 'Ej: 1025630234', // Hint en input
    tipo: 'texto', // Tipo de input
    obligatorio: true, // Requerido
    validaciones: {
      patron: /^\d{5,}$/,
      mensaje: 'Mensaje de error'
    }
  }
};
```

## 📁 Archivos Clave

| Archivo | Responsabilidad |
|---------|-----------------|
| page.tsx | Orquesta el formulario completo |
| CamposComunes.tsx | Campos que siempre se ven |
| CamposDinamicos.tsx | Campos según tipo |
| fieldConfig.ts | Config de campos |
| otrosi.schema.ts | Validaciones |
| generatePdf.ts | Generar PDF |
| almacenamiento.ts | Guardar/cargar datos |

## 🔄 Flujo de Datos

```
Usuario llena formulario
        ↓
React Hook Form valida
        ↓
Zod schema valida
        ↓
onSubmit: guardar()
        ↓
localStorage.setItem()
        ↓
Mostrar éxito
```

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Producción
npm start

# Linter (si está configurado)
npm run lint

# Type check
npx tsc --noEmit

# Debug en VSCode
# .vscode/launch.json ya debe estar configurado
```

## 📚 Patrón de Componente Base

```typescript
'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { ObjConfig } from '../types';

interface PropsComponente {
  label?: string;
}

export function Componente({ label }: PropsComponente) {
  const { control, watch, formState: { errors } } = useFormContext();
  
  return (
    <Controller
      name="nombreCampo"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label className="block text-sm font-medium mb-2">
            {label}
            {requerido && <span className="text-red-500">*</span>}
          </label>
          <input
            {...field}
            className={error ? 'border-red-300' : 'border-gray-300'}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
        </div>
      )}
    />
  );
}
```

## 🚨 Antes de Hacer Commit

```bash
# 1. Verificar que compila
npm run build

# 2. Verificar tipos
npx tsc --noEmit

# 3. Probar en navegador
npm run dev
# Ir a /talento-humano/otrosi y probar completamente

# 4. Limpiar logs
grep -r "console.log" app/talento-humano/otrosi --include="*.tsx"
grep -r "console.log" app/talento-humano/otrosi --include="*.ts"

# 5. Commit
git add .
git commit -m "feat: descripción clara del cambio"
```

## 📞 Contacto y Preguntas

- Revisar README.md para documentación completa
- Revisar BUENAS_PRACTICAS.md para patrones y ejemplos
- Revisar ejemplos en data/ejemplos.ts
- Revisar comentarios JSDoc en código

## 🎯 Objetivos de Calidad

✅ TypeScript: Sin errores  
✅ Validación: Todos los campos validados  
✅ Accesibilidad: Labels para todos los inputs  
✅ Performance: Sin renders innecesarios  
✅ UX: Mensajes claros de error  
✅ Código: Limpio y bien documentado  

---

**Última actualización:** 2026-05-11  
**Versión:** 1.0.0
