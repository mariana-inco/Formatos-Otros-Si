'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { buscarEmpleados, tiposDocumento, type Empleado } from '../data/empleados';
import { configuracionCampos } from '../config/fieldConfig';
import { useState } from 'react';

export function CamposComunes() {
  const { control, watch, setValue } = useFormContext();
  const tipoOtrosi = watch('tipoOtrosi');
  const numeroDocumento = watch('numeroDocumento');
  const usaEtiquetasTrabajador =
    tipoOtrosi === 'cambio_cargo' ||
    tipoOtrosi === 'cambio_obra' ||
    tipoOtrosi === 'ampliacion_porcentaje' ||
    tipoOtrosi === 'termino_indefinido';
  const [sugerenciasEmpleados, setSugerenciasEmpleados] = useState<Empleado[]>([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const limpiarSoloNumeros = (valor: string) => valor.replace(/\D/g, '');
  const limpiarSoloLetras = (valor: string) =>
    valor.replace(/[^a-záéíóúñü\s]/gi, '');

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
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold uppercase">Información General</h2>
        <p className="mt-3 text-lg text-slate-700">
          Registre los datos principales del otrosí.
        </p>
      </div>

      <div className="space-y-7">
        <div>
          <label className="mb-3 block text-lg font-semibold">
            Tipo de Otrosí <span className="text-red-500">*</span>
          </label>
          <p className="mb-3 text-sm text-slate-600">
            Seleccione el tipo de formato que desea diligenciar.
          </p>
          <Controller
            name="tipoOtrosi"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <select
                  {...field}
                  className={`h-14 w-full rounded-lg border px-5 text-lg outline-none transition focus:border-slate-500 ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">-- Seleccione un tipo --</option>
                  <option value="cambio_cargo">Cambio de Cargo</option>
                  <option value="cambio_cargo_salario">Cambio de Cargo y/o Salario</option>
                  <option value="prorroga">Contrato de trabajo suscrito - Término Indefinido</option>
                  <option value="cambio_obra">Contrato de trabajo suscrito - Cambio de Obra </option>
                  <option value="ampliacion_porcentaje">Contrato de trabajo a término de obra o labor determinada - Ampliación de porcentaje de obra</option>
                  <option value="termino_indefinido">Contrato de trabajo a término fijo inferior a un año suscrito</option>
                </select>
                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
              </div>
            )}
          />
        </div>

     <div className={tipoOtrosi === 'cambio_cargo' ? '' : 'order-1 md:order-2'}>
            <label className="mb-3 block text-lg font-semibold">
              {usaEtiquetasTrabajador
                ? 'Tipo de documento del trabajador'
                : 'Tipo de Documento'}{' '}
              <span className="text-red-500">*</span>
            </label>
            <Controller
              name="tipoDocumento"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <select
                    {...field}
                    className={`h-14 w-full rounded-lg border px-5 text-lg outline-none transition focus:border-slate-500 ${
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

        <div className={tipoOtrosi === 'cambio_cargo' ? 'space-y-7' : 'grid grid-cols-1 gap-6 md:grid-cols-2'}>
          <div className={tipoOtrosi === 'cambio_cargo' ? '' : 'order-2 md:order-1'}>
          <label className="mb-3 block text-lg font-semibold">
            {usaEtiquetasTrabajador
              ? 'Número de documento del trabajador'
              : 'Número de Documento'}{' '}
            <span className="text-red-500">*</span>
          </label>
          <Controller
            name="numeroDocumento"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="relative">
                <input
                  {...field}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="1025630234"
                  onChange={(e) => {
                    const valorLimpio = limpiarSoloNumeros(e.target.value);
                    field.onChange(valorLimpio);
                    manejarBusquedaEmpleado(valorLimpio);
                  }}
                  onFocus={() => numeroDocumento && setMostrarSugerencias(true)}
                  className={`h-14 w-full rounded-lg border px-5 text-lg outline-none transition focus:border-slate-500 ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}

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

        <div>
          <label className="mb-3 block text-lg font-semibold">
            {usaEtiquetasTrabajador ? 'Nombre del trabajador' :
             'Nombre del Empleado'}{' '}
            <span className="text-red-500">*</span>
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
                  onChange={(e) => field.onChange(limpiarSoloLetras(e.target.value))}
                  className={`h-14 w-full rounded-lg border px-5 text-lg outline-none transition focus:border-slate-500 ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
              </div>
            )}
          />
        </div>

        {tipoOtrosi === 'prorroga' && (
          <div>
            <label className="mb-3 block text-lg font-semibold italic">
              {configuracionCampos.constanciaFirma.label}
              <span className="text-red-500">*</span>
            </label>
            <Controller
              name="constanciaFirma"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <input
                    {...field}
                    value={typeof field.value === 'string' ? field.value : ''}
                    type="date"
                    className={`h-14 w-full rounded-lg border px-5 text-lg outline-none transition focus:border-slate-500 ${
                      error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
                </div>
              )}
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        </div>
      </div>
    </section>
  );
}
