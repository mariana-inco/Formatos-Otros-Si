# Módulo de Otrosí al Contrato de Trabajo

Módulo completo para gestión, validación y generación de otrosís en Next.js 15 con TypeScript, Tailwind CSS, React Hook Form y Zod.

## 🎯 Características

✅ **Formulario dinámico** - Cambia campos según el tipo de otrosí seleccionado  
✅ **Validación robusta** - Con Zod y validaciones personalizadas  
✅ **Generación de PDF** - Documentos profesionales con jsPDF  
✅ **Almacenamiento persistente** - Guarda en localStorage (fácil migrar a BD)  
✅ **Búsqueda de empleados** - Autocompletar con sugerencias  
✅ **Interfaz responsiva** - Diseño profesional con Tailwind CSS  
✅ **Código modular** - Componentes reutilizables y escalables  

## 📁 Estructura del Proyecto

```
app/talento-humano/otrosi/
├── page.tsx                 # Página principal
├── components/
│   ├── CamposComunes.tsx   # Campos que aparecen en todos los otrosís
│   ├── CamposDinamicos.tsx # Campos específicos según tipo
│   └── FormActions.tsx     # Botones de acción
├── config/
│   └── fieldConfig.ts      # Configuración de campos dinámicos
├── schemas/
│   └── otrosi.schema.ts    # Esquemas de validación Zod
├── types/
│   └── otrosi.types.ts     # Definiciones de tipos TypeScript
├── utils/
│   ├── generatePdf.ts      # Generador de PDF
│   ├── almacenamiento.ts   # Gestión de datos
│   ├── formatos.ts         # Funciones de formato
│   └── validaciones.ts     # Validaciones personalizadas
└── data/
    └── empleados.ts        # Datos estáticos de empleados
```

## 🚀 Instalación

### 1. Dependencias requeridas

```bash
npm install next@15 react react-dom typescript zod @hookform/resolvers react-hook-form jspdf
```

### 2. Dependencias de desarrollo

```bash
npm install -D @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer
```

### 3. Configurar Tailwind CSS (si no está ya configurado)

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

## 📖 Guía de Uso

### Uso Básico

```typescript
// Los usuarios acceden a: /talento-humano/otrosi
// El formulario se carga automáticamente
```

### Flujo de Usuario

1. **Seleccionar tipo de otrosí** - Se cargan los campos específicos
2. **Completar información** - Validación en tiempo real
3. **Guardar** - Los datos se almacenan y obtienen un ID
4. **Generar PDF** - Se descarga el documento profesional

### Validaciones Automáticas

- Número de documento: 5-20 dígitos
- Nombre: 3-150 caracteres, solo letras
- Porcentajes: 0-100
- Salarios: Positivos, entre salario mínimo y 100M
- Fechas: Deben ser válidas y en rango correcto

## 🔧 Configuración Personalizada

### Agregar nuevo tipo de otrosí

1. **En `types/otrosi.types.ts`:**
```typescript
export type TipoOtrosi = '...' | 'nuevo_tipo';

export interface CamposNuevoTipo {
  campo1: string;
  campo2: number;
}
```

2. **En `config/fieldConfig.ts`:**
```typescript
export const camposPorTipo: Record<TipoOtrosi, string[]> = {
  // ...
  nuevo_tipo: ['campo1', 'campo2'],
};

export const etiquetasTipoOtrosi: Record<TipoOtrosi, string> = {
  // ...
  nuevo_tipo: 'Descripción del Nuevo Tipo',
};

export const configuracionCampos: Record<string, ConfiguracionCampo> = {
  // ...
  campo1: { label: 'Campo 1', tipo: 'texto', obligatorio: true },
  campo2: { label: 'Campo 2', tipo: 'numero', obligatorio: true },
};
```

3. **En `schemas/otrosi.schema.ts`:**
```typescript
export const schemaNuevoTipo = schemaCamposComunes.extend({
  campo1: z.string().min(3),
  campo2: z.number().positive(),
});

// Agregar al discriminatedUnion
schemaNuevoTipo.extend({ tipoOtrosi: z.literal('nuevo_tipo') }),
```

4. **En `utils/generatePdf.ts`:**
```typescript
case 'nuevo_tipo':
  // Agregar lógica para mostrar los campos en PDF
  break;
```

### Cambiar almacenamiento a Base de Datos

En `utils/almacenamiento.ts`, reemplazar localStorage con llamadas a API:

```typescript
export const guardar = async (datos: DatosOtrosi, id?: string) => {
  const response = await fetch('/api/otrosies', {
    method: 'POST',
    body: JSON.stringify({ datos, id }),
  });
  return response.json();
};
```

### Personalizar PDF

En `utils/generatePdf.ts`, modificar:
- Colores en `agregarEncabezado()`
- Logo y nombre de empresa
- Márgenes y espaciado
- Texto legal

## 📋 Tipos de Otrosí Soportados

| Tipo | Campos Adicionales | Estado |
|------|-------------------|--------|
| Cambio de Cargo | cargo_nuevo, fecha_inicio_cargo | ✅ |
| Cambio de Cargo y/o Salario | cargo_nuevo, fecha_inicio_cargo, nuevo_salario | ✅ |
| Prórroga | numero_prorroga, fecha_terminacion_actual, fecha_terminacion_nueva | ✅ |
| Cambio de Obra | obra_anterior, obra_nueva, porcentaje_avance | ✅ |
| Ampliación de Porcentaje | codigo_obra, nombre_obra, porcentajes | ✅ |
| Cambio a Término Indefinido | (ninguno) | ✅ |

## 🎨 Personalizar Estilos

Todos los estilos usan Tailwind CSS. Para cambiar colores:

1. **Tema principal (azul)** - Buscar `bg-blue-` y `focus:ring-blue-`
2. **Tema secundario (verde)** - Buscar `bg-green-` y `focus:ring-green-`
3. **Errores (rojo)** - Buscar `border-red-` y `bg-red-50`

Ejemplo: Cambiar azul a púrpura:
```bash
find . -type f -name "*.tsx" -exec sed -i 's/blue-500/purple-500/g' {} \;
find . -type f -name "*.tsx" -exec sed -i 's/blue-600/purple-600/g' {} \;
```

## ⚙️ Configuración Avanzada

### Usar variable de entorno para URL de API

```typescript
// .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api

// En almacenamiento.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

### Middleware de autenticación

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken');
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/talento-humano/:path*'],
};
```

## 🐛 Debugging

### Ver datos guardados en localStorage
```javascript
// En consola del navegador
JSON.parse(localStorage.getItem('otrosies_almacenados'))
```

### Validar formulario manualmente
```typescript
const validacion = await schemaOtrosi.safeParseAsync(datos);
console.log(validacion.error?.errors);
```

### Logs en generación de PDF
```typescript
console.log('Generando PDF con datos:', datos);
console.log('PDF generado exitosamente');
```

## 📦 Exportar Datos

Los datos se pueden exportar en formato JSON:

```typescript
// En el componente
import { exportarJSON } from '../utils/almacenamiento';

// Exportar todos
exportarJSON();

// Exportar uno específico
exportarJSON(idOtrosi);
```

## 🔒 Seguridad

- ✅ Validación en frontend (Zod)
- ⚠️ **IMPORTANTE**: Agregar validación en backend antes de BD
- ⚠️ Sanitizar entrada de usuarios
- ⚠️ Implementar autenticación y autorización
- ⚠️ Usar HTTPS en producción

### Checklist de seguridad para producción:

- [ ] API backend con validación
- [ ] Autenticación (JWT, OAuth)
- [ ] Autorización por roles
- [ ] Rate limiting
- [ ] CORS configurado
- [ ] Encriptación de datos sensibles
- [ ] Logs de auditoría
- [ ] Backup de datos

## 📱 Mobile

El módulo es 100% responsivo:
- ✅ Mobile-first design
- ✅ Touch-friendly
- ✅ Adaptive layout
- ✅ Optimizado para pantallas pequeñas

## 🚢 Despliegue

### Vercel
```bash
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
```

## 🤝 Contribuir

Para agregar mejoras:

1. Crear rama: `git checkout -b feature/mejora`
2. Hacer cambios
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature/mejora`
5. Pull request

## 📝 Licencia

MIT

## 🆘 Soporte

Para problemas o preguntas:
- Revisar documentación
- Consultar ejemplos en `data/empleados.ts`
- Verificar logs en consola del navegador

---

**Última actualización:** 2026-05-11  
**Versión:** 1.0.0
