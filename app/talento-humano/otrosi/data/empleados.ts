export interface Empleado {
  id: string;
  nombre: string;
}

export const tiposDocumento = [
  { valor: 'cedula', etiqueta: 'Cédula de Ciudadanía' },
  { valor: 'pasaporte', etiqueta: 'Pasaporte' },
  { valor: 'cedula_extranjeria', etiqueta: 'Cédula de Extranjería' }
];

export const empleados: Empleado[] = [
  { id: '1025630234', nombre: 'Juan Pérez García' },
  { id: '1100123456', nombre: 'María López Rodríguez' },
  { id: '1087654321', nombre: 'Carlos González Martínez' },
  { id: '1020345678', nombre: 'Laura Fernández López' },
  { id: '1015678901', nombre: 'Roberto Sánchez Díaz' },
  { id: '1088234567', nombre: 'Ana Martínez Ruiz' },
  { id: '1076543210', nombre: 'Miguel Rodríguez Pérez' },
  { id: '1093456789', nombre: 'Patricia García López' }
];

export const buscarEmpleados = (termino: string): Empleado[] => {
  const terminoLower = termino.toLowerCase();
  return empleados.filter(
    (emp) =>
      emp.nombre.toLowerCase().includes(terminoLower) ||
      emp.id.includes(termino)
  );
};
