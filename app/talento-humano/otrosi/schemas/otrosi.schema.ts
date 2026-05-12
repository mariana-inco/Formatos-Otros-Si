/**
 * Esquemas de validación con Zod
 * Define las reglas de validación para todos los tipos de otrosí
 */

import { z } from 'zod';

/**
 * Esquema para campos comunes en todos los otrosí
 */
const schemaCamposComunes = z.object({
  tipoOtrosi: z.enum([
    'cambio_cargo',
    'cambio_cargo_salario',
    'prorroga',
    'cambio_obra',
    'ampliacion_porcentaje',
    'termino_indefinido'
  ]),
  numeroDocumento: z
    .string()
    .min(5, 'El número de documento debe tener al menos 5 caracteres')
    .max(20, 'El número de documento no puede exceder 20 caracteres')
    .regex(/^\d+$/, 'El número de documento solo puede contener dígitos'),
  tipoDocumento: z.enum(['cedula', 'pasaporte', 'cedula_extranjeria']),
  nombreEmpleado: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(150, 'El nombre no puede exceder 150 caracteres')
    .regex(/^[a-záéíóúñ\s]+$/i, 'El nombre solo puede contener letras y espacios'),
  lugarFirma: z
    .string()
    .min(2, 'El lugar debe tener al menos 2 caracteres')
    .max(100, 'El lugar no puede exceder 100 caracteres'),
  fechaFirma: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'La fecha debe ser válida')
});

/**
 * Schema para Cambio de Cargo
 */
export const schemaCambioCargo = schemaCamposComunes.extend({
  cargoNuevo: z
    .string()
    .min(3, 'El cargo debe tener al menos 3 caracteres')
    .max(100, 'El cargo no puede exceder 100 caracteres'),
  fechaInicioCargo: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'La fecha debe ser válida')
});

/**
 * Schema para Cambio de Cargo y/o Salario
 */
export const schemaCambioCargoSalario = schemaCamposComunes.extend({
  cargoNuevo: z
    .string()
    .min(3, 'El cargo debe tener al menos 3 caracteres')
    .max(100, 'El cargo no puede exceder 100 caracteres'),
  fechaInicioCargo: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'La fecha debe ser válida'),
  nuevoSalario: z
    .number()
    .positive('El salario debe ser un valor positivo')
    .refine((valor) => valor >= 0, 'El salario no puede ser negativo')
});

/**
 * Schema para Prórroga de Contrato
 */
export const schemaProrroga = schemaCamposComunes.extend({
  numeroProrroga: z
    .number()
    .int('El número de prórroga debe ser un número entero')
    .positive('El número de prórroga debe ser positivo'),
  fechaTerminacionActual: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'La fecha debe ser válida'),
  fechaTerminacionNueva: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'La fecha debe ser válida')
}).refine(
  (data) => {
    const actual = new Date(data.fechaTerminacionActual);
    const nueva = new Date(data.fechaTerminacionNueva);
    return nueva > actual;
  },
  {
    message: 'La fecha de terminación nueva debe ser posterior a la actual',
    path: ['fechaTerminacionNueva']
  }
);

/**
 * Schema para Cambio de Obra
 */
export const schemaCambioObra = schemaCamposComunes.extend({
  obraAnterior: z
    .string()
    .min(3, 'El nombre de obra debe tener al menos 3 caracteres')
    .max(200, 'El nombre de obra no puede exceder 200 caracteres'),
  obraNueva: z
    .string()
    .min(3, 'El nombre de obra debe tener al menos 3 caracteres')
    .max(200, 'El nombre de obra no puede exceder 200 caracteres'),
  porcentajeAvanceNuevaObra: z
    .number()
    .min(0, 'El porcentaje no puede ser menor a 0')
    .max(100, 'El porcentaje no puede ser mayor a 100')
});

/**
 * Schema para Ampliación de Porcentaje
 */
export const schemaAmpliacionPorcentaje = schemaCamposComunes.extend({
  codigoObra: z
    .string()
    .min(3, 'El código debe tener al menos 3 caracteres')
    .max(50, 'El código no puede exceder 50 caracteres'),
  nombreObra: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(200, 'El nombre no puede exceder 200 caracteres'),
  porcentajeAnterior: z
    .number()
    .min(0, 'El porcentaje no puede ser menor a 0')
    .max(100, 'El porcentaje no puede ser mayor a 100'),
  porcentajeProrroga: z
    .number()
    .min(0, 'El porcentaje no puede ser menor a 0')
    .max(100, 'El porcentaje no puede ser mayor a 100'),
  porcentajeNuevo: z
    .number()
    .min(0, 'El porcentaje no puede ser menor a 0')
    .max(100, 'El porcentaje no puede ser mayor a 100')
}).refine(
  (data) => {
    const suma = data.porcentajeAnterior + data.porcentajeProrroga;
    return data.porcentajeNuevo === suma || Math.abs(data.porcentajeNuevo - suma) < 0.01;
  },
  {
    message: 'El porcentaje nuevo debe ser la suma del anterior más la prórroga',
    path: ['porcentajeNuevo']
  }
);

/**
 * Schema para Cambio a Término Indefinido
 */
export const schemaTerminoIndefinido = schemaCamposComunes;

/**
 * Schema dinámico que valida según el tipo de otrosí
 */
export const schemaOtrosi = z.discriminatedUnion('tipoOtrosi', [
  schemaCambioCargo.extend({ tipoOtrosi: z.literal('cambio_cargo') }),
  schemaCambioCargoSalario.extend({ tipoOtrosi: z.literal('cambio_cargo_salario') }),
  schemaProrroga.safeExtend({ tipoOtrosi: z.literal('prorroga') }),
  schemaCambioObra.extend({ tipoOtrosi: z.literal('cambio_obra') }),
  schemaAmpliacionPorcentaje.safeExtend({ tipoOtrosi: z.literal('ampliacion_porcentaje') }),
  schemaTerminoIndefinido.extend({ tipoOtrosi: z.literal('termino_indefinido') })
]);

export type DatosOtrosi = z.infer<typeof schemaOtrosi>;
