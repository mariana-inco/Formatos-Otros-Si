/**
 * Utilidades de formato y conversión
 * Funciones auxiliares para formatear datos, fechas, números, etc.
 */

/**
 * Formatea un número como moneda COP
 */
export const formatearMoneda = (valor: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(valor);
};

const crearFechaLocal = (fecha: string | Date): Date => {
  if (fecha instanceof Date) {
    return fecha;
  }

  const soloFecha = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fecha);

  if (soloFecha) {
    const [, anio, mes, dia] = soloFecha;
    return new Date(Number(anio), Number(mes) - 1, Number(dia));
  }

  return new Date(fecha);
};

/**
 * Formatea una fecha en formato legible
 */
export const formatearFecha = (fecha: string | Date): string => {
  const date = crearFechaLocal(fecha);
  
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

/**
 * Convierte una fecha a formato YYYY-MM-DD para input
 */
export const formatearFechaInput = (fecha: string | Date): string => {
  const date = crearFechaLocal(fecha);
  
  const anio = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');

  return `${anio}-${mes}-${dia}`;
};

/**
 * Convierte una fecha a un valor seguro para nombres de archivo
 */
export const formatearFechaArchivo = (fecha: string | Date): string => {
  return formatearFechaInput(fecha).replaceAll('-', '');
};

/**
 * Convierte un número a porcentaje con decimales
 */
export const formatearPorcentaje = (valor: number, decimales: number = 1): string => {
  return `${valor.toFixed(decimales)}%`;
};

/**
 * Capitaliza la primera letra de un string
 */
export const capitalizarPrimera = (texto: string): string => {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

/**
 * Convierte un string en camelCase a palabras separadas
 */
export const camelCaseAEspacios = (texto: string): string => {
  return texto
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

/**
 * Genera un número único para el otrosí
 */
export const generarNumeroOtrosi = (): string => {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  
  return `OTR-${año}-${mes}${dia}-${random}`;
};

/**
 * Calcula la edad basada en la fecha de nacimiento
 */
export const calcularEdad = (fechaNacimiento: string): number => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad;
};

/**
 * Validar si una fecha es válida
 */
export const esValidaFecha = (fecha: string): boolean => {
  const date = new Date(fecha);
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Obtiene el nombre del mes en español
 */
export const obtenerNombreMes = (numeroMes: number): string => {
  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ];
  
  return meses[numeroMes - 1] || '';
};

/**
 * Convierte un objeto a parámetros de URL
 */
export const objetoAParametrosURL = (objeto: Record<string, unknown>): string => {
  const params = new URLSearchParams();
  
  Object.entries(objeto).forEach(([clave, valor]) => {
    if (valor !== null && valor !== undefined) {
      params.append(clave, String(valor));
    }
  });
  
  return params.toString();
};
