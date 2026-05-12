/**
 * Tipos principales para el módulo de Otrosí
 * Define la estructura de datos para todos los tipos de otrosí del contrato
 */

export type TipoOtrosi =
  | 'cambio_cargo'
  | 'cambio_cargo_salario'
  | 'prorroga'
  | 'cambio_obra'
  | 'ampliacion_porcentaje'
  | 'termino_indefinido';

export type TipoDocumento = 'cedula' | 'pasaporte' | 'cedula_extranjeria';

/**
 * Interfaz base para todos los otrosí
 * Contiene los campos comunes obligatorios
 */
export interface CamposComunes {
  tipoOtrosi: TipoOtrosi;
  numeroDocumento: string;
  tipoDocumento: TipoDocumento;
  nombreEmpleado: string;
  lugarFirma: string;
  fechaFirma: string;
}

/**
 * Campos específicos para cada tipo de otrosí
 */
export interface CamposCambioCargo {
  cargoNuevo: string;
  fechaInicioCargo: string;
}

export interface CamposCambioCargoSalario {
  cargoNuevo: string;
  fechaInicioCargo: string;
  nuevoSalario: number;
}

export interface CamposProrroga {
  numeroProrroga: number;
  fechaTerminacionActual: string;
  fechaTerminacionNueva: string;
}

export interface CamposCambioObra {
  obraAnterior: string;
  obraNueva: string;
  porcentajeAvanceNuevaObra: number;
}

export interface CamposAmpliacionPorcentaje {
  codigoObra: string;
  nombreObra: string;
  porcentajeAnterior: number;
  porcentajeProrroga: number;
  porcentajeNuevo: number;
}

/**
 * Tipo unión de todos los formatos de otrosí
 */
export type DatosOtrosi =
  | (CamposComunes & CamposCambioCargo)
  | (CamposComunes & CamposCambioCargoSalario)
  | (CamposComunes & CamposProrroga)
  | (CamposComunes & CamposCambioObra)
  | (CamposComunes & CamposAmpliacionPorcentaje)
  | CamposComunes;

/**
 * Estructura para almacenamiento persistente
 */
export interface OtrosiAlmacenado {
  id: string;
  datos: DatosOtrosi;
  fechaCreacion: string;
  fechaActualizacion: string;
  estado: 'borrador' | 'completado' | 'firmado';
}

export type OtrrosiAlmacenado = OtrosiAlmacenado;

/**
 * Configuración de labels y placeholders para campos
 */
export interface ConfiguracionCampo {
  label: string;
  placeholder?: string;
  tipo: 'texto' | 'numero' | 'fecha' | 'select';
  obligatorio: boolean;
  minimo?: number;
  maximo?: number;
  paso?: number;
  validaciones?: {
    patron?: RegExp;
    mensaje?: string;
  };
}

export interface LabelsPorTipo {
  [key: string]: ConfiguracionCampo;
}
