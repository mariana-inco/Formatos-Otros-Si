import { TipoOtrosi, ConfiguracionCampo } from '../types/otrosi.types';

export const camposPorTipo: Record<TipoOtrosi, string[]> = {
  cambio_cargo: ['cargoNuevo', 'constanciaFirma'],
  cambio_cargo_salario: ['cargoNuevo', 'nuevoSalario', 'constanciaFirma'],
  prorroga: ['constanciaFirma'],
  cambio_obra: ['obraAnterior', 'obraNueva', 'porcentajeAvanceNuevaObra', 'constanciaFirma'],
  ampliacion_porcentaje: [
    'codigoObra',
    'nombreObra',
    'porcentajeAnterior',
    'porcentajeProrroga',
    'porcentajeNuevo',
    'constanciaFirma'
  ],
  termino_indefinido: [
    'numeroProrroga',
    'descripcionFinProrroga',
    'fechaTerminacionProrroga',
    'constanciaFirma'
  ]
};

export const configuracionCampos: Record<string, ConfiguracionCampo> = {
  cargoNuevo: {
    label: 'Cargo a desempeñar a partir de la fecha',
    placeholder: 'Ej: Ingeniero de Sistemas Senior',
    tipo: 'texto',
    obligatorio: true
  },
 
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
   constanciaFirma: {
    label: 'Para constancia de lo anterior se firma en Mosquera, ...',
    placeholder: '',
    tipo: 'texto',
    obligatorio: true
  },

  obraAnterior: {
    label: 'Nombre de la obra que termina',
    placeholder: 'Ej: Construcción Centro Comercial',
    tipo: 'texto',
    obligatorio: true
  },
  obraNueva: {
    label: 'Nombre de nueva obra',
    placeholder: 'Ej: Urbanización Residencial',
    tipo: 'texto',
    obligatorio: true
  },
  porcentajeAvanceNuevaObra: {
    label: 'Porcentaje de avance de ejecución de nueva obra',
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

  codigoObra: {
    label: 'Código interno de la obra',
    placeholder: 'Ej: OBR-2024-001',
    tipo: 'texto',
    obligatorio: true
  },
  nombreObra: {
    label: 'Nombre de la obra',
    placeholder: 'Ej: Proyecto Infraestructura',
    tipo: 'texto',
    obligatorio: true
  },
  porcentajeAnterior: {
    label: 'Porcentaje de avance de obra (anterior)',
    placeholder: 'Ej: 50',
    tipo: 'numero',
    obligatorio: true,
    minimo: 0,
    maximo: 100,
    paso: 0.1
  },
  porcentajeProrroga: {
    label: 'Porcentaje de prórroga de contrato',
    placeholder: 'Ej: 20',
    tipo: 'numero',
    obligatorio: true,
    minimo: 0,
    maximo: 100,
    paso: 0.1
  },
  porcentajeNuevo: {
    label: 'Porcentaje de avance de obra (nuevo)',
    placeholder: 'Ej: 70',
    tipo: 'numero',
    obligatorio: true,
    minimo: 0,
    maximo: 100,
    paso: 0.1
  },
  numeroProrroga: {
    label: 'Número de prórroga (primera, segunda, tercera)',
    placeholder: 'Ej: Primera',
    tipo: 'texto',
    obligatorio: true
  },
  descripcionFinProrroga: {
    label: 'Su prórroga termina ...',
    placeholder: '',
    tipo: 'texto',
    obligatorio: true
  },
  fechaTerminacionProrroga: {
    label: 'Fecha de terminación de prórroga',
    placeholder: '',
    tipo: 'fecha',
    obligatorio: true
  }
};
