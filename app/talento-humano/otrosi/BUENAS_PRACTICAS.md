/**
 * Guía de Buenas Prácticas y Recomendaciones
 * Arquitectura, patrones y convenciones para el módulo de Otrosí
 */

/**
 * ============================================================================
 * 1. ARQUITECTURA Y PATRONES
 * ============================================================================
 * 
 * El módulo sigue una arquitectura modular en capas:
 * 
 * PRESENTACIÓN (UI Components)
 *   ↓
 * LÓGICA (Hooks, Utilities)
 *   ↓
 * VALIDACIÓN (Zod Schemas)
 *   ↓
 * DATOS (Types, Interfaces)
 * 
 * BENEFICIOS:
 * - Fácil de testear
 * - Componentes reutilizables
 * - Separación de responsabilidades
 * - Escalable para nuevas funcionalidades
 */

/**
 * ============================================================================
 * 2. CONVENCIONES DE NOMBRES
 * ============================================================================
 * 
 * ARCHIVOS:
 * - Componentes React: PascalCase (CamposComunes.tsx)
 * - Utilidades/Hooks: camelCase (generatePdf.ts)
 * - Tipos: .types.ts (otrosi.types.ts)
 * - Esquemas: .schema.ts (otrosi.schema.ts)
 * - Configuración: .config.ts o fieldConfig.ts
 * 
 * VARIABLES:
 * - Constantes: UPPER_SNAKE_CASE
 * - Variables: camelCase
 * - Props de componentes: Interfaz con nombre "Props{NombreComponente}"
 * 
 * FUNCIONES:
 * - Utilidades: verboSubstantivo (generarPDFOtrosi, formatearMoneda)
 * - Manejadores: handleAccion (handleGenerarPDF)
 * - Validadores: esValido... o validar... (esValidoPorcentaje)
 */

/**
 * ============================================================================
 * 3. ESTRUCTURA DE COMPONENTES
 * ============================================================================
 */

/**
 * PATRÓN DE COMPONENTE:
 * 
 * 'use client'; // Directiva para client components (Next.js 15)
 * 
 * // 1. IMPORTS
 * import { ... } from 'react';
 * import { ... } from '@/lib';
 * 
 * // 2. TIPOS E INTERFACES
 * interface PropsNombre {
 *   propiedad: tipo;
 * }
 * 
 * // 3. COMPONENTE
 * export function NombreComponente({ prop }: PropsNombre) {
 *   // Estado
 *   const [estado, setEstado] = useState();
 *   
 *   // Efectos
 *   useEffect(() => {
 *     // lógica
 *   }, []);
 *   
 *   // Handlers
 *   const handleAccion = () => {};
 *   
 *   // Render
 *   return <div>...</div>;
 * }
 */

/**
 * ============================================================================
 * 4. MANEJO DE FORMULARIOS
 * ============================================================================
 * 
 * ALWAYS USE React Hook Form + Zod para:
 * - Validación
 * - Control de campos
 * - Manejo de errores
 * - Performance (evita re-renders innecesarios)
 * 
 * PATTERN:
 * const form = useForm({
 *   resolver: zodResolver(schema),
 *   mode: 'onChange', // Validación en tiempo real
 *   defaultValues: { ... }
 * });
 * 
 * NEVER:
 * ❌ useState para cada campo
 * ❌ Validación manual
 * ❌ onChange en inputs sin Controller
 */

/**
 * ============================================================================
 * 5. VALIDACIÓN
 * ============================================================================
 * 
 * REGLAS:
 * 1. Validación en Schema (Zod) para datos complejos
 * 2. Validaciones personalizadas en utils/validaciones.ts
 * 3. Mensajes de error en español y claros
 * 4. Mostrar errores junto al campo afectado
 * 
 * PATTERN Zod:
 * const schema = z.object({
 *   campo: z.string().min(3, 'Mensaje de error').regex(/patrón/, 'Otro mensaje'),
 *   numero: z.number().positive('Debe ser positivo').refine(valor => valor > 100, 'Mensaje custom')
 * });
 * 
 * VALIDACIÓN ASINCRÓNICA:
 * .refine() para validaciones simples
 * .superRefine() para validaciones complejas con múltiples errores
 */

/**
 * ============================================================================
 * 6. GESTIÓN DE ESTADO
 * ============================================================================
 * 
 * JERARQUÍA:
 * 1. localStorage (para datos que persisten)
 * 2. React Context (para estado global)
 * 3. useState (para estado local)
 * 4. react-hook-form (para estado de formulario)
 * 
 * NEVER USE:
 * ❌ Múltiples useState para datos relacionados (usar objeto)
 * ❌ localStorage para datos sensibles (usar API + sesión)
 * ❌ Context para estado que cambia frecuentemente
 * 
 * EN ESTE MÓDULO:
 * - react-hook-form para formulario
 * - localStorage (temporal) → Migrar a API
 * - useState solo para UI (modales, tooltips, etc)
 */

/**
 * ============================================================================
 * 7. GENERACIÓN DE PDF
 * ============================================================================
 * 
 * BUENAS PRÁCTICAS:
 * 1. Funciones separadas por sección (encabezado, detalles, firmas)
 * 2. Constantes para márgenes, colores, tamaños
 * 3. Reutilizar funciones de formato (formatearFecha, formatearMoneda)
 * 4. Hacer PDFs responsivos a contenido (dividir en páginas)
 * 
 * PERFORMANCE:
 * - Generar PDF en worker si es muy pesado
 * - No generar en tiempo real, solo en click
 * - Mostrar loading durante generación
 * 
 * FUTURO:
 * - Migrar a pdf-lib (más control, menor tamaño)
 * - Cachear plantillas
 * - Generar en servidor si hay muchos usuarios
 */

/**
 * ============================================================================
 * 8. ALMACENAMIENTO DE DATOS
 * ============================================================================
 * 
 * NIVELES DE PERSISTENCIA:
 * 
 * NIVEL 1: localStorage (ACTUAL)
 * ✅ Fácil implementación
 * ✅ Rápido
 * ❌ No compartido entre dispositivos
 * ❌ Limitado a 5-10MB
 * 
 * NIVEL 2: API + Base de Datos (RECOMENDADO PRODUCCIÓN)
 * ✅ Seguro
 * ✅ Sincronizado
 * ✅ Auditable
 * ❌ Requiere backend
 * 
 * CÓMO MIGRAR:
 * 1. Crear API routes en Next.js
 * 2. Reemplazar funciones en utils/almacenamiento.ts
 * 3. Agregar autenticación
 * 4. Implementar backup/restore
 */

/**
 * ============================================================================
 * 9. ESTILOS Y CSS
 * ============================================================================
 * 
 * USAR TAILWIND CSS:
 * ✅ Utility-first approach
 * ✅ Clases predefinidas
 * ✅ Responsive (mobile-first)
 * ✅ Dark mode listo
 * 
 * ORGANIZACIÓN:
 * - Espaciado: gap-X, p-X, m-X
 * - Colores: tema azul (primario), verde (secundario), rojo (errores)
 * - Sombras: shadow-lg para elementos importantes
 * - Border: border-XX para énfasis
 * 
 * ESTADOS:
 * - Normal: border-gray-300, bg-white
 * - Error: border-red-300, bg-red-50
 * - Focus: ring-2, ring-{color}-500
 * - Disabled: opacity-50, cursor-not-allowed
 * - Hover: hover:bg-{color}-700
 * 
 * RESPONSIVE:
 * - Mobile-first (estilos base para mobile)
 * - md: para tablets (768px+)
 * - lg: para desktop (1024px+)
 */

/**
 * ============================================================================
 * 10. TESTING
 * ============================================================================
 * 
 * ESTRUCTURA DE TESTS:
 * 
 * describe('CamposComunes', () => {
 *   it('debe renderizar campos comunes', () => {
 *     render(<CamposComunes />);
 *     expect(screen.getByLabelText('Nombre del Empleado')).toBeInTheDocument();
 *   });
 * 
 *   it('debe validar documento requerido', async () => {
 *     const { user } = render(<CamposComunes />);
 *     const input = screen.getByLabelText('Número de Documento');
 *     await user.clear(input);
 *     // Assert error message
 *   });
 * });
 * 
 * HERRAMIENTAS:
 * - Testing Library (React components)
 * - Jest (unitarios)
 * - Cypress (e2e)
 */

/**
 * ============================================================================
 * 11. PERFORMANCE
 * ============================================================================
 * 
 * OPTIMIZACIONES IMPLEMENTADAS:
 * ✅ React Hook Form (evita re-renders innecesarios)
 * ✅ Lazy loading de componentes
 * ✅ Debounce en búsqueda de empleados
 * ✅ Memoización de funciones costosas
 * 
 * MEJORAS FUTURAS:
 * - [ ] Code splitting por tipo de otrosí
 * - [ ] Virtual scrolling para listas grandes
 * - [ ] Service Workers para offline
 * - [ ] Image optimization
 * - [ ] Lazy load PDF library
 */

/**
 * ============================================================================
 * 12. MANTENIBILIDAD
 * ============================================================================
 * 
 * DOCUMENTACIÓN:
 * ✅ Cada función tiene JSDoc
 * ✅ Ejemplos de uso
 * ✅ Parámetros y retorno documentados
 * 
 * LEGIBILIDAD:
 * ✅ Nombres descriptivos
 * ✅ Máximo 100 líneas por función
 * ✅ Máximo 3 niveles de indentación
 * ✅ Avoid magic numbers
 * 
 * ESCALABILIDAD:
 * ✅ Componentes pequeños y reutilizables
 * ✅ Configuración externalizada
 * ✅ Tipos bien definidos
 * ✅ Fácil agregar nuevos tipos de otrosí
 */

/**
 * ============================================================================
 * 13. SEGURIDAD
 * ============================================================================
 * 
 * FRONT-END:
 * ✅ Validación con Zod
 * ✅ No guardar datos sensibles en localStorage
 * ✅ Sanitizar inputs
 * 
 * BACK-END (CUANDO SE AGREGUE):
 * ⚠️ Validar SIEMPRE en servidor
 * ⚠️ Autenticación (JWT, OAuth)
 * ⚠️ Autorización (roles, permisos)
 * ⚠️ Rate limiting
 * ⚠️ Logs de auditoría
 * 
 * NUNCA:
 * ❌ Confiar solo en validación frontend
 * ❌ Guardar contraseñas en localStorage
 * ❌ Exponer API keys en frontend
 * ❌ Logging de datos sensibles
 */

/**
 * ============================================================================
 * 14. LOGGING Y DEBUGGING
 * ============================================================================
 * 
 * ESTRATEGIA:
 * - console.log para desarrollo
 * - console.warn para advertencias
 * - console.error para errores
 * - Remover logs antes de producción (O usar logger lib)
 * 
 * DEBUGGING:
 * - DevTools de React
 * - Network tab para APIs
 * - React Profiler para performance
 * - localStorage inspection en Console
 * 
 * LOGS IMPORTANTES:
 * ✅ Errores de validación
 * ✅ Errores de generación de PDF
 * ✅ Errores de guardado
 * ✅ Búsquedas de empleados (si es lenta)
 */

/**
 * ============================================================================
 * 15. MEJORAS FUTURAS
 * ============================================================================
 * 
 * CORTO PLAZO:
 * - [ ] Agregar modo oscuro
 * - [ ] Exportar a Excel
 * - [ ] Historial de cambios
 * - [ ] Duplicate form
 * 
 * MEDIANO PLAZO:
 * - [ ] Workflow de aprobación
 * - [ ] Notificaciones por email
 * - [ ] Firma digital
 * - [ ] Integración con nómina
 * 
 * LARGO PLAZO:
 * - [ ] Machine Learning para autocompletar
 * - [ ] Analytics y reportes
 * - [ ] Mobile app nativa
 * - [ ] Integración con RH systems
 * 
 * REFACTORING:
 * - Migrar localStorage a API
 * - Agregar tests
 * - Mejorar accessibility (WCAG)
 * - Optimizar bundle size
 * - Implementar error boundaries
 */

/**
 * ============================================================================
 * 16. DEPLOYMENT
 * ============================================================================
 * 
 * PRE-DEPLOYMENT CHECKLIST:
 * [ ] Todos los logs removidos
 * [ ] Variables de entorno configuradas
 * [ ] Build sin errores (npm run build)
 * [ ] Tests pasando
 * [ ] Performance acceptable (Lighthouse > 90)
 * [ ] Seguridad revisada (CORS, headers)
 * [ ] Base de datos migrada (si aplica)
 * [ ] Backup plan
 * [ ] Documentación actualizada
 * 
 * DEPLOYMENT OPTIONS:
 * - Vercel (recomendado para Next.js)
 * - Netlify
 * - Docker + AWS/GCP/Azure
 * - Self-hosted
 */

/**
 * ============================================================================
 * 17. EJEMPLOS DE CÓDIGO
 * ============================================================================
 */

// ✅ BIEN: Función documentada y clara
/**
 * Formatea un número como moneda COP
 * @param valor - Número a formatear
 * @returns String formateado como dinero
 * @example
 * formatearMoneda(3500000) // "$ 3.500.000"
 */
export function ejemplo_bien_formatearMoneda(valor: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(valor);
}

// ❌ MAL: Sin documentación, poco clara
export function fm(v: number): string {
  return `$ ${v.toLocaleString('es-CO')}`;
}

// ✅ BIEN: Componente con responsabilidad única
/**
 * Props para CamposComunes
 */
interface PropsCamposComunes_Bien {
  onEmpleadoSeleccionado?: (id: string) => void;
}

/**
 * Muestra solo los campos comunes
 * Los campos específicos están en CamposDinamicos
 */
export function ejemplo_bien_CamposComunes({ onEmpleadoSeleccionado }: PropsCamposComunes_Bien) {
  // Solo responsable de campos comunes
  return <div>Campos comunes aquí</div>;
}

// ❌ MAL: Componente hace demasiadas cosas
export function ejemplo_mal_CamposCompletos() {
  // Maneja campos comunes, dinámicos, validación, guardado, PDF... TODO
  return <div>Todo junto</div>;
}

// ✅ BIEN: Zod schema bien estructurado
import { z } from 'zod';

const schema_bien = z.object({
  numeroDocumento: z
    .string()
    .min(5, 'Muy corto')
    .max(20, 'Muy largo')
    .regex(/^\d+$/, 'Solo números'),
  salario: z
    .number()
    .positive('Debe ser positivo')
    .refine((v) => v >= 248000, 'Menor al mínimo')
});

// ❌ MAL: Sin validaciones claras
const schema_mal = z.object({
  numeroDocumento: z.string(),
  salario: z.number()
});

/**
 * ============================================================================
 * 18. RECURSOS ÚTILES
 * ============================================================================
 * 
 * Documentación:
 * - Next.js: https://nextjs.org/docs
 * - React: https://react.dev
 * - Tailwind: https://tailwindcss.com
 * - React Hook Form: https://react-hook-form.com
 * - Zod: https://zod.dev
 * - jsPDF: https://github.com/parallax/jsPDF
 * 
 * Herramientas:
 * - VS Code
 * - Prettier (code formatter)
 * - ESLint (linter)
 * - TypeScript
 * 
 * Libros:
 * - "Clean Code" - Robert Martin
 * - "Refactoring" - Martin Fowler
 * - "Design Patterns" - Gang of Four
 */

export const BUENAS_PRACTICAS = {
  documentacion: '✅ JSDoc en cada función',
  nombres: '✅ Descriptivos y consistentes',
  componentes: '✅ Pequeños, testables, reutilizables',
  validacion: '✅ Frontend + Backend',
  seguridad: '✅ Inputs sanitizados, datos protegidos',
  performance: '✅ Optimizado, sin re-renders innecesarios',
  mantenibilidad: '✅ Fácil de entender y modificar'
};
