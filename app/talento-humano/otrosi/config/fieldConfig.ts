/**
 * Configuración de campos dinámicos por tipo de otrosí
 * Define qué campos se muestran para cada tipo de contrato
 */

import { TipoOtrosi, ConfiguracionCampo } from '../types/otrosi.types';

/**
 * Mapeo de qué campos son requeridos para cada tipo de otrosí
 */
export const camposPorTipo: Record<TipoOtrosi, string[]> = {
  cambio_cargo: ['cargoNuevo', 'fechaInicioCargo'],
  cambio_cargo_salario: ['cargoNuevo', 'fechaInicioCargo', 'nuevoSalario'],
  prorroga: ['numeroProrroga', 'fechaTerminacionActual', 'fechaTerminacionNueva'],
  cambio_obra: ['obraAnterior', 'obraNueva', 'porcentajeAvanceNuevaObra'],
  ampliacion_porcentaje: [
    'codigoObra',
    'nombreObra',
    'porcentajeAnterior',
    'porcentajeProrroga',
    'porcentajeNuevo'
  ],
  termino_indefinido: []
};

/**
 * Etiquetas en español para cada tipo de otrosí
 */
export const etiquetasTipoOtrosi: Record<TipoOtrosi, string> = {
  cambio_cargo: 'Cambio de Cargo',
  cambio_cargo_salario: 'Cambio de Cargo y/o Salario',
  prorroga: 'Prórroga de Contrato a Término Fijo',
  cambio_obra: 'Cambio de Obra',
  ampliacion_porcentaje: 'Ampliación de Porcentaje de Obra',
  termino_indefinido: 'Cambio a Término Indefinido'
};

/**
 * Configuración de campos dinámicos
 * Define el tipo, validaciones y comportamiento de cada campo
 */
export const configuracionCampos: Record<string, ConfiguracionCampo> = {
  // Campos comunes
  numeroDocumento: {
    label: 'Número de Documento',
    placeholder: 'Ej: 1025630234',
    tipo: 'texto',
    obligatorio: true,
    validaciones: {
      patron: /^\d{5,}$/,
      mensaje: 'Ingrese un número de documento válido'
    }
  },
  tipoDocumento: {
    label: 'Tipo de Documento',
    tipo: 'select',
    obligatorio: true
  },
  nombreEmpleado: {
    label: 'Nombre del Empleado',
    placeholder: 'Ej: Juan Pérez García',
    tipo: 'texto',
    obligatorio: true
  },
  lugarFirma: {
    label: 'Lugar de Firma',
    placeholder: 'Ej: Mosquera',
    tipo: 'texto',
    obligatorio: true
  },
  fechaFirma: {
    label: 'Fecha de Firma',
    tipo: 'fecha',
    obligatorio: true
  },
  tipoOtrosi: {
    label: 'Tipo de Otrosí',
    tipo: 'select',
    obligatorio: true
  },

  // Campos para Cambio de Cargo
  cargoNuevo: {
    label: 'Cargo Nuevo',
    placeholder: 'Ej: Ingeniero de Sistemas Senior',
    tipo: 'texto',
    obligatorio: true
  },
  fechaInicioCargo: {
    label: 'Fecha de Inicio del Cargo',
    tipo: 'fecha',
    obligatorio: true
  },

  // Campos para Cambio de Cargo y/o Salario
  nuevoSalario: {
    label: 'Nuevo Salario (COP)',
    placeholder: 'Ej: 3500000',
    tipo: 'numero',
    obligatorio: true,
    minimo: 0,
    paso: 10000,
    validaciones: {
      mensaje: 'El salario debe ser un valor positivo'
    }
  },

  // Campos para Prórroga
  numeroProrroga: {
    label: 'Número de Prórroga',
    placeholder: 'Ej: 1, 2, 3...',
    tipo: 'numero',
    obligatorio: true,
    minimo: 1,
    paso: 1
  },
  fechaTerminacionActual: {
    label: 'Fecha de Terminación Actual',
    tipo: 'fecha',
    obligatorio: true
  },
  fechaTerminacionNueva: {
    label: 'Fecha de Terminación Nueva',
    tipo: 'fecha',
    obligatorio: true
  },

  // Campos para Cambio de Obra
  obraAnterior: {
    label: 'Obra Anterior',
    placeholder: 'Ej: Construcción Centro Comercial',
    tipo: 'texto',
    obligatorio: true
  },
  obraNueva: {
    label: 'Obra Nueva',
    placeholder: 'Ej: Urbanización Residencial',
    tipo: 'texto',
    obligatorio: true
  },
  porcentajeAvanceNuevaObra: {
    label: 'Porcentaje de Avance (Nueva Obra)',
    placeholder: 'Ej: 25',
    tipo: 'numero',
    obligatorio: true,
    minimo: 0,
    maximo: 100,
    paso: 0.1,
    validaciones: {
      mensaje: 'El porcentaje debe estar entre 0 y 100'
    }
  },

  // Campos para Ampliación de Porcentaje
  codigoObra: {
    label: 'Código de Obra',
    placeholder: 'Ej: OBR-2024-001',
    tipo: 'texto',
    obligatorio: true
  },
  nombreObra: {
    label: 'Nombre de Obra',
    placeholder: 'Ej: Proyecto Infraestructura',
    tipo: 'texto',
    obligatorio: true
  },
  porcentajeAnterior: {
    label: 'Porcentaje Anterior (%)',
    placeholder: 'Ej: 50',
    tipo: 'numero',
    obligatorio: true,
    minimo: 0,
    maximo: 100,
    paso: 0.1
  },
  porcentajeProrroga: {
    label: 'Porcentaje Prórroga (%)',
    placeholder: 'Ej: 20',
    tipo: 'numero',
    obligatorio: true,
    minimo: 0,
    maximo: 100,
    paso: 0.1
  },
  porcentajeNuevo: {
    label: 'Porcentaje Nuevo (%)',
    placeholder: 'Ej: 70',
    tipo: 'numero',
    obligatorio: true,
    minimo: 0,
    maximo: 100,
    paso: 0.1
  }
};

/**
 * Obtiene los campos requeridos para un tipo de otrosí específico
 */
export const obtenerCamposRequeridos = (tipoOtrosi: TipoOtrosi): string[] => {
  return camposPorTipo[tipoOtrosi] || [];
};

/**
 * Obtiene la configuración completa de un campo
 */
export const obtenerConfiguracionCampo = (nombreCampo: string): ConfiguracionCampo | null => {
  return configuracionCampos[nombreCampo] || null;
};

/**
 * Genera el título descriptivo de un tipo de otrosí
 */
export const obtenerTituloOtrosi = (tipoOtrosi: TipoOtrosi): string => {
  return etiquetasTipoOtrosi[tipoOtrosi] || 'Otrosí';
};
