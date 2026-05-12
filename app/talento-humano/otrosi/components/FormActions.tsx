'use client';

/**
 * Componente para las acciones del formulario
 * Botones para guardar, limpiar y generar PDF
 */

import { useFormContext } from 'react-hook-form';

interface PropsFormActions {
  onGenerarPDF: () => Promise<void>;
  onLimpiar: () => void;
  cargando?: boolean;
  generandoPDF?: boolean;
  idOtrosi?: string;
}

export function AccionesFormulario({
  onGenerarPDF,
  onLimpiar,
  cargando = false,
  generandoPDF = false,
  idOtrosi
}: PropsFormActions) {
  const { formState: { isSubmitting, isDirty } } = useFormContext();

  const estaEnProceso = cargando || generandoPDF || isSubmitting;

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-8">
      {/* Botón Guardar */}
      <button
        type="submit"
        disabled={estaEnProceso}
        className={`flex-1 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
          estaEnProceso
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
        }`}
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin">⏳</span>
            Guardando...
          </>
        ) : (
          <>
            <span>💾</span>
            Guardar
          </>
        )}
      </button>

      {/* Botón Generar PDF */}
      <button
        type="button"
        onClick={onGenerarPDF}
        disabled={estaEnProceso}
        className={`flex-1 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
          estaEnProceso
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
        }`}
      >
        {generandoPDF ? (
          <>
            <span className="animate-spin">⏳</span>
            Generando PDF...
          </>
        ) : (
          <>
            <span>📄</span>
            Generar PDF
          </>
        )}
      </button>

      {/* Botón Limpiar */}
      <button
        type="button"
        onClick={onLimpiar}
        disabled={estaEnProceso || !isDirty}
        className={`flex-1 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
          estaEnProceso || !isDirty
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800'
        }`}
      >
        <span>🗑️</span>
        Limpiar
      </button>

      {/* Información de guardado */}
      {idOtrosi && (
        <div className="sm:col-span-full flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
          <span>✅</span>
          <div>
            <p className="font-semibold">Guardado exitoso</p>
            <p className="text-xs opacity-75">ID: {idOtrosi}</p>
          </div>
        </div>
      )}
    </div>
  );
}
