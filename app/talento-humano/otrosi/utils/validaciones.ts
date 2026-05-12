/**
 * Validaciones adicionales personalizadas
 * Funciones de validación complejas que complementan a Zod
 */

/**
 * Valida si un número de documento existe (simulado)
 * En producción consultaría una API
 */
export const validarDocumentoExiste = async (numeroDocumento: string): Promise<boolean> => {
  // Simulación: documentos válidos empiezan con 10
  return numeroDocumento.startsWith('10') || numeroDocumento.startsWith('11');
};

/**
 * Valida si una fecha es posterior a hoy
 */
export const esPosterioreAlHoy = (fecha: string): boolean => {
  const fechaIngresada = new Date(fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  
  return fechaIngresada > hoy;
};

/**
 * Valida si una fecha está dentro de un rango
 */
export const estaEnRangoFechas = (
  fecha: string,
  fechaInicio: string,
  fechaFin: string
): boolean => {
  const d = new Date(fecha);
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  
  return d >= inicio && d <= fin;
};

/**
 * Valida rango de porcentajes
 */
export const esValidoPorcentaje = (valor: number): boolean => {
  return valor >= 0 && valor <= 100 && !isNaN(valor);
};

/**
 * Valida que un salario sea razonable (entre salario mínimo y 100 millones)
 */
export const esValidoSalario = (valor: number): boolean => {
  const salarioMinimoCol = 248000; // Aprox 2024
  const maximoRazonable = 100000000;
  
  return valor >= salarioMinimoCol && valor <= maximoRazonable;
};

/**
 * Valida que dos fechas formen un rango válido
 */
export const sonFechasValidas = (fechaInicio: string, fechaFin: string): boolean => {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  
  return inicio < fin && !isNaN(inicio.getTime()) && !isNaN(fin.getTime());
};

/**
 * Valida email (si se requiere)
 */
export const esEmailValido = (email: string): boolean => {
  const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expresion.test(email);
};

/**
 * Valida teléfono colombiano
 */
export const esTelefonoValido = (telefono: string): boolean => {
  const solo_digitos = telefono.replace(/\D/g, '');
  // Colombia: 10 dígitos (fijo) o 10 dígitos (móvil)
  return solo_digitos.length === 10;
};

/**
 * Calcula el rango de validez de un otrosí (ejemplo: máximo 2 años)
 */
export const obtenerFechaLimiteProrroga = (fechaActual: string): string => {
  const fecha = new Date(fechaActual);
  fecha.setFullYear(fecha.getFullYear() + 2); // Máximo 2 años
  
  return fecha.toISOString().split('T')[0];
};
