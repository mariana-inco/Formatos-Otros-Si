'use client';

import { DatosOtrosi, OtrosiAlmacenado } from '../types/otrosi.types';

const CLAVE_ALMACENAMIENTO = 'otrosies_almacenados';

const generarId = (): string => {
  return `otrosi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const extraerFechaTextoFirma = (texto: string): string => {
  const coincidencia = texto.match(/el día (\d{2}) del (\d{2}) de (\d{4})\.$/);

  if (!coincidencia) return '';

  const [, dia, mes, anio] = coincidencia;
  return `${anio}-${mes}-${dia}`;
};

export const obtenerTodos = (): OtrosiAlmacenado[] => {
  if (typeof window === 'undefined') return [];
  
  const datos = localStorage.getItem(CLAVE_ALMACENAMIENTO);
  return datos ? JSON.parse(datos) : [];
};

export const guardar = (datos: DatosOtrosi, id?: string): OtrosiAlmacenado => {
  const todos = obtenerTodos();
  const ahora = new Date().toISOString();
  
  if (id) {
    const indice = todos.findIndex((otrosi) => otrosi.id === id);
    if (indice !== -1) {
      todos[indice] = {
        ...todos[indice],
        datos,
        fechaActualizacion: ahora
      };
    }
  } else {
    const nuevoOtrosi: OtrosiAlmacenado = {
      id: generarId(),
      datos,
      fechaCreacion: ahora,
      fechaActualizacion: ahora,
      estado: 'borrador'
    };
    todos.push(nuevoOtrosi);
  }
  
  localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(todos));
  return id ? todos.find((o) => o.id === id)! : todos[todos.length - 1];
};
