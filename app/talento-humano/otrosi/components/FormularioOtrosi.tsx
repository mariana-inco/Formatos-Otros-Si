'use client';

import { useState } from 'react';
import { useForm, FormProvider, useWatch, type FieldErrors } from 'react-hook-form';
import type { DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaOtrosi, DatosOtrosi } from '../schemas/otrosi.schema';
import { CamposComunes } from './CamposComunes';
import { CamposDinamicos } from './CamposDinamicos';
import { AccionesFormulario } from './FormActions';
import { guardar } from '../utils/almacenamiento';
import { TipoOtrosi } from '../types/otrosi.types';
import { camposPorTipo } from '../config/fieldConfig';

interface PropsFormularioOtrosi {
  tipoInicial?: TipoOtrosi;
}

const formatearTextoFirma = (fecha: string): string => {
  if (!fecha) return '';

  const [anio, mes, dia] = fecha.split('-');
  return `Para constancia de lo anterior se firma en Mosquera, el día ${dia} del ${mes} de ${anio}.`;
};

const camposComunesEnOrden = [
  'tipoOtrosi',
  'tipoDocumento',
  'numeroDocumento',
  'nombreEmpleado',
  'lugarFirma',
  'fechaFirma'
];

const construirJsonConRespuestas = (datos: DatosOtrosi): Record<string, unknown> => {
  const datosIndexables = datos as unknown as Record<string, unknown>;
  const camposEnOrden = [...camposComunesEnOrden, ...camposPorTipo[datos.tipoOtrosi]];

  return camposEnOrden.reduce<Record<string, unknown>>((respuestas, campo) => {
    const valor = datosIndexables[campo];

    if (valor !== undefined) {
      respuestas[campo] = valor;
    }

    return respuestas;
  }, {});
};

const esperarBrevemente = (milisegundos: number) =>
  new Promise((resolver) => setTimeout(resolver, milisegundos));

const prepararDatosParaGuardar = (datos: DatosOtrosi): DatosOtrosi => {
  if (!('constanciaFirma' in datos)) {
    return datos;
  }

  return {
    ...datos,
    constanciaFirma: formatearTextoFirma(datos.constanciaFirma)
  };
};

const crearValoresIniciales = (tipoOtrosi: TipoOtrosi): DefaultValues<DatosOtrosi> => ({
  tipoOtrosi,
  numeroDocumento: '',
  tipoDocumento: 'cedula' as const,
  nombreEmpleado: '',
  lugarFirma: 'Mosquera',
  fechaFirma: new Date().toISOString().split('T')[0],
  cargoNuevo: '',
  constanciaFirma: ''
});

export function FormularioOtrosi({ tipoInicial = 'cambio_cargo' }: PropsFormularioOtrosi) {
  const [idGuardado, setIdGuardado] = useState<string | null>(null);

  const form = useForm<DatosOtrosi>({
    resolver: zodResolver(schemaOtrosi),
    mode: 'onBlur',
    defaultValues: crearValoresIniciales(tipoInicial)
  });

  const { handleSubmit, reset } = form;
  const tipoOtrosi = useWatch({
    control: form.control,
    name: 'tipoOtrosi',
    defaultValue: tipoInicial
  }) as TipoOtrosi;

  const onSubmit = async (datos: DatosOtrosi) => {
    try {
      const datosParaGuardar = prepararDatosParaGuardar(datos);

      console.log(JSON.stringify(construirJsonConRespuestas(datosParaGuardar), null, 2));

      await esperarBrevemente(350);

      const resultado = guardar(datosParaGuardar, idGuardado || undefined);
      setIdGuardado(resultado.id);
      alert('Formulario enviado. Las respuestas se mostraron en la consola.');
      reset(crearValoresIniciales(tipoInicial));
      setIdGuardado(null);
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el otrosí. Intente nuevamente.');
    }
  };

  const onSubmitInvalido = (errores: FieldErrors<DatosOtrosi>) => {
    console.warn('No se envió el formulario. Revise estos campos:', errores);
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-6 text-slate-950 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl rounded-lg border border-slate-300 bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
        <header className="mb-9 border-b border-slate-200 pb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-lg font-bold tracking-wide">DROMOS</p>
              <p className="mt-3 text-lg text-slate-700">GESTIÓN DE TALENTO HUMANO</p>
              <h1 className="mt-3 text-3xl font-bold uppercase">
                Otrosí al Contrato de Trabajo
              </h1>
            </div>

            <div className="space-y-4 text-left text-lg text-slate-700 lg:text-right">
              <p>
                Código: <span className="font-bold text-slate-950">GTH-F003</span>
              </p>
              <p>
                Fecha: <span className="font-bold text-slate-950">2026-05-11</span>
              </p>
              <p>
                Versión: <span className="font-bold text-slate-950">01</span>
              </p>
            </div>
          </div>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit, onSubmitInvalido)}
          className="space-y-7"
        >
          <FormProvider {...form}>
            <CamposComunes />
            {tipoOtrosi && <CamposDinamicos tipoOtrosi={tipoOtrosi} />}
            <div className="flex justify-end">
              <AccionesFormulario />
            </div>
          </FormProvider>
        </form>
      </div>
    </div>
  );
}
