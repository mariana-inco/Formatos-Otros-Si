import type { TipoOtrosi } from '../types/otrosi.types';

interface OpcionOtrosi {
  valor: TipoOtrosi;
  etiqueta: string;
  slug: string;
}

export const opcionesOtrosi: OpcionOtrosi[] = [
  {
    valor: 'cambio_cargo',
    etiqueta: 'Cambio de Cargo',
    slug: 'cambiocargo',
  },
  {
    valor: 'cambio_cargo_salario',
    etiqueta: 'Cambio de Cargo y/o Salario',
    slug: 'cambiocargosalario',
  },
  {
    valor: 'prorroga',
    etiqueta: 'Contrato de trabajo suscrito - Término Indefinido',
    slug: 'prorroga',
  },
  {
    valor: 'cambio_obra',
    etiqueta: 'Contrato de trabajo suscrito - Cambio de Obra',
    slug: 'cambioobra',
  },
  {
    valor: 'ampliacion_porcentaje',
    etiqueta:
      'Contrato de trabajo a término de obra o labor determinada - Ampliación de porcentaje de obra',
    slug: 'ampliacionporcentaje',
  },
  {
    valor: 'termino_indefinido',
    etiqueta: 'Contrato de trabajo a término fijo inferior a un año suscrito',
    slug: 'terminoindefinido',
  },
];

export const rutasOtrosi = Object.fromEntries(
  opcionesOtrosi.map(({ valor, slug }) => [
    valor,
    `/talento-humano/otrosi/${slug}`,
  ])
) as Record<TipoOtrosi, string>;

export const tipoOtrosiPorRuta = Object.fromEntries(
  opcionesOtrosi.map(({ slug, valor }) => [slug, valor])
) as Record<string, TipoOtrosi>;

export const rutasEstaticasOtrosi = opcionesOtrosi.map(({ slug }) => ({
  tipo: slug,
}));

export const esTipoOtrosi = (valor: string): valor is TipoOtrosi =>
  valor in rutasOtrosi;
