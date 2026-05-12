export type TipoOtrosi =
  | 'cambio_cargo'
  | 'cambio_cargo_salario'
  | 'prorroga'
  | 'cambio_obra'
  | 'ampliacion_porcentaje'
  | 'termino_indefinido';

export type TipoDocumento = 'cedula' | 'pasaporte' | 'cedula_extranjeria';

export interface CamposComunes {
  tipoOtrosi: TipoOtrosi;
  numeroDocumento: string;
  tipoDocumento: TipoDocumento;
  nombreEmpleado: string;
  lugarFirma: string;
  fechaFirma: string;
}

export interface CamposCambioCargo {
  cargoNuevo: string;
  constanciaFirma: string;
}

export interface CamposCambioCargoSalario {
  cargoNuevo: string;
  constanciaFirma: string;
  nuevoSalario: number;
}

export interface CamposProrroga {
  constanciaFirma: string;
}

export interface CamposCambioObra {
  obraAnterior: string;
  obraNueva: string;
  porcentajeAvanceNuevaObra: number;
  constanciaFirma: string;
}

export interface CamposAmpliacionPorcentaje {
  codigoObra: string;
  nombreObra: string;
  porcentajeAnterior: number;
  porcentajeProrroga: number;
  porcentajeNuevo: number;
  constanciaFirma: string;
}

export interface CamposTerminoFijoInferior {
  numeroProrroga: string;
  descripcionFinProrroga: string;
  fechaTerminacionProrroga: string;
  constanciaFirma: string;
}

export type DatosOtrosi =
  | (CamposComunes & CamposCambioCargo)
  | (CamposComunes & CamposCambioCargoSalario)
  | (CamposComunes & CamposProrroga)
  | (CamposComunes & CamposCambioObra)
  | (CamposComunes & CamposAmpliacionPorcentaje)
  | (CamposComunes & CamposTerminoFijoInferior);

export interface OtrosiAlmacenado {
  id: string;
  datos: DatosOtrosi;
  fechaCreacion: string;
  fechaActualizacion: string;
  estado: 'borrador' | 'completado' | 'firmado';
}

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
