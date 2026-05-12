'use client';

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
  const limpiarSoloNumeros = (valor: string) => valor.replace(/\D/g, '');

  if (!tipoOtrosi) {
    return null;
  }

  const camposRequeridos = camposPorTipo[tipoOtrosi as TipoOtrosi] || [];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold uppercase">Información Específica</h2>
        {tipoOtrosi !== 'prorroga' && (
          <p className="mt-3 text-lg text-slate-700">
            Complete los datos asociados al tipo de otrosí seleccionado.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {camposRequeridos.map((nombreCampo) => {
          const config = configuracionCampos[nombreCampo];
          if (!config) return null;
          const esFechaConstanciaFirma = nombreCampo === 'constanciaFirma';

          return (
            <Controller
              key={nombreCampo}
              name={nombreCampo as FieldPath<DatosOtrosi>}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div
                  className={
                    tipoOtrosi === 'ampliacion_porcentaje' ||
                    tipoOtrosi === 'cambio_obra' ||
                    tipoOtrosi === 'termino_indefinido' ||
                    tipoOtrosi === 'cambio_cargo' ||
                    (config.tipo === 'texto' && nombreCampo.includes('Obra'))
                      ? 'md:col-span-2'
                      : ''
                  }
                >
                  <label
                    className={`mb-3 block text-lg font-semibold ${
                      nombreCampo === 'constanciaFirma' ? 'italic' : ''
                    }`}
                  >
                    {config.label}
                    {config.obligatorio && <span className="text-red-500">*</span>}
                  </label>

                  {config.tipo === 'texto' && !esFechaConstanciaFirma && (
                    <input
                      {...field}
                      value={typeof field.value === 'string' ? field.value : ''}
                      type="text"
                      placeholder={config.placeholder}
                      className={`h-14 w-full rounded-lg border px-5 text-lg outline-none transition focus:border-slate-500 ${
                        error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  )}

                  {config.tipo === 'numero' && (
                    <input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder={config.placeholder}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const valorLimpio = limpiarSoloNumeros(e.target.value);
                        field.onChange(valorLimpio === '' ? '' : Number(valorLimpio));
                      }}
                      className={`h-14 w-full rounded-lg border px-5 text-lg outline-none transition focus:border-slate-500 ${
                        error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  )}

                  {(config.tipo === 'fecha' || esFechaConstanciaFirma) && (
                    <input
                      {...field}
                      value={typeof field.value === 'string' ? field.value : ''}
                      type="date"
                      className={`h-14 w-full rounded-lg border px-5 text-lg outline-none transition focus:border-slate-500 ${
                        error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  )}

                  {error && (
                    <p className="text-red-500 text-xs mt-1">{error.message}</p>
                  )}

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

    </section>
  );
}
