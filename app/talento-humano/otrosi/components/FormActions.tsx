'use client';

import { useFormContext } from 'react-hook-form';

export function AccionesFormulario() {
  const { formState: { isSubmitting } } = useFormContext();

  return (
    <div className="flex w-full justify-end">
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full rounded-lg px-8 py-3 text-base font-semibold transition sm:w-auto ${
          isSubmitting
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-slate-950 text-white hover:bg-slate-800 active:bg-slate-900'
        }`}
      >
        {isSubmitting ? 'Guardando...' : 'Enviar formulario'}
      </button>
    </div>
  );
}
