/**
 * Archivo de ejemplo con datos de otrosí
 * Útil para testing y como referencia de estructura
 */

import { DatosOtrosi } from '../types/otrosi.types';

/**
 * Ejemplos de datos completos para cada tipo de otrosí
 */
export const ejemplosOtrosi: Record<string, DatosOtrosi> = {
  cambio_cargo: {
    tipoOtrosi: 'cambio_cargo',
    numeroDocumento: '1025630234',
    tipoDocumento: 'cedula',
    nombreEmpleado: 'Juan Pérez García',
    lugarFirma: 'Mosquera',
    fechaFirma: '2026-05-11',
    cargoNuevo: 'Ingeniero de Sistemas Senior',
    fechaInicioCargo: '2026-06-01'
  },

  cambio_cargo_salario: {
    tipoOtrosi: 'cambio_cargo_salario',
    numeroDocumento: '1100123456',
    tipoDocumento: 'cedula',
    nombreEmpleado: 'María López Rodríguez',
    lugarFirma: 'Mosquera',
    fechaFirma: '2026-05-11',
    cargoNuevo: 'Gerente de Proyectos',
    fechaInicioCargo: '2026-06-15',
    nuevoSalario: 5500000
  },

  prorroga: {
    tipoOtrosi: 'prorroga',
    numeroDocumento: '1087654321',
    tipoDocumento: 'cedula',
    nombreEmpleado: 'Carlos González Martínez',
    lugarFirma: 'Mosquera',
    fechaFirma: '2026-05-11',
    numeroProrroga: 1,
    fechaTerminacionActual: '2026-12-31',
    fechaTerminacionNueva: '2027-06-30'
  },

  cambio_obra: {
    tipoOtrosi: 'cambio_obra',
    numeroDocumento: '1020345678',
    tipoDocumento: 'cedula',
    nombreEmpleado: 'Laura Fernández López',
    lugarFirma: 'Mosquera',
    fechaFirma: '2026-05-11',
    obraAnterior: 'Centro Comercial Plaza Mayor',
    obraNueva: 'Urbanización Residencial El Bosque',
    porcentajeAvanceNuevaObra: 35.5
  },

  ampliacion_porcentaje: {
    tipoOtrosi: 'ampliacion_porcentaje',
    numeroDocumento: '1015678901',
    tipoDocumento: 'cedula',
    nombreEmpleado: 'Roberto Sánchez Díaz',
    lugarFirma: 'Mosquera',
    fechaFirma: '2026-05-11',
    codigoObra: 'OBR-2024-001',
    nombreObra: 'Proyecto Infraestructura',
    porcentajeAnterior: 50,
    porcentajeProrroga: 25,
    porcentajeNuevo: 75
  },

  termino_indefinido: {
    tipoOtrosi: 'termino_indefinido',
    numeroDocumento: '1088234567',
    tipoDocumento: 'cedula',
    nombreEmpleado: 'Ana Martínez Ruiz',
    lugarFirma: 'Mosquera',
    fechaFirma: '2026-05-11'
  }
};

/**
 * Obtener un ejemplo por tipo
 */
export const obtenerEjemplo = (tipoOtrosi: string): DatosOtrosi | null => {
  return ejemplosOtrosi[tipoOtrosi] || null;
};

/**
 * Datos para llenar el formulario en modo demo
 */
export const datosDemo = ejemplosOtrosi.cambio_cargo;
