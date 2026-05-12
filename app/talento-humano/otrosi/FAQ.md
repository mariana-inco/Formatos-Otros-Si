/**
 * Preguntas Frecuentes (FAQ)
 * Soluciones rápidas a problemas comunes
 */

## 🤔 Preguntas Frecuentes

### INSTALACIÓN Y SETUP

**P: ¿Qué versión de Node se requiere?**
R: Node 18+ recomendado. Verificar con `node --version`

**P: ¿Falta alguna dependencia?**
R: Ejecutar `npm install` para reinstalar todas las dependencias

**P: ¿Cómo configuro Tailwind?**
R: Ya está configurado. Si falta, ejecutar `npm install -D tailwindcss postcss autoprefixer` y ejecutar `npx tailwindcss init -p`

**P: ¿Funciona sin internet?**
R: Sí, todo corre en el navegador. jsPDF, React, etc. están locales.

---

### DESARROLLO

**P: ¿Cómo agrego un nuevo tipo de otrosí?**
R: Seguir el checklist en GUIA_RAPIDA.md → "Agregar nuevo tipo de otrosí"

**P: ¿Dónde edito los tipos de documento?**
R: En `data/empleados.ts`, array `tiposDocumento`

**P: ¿Cómo cargo datos de una API?**
R: Reemplazar la lista en `data/empleados.ts` con un fetch en un useEffect

**P: ¿Qué pasa con los datos guardados?**
R: Se guardan en localStorage del navegador. Si limpias cache, se pierden. Migrar a API para producción.

**P: ¿Puedo personalizar los estilos?**
R: Sí, todo usa Tailwind CSS. Ver instrucciones en README.md → "Personalizar Estilos"

---

### VALIDACIÓN

**P: ¿Cómo agrego una validación personalizada?**
R: Crear función en `utils/validaciones.ts` y usarla en schema con `.refine()` o `.superRefine()`

**P: ¿Por qué no valida mientras escribo?**
R: Verificar que en useForm esté `mode: 'onChange'` en page.tsx

**P: ¿Cómo cambio los mensajes de error?**
R: En `schemas/otrosi.schema.ts`, en el segundo parámetro de `.min()`, `.max()`, etc.

**P: ¿Puedo validar campos que dependen unos de otros?**
R: Sí, usar `.refine()` o `.superRefine()` en el nivel del objeto, no del campo

**Ejemplo:**
```typescript
schema.refine(
  (data) => data.fechaFin > data.fechaInicio,
  { message: 'Fecha final debe ser posterior', path: ['fechaFin'] }
)
```

---

### FORMULARIOS

**P: ¿Cómo hago el formulario "multi-paso"?**
R: Agregar pasos en page.tsx con estado y renderizado condicional

**P: ¿Cómo prellenco un formulario?**
R: En useForm, pasar `defaultValues: { campo: 'valor' }`

**P: ¿Cómo reseteo el formulario?**
R: Llamar `reset()` de react-hook-form, ej: `<button onClick={() => reset()}>`

**P: ¿Puedo deshabilitar un campo condicionalmente?**
R: Sí, en el input agregar `disabled={condicion}` o `readOnly`

---

### PDF

**P: ¿Cómo cambio el tamaño del PDF?**
R: En `generatePdf.ts`, en `new jsPDF()`, cambiar `format: 'a4'` a `'a3'`, `'letter'`, etc.

**P: ¿Cómo agrego una imagen/logo?**
R: Convertir a base64 y usar `doc.addImage(base64, 'PNG', x, y, width, height)`

**P: ¿Cómo hago PDFs de múltiples páginas?**
R: Verificar altura con `if (posY > 250) { doc.addPage(); posY = 20; }`

**P: ¿Se puede generar PDF en servidor?**
R: Sí, migrar `generatePdf.ts` a una API route en Next.js

**P: ¿Cómo cambio el nombre del archivo descargado?**
R: En `doc.save('nombre-archivo.pdf')` en `generatePdf.ts`

---

### ALMACENAMIENTO

**P: ¿Dónde se guardan los otrosís?**
R: En `localStorage` del navegador, clave `'otrosies_almacenados'`

**P: ¿Cómo exporto los datos?**
R: Llamar `exportarJSON()` de `utils/almacenamiento.ts` o ver manualmente en DevTools

**P: ¿Cómo cargo datos guardados anteriormente?**
R: localStorage se carga automáticamente. Para cargar JSON: crear endpoint de importación

**P: ¿Pueden dos usuarios compartir datos?**
R: No con localStorage. Necesita API y base de datos para compartir

**P: ¿Qué pasa si localStorage llega al límite?**
R: Fallará silenciosamente. Limpiar datos antiguos o migrar a API

**P: ¿Cómo borro todos los otrosís?**
R: En consola del navegador: `localStorage.removeItem('otrosies_almacenados')`

---

### COMPONENTES

**P: ¿Cómo cambio el tamaño de los inputs?**
R: En componentes, cambiar `py-2.5` a `py-3` o `py-2`, etc.

**P: ¿Cómo agrego un nuevo campo común?**
R: 
1. Agregar a tipo en `types/otrosi.types.ts`
2. Agregar controlador en `components/CamposComunes.tsx`
3. Agregar validación en schema

**P: ¿Por qué los campos no se agrupan?**
R: Usar `<div className="grid grid-cols-2 gap-4">`

**P: ¿Cómo hago campos condicionales?**
R: Usar `{condicion && <Controller ... />}`

---

### ERRORES COMUNES

**Error: "Cannot find module 'jspdf'"**
Solución: `npm install jspdf`

**Error: "Tipo 'string' no se asigna a tipo 'TipoOtrosi'"**
Solución: Usar `as TipoOtrosi` o asegurar que el valor es válido

**Error: "Schema validation failed"**
Solución: Verificar que todos los campos requeridos estén presentes

**Error: "localStorage is not defined"**
Solución: Usar `'use client'` al inicio del archivo

**Error: "PDF se ve roto"**
Solución: Verificar márgenes en `generatePdf.ts`, aumentar si es necesario

**Error: "Formulario no responde a cambios"**
Solución: Verificar que `watch()` se llama correctamente en page.tsx

---

### PERFORMANCE

**P: ¿El formulario es lento?**
R: Verificar en DevTools que no hay re-renders innecesarios. React Hook Form debe optimizar esto.

**P: ¿La búsqueda de empleados es lenta?**
R: Agregar debounce: `useMemo(() => buscarEmpleados(termino), [termino])`

**P: ¿Generación de PDF es lenta?**
R: Normal para documentos grandes. Mostrar loading. En producción, generar en servidor.

**P: ¿Cómo optimizo el bundle?**
R: 
- Usar lazy loading: `const CamposDinamicos = lazy(() => import(...))`
- Code splitting automático de Next.js
- Remover console.logs

---

### SEGURIDAD

**P: ¿Es seguro guardar datos en localStorage?**
R: No para datos sensibles. Usar para borrador, migrar a API con HTTPS

**P: ¿Se valida en backend?**
R: Actualmente no. Necesario para producción. Crear API con validación.

**P: ¿Cómo protejo el acceso?**
R: Implementar autenticación (JWT, OAuth) en una API backend

**P: ¿Se pueden exportar datos privados?**
R: Actualmente sí. En producción, requiere autenticación.

---

### DEPLOYMENT

**P: ¿Cómo despliego a producción?**
R: 
```bash
npm run build    # Genera .next/
npm run start    # Ejecuta servidor
# O usar Vercel: vercel deploy
```

**P: ¿Funciona en teléfono?**
R: Sí, 100% responsivo. Probado en mobile

**P: ¿Necesito un servidor?**
R: Actualmente no (está todo en navegador). Para producción: necesitas API backend

**P: ¿Cómo hago backup?**
R: Exportar JSON de cada otrosí. En producción: backup de BD

**P: ¿Qué hosting recomendas?**
R: Vercel (para Next.js), Netlify, o Docker + cualquier cloud

---

### EXTENSIONES

**P: ¿Cómo agrego autenticación?**
R: Usar NextAuth.js o implementar OAuth. Documentación en nextauth.js

**P: ¿Cómo agrego notificaciones?**
R: Instalar `react-toastify` o `sonner` y usar en `onSubmit`

**P: ¿Cómo agrego firma digital?**
R: Integrar library como `signature_pad` y guardar en PDF

**P: ¿Cómo agrego reportes/analytics?**
R: Usar Google Analytics o Mixpanel. Next.js integration disponible

**P: ¿Cómo agrego chatbot?**
R: Integrar con Vercel AI SDK o usar OpenAI API

---

### TESTING

**P: ¿Cómo testeo el formulario?**
R:
```bash
npm install --save-dev @testing-library/react jest
# Crear archivo __tests__/page.test.tsx
```

**P: ¿Cómo testeo validaciones?**
R:
```typescript
import { schemaOtrosi } from '@/otrosi/schemas/otrosi.schema';

test('valida documento requerido', async () => {
  const resultado = await schemaOtrosi.safeParseAsync({ 
    // sin numeroDocumento
  });
  expect(resultado.success).toBe(false);
});
```

**P: ¿Cómo testeo PDF?**
R: Verificar que no haya errores en console, comparar snapshots

---

### MIGRACIONES

**P: ¿Cómo migro de localStorage a API?**
R: Ver README.md → "Cambiar almacenamiento a Base de Datos"

**P: ¿Cómo cambio de jsPDF a pdf-lib?**
R: pdf-lib.js.org tiene documentación. Reescribir `generatePdf.ts`

**P: ¿Cómo integro con un sistema RH existente?**
R: Crear endpoints API que lean/escriban en tu BD existente

---

### SOPORTE

**Si nada funciona:**

1. ¿Instalaste dependencias? → `npm install`
2. ¿Compiló? → `npm run build`
3. ¿Limpiar cache? → `rm -rf .next && npm run dev`
4. ¿Node correcto? → `node --version` (18+)
5. ¿Puerto en uso? → `lsof -i :3000` y cambiar puerto
6. ¿Limpiar localStorage? → DevTools → Application → localStorage → Delete

**Si sigues con problema:**
- Revisar logs en consola (F12)
- Revisar Network tab en DevTools
- Revisar archivo GUIA_RAPIDA.md → Troubleshooting
- Revisar código comentado en componentes

---

**¿No encontraste tu pregunta?**
- Revisar README.md (documentación completa)
- Revisar BUENAS_PRACTICAS.md (patrones y ejemplos)
- Revisar comentarios en el código (JSDoc)
- Revisar archivos en `data/` para ejemplos

---

**Última actualización:** 2026-05-11
