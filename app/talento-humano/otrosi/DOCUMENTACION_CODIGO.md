# Documentación del módulo de otrosí

Este archivo resume qué contiene cada archivo actual del módulo `app/talento-humano/otrosi/` y cómo se relacionan entre sí.

## Vista general

El módulo permite:

- Mostrar un formulario de otrosí laboral.
- Cambiar campos según el tipo de otrosí seleccionado.
- Validar datos con Zod.
- Guardar la información en `localStorage`.
- Buscar empleados desde una lista estática local.

## Estructura actual

```text
app/talento-humano/otrosi/
├── page.tsx
├── README.md
├── DOCUMENTACION_CODIGO.md
├── components/
│   ├── CamposComunes.tsx
│   ├── CamposDinamicos.tsx
│   └── FormActions.tsx
├── config/
│   └── fieldConfig.ts
├── data/
│   └── empleados.ts
├── schemas/
│   └── otrosi.schema.ts
├── types/
│   └── otrosi.types.ts
└── utils/
    └── almacenamiento.ts
```

## Archivo por archivo

### `page.tsx`

Es la página principal del módulo.

Responsabilidades:

- Crea el formulario con `react-hook-form`.
- Conecta el formulario con el esquema `schemaOtrosi`.
- Define valores iniciales.
- Observa el valor de `tipoOtrosi` para mostrar campos dinámicos.
- Ejecuta `guardar()` al enviar el formulario.
- Organiza visualmente el encabezado y las secciones del formulario.

Componentes que usa:

- `CamposComunes`
- `CamposDinamicos`
- `AccionesFormulario`

Archivos relacionados:

- `schemas/otrosi.schema.ts`
- `utils/almacenamiento.ts`
- `types/otrosi.types.ts`

### `components/CamposComunes.tsx`

Renderiza los campos que aparecen siempre, sin importar el tipo de otrosí.

Incluye:

- Tipo de otrosí.
- Tipo de documento.
- Número de documento.
- Nombre del empleado.
- Lugar de firma.
- Fecha de firma.

También contiene:

- Búsqueda de empleados mediante `buscarEmpleados()`.
- Lista de sugerencias al escribir documento o coincidencias.
- Relleno automático de documento y nombre al seleccionar un empleado.

Archivos relacionados:

- `data/empleados.ts`
- `react-hook-form`

### `components/CamposDinamicos.tsx`

Renderiza los campos adicionales según el valor de `tipoOtrosi`.

Comportamiento:

- Si el tipo es `termino_indefinido`, no muestra campos extra.
- Consulta `camposPorTipo` para saber qué campos pintar.
- Consulta `configuracionCampos` para conocer etiqueta, placeholder, tipo de input y límites.
- Usa `Controller` para conectar cada campo con el formulario.
- Muestra ayudas breves para porcentajes y salario.
- Muestra un bloque informativo con una explicación del tipo de otrosí seleccionado.

Archivos relacionados:

- `config/fieldConfig.ts`
- `types/otrosi.types.ts`

### `components/FormActions.tsx`

Contiene la acción principal del formulario.

Actualmente:

- Muestra el botón `Guardar`.
- Deshabilita el botón mientras el formulario se está enviando.
- Cambia el texto a `Guardando...` durante el envío.

### `config/fieldConfig.ts`

Centraliza la configuración de campos dinámicos.

Contiene:

- `camposPorTipo`
  - Define qué campos pertenecen a cada tipo de otrosí.
- `configuracionCampos`
  - Define etiqueta.
  - Placeholder.
  - Tipo de control.
  - Si es obligatorio.
  - Valores mínimos, máximos y paso numérico.

Ejemplo:

- `cambio_cargo` usa:
  - `cargoNuevo`
  - `constanciaFirma`

Este archivo controla la estructura visual de los campos dinámicos, no la validación final.

### `data/empleados.ts`

Contiene datos estáticos usados por el autocompletado.

Incluye:

- Tipo `Empleado`.
- Lista de tipos de documento.
- Lista local de empleados de ejemplo.
- Función `buscarEmpleados(termino)`.

La búsqueda filtra por:

- Nombre.
- Número de documento.

### `schemas/otrosi.schema.ts`

Define la validación del formulario con Zod.

Contiene:

- Esquema base de campos comunes.
- Esquemas específicos por tipo de otrosí:
  - `schemaCambioCargo`
  - `schemaCambioCargoSalario`
  - `schemaProrroga`
  - `schemaCambioObra`
  - `schemaAmpliacionPorcentaje`
  - `schemaTerminoIndefinido`
- `schemaOtrosi`
  - Une todo mediante `z.discriminatedUnion('tipoOtrosi', ...)`.

Validaciones importantes:

- Documento numérico.
- Nombre con letras y espacios.
- Fechas válidas.
- Porcentajes entre 0 y 100.
- La nueva fecha de terminación debe ser posterior a la actual.
- El porcentaje nuevo debe coincidir con la suma configurada.

También exporta:

- `DatosOtrosi`, inferido directamente desde `schemaOtrosi`.

### `types/otrosi.types.ts`

Define tipos e interfaces TypeScript usados en todo el módulo.

Incluye:

- `TipoOtrosi`
- `TipoDocumento`
- `CamposComunes`
- Interfaces de campos específicos por tipo de otrosí.
- `DatosOtrosi`
- `OtrosiAlmacenado`
- `ConfiguracionCampo`

Este archivo describe la forma esperada de los datos en tiempo de desarrollo.

### `utils/almacenamiento.ts`

Maneja el guardado local de otrosís en el navegador.

Contiene:

- `CLAVE_ALMACENAMIENTO`
- `generarId()`
- `obtenerTodos()`
- `guardar()`

Flujo:

1. Lee los otrosís almacenados desde `localStorage`.
2. Si recibe un `id`, actualiza ese registro.
3. Si no recibe `id`, crea uno nuevo.
4. Guarda el arreglo actualizado.
5. Devuelve el registro guardado.

## Flujo de datos del módulo

```text
page.tsx
  ├── schemaOtrosi valida los datos
  ├── CamposComunes muestra campos base
  ├── CamposDinamicos usa fieldConfig para campos extra
  ├── FormActions dispara el submit
  └── guardar() persiste en localStorage
```

## Tipos de otrosí soportados

| Tipo | Campos extra |
| --- | --- |
| `cambio_cargo` | Cargo nuevo, fecha de inicio |
| `cambio_cargo_salario` | Cargo nuevo, constancia de firma, nuevo salario |
| `prorroga` | Fecha de constancia convertida a texto de firma |
| `cambio_obra` | Obra anterior, obra nueva, porcentaje de avance |
| `ampliacion_porcentaje` | Código de obra, nombre de obra, porcentajes |
| `termino_indefinido` | Sin campos adicionales |

## Qué archivo tocar según la necesidad

| Necesidad | Archivo principal |
| --- | --- |
| Cambiar la página o layout del formulario | `page.tsx` |
| Editar campos comunes | `components/CamposComunes.tsx` |
| Editar campos dinámicos | `components/CamposDinamicos.tsx` |
| Cambiar el botón de guardado | `components/FormActions.tsx` |
| Agregar o quitar campos por tipo | `config/fieldConfig.ts` |
| Cambiar validaciones | `schemas/otrosi.schema.ts` |
| Ajustar tipos TypeScript | `types/otrosi.types.ts` |
| Cambiar empleados de ejemplo | `data/empleados.ts` |
| Cambiar persistencia local | `utils/almacenamiento.ts` |

## Cómo agregar un nuevo tipo de otrosí

1. Agregar el nuevo valor en `TipoOtrosi`.
2. Crear la interfaz de campos específicos si aplica.
3. Agregar esos campos a `DatosOtrosi`.
4. Definir los campos en `fieldConfig.ts`.
5. Crear el esquema Zod correspondiente.
6. Incluir el nuevo esquema en `schemaOtrosi`.
7. Agregar la opción al selector de `CamposComunes.tsx`.

## Estado actual del módulo

- El formulario está operativo.
- La persistencia es local en navegador.
- La validación está centralizada.
- No hay generación de PDF en la versión actual.
- No hay API ni base de datos conectada en este módulo.
