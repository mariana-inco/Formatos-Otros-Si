/**
 * ÍNDICE COMPLETO DEL PROYECTO
 * Guía de todos los archivos y su propósito
 */

# 🗂️ Índice Completo de Archivos

## 📍 Ubicación Principal
```
c:\Users\mariana.gomez\otros\app\talento-humano\otrosi\
```

## 📚 Archivos por Categoría

### 📖 DOCUMENTACIÓN (5 archivos)

#### 1. **README.md**
   - **Propósito:** Documentación principal y completa
   - **Contenido:** 
     - Características del módulo
     - Instalación y configuración
     - Guía de tipos de otrosí
     - Personalización y extensiones
     - Seguridad y deployment
   - **Audiencia:** Todos (usuarios y desarrolladores)
   - **Lectura:** ⭐ EMPEZAR AQUÍ

#### 2. **GUIA_RAPIDA.md**
   - **Propósito:** Referencia rápida para desarrolladores
   - **Contenido:**
     - Checklist para nuevas funcionalidades
     - Troubleshooting común
     - Personalización rápida
     - Estructura de datos
     - Patrón de componentes
   - **Audiencia:** Desarrolladores
   - **Tiempo:** 10-15 min de lectura

#### 3. **FAQ.md**
   - **Propósito:** Preguntas frecuentes y respuestas
   - **Contenido:**
     - 50+ preguntas y respuestas
     - Problemas comunes y soluciones
     - Migración de datos
     - Deployment
   - **Audiencia:** Todos
   - **Tiempo:** Consultable según necesidad

#### 4. **BUENAS_PRACTICAS.md**
   - **Propósito:** Patrones, convenciones y mejores prácticas
   - **Contenido:**
     - Arquitectura y patrones
     - Convenciones de nombres
     - Ejemplos de código (✅ bien vs ❌ mal)
     - Performance y seguridad
   - **Audiencia:** Desarrolladores
   - **Tiempo:** Referencia continua

#### 5. **INSTALACION.md**
   - **Propósito:** Pasos detallados de instalación
   - **Contenido:**
     - Instalación de dependencias
     - Configuración de Tailwind
     - Verificación de setup
     - Troubleshooting
   - **Audiencia:** Nuevos desarrolladores
   - **Tiempo:** 30 min

---

### 💻 COMPONENTES REACT (3 archivos)

#### 1. **components/CamposComunes.tsx**
   - **Propósito:** Renderiza campos que aparecen en TODOS los otrosís
   - **Campos:** Documento, nombre, lugar, fecha, tipo
   - **Características:**
     - Búsqueda y autocompletar de empleados
     - Validación en tiempo real
     - Sugerencias desplegables
   - **Imports:** react-hook-form, react, data/empleados
   - **Responsabilidad:** Solo campos comunes
   - **Linhas:** ~150

#### 2. **components/CamposDinamicos.tsx**
   - **Propósito:** Renderiza campos específicos según tipo de otrosí
   - **Características:**
     - Renderiza dinámicamente según selección
     - Oculta campos no necesarios
     - Validación específica por tipo
     - Mensajes informativos contextuales
   - **Imports:** react-hook-form, fieldConfig
   - **Responsabilidad:** Solo campos dinámicos
   - **Líneas:** ~100

#### 3. **components/FormActions.tsx**
   - **Propósito:** Botones de acción (Guardar, PDF, Limpiar)
   - **Características:**
     - Estados de carga
     - Feedback visual
     - Indicadores de proceso
   - **Imports:** react-hook-form, react
   - **Responsabilidad:** Solo acciones del formulario
   - **Líneas:** ~80

---

### ⚙️ CONFIGURACIÓN (1 archivo)

#### **config/fieldConfig.ts**
   - **Propósito:** Configuración dinámica de campos
   - **Contenido:**
     - Mapeo: tipo de otrosí → campos requeridos
     - Etiquetas descriptivas
     - Configuración de cada campo (tipo, validaciones, hints)
     - Funciones helper
   - **Funciones principales:**
     - `camposPorTipo` - Mapeo de campos por tipo
     - `etiquetasTipoOtrosi` - Labels en español
     - `configuracionCampos` - Config de inputs
   - **Líneas:** ~200
   - **Uso:** Importado por CamposDinamicos y page.tsx

---

### 📋 TIPOS TYPESCRIPT (1 archivo)

#### **types/otrosi.types.ts**
   - **Propósito:** Definiciones de tipos TypeScript
   - **Tipos principales:**
     - `TipoOtrosi` - Union type de 6 tipos
     - `CamposComunes` - Interface base
     - `Campos{Tipo}` - Interfaces específicas por tipo
     - `DatosOtrosi` - Type union de todos
     - `OtrrosiAlmacenado` - Estructura de guardado
   - **Líneas:** ~100
   - **Importancia:** ⭐⭐⭐ Critical para type safety

---

### ✅ VALIDACIÓN (1 archivo)

#### **schemas/otrosi.schema.ts**
   - **Propósito:** Esquemas de validación con Zod
   - **Esquemas:**
     - `schemaCamposComunes` - Base para todos
     - `schemaCambioCargo` - Para cambio de cargo
     - `schemaCambioCargoSalario` - Para cambio de cargo/salario
     - `schemaProrroga` - Para prórroga
     - `schemaCambioObra` - Para cambio de obra
     - `schemaAmpliacionPorcentaje` - Para ampliación porcentaje
     - `schemaTerminoIndefinido` - Para término indefinido
     - `schemaOtrosi` - Discriminated union
   - **Características:**
     - Validaciones de rango
     - Cross-field validations
     - Mensajes de error en español
   - **Líneas:** ~200
   - **Uso:** React Hook Form con zodResolver

---

### 🛠️ UTILIDADES (4 archivos)

#### 1. **utils/generatePdf.ts**
   - **Propósito:** Generar documentos PDF profesionales
   - **Funciones principales:**
     - `generarPDFOtrosi()` - Función principal
     - `agregarEncabezado()` - Header con logo
     - `agregarDetallesEspecificos()` - Contenido dinámico
     - `agregarTextoLegal()` - Párrafos legales
     - `agregarAreaFirmas()` - Sección de firmas
   - **Características:**
     - PDF profesional con jsPDF
     - Encabezado con datos de empresa
     - Contenido dinámico según tipo
     - Área de firmas
     - Descarga automática
   - **Líneas:** ~350
   - **Dependencias:** jsPDF

#### 2. **utils/almacenamiento.ts**
   - **Propósito:** Gestión de persistencia de datos
   - **Funciones:**
     - `obtenerTodos()` - Obtener todos los otrosís
     - `obtenerPorId()` - Obtener uno específico
     - `obtenerPorTipo()` - Filtrar por tipo
     - `guardar()` - Crear o actualizar
     - `eliminar()` - Borrar un registro
     - `actualizarEstado()` - Cambiar estado
     - `exportarJSON()` - Descargar JSON
   - **Almacenamiento:** localStorage (temporal)
   - **Líneas:** ~150
   - **NOTA:** Reemplazar con API para producción

#### 3. **utils/formatos.ts**
   - **Propósito:** Funciones de formato de datos
   - **Funciones:**
     - `formatearMoneda()` - COP
     - `formatearFecha()` - Legible
     - `formatearFechaInput()` - YYYY-MM-DD
     - `formatearPorcentaje()` - Con decimales
     - `camelCaseAEspacios()` - Para labels
     - `generarNumeroOtrosi()` - ID único
     - Y muchas más...
   - **Líneas:** ~180
   - **Uso:** En componentes y PDF

#### 4. **utils/validaciones.ts**
   - **Propósito:** Validaciones personalizadas complejas
   - **Funciones:**
     - `validarDocumentoExiste()` - Async check
     - `esPosterioreAlHoy()` - Comparación de fechas
     - `esValidoPorcentaje()` - Rango 0-100
     - `esValidoSalario()` - Rango salario mínimo
     - `sonFechasValidas()` - Rango de fechas
     - Y más...
   - **Líneas:** ~150
   - **Uso:** En schemas y frontend

---

### 📊 DATOS (2 archivos)

#### 1. **data/empleados.ts**
   - **Propósito:** Datos estáticos de empleados (desarrollo)
   - **Contenido:**
     - Array de ~8 empleados ejemplo
     - Tipos de documento
     - Funciones para buscar/filtrar
   - **Funciones:**
     - `obtenerEmpleado()` - Por número documento
     - `obtenerNombresEmpleados()` - Para autocompletar
     - `buscarEmpleados()` - Búsqueda fuzzy
   - **NOTA:** Reemplazar con llamada a API en producción
   - **Líneas:** ~100

#### 2. **data/ejemplos.ts**
   - **Propósito:** Ejemplos de datos para cada tipo de otrosí
   - **Contenido:**
     - Un ejemplo completo por tipo
     - Valores realistas
     - Para testing y documentación
   - **Líneas:** ~100

---

### 🏠 PÁGINA PRINCIPAL (1 archivo)

#### **page.tsx**
   - **Propósito:** Orquesta y coordina toda la funcionalidad
   - **Responsabilidades:**
     - Inicializar React Hook Form
     - Validación con Zod
     - Manejar estado del formulario
     - Guardar datos
     - Generar PDF
     - Limpiar formulario
     - Mostrar feedback al usuario
   - **Componentes usados:**
     - CamposComunes
     - CamposDinamicos
     - FormActions
   - **Características:**
     - Mensaje de éxito con animación
     - Almacenamiento automático
     - ID único para cada otrosí
   - **Líneas:** ~250
   - **Imports:** Todos los anteriores

---

### 📌 RESUMEN DEL MÓDULO (en raíz)

#### **PROYECTO_OTROSI_RESUMEN.md**
   - **Propósito:** Resumen ejecutivo del proyecto
   - **Ubicación:** c:\Users\mariana.gomez\otros\
   - **Contenido:**
     - Objetivo del proyecto
     - Stack tecnológico
     - Características principales
     - Estadísticas
     - Checklist de entrega
     - Roadmap futuro

---

## 🔄 Flujo de Importaciones

```
page.tsx (ORQUESTADOR)
  ↓
  ├── CamposComunes.tsx
  │   ├── react-hook-form
  │   └── data/empleados.ts
  │
  ├── CamposDinamicos.tsx
  │   ├── react-hook-form
  │   ├── config/fieldConfig.ts
  │   └── utils/formatos.ts
  │
  └── FormActions.tsx
      └── react-hook-form

schemas/otrosi.schema.ts (VALIDACIÓN)
  ├── zod
  └── Usado por: page.tsx vía zodResolver

config/fieldConfig.ts (CONFIG)
  └── Usado por: CamposDinamicos.tsx, utils/generatePdf.ts

types/otrosi.types.ts (TIPOS)
  └── Usado por: todos los archivos

utils/generatePdf.ts (PDF)
  ├── jspdf
  ├── config/fieldConfig.ts
  └── utils/formatos.ts

utils/almacenamiento.ts (PERSISTENCIA)
  ├── types/otrosi.types.ts
  └── Usado por: page.tsx

utils/formatos.ts (FORMATO)
  └── Usado por: componentes y generatePdf.ts

utils/validaciones.ts (VALIDACIONES EXTRA)
  └── Usado por: schemas/otrosi.schema.ts

data/empleados.ts (DATOS)
  └── Usado por: CamposComunes.tsx

data/ejemplos.ts (EJEMPLOS)
  └── Para: testing y documentación
```

---

## 📊 Estadísticas Detalladas

| Categoría | Archivos | Líneas | Propósito |
|-----------|----------|--------|----------|
| Documentación | 5 | ~2,000 | Guías y referencias |
| Componentes | 3 | ~330 | UI React |
| Configuración | 1 | ~200 | Setup dinámico |
| Tipos | 1 | ~100 | TypeScript |
| Validación | 1 | ~200 | Zod schemas |
| Utilidades | 4 | ~680 | Funciones helper |
| Datos | 2 | ~200 | Datos estáticos |
| Página Principal | 1 | ~250 | Orquestación |
| **TOTAL** | **18** | **~3,960** | **Completo** |

---

## 🎯 Guía de Lectura Recomendada

### Para Usuarios HR
1. **README.md** - Sección "Uso Básico"
2. **FAQ.md** - Preguntas relevantes

### Para Desarrolladores Nuevos
1. **INSTALACION.md** - Setup inicial
2. **README.md** - Documentación técnica
3. **GUIA_RAPIDA.md** - Referencia rápida
4. **BUENAS_PRACTICAS.md** - Patrones

### Para Desarrolladores Experimentados
1. **PROYECTO_OTROSI_RESUMEN.md** - Overview
2. **types/otrosi.types.ts** - Tipos principales
3. **page.tsx** - Lógica principal
4. **config/fieldConfig.ts** - Extensibilidad

### Para Mantenimiento
1. **FAQ.md** - Problemas comunes
2. **GUIA_RAPIDA.md** - Troubleshooting
3. Código fuente con comentarios JSDoc

---

## 🔗 Relaciones Entre Archivos

```
CONFIGURACIÓN
    ↓
fieldConfig.ts ← Define campos y tipos
    ↓
types/otrosi.types.ts ← Define interfaces
    ↓
schemas/otrosi.schema.ts ← Valida con Zod
    ↓
page.tsx ← Orquesta todo
    ├→ CamposComunes.tsx ← Renderiza campos comunes
    ├→ CamposDinamicos.tsx ← Renderiza campos dinámicos
    └→ FormActions.tsx ← Renderiza botones

UTILIDADES
    ├→ utils/generatePdf.ts ← Genera PDF
    ├→ utils/almacenamiento.ts ← Persiste datos
    ├→ utils/formatos.ts ← Formatea valores
    └→ utils/validaciones.ts ← Valida complejo

DATOS
    ├→ data/empleados.ts ← Empleados
    └→ data/ejemplos.ts ← Ejemplos
```

---

## 📝 Archivos que Necesitan Mantenimiento

| Archivo | Razón | Frecuencia |
|---------|-------|-----------|
| data/empleados.ts | Agregar/actualizar empleados | Mensual |
| config/fieldConfig.ts | Agregar nuevos tipos de otrosí | Cada 6 meses |
| utils/generatePdf.ts | Cambiar diseño de PDF | Anual |
| schemas/otrosi.schema.ts | Agregar validaciones | Según necesidad |

---

## 🚀 Próximos Pasos Recomendados

1. ✅ **Leer INSTALACION.md** - Instalar todo
2. ✅ **Leer README.md** - Entender el proyecto
3. ✅ **Ejecutar npm install** - Instalar dependencias
4. ✅ **Ejecutar npm run dev** - Iniciar servidor
5. ✅ **Ir a /talento-humano/otrosi** - Probar el módulo
6. ✅ **Revisar GUIA_RAPIDA.md** - Si necesitas extender
7. ✅ **Revisar FAQ.md** - Si tienes problemas

---

**Actualizado:** 2026-05-11  
**Versión:** 1.0.0  
**Estado:** ✅ Listo para Producción
