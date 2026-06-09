import pptxgen from "pptxgenjs";
import type { Producto } from "@/types";

export interface PropuestaInput {
  exhibidor: {
    id: string;
    nombre: string;
    subtitulo: string;
    espacios: number;
    caras: number;
    dimensiones: string;
    capacidadPorEspacio: Record<string, number>;
  };
  productos: Producto[];
  parametros: {
    cliente: string;
    pais: string;
    tipoCliente: string;
    carasACotizar: number;
    precioObjetivo: number;
    descuento: number;
    temporada?: string;
    observaciones?: string;
  };
}

const C = {
  bg: "0F172A",
  card: "1E293B",
  header: "162032",
  blue: "2563EB",
  orange: "F97316",
  white: "FFFFFF",
  gray: "94A3B8",
  dim: "475569",
  border: "334155",
} as const;

function capKey(paginas: number): string {
  if (paginas <= 16) return "16p";
  if (paginas <= 24) return "24p";
  if (paginas <= 48) return "48p";
  if (paginas <= 80) return "80p";
  return "96p";
}

function distribuir(productos: Producto[], exhibidor: PropuestaInput["exhibidor"], carasACotizar: number): Producto[][] {
  const porCara = Math.floor(exhibidor.espacios / exhibidor.caras);
  const caras: Producto[][] = Array.from({ length: carasACotizar }, () => []);
  let idx = 0;
  for (let c = 0; c < carasACotizar && idx < productos.length; c++) {
    for (let e = 0; e < porCara && idx < productos.length; e++) {
      caras[c].push(productos[idx++]);
    }
  }
  return caras;
}

function bar(s: ReturnType<InstanceType<typeof pptxgen>["addSlide"]>, x: number, y: number, w: number, h: number, color: string) {
  s.addText("", { x, y, w, h, fill: { color }, line: { color, width: 0.5 }, fontSize: 1, color });
}

export async function generarPropuestaPptx(data: PropuestaInput): Promise<Buffer> {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";

  // ── Slide 1: Portada ────────────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: C.bg };
    bar(s, 0, 0, 0.15, 7.5, C.orange);

    s.addText("SICOBEN EDICIONES", { x: 0.45, y: 0.6, w: 10, h: 0.35, fontSize: 10, color: C.gray, bold: true });
    s.addText("PROPUESTA COMERCIAL", { x: 0.45, y: 1.2, w: 12, h: 1.1, fontSize: 38, color: C.white, bold: true });
    s.addText(data.parametros.cliente.toUpperCase(), { x: 0.45, y: 2.4, w: 12, h: 0.8, fontSize: 26, color: C.orange, bold: true });

    bar(s, 0.45, 3.35, 6, 0.04, C.dim);

    s.addText(`${data.parametros.pais}  ·  ${data.parametros.tipoCliente}  ·  ${data.exhibidor.nombre}`, {
      x: 0.45, y: 3.55, w: 12, h: 0.4, fontSize: 13, color: C.gray,
    });

    if (data.parametros.temporada) {
      s.addText(`Temporada: ${data.parametros.temporada}`, { x: 0.45, y: 4.05, w: 8, h: 0.35, fontSize: 12, color: C.dim });
    }
    if (data.parametros.observaciones) {
      s.addText(data.parametros.observaciones, { x: 0.45, y: 4.5, w: 10, h: 0.35, fontSize: 11, color: C.dim, italic: true });
    }

    const mes = new Date().toLocaleDateString("es", { month: "long", year: "numeric" });
    s.addText(mes, { x: 0.45, y: 6.9, w: 5, h: 0.35, fontSize: 10, color: C.dim });
    s.addText("PITCH AI — Sicoben Ediciones", { x: 7, y: 6.9, w: 6, h: 0.35, fontSize: 9, color: C.dim, align: "right" });
  }

  // ── Slide 2: Separador exhibidor ─────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: C.bg };
    bar(s, 0, 0, 0.15, 7.5, C.blue);

    s.addText("MUEBLE EXHIBIDOR", { x: 0.45, y: 2.0, w: 12, h: 0.5, fontSize: 14, color: C.gray, bold: true });
    s.addText(data.exhibidor.nombre.toUpperCase(), { x: 0.45, y: 2.6, w: 12, h: 1.1, fontSize: 36, color: C.white, bold: true });
    s.addText(data.exhibidor.subtitulo, { x: 0.45, y: 3.8, w: 10, h: 0.5, fontSize: 18, color: C.blue });
    s.addText(
      `${data.exhibidor.espacios} espacios  ·  ${data.exhibidor.caras} cara${data.exhibidor.caras > 1 ? "s" : ""}  ·  ${data.exhibidor.dimensiones}`,
      { x: 0.45, y: 4.45, w: 12, h: 0.4, fontSize: 13, color: C.gray }
    );
  }

  // ── Slide 3: Ficha técnica ───────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: C.bg };
    bar(s, 0, 0, 13.33, 0.7, C.card);
    bar(s, 0, 0.66, 13.33, 0.04, C.blue);

    s.addText("FICHA TÉCNICA DEL EXHIBIDOR", { x: 0.4, y: 0.15, w: 12, h: 0.42, fontSize: 14, color: C.white, bold: true });

    const specs = [
      ["Nombre", data.exhibidor.nombre],
      ["Tipo", data.exhibidor.subtitulo],
      ["Espacios totales", `${data.exhibidor.espacios}`],
      ["Caras totales", `${data.exhibidor.caras}`],
      ["Caras cotizadas", `${data.parametros.carasACotizar}`],
      ["Dimensiones", data.exhibidor.dimensiones],
    ];
    specs.forEach(([lbl, val], i) => {
      const x = i % 2 === 0 ? 0.4 : 6.8;
      const y = 1.0 + Math.floor(i / 2) * 0.7;
      s.addText(lbl.toUpperCase(), { x, y, w: 5, h: 0.28, fontSize: 9, color: C.dim, bold: true });
      s.addText(val, { x, y: y + 0.26, w: 5, h: 0.35, fontSize: 15, color: C.white });
    });

    bar(s, 0.4, 3.55, 12.5, 0.04, C.border);
    s.addText("CAPACIDAD POR TIPO DE LIBRO (unidades por espacio)", {
      x: 0.4, y: 3.7, w: 12, h: 0.35, fontSize: 11, color: C.gray, bold: true,
    });

    s.addTable(
      [
        ["16 págs", "24 págs", "48 págs", "80 págs", "96 págs"].map((t) => ({
          text: t,
          options: { bold: true, color: C.white, fill: { color: C.card }, fontSize: 11, align: "center" as const },
        })),
        ["16p", "24p", "48p", "80p", "96p"].map((k) => ({
          text: `${data.exhibidor.capacidadPorEspacio[k] ?? "—"} u`,
          options: { color: C.orange, fill: { color: C.bg }, fontSize: 18, bold: true, align: "center" as const },
        })),
      ],
      { x: 0.4, y: 4.2, w: 12.5, rowH: 0.55, border: { type: "solid" as const, color: C.border, pt: 1 } }
    );
  }

  // ── Slides 4+: Planograma por cara ──────────────────────────────────────────
  const caras = distribuir(data.productos, data.exhibidor, data.parametros.carasACotizar);

  caras.forEach((prods, ci) => {
    const s = pptx.addSlide();
    s.background = { color: C.bg };
    bar(s, 0, 0, 13.33, 0.7, C.card);
    bar(s, 0, 0.66, 13.33, 0.04, C.orange);

    s.addText(`PLANOGRAMA — CARA ${ci + 1}`, { x: 0.4, y: 0.15, w: 8, h: 0.42, fontSize: 14, color: C.white, bold: true });
    s.addText(data.exhibidor.nombre, { x: 0.4, y: 0.15, w: 12.5, h: 0.42, fontSize: 12, color: C.gray, align: "right" });

    if (prods.length === 0) {
      s.addText("Sin productos asignados a esta cara.", {
        x: 0.4, y: 3.5, w: 12, h: 0.5, fontSize: 14, color: C.dim, align: "center",
      });
      return;
    }

    const headerRow = ["#", "Producto / Colección", "SKU", "Págs", "Unid/espacio", "Precio"].map((t, i) => ({
      text: t,
      options: {
        bold: true, color: C.white, fill: { color: "1E3A5F" }, fontSize: 10,
        align: (i === 0 || i >= 3 ? "center" : "left") as "center" | "left" | "right",
      },
    }));

    const dataRows = prods.map((p, i) => {
      const unidades = data.exhibidor.capacidadPorEspacio[capKey(p.paginas)] ?? 1;
      const fill = { color: i % 2 === 0 ? C.bg : C.card };
      return [
        { text: `${i + 1}`, options: { color: C.gray, fill, fontSize: 10, align: "center" as const } },
        { text: p.coleccion, options: { color: C.white, fill, fontSize: 10 } },
        { text: p.sku, options: { color: C.dim, fill, fontSize: 9 } },
        { text: p.paginas > 0 ? `${p.paginas}p` : "Kit", options: { color: C.gray, fill, fontSize: 10, align: "center" as const } },
        { text: `${unidades} u`, options: { color: C.orange, fill, fontSize: 12, bold: true, align: "center" as const } },
        { text: `$${p.precio.toFixed(2)}`, options: { color: C.white, fill, fontSize: 10, align: "right" as const } },
      ];
    });

    s.addTable([headerRow, ...dataRows], {
      x: 0.4, y: 0.9, w: 12.5,
      rowH: 0.42,
      colW: [0.4, 4.5, 2.0, 0.8, 1.6, 1.2],
      border: { type: "solid" as const, color: C.border, pt: 1 },
    });
  });

  // ── Último slide: Listado de precios ─────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: C.bg };
    bar(s, 0, 0, 13.33, 0.7, C.card);
    bar(s, 0, 0.66, 13.33, 0.04, C.orange);

    s.addText("LISTADO DE PRECIOS", { x: 0.4, y: 0.15, w: 8, h: 0.42, fontSize: 14, color: C.white, bold: true });

    const desc = data.parametros.descuento;
    const conDesc = desc > 0;

    const headerCols = [
      "SKU", "Producto / Colección", "Págs", "Precio normal",
      ...(conDesc ? [`Con -${desc}%`] : []),
    ].map((t, i) => ({
      text: t,
      options: {
        bold: true, color: C.white, fill: { color: "1E3A5F" }, fontSize: 9,
        align: (i >= 3 ? "right" : "left") as "left" | "right",
      },
    }));

    const priceRows = data.productos.map((p, i) => {
      const fill = { color: i % 2 === 0 ? C.bg : C.card };
      const precioDesc = p.precio * (1 - desc / 100);
      return [
        { text: p.sku, options: { color: C.dim, fill, fontSize: 8 } },
        { text: p.coleccion, options: { color: C.white, fill, fontSize: 9 } },
        { text: p.paginas > 0 ? `${p.paginas}p` : "Kit", options: { color: C.gray, fill, fontSize: 9, align: "center" as const } },
        { text: `$${p.precio.toFixed(2)}`, options: { color: C.white, fill, fontSize: 9, align: "right" as const } },
        ...(conDesc ? [{ text: `$${precioDesc.toFixed(2)}`, options: { color: C.orange, fill, fontSize: 9, bold: true, align: "right" as const } }] : []),
      ];
    });

    const colW = conDesc ? [1.8, 5.2, 0.7, 2.0, 1.8] : [2.0, 7.5, 0.7, 2.0];

    s.addTable([headerCols, ...priceRows], {
      x: 0.4, y: 0.9, w: 12.5,
      rowH: 0.3,
      colW,
      border: { type: "solid" as const, color: C.border, pt: 1 },
    });
  }

  return pptx.write({ outputType: "nodebuffer" }) as Promise<Buffer>;
}
