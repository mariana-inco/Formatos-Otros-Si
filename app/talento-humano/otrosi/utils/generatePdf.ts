/**
 * Generador de PDF para otrosís
 * Crea documentos PDF profesionales con datos del otrosí
 */

import jsPDF from 'jspdf';
import { DatosOtrosi, TipoOtrosi } from '../types/otrosi.types';
import { formatearFecha, formatearFechaArchivo, formatearMoneda, formatearPorcentaje } from './formatos';
import { obtenerTituloOtrosi } from '../config/fieldConfig';

interface OpcionesPDF {
  incluirFirmas?: boolean;
  numeroDocumento?: string;
}

/**
 * Genera un PDF con los datos del otrosí
 */
export async function generarPDFOtrosi(
  datos: DatosOtrosi,
  opciones: OpcionesPDF = {}
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const margenIzq = 20;
  const margenDer = 20;
  const anchoDisponible = 210 - margenIzq - margenDer;
  const limitePagina = 277;
  let posicionY = 20;

  const asegurarEspacio = (altoNecesario: number): void => {
    if (posicionY + altoNecesario <= limitePagina) {
      return;
    }

    doc.addPage();
    posicionY = 20;
  };

  // 1. Encabezado
  agregarEncabezado(doc, posicionY);
  posicionY = 50;

  // 2. Título del otrosí
  const tituloOtrosi = obtenerTituloOtrosi(datos.tipoOtrosi);
  doc.setFontSize(16);
  doc.setFont('', 'bold');
  doc.text(`OTROSÍ AL CONTRATO DE TRABAJO`, margenIzq, posicionY);
  posicionY += 8;

  doc.setFontSize(12);
  doc.text(`${tituloOtrosi}`, margenIzq, posicionY);
  posicionY += 15;

  // 3. Información general
  doc.setFontSize(11);
  doc.setFont('', 'bold');
  doc.text('INFORMACIÓN GENERAL', margenIzq, posicionY);
  posicionY += 10;

  doc.setFontSize(10);
  doc.setFont('', 'normal');

  const infoGeneral = [
    [`Número de Documento:`, datos.numeroDocumento],
    [`Nombre del Empleado:`, datos.nombreEmpleado],
    [`Lugar de Firma:`, datos.lugarFirma],
    [`Fecha de Firma:`, formatearFecha(datos.fechaFirma)]
  ];

  infoGeneral.forEach(([etiqueta, valor]) => {
    doc.text(`${etiqueta} ${valor}`, margenIzq + 2, posicionY);
    posicionY += 7;
  });

  posicionY += 5;

  // 4. Información específica según el tipo
  asegurarEspacio(35);
  doc.setFontSize(11);
  doc.setFont('', 'bold');
  doc.text('DETALLES DEL OTROSÍ', margenIzq, posicionY);
  posicionY += 10;

  doc.setFontSize(10);
  doc.setFont('', 'normal');

  posicionY = agregarDetallesEspecificos(doc, datos, margenIzq, posicionY);

  posicionY += 10;

  // 5. Texto legal
  asegurarEspacio(35);
  posicionY = agregarTextoLegal(doc, datos.tipoOtrosi, margenIzq, posicionY, anchoDisponible);

  posicionY += 15;

  // 6. Área de firmas (si se incluye)
  if (opciones.incluirFirmas !== false) {
    asegurarEspacio(75);
    agregarAreaFirmas(doc, margenIzq, posicionY);
  }

  // Guardar el documento
  const nombreArchivo = `OTR_${datos.tipoOtrosi}_${formatearFechaArchivo(new Date())}.pdf`;
  doc.save(nombreArchivo);
}

/**
 * Agrega el encabezado del PDF
 */
function agregarEncabezado(doc: jsPDF, posY: number): void {
  const anchoPagina = doc.internal.pageSize.getWidth();
  const margenIzq = 20;
  const margenDer = 20;
  const ancho = anchoPagina - margenIzq - margenDer;

  // Fondo de encabezado
  doc.setFillColor(25, 54, 123);
  doc.rect(margenIzq - 5, posY - 5, ancho + 10, 25, 'F');

  // Texto del encabezado
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('', 'bold');
  doc.text('DROMOS LTDA.', margenIzq + 2, posY + 5);

  doc.setFontSize(9);
  doc.setFont('', 'normal');
  doc.text('Gestión de Talento Humano', margenIzq + 2, posY + 12);
  doc.text('NIT: 830.003.434-0', margenIzq + 2, posY + 17);

  // Línea separadora
  doc.setTextColor(0, 0, 0);
  doc.setDrawColor(200, 200, 200);
  doc.line(margenIzq, posY + 22, anchoPagina - margenDer, posY + 22);
}

/**
 * Agrega los detalles específicos según el tipo de otrosí
 */
function agregarDetallesEspecificos(
  doc: jsPDF,
  datos: DatosOtrosi,
  margenIzq: number,
  posY: number
): number {
  let nuevoY = posY;

  switch (datos.tipoOtrosi) {
    case 'cambio_cargo':
      if ('cargoNuevo' in datos) {
        nuevoY = agregarLineaDetalle(doc, `Cargo Nuevo: ${datos.cargoNuevo}`, margenIzq, nuevoY);
      }
      if ('fechaInicioCargo' in datos) {
        nuevoY = agregarLineaDetalle(doc, `Fecha de Inicio: ${formatearFecha(datos.fechaInicioCargo)}`, margenIzq, nuevoY);
      }
      break;

    case 'cambio_cargo_salario':
      if ('cargoNuevo' in datos) {
        nuevoY = agregarLineaDetalle(doc, `Cargo Nuevo: ${datos.cargoNuevo}`, margenIzq, nuevoY);
      }
      if ('fechaInicioCargo' in datos) {
        nuevoY = agregarLineaDetalle(doc, `Fecha de Inicio: ${formatearFecha(datos.fechaInicioCargo)}`, margenIzq, nuevoY);
      }
      if ('nuevoSalario' in datos) {
        nuevoY = agregarLineaDetalle(doc, `Nuevo Salario: ${formatearMoneda(datos.nuevoSalario)}`, margenIzq, nuevoY);
      }
      break;

    case 'prorroga':
      if ('numeroProrroga' in datos) {
        nuevoY = agregarLineaDetalle(doc, `Número de Prórroga: ${datos.numeroProrroga}`, margenIzq, nuevoY);
      }
      if ('fechaTerminacionActual' in datos) {
        nuevoY = agregarLineaDetalle(doc, `Terminación Actual: ${formatearFecha(datos.fechaTerminacionActual)}`, margenIzq, nuevoY);
      }
      if ('fechaTerminacionNueva' in datos) {
        nuevoY = agregarLineaDetalle(doc, `Terminación Nueva: ${formatearFecha(datos.fechaTerminacionNueva)}`, margenIzq, nuevoY);
      }
      break;

    case 'cambio_obra':
      if ('obraAnterior' in datos) {
        nuevoY = agregarLineaDetalle(doc, `Obra Anterior: ${datos.obraAnterior}`, margenIzq, nuevoY);
      }
      if ('obraNueva' in datos) {
        nuevoY = agregarLineaDetalle(doc, `Obra Nueva: ${datos.obraNueva}`, margenIzq, nuevoY);
      }
      if ('porcentajeAvanceNuevaObra' in datos) {
        nuevoY = agregarLineaDetalle(
          doc,
          `Porcentaje de Avance: ${formatearPorcentaje(datos.porcentajeAvanceNuevaObra)}`,
          margenIzq,
          nuevoY
        );
      }
      break;

    case 'ampliacion_porcentaje':
      if ('codigoObra' in datos) {
        nuevoY = agregarLineaDetalle(doc, `Código Obra: ${datos.codigoObra}`, margenIzq, nuevoY);
      }
      if ('nombreObra' in datos) {
        nuevoY = agregarLineaDetalle(doc, `Nombre Obra: ${datos.nombreObra}`, margenIzq, nuevoY);
      }
      if ('porcentajeAnterior' in datos && 'porcentajeProrroga' in datos && 'porcentajeNuevo' in datos) {
        nuevoY = agregarLineaDetalle(doc, `Porcentaje Anterior: ${formatearPorcentaje(datos.porcentajeAnterior)}`, margenIzq, nuevoY);
        nuevoY = agregarLineaDetalle(doc, `Porcentaje Prórroga: ${formatearPorcentaje(datos.porcentajeProrroga)}`, margenIzq, nuevoY);
        nuevoY = agregarLineaDetalle(doc, `Porcentaje Nuevo: ${formatearPorcentaje(datos.porcentajeNuevo)}`, margenIzq, nuevoY);
      }
      break;

    case 'termino_indefinido':
      nuevoY = agregarLineaDetalle(
        doc,
        'Este otrosí formaliza el cambio del contrato a término indefinido.',
        margenIzq,
        nuevoY
      );
      break;
  }

  return nuevoY;
}

function agregarLineaDetalle(doc: jsPDF, texto: string, margenIzq: number, posY: number): number {
  const lineas = doc.splitTextToSize(texto, 165);
  doc.text(lineas, margenIzq + 2, posY);

  return posY + lineas.length * 5 + 2;
}

/**
 * Agrega el texto legal según el tipo de otrosí
 */
function agregarTextoLegal(
  doc: jsPDF,
  tipo: TipoOtrosi,
  margenIzq: number,
  posY: number,
  anchoDisponible: number
): number {
  let texto = '';

  switch (tipo) {
    case 'cambio_cargo':
      texto =
        'Por este otrosí, el empleado acepta el cambio de cargo en las condiciones y términos establecidos en la presente modificación al contrato.';
      break;
    case 'cambio_cargo_salario':
      texto =
        'Por este otrosí, el empleado acepta el cambio de cargo y la modificación salarial en las condiciones establecidas, con efecto a partir de la fecha indicada.';
      break;
    case 'prorroga':
      texto =
        'Por este otrosí, se prorroga el contrato a término fijo por el período indicado, manteniéndose las demás condiciones del contrato original.';
      break;
    case 'cambio_obra':
      texto =
        'Por este otrosí, se formaliza el cambio de la obra donde labora el empleado, con efecto inmediato desde la fecha de firma del presente documento.';
      break;
    case 'ampliacion_porcentaje':
      texto =
        'Por este otrosí, se amplía el porcentaje de asignación del empleado en las obras especificadas, con los nuevos porcentajes indicados.';
      break;
    case 'termino_indefinido':
      texto =
        'Por este otrosí, se modifica la duración del contrato, cambiando de término fijo a término indefinido, con las condiciones establecidas en el contrato original.';
      break;
  }

  // Texto legal en cursiva más pequeño
  doc.setFontSize(9);
  doc.setFont('', 'italic');
  doc.setTextColor(80, 80, 80);

  // Dividir el texto en líneas para que entre en el ancho disponible
  const lineasTexto = doc.splitTextToSize(texto, anchoDisponible - 4);
  doc.text(lineasTexto, margenIzq + 2, posY);

  // Calcular nueva posición
  const alturaPorLinea = 5;
  const nuevaY = posY + lineasTexto.length * alturaPorLinea + 5;

  doc.setTextColor(0, 0, 0);
  doc.setFont('', 'normal');

  return nuevaY;
}

/**
 * Agrega el área de firmas al PDF
 */
function agregarAreaFirmas(doc: jsPDF, margenIzq: number, posY: number): void {
  const anchoPagina = doc.internal.pageSize.getWidth();
  const margenDer = 20;
  const anchoDisponible = anchoPagina - margenIzq - margenDer;
  const altoLinea = 40;
  const anchoColumna = (anchoDisponible - 20) / 2;

  doc.setFontSize(10);
  doc.setFont('', 'bold');
  doc.text('FIRMAS', margenIzq, posY);
  posY += 12;

  // Firma Empleado
  doc.setFont('', 'normal');
  doc.setFontSize(9);
  doc.line(margenIzq, posY + altoLinea, margenIzq + anchoColumna, posY + altoLinea);
  doc.text('Firma Empleado', margenIzq + 5, posY + altoLinea + 6);
  doc.text('Cédula: _______________', margenIzq + 5, posY + altoLinea + 12);

  // Firma Empleador
  doc.line(margenIzq + anchoColumna + 20, posY + altoLinea, anchoPagina - margenDer, posY + altoLinea);
  doc.text('Firma Empleador', margenIzq + anchoColumna + 25, posY + altoLinea + 6);
  doc.text('Nombre: _______________', margenIzq + anchoColumna + 25, posY + altoLinea + 12);
}
