'use client';

/**
 * Componente para mostrar los campos comunes del otrosí
 * Estos campos se muestran en todos los tipos de otrosí
 */

import { Controller, useFormContext } from 'react-hook-form';
import { buscarEmpleados, tiposDocumento, type Empleado } from '../data/empleados';
import { useState } from 'react';

interface PropsCommonFields {
  onEmpleadoSeleccionado?: (numeroDocumento: string) => void;
}

export function CamposComunes({ onEmpleadoSeleccionado }: PropsCommonFields) {
  const { control, watch, setValue } = useFormContext();
  const numeroDocumento = watch('numeroDocumento');
  const [sugerenciasEmpleados, setSugerenciasEmpleados] = useState<Empleado[]>([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const manejarBusquedaEmpleado = (valor: string) => {
    if (valor.length > 2) {
      const resultados = buscarEmpleados(valor);
      setSugerenciasEmpleados(resultados);
      setMostrarSugerencias(true);
    } else {
      setMostrarSugerencias(false);
    }
  };

  const seleccionarEmpleado = (numeroDoc: string, nombre: string) => {
    setValue('numeroDocumento', numeroDoc);
    setValue('nombreEmpleado', nombre);
    setMostrarSugerencias(false);
    onEmpleadoSeleccionado?.(numeroDoc);
  };

  return (
    <div className="space-y-5 bg-linear-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <span className="flex w-8 h-8 bg-blue-500 text-white rounded-full items-center justify-center text-sm font-bold">
          1
        </span>
        Información General
      </h2>

      {/* Tipo de Otrosí */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Otrosí <span className="text-red-500">*</span>
        </label>
        <Controller
          name="tipoOtrosi"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <select
                {...field}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">-- Seleccione un tipo --</option>
                <option value="cambio_cargo">Cambio de Cargo</option>
                <option value="cambio_cargo_salario">Cambio de Cargo y/o Salario</option>
                <option value="prorroga">Prórroga de Contrato a Término Fijo</option>
                <option value="cambio_obra">Cambio de Obra</option>
                <option value="ampliacion_porcentaje">Ampliación de Porcentaje de Obra</option>
                <option value="termino_indefinido">Cambio a Término Indefinido</option>
              </select>
              {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
            </div>
          )}
        />
      </div>

      {/* Tipo de Documento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Documento <span className="text-red-500">*</span>
          </label>
          <Controller
            name="tipoDocumento"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <select
                  {...field}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">-- Seleccione --</option>
                  {tiposDocumento.map((tipo) => (
                    <option key={tipo.valor} value={tipo.valor}>
                      {tipo.etiqueta}
                    </option>
                  ))}
                </select>
                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
              </div>
            )}
          />
        </div>

        {/* Número de Documento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Documento <span className="text-red-500">*</span>
          </label>
          <Controller
            name="numeroDocumento"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="relative">
                <input
                  {...field}
                  type="text"
                  placeholder="1025630234"
                  onChange={(e) => {
                    field.onChange(e);
                    manejarBusquedaEmpleado(e.target.value);
                  }}
                  onFocus={() => numeroDocumento && setMostrarSugerencias(true)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}

                {/* Sugerencias de empleados */}
                {mostrarSugerencias && sugerenciasEmpleados.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {sugerenciasEmpleados.map((empleado) => (
                      <button
                        key={empleado.id}
                        type="button"
                        onClick={() => seleccionarEmpleado(empleado.id, empleado.nombre)}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 transition border-b last:border-b-0"
                      >
                        <div className="font-medium text-gray-900">{empleado.nombre}</div>
                        <div className="text-xs text-gray-500">{empleado.id}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* Nombre del Empleado */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre del Empleado <span className="text-red-500">*</span>
        </label>
        <Controller
          name="nombreEmpleado"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <input
                {...field}
                type="text"
                placeholder="Juan Pérez García"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
            </div>
          )}
        />
      </div>

      {/* Lugar y Fecha de Firma */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lugar de Firma <span className="text-red-500">*</span>
          </label>
          <Controller
            name="lugarFirma"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  placeholder="Mosquera"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
              </div>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Firma <span className="text-red-500">*</span>
          </label>
          <Controller
            name="fechaFirma"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  {...field}
                  type="date"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
