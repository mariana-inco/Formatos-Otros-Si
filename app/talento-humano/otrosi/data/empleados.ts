/**
 * Datos estáticos: tipos de documentos y lista de empleados
 * En producción, estos datos vendrían de una API
 */

export interface Empleado {
  id: string;
  nombre: string;
  cargo: string;
}

export const tiposDocumento = [
  { valor: 'cedula', etiqueta: 'Cédula de Ciudadanía' },
  { valor: 'pasaporte', etiqueta: 'Pasaporte' },
  { valor: 'cedula_extranjeria', etiqueta: 'Cédula de Extranjería' }
];

/**
 * Lista simulada de empleados
 * En producción, cargaría desde una base de datos
 */
export const empleados: Empleado[] = [
  { id: '1025630234', nombre: 'Juan Pérez García', cargo: 'Ingeniero de Sistemas' },
  { id: '1100123456', nombre: 'María López Rodríguez', cargo: 'Gerente de Proyectos' },
  { id: '1087654321', nombre: 'Carlos González Martínez', cargo: 'Supervisor de Obra' },
  { id: '1020345678', nombre: 'Laura Fernández López', cargo: 'Contador' },
  { id: '1015678901', nombre: 'Roberto Sánchez Díaz', cargo: 'Auxiliar Administrativo' },
  { id: '1088234567', nombre: 'Ana Martínez Ruiz', cargo: 'Asistente de Recursos Humanos' },
  { id: '1076543210', nombre: 'Miguel Rodríguez Pérez', cargo: 'Capataz' },
  { id: '1093456789', nombre: 'Patricia García López', cargo: 'Especialista en Seguridad' }
];

/**
 * Obtiene el nombre de un empleado basado en su documento
 */
export const obtenerEmpleado = (numeroDocumento: string): Empleado | undefined => {
  return empleados.find((emp) => emp.id === numeroDocumento);
};

/**
 * Obtiene la lista de nombres para autocompletar
 */
export const obtenerNombresEmpleados = (): string[] => {
  return empleados.map((emp) => emp.nombre);
};

/**
 * Busca empleados por nombre (búsqueda parcial)
 */
export const buscarEmpleados = (termino: string): Empleado[] => {
  const terminoLower = termino.toLowerCase();
  return empleados.filter(
    (emp) =>
      emp.nombre.toLowerCase().includes(terminoLower) ||
      emp.id.includes(termino)
  );
};
