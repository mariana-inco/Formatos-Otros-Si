import { notFound } from 'next/navigation';
import { FormularioOtrosi } from '../components/FormularioOtrosi';
import { rutasEstaticasOtrosi, tipoOtrosiPorRuta } from '../config/rutasOtrosi';

interface PropsPaginaTipoOtrosi {
  params: Promise<{
    tipo: string;
  }>;
}

export function generateStaticParams() {
  return rutasEstaticasOtrosi;
}

export default async function PaginaTipoOtrosi({ params }: PropsPaginaTipoOtrosi) {
  const { tipo } = await params;
  const tipoInicial = tipoOtrosiPorRuta[tipo];

  if (!tipoInicial) {
    notFound();
  }

  return <FormularioOtrosi tipoInicial={tipoInicial} />;
}
