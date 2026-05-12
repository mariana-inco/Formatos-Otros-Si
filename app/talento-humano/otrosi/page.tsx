'use client';

/**
 * Página principal del módulo de Otrosí
 * Integra el formulario completo con todos los componentes
 */

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaOtrosi, DatosOtrosi } from './schemas/otrosi.schema';
import { CamposComunes } from './components/CamposComunes';
import { CamposDinamicos } from './components/CamposDinamicos';
import { AccionesFormulario } from './components/FormActions';
import { generarPDFOtrosi } from './utils/generatePdf';
import { guardar } from './utils/almacenamiento';
import { TipoOtrosi } from './types/otrosi.types';

export default function PaginaOtrosi() {
  const [tipoOtrosi, setTipoOtrosi] = useState<TipoOtrosi>('cambio_cargo');
  const [cargandoPDF, setCargandoPDF] = useState(false);
  const [idGuardado, setIdGuardado] = useState<string | null>(null);
  const [mostrarMensajeExito, setMostrarMensajeExito] = useState(false);

  const form = useForm<DatosOtrosi>({
    resolver: zodResolver(schemaOtrosi),
    mode: 'onBlur',
    defaultValues: {
      tipoOtrosi: 'cambio_cargo' as any,
      numeroDocumento: '',
      tipoDocumento: 'cedula',
      nombreEmpleado: '',
      lugarFirma: 'Mosquera',
      fechaFirma: new Date().toISOString().split('T')[0],
      cargoNuevo: '',
      fechaInicioCargo: ''
    } as any
  });

  const { watch, reset, handleSubmit, formState: { errors } } = form;
  const tipoSeleccionado = watch('tipoOtrosi');

  // Actualizar tipo cuando cambia el select
  useEffect(() => {
    if (tipoSeleccionado) {
      setTipoOtrosi(tipoSeleccionado as TipoOtrosi);
    }
  }, [tipoSeleccionado]);

  /**
   * Maneja el envío del formulario
   */
  const onSubmit = async (datos: DatosOtrosi) => {
    try {
      const resultado = guardar(datos, idGuardado || undefined);
      setIdGuardado(resultado.id);
      setMostrarMensajeExito(true);
      
      // Ocultar mensaje después de 4 segundos
      setTimeout(() => setMostrarMensajeExito(false), 4000);
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el otrosí. Intente nuevamente.');
    }
  };

  /**
   * Genera el PDF
   */
  const handleGenerarPDF = async () => {
    try {
      setCargandoPDF(true);
      
      // Validar formulario
      const estaValido = await form.trigger();
      if (!estaValido) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
      }

      const datos = form.getValues();
      await generarPDFOtrosi(datos, { incluirFirmas: true });
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Intente nuevamente.');
    } finally {
      setCargandoPDF(false);
    }
  };

  /**
   * Limpia el formulario
   */
  const handleLimpiar = () => {
    if (confirm('¿Está seguro de que desea limpiar el formulario?')) {
      reset();
      setTipoOtrosi('cambio_cargo');
      setIdGuardado(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Otrosí al Contrato de Trabajo
            </h1>
            <p className="text-gray-600">
              Módulo de gestión y generación de otrosís para el área de Talento Humano
            </p>
          </div>
        </div>

        {/* Mensaje de éxito */}
        {mostrarMensajeExito && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-3 animate-slide-in">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-semibold">Guardado exitosamente</p>
              <p className="text-sm">Los datos se han guardado correctamente</p>
            </div>
            <button
              onClick={() => setMostrarMensajeExito(false)}
              className="ml-auto text-xl hover:text-green-900"
            >
              ✕
            </button>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormProvider {...form}>
            {/* Campos Comunes */}
            <CamposComunes />

            {/* Campos Dinámicos */}
            {tipoOtrosi && <CamposDinamicos tipoOtrosi={tipoOtrosi} />}

            {/* Resumen visual */}
            {tipoOtrosi !== 'termino_indefinido' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Recuerda:</span> Completa todos los campos marcados con
                  <span className="text-red-500 font-bold ml-1">*</span>
                </p>
              </div>
            )}

            {/* Botones de acción */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <AccionesFormulario
                onGenerarPDF={handleGenerarPDF}
                onLimpiar={handleLimpiar}
                cargando={form.formState.isSubmitting}
                generandoPDF={cargandoPDF}
                idOtrosi={idGuardado || undefined}
              />
            </div>
          </FormProvider>
        </form>

        {/* Información de ayuda */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-lg">❓</span>
            Preguntas Frecuentes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-gray-900 mb-1">¿Dónde se guardan los datos?</p>
              <p className="text-gray-600">Los datos se guardan automáticamente en tu navegador y puedes descargarlos como JSON.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">¿Puedo editar después?</p>
              <p className="text-gray-600">Sí, guarda el otrosí y luego puedes cargar el archivo JSON para continuar editando.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">¿Qué formatos se generan?</p>
              <p className="text-gray-600">Puedes generar PDF profesional y también descargar los datos en formato JSON.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">¿Necesito datos del empleado?</p>
              <p className="text-gray-600">Sí, debes contar con el documento y nombre del empleado. La búsqueda te ayudará a encontrarlo.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
