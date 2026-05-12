'use client';

/**
 * Componente para mostrar campos dinámicos según el tipo de otrosí
 * Se renderiza diferente según qué tipo se selecciona
 */

import { Controller, useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';
import { TipoOtrosi } from '../types/otrosi.types';
import { camposPorTipo, configuracionCampos } from '../config/fieldConfig';
import type { DatosOtrosi } from '../types/otrosi.types';

interface PropsDynamicFields {
  tipoOtrosi: TipoOtrosi | '';
}

export function CamposDinamicos({ tipoOtrosi }: PropsDynamicFields) {
  const { control } = useFormContext<DatosOtrosi>();

  // Si no hay tipo seleccionado o es término indefinido (sin campos adicionales)
  if (!tipoOtrosi || tipoOtrosi === 'termino_indefinido') {
    return null;
  }

  // Obtener los campos requeridos para este tipo
  const camposRequeridos = camposPorTipo[tipoOtrosi as TipoOtrosi] || [];

  return (
    <div className="space-y-5 bg-linear-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <span className="flex w-8 h-8 bg-green-500 text-white rounded-full items-center justify-center text-sm font-bold">
          2
        </span>
        Información Específica
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {camposRequeridos.map((nombreCampo) => {
          const config = configuracionCampos[nombreCampo];
          if (!config) return null;

          return (
            <Controller
              key={nombreCampo}
              name={nombreCampo as FieldPath<DatosOtrosi>}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className={config.tipo === 'texto' && nombreCampo.includes('Obra') ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.label}
                    {config.obligatorio && <span className="text-red-500">*</span>}
                  </label>

                  {config.tipo === 'texto' && (
                    <input
                      {...field}
                      type="text"
                      placeholder={config.placeholder}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                        error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  )}

                  {config.tipo === 'numero' && (
                    <input
                      {...field}
                      type="number"
                      placeholder={config.placeholder}
                      step={config.paso || 1}
                      min={config.minimo}
                      max={config.maximo}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                        error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  )}

                  {config.tipo === 'fecha' && (
                    <input
                      {...field}
                      type="date"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                        error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  )}

                  {error && (
                    <p className="text-red-500 text-xs mt-1">{error.message}</p>
                  )}

                  {/* Ayuda adicional para campos específicos */}
                  {nombreCampo.includes('Porcentaje') && !error && (
                    <p className="text-gray-500 text-xs mt-1">Ingrese un valor entre 0 y 100</p>
                  )}
                  
                  {nombreCampo === 'nuevoSalario' && !error && (
                    <p className="text-gray-500 text-xs mt-1">Ingrese el salario sin puntos ni comas</p>
                  )}
                </div>
              )}
            />
          );
        })}
      </div>

      {/* Mensaje informativo según el tipo */}
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-gray-700">
        <p className="font-medium mb-1">💡 Información:</p>
        <p>{obtenerMensajeInfoTipo(tipoOtrosi as TipoOtrosi)}</p>
      </div>
    </div>
  );
}

/**
 * Retorna un mensaje informativo según el tipo de otrosí
 */
function obtenerMensajeInfoTipo(tipo: TipoOtrosi): string {
  const mensajes: Record<TipoOtrosi, string> = {
    cambio_cargo: 'Complete con el nuevo cargo y su fecha de inicio.',
    cambio_cargo_salario: 'Indique el nuevo cargo, fecha de inicio y nuevo salario.',
    prorroga: 'Especifique el número de prórroga y las fechas de terminación.',
    cambio_obra: 'Indique la obra anterior, nueva obra y su porcentaje de avance.',
    ampliacion_porcentaje: 'Complete los porcentajes de asignación en las diferentes obras.',
    termino_indefinido: 'Este otrosí no requiere información adicional.'
  };

  return mensajes[tipo];
}
