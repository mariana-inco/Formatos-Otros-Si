'use client';

/**
 * Hook personalizado para manejar el almacenamiento de otrosís
 * Usa localStorage para persistencia temporal durante el desarrollo
 */

import { OtrosiAlmacenado, DatosOtrosi, TipoOtrosi } from '../types/otrosi.types';

const CLAVE_ALMACENAMIENTO = 'otrosies_almacenados';

/**
 * Genera un ID único para cada otrosí
 */
const generarId = (): string => {
  return `otrosi_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
};

/**
 * Obtiene todos los otrosís almacenados
 */
export const obtenerTodos = (): OtrosiAlmacenado[] => {
  if (typeof window === 'undefined') return [];
  
  const datos = localStorage.getItem(CLAVE_ALMACENAMIENTO);
  return datos ? JSON.parse(datos) : [];
};

/**
 * Obtiene un otrosí específico por ID
 */
export const obtenerPorId = (id: string): OtrosiAlmacenado | null => {
  const todos = obtenerTodos();
  return todos.find((otrosi) => otrosi.id === id) || null;
};

/**
 * Obtiene otrosís por tipo
 */
export const obtenerPorTipo = (tipo: TipoOtrosi): OtrosiAlmacenado[] => {
  const todos = obtenerTodos();
  return todos.filter((otrosi) => otrosi.datos.tipoOtrosi === tipo);
};

/**
 * Guarda un nuevo otrosí o actualiza uno existente
 */
export const guardar = (datos: DatosOtrosi, id?: string): OtrosiAlmacenado => {
  const todos = obtenerTodos();
  const ahora = new Date().toISOString();
  
  if (id) {
    // Actualizar existente
    const indice = todos.findIndex((otrosi) => otrosi.id === id);
    if (indice !== -1) {
      todos[indice] = {
        ...todos[indice],
        datos,
        fechaActualizacion: ahora
      };
    }
  } else {
    // Crear nuevo
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

/**
 * Elimina un otrosí
 */
export const eliminar = (id: string): boolean => {
  const todos = obtenerTodos();
  const nuevoArray = todos.filter((otrosi) => otrosi.id !== id);
  
  if (nuevoArray.length < todos.length) {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(nuevoArray));
    return true;
  }
  
  return false;
};

/**
 * Actualiza el estado de un otrosí
 */
export const actualizarEstado = (
  id: string,
  estado: 'borrador' | 'completado' | 'firmado'
): boolean => {
  const todos = obtenerTodos();
  const otrosi = todos.find((o) => o.id === id);
  
  if (otrosi) {
    otrosi.estado = estado;
    otrosi.fechaActualizacion = new Date().toISOString();
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(todos));
    return true;
  }
  
  return false;
};

/**
 * Exporta otrosís como JSON para descargar
 */
export const exportarJSON = (id?: string): void => {
  const datos = id ? obtenerPorId(id) : obtenerTodos();
  const contenido = JSON.stringify(datos, null, 2);
  const blob = new Blob([contenido], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `otrosi_${new Date().getTime()}.json`;
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
  URL.revokeObjectURL(url);
};
