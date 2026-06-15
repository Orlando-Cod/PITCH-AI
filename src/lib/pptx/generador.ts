import pptxgen from "pptxgenjs";
import path from "path";
import fs from "fs";
import type { Producto } from "@/types";

// Producto extendido con portada para el generador
type ProductoConPortada = Producto & { portada?: string };

export interface PropuestaInput {
  exhibidor: {
    id: string;
    nombre: string;
    subtitulo: string;
    espacios: number;
    caras: number;
    dimensiones: string;
    capacidadPorEspacio: Record<string, number>;
    imagen?: string;
    caracteristicas?: string[];
  };
  productos: ProductoConPortada[];
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

// ── Colores corporativos ──────────────────────────────────────────────────────
const C = {
  bg: "0F172A",
  card: "1E293B",
  header: "1E3A5F",
  blue: "2563EB",
  orange: "F97316",
  gold: "F59E0B",
  white: "FFFFFF",
  gray: "94A3B8",
  dim: "475569",
  border: "334155",
  dark: "080E1A",
} as const;

// ── Helpers ───────────────────────────────────────────────────────────────────
function capKey(paginas: number): string {
  if (paginas <= 16) return "16p";
  if (paginas <= 24) return "24p";
  if (paginas <= 48) return "48p";
  if (paginas <= 80) return "80p";
  return "96p";
}

function readImg(relative: string): string | null {
  try {
    const abs = path.join(process.cwd(), "public", relative);
    if (!fs.existsSync(abs)) return null;
    const buf = fs.readFileSync(abs);
    const ext = path.extname(abs).slice(1).toLowerCase().replace("jpg", "jpeg");
    return `data:image/${ext};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

function rect(
  s: ReturnType<InstanceType<typeof pptxgen>["addSlide"]>,
  x: number, y: number, w: number, h: number,
  color: string
) {
  s.addText("", { x, y, w, h, fill: { color }, line: { color, width: 0 }, fontSize: 1, color });
}

// Distribuye productos en caras (una por espacio de cada cara)
function distribuir(
  productos: ProductoConPortada[],
  exhibidor: PropuestaInput["exhibidor"],
  carasACotizar: number
): ProductoConPortada[][] {
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

// ── Generador principal ───────────────────────────────────────────────────────
export async function generarPropuestaPptx(data: PropuestaInput): Promise<Buffer> {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.33 × 7.5 in

  const logoData = readImg("/licencias/sicoben-original.png");
  const exhibData = data.exhibidor.imagen ? readImg(data.exhibidor.imagen) : null;

  const mes = new Date().toLocaleDateString("es", { month: "long", year: "numeric" });
  const bandejasPorCara = Math.floor(data.exhibidor.espacios / data.exhibidor.caras);

  // ── SLIDE 1: PORTADA ──────────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: C.bg };

    // Barra lateral naranja
    rect(s, 0, 0, 0.2, 7.5, C.orange);

    // Banda superior
    rect(s, 0.2, 0, 13.13, 1.5, C.header);

    // Logo Sicoben
    if (logoData) {
      s.addImage({ data: logoData, x: 0.45, y: 0.2, w: 3.0, h: 1.0,
        sizing: { type: "contain", w: 3.0, h: 1.0 } });
    } else {
      s.addText("SICOBEN EDICIONES", { x: 0.45, y: 0.5, w: 4, h: 0.5, fontSize: 14, color: C.white, bold: true });
    }

    // Fecha arriba derecha
    s.addText(mes.toUpperCase(), { x: 8, y: 0.55, w: 5, h: 0.35, fontSize: 10, color: C.gray, align: "right" });

    // Título principal
    s.addText("PROPUESTA COMERCIAL", {
      x: 0.45, y: 1.85, w: 12, h: 0.45,
      fontSize: 12, color: C.gray, bold: true, charSpacing: 4,
    });
    s.addText("Libros Infantiles", {
      x: 0.45, y: 2.35, w: 12, h: 1.1,
      fontSize: 44, color: C.white, bold: true,
    });

    // Temporada / periodo
    const periodo = data.parametros.temporada ?? "2026";
    s.addText(periodo.toUpperCase(), {
      x: 0.45, y: 3.5, w: 12, h: 0.55,
      fontSize: 18, color: C.orange, bold: true,
    });

    // Línea separadora
    rect(s, 0.45, 4.2, 12.5, 0.05, C.dim);

    // Nombre del cliente
    s.addText(data.parametros.cliente.toUpperCase(), {
      x: 0.45, y: 4.4, w: 12, h: 0.9,
      fontSize: 32, color: C.white, bold: true,
    });
    s.addText(`${data.parametros.pais}  ·  ${data.parametros.tipoCliente}`, {
      x: 0.45, y: 5.35, w: 12, h: 0.4,
      fontSize: 13, color: C.gray,
    });

    if (data.parametros.observaciones) {
      s.addText(data.parametros.observaciones, {
        x: 0.45, y: 5.85, w: 11, h: 0.4,
        fontSize: 11, color: C.dim, italic: true,
      });
    }

    // Footer
    rect(s, 0.2, 7.05, 13.13, 0.45, C.dark);
    s.addText("PITCH AI — Sicoben Ediciones", {
      x: 0.45, y: 7.12, w: 12.5, h: 0.3,
      fontSize: 8, color: C.dim, align: "right",
    });
  }

  // ── SLIDE 2: SEPARADOR EXHIBIDOR ──────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: C.bg };

    // Barra lateral azul
    rect(s, 0, 0, 0.2, 7.5, C.blue);

    // Imagen del exhibidor (derecha, grande)
    if (exhibData) {
      s.addImage({ data: exhibData, x: 7.8, y: 0.4, w: 5.2, h: 6.6,
        sizing: { type: "contain", w: 5.2, h: 6.6 } });
    }

    s.addText("MUEBLE EXHIBIDOR", {
      x: 0.5, y: 1.8, w: 7, h: 0.4,
      fontSize: 11, color: C.gray, bold: true, charSpacing: 4,
    });
    s.addText(data.exhibidor.nombre.toUpperCase(), {
      x: 0.5, y: 2.25, w: 7.2, h: 1.3,
      fontSize: 32, color: C.white, bold: true,
    });
    s.addText(data.exhibidor.subtitulo, {
      x: 0.5, y: 3.65, w: 7, h: 0.55,
      fontSize: 17, color: C.blue,
    });

    rect(s, 0.5, 4.35, 6.8, 0.05, C.border);

    s.addText(
      `${data.exhibidor.espacios} ESPACIOS  ·  ${data.exhibidor.caras} CARA${data.exhibidor.caras > 1 ? "S" : ""}  ·  ${bandejasPorCara} PISOS/CARA`,
      { x: 0.5, y: 4.5, w: 7, h: 0.45, fontSize: 13, color: C.orange, bold: true }
    );
    s.addText(data.exhibidor.dimensiones, {
      x: 0.5, y: 5.05, w: 7, h: 0.4,
      fontSize: 13, color: C.gray,
    });
  }

  // ── SLIDE 3: FICHA TÉCNICA ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: C.bg };

    // Header
    rect(s, 0, 0, 13.33, 0.78, C.header);
    rect(s, 0, 0.74, 13.33, 0.05, C.blue);
    s.addText("FICHA TÉCNICA DEL EXHIBIDOR", {
      x: 0.4, y: 0.18, w: 12, h: 0.45,
      fontSize: 13, color: C.white, bold: true, charSpacing: 2,
    });

    // Imagen exhibidor izquierda
    const xInfo = exhibData ? 5.3 : 0.4;
    const wInfo = exhibData ? 7.6 : 12.5;

    if (exhibData) {
      s.addImage({ data: exhibData, x: 0.4, y: 0.9, w: 4.6, h: 5.8,
        sizing: { type: "contain", w: 4.6, h: 5.8 } });
    }

    // Specs
    const specs: [string, string][] = [
      ["Tipo de mueble", data.exhibidor.subtitulo],
      ["Espacios totales", `${data.exhibidor.espacios} espacios`],
      ["Caras totales", `${data.exhibidor.caras} cara${data.exhibidor.caras > 1 ? "s" : ""}`],
      ["Caras cotizadas", `${data.parametros.carasACotizar} cara${data.parametros.carasACotizar > 1 ? "s" : ""}`],
      ["Pisos por cara", `${bandejasPorCara} bandejas`],
      ["Dimensiones", data.exhibidor.dimensiones],
    ];

    specs.forEach(([lbl, val], i) => {
      const y = 1.0 + i * 0.72;
      s.addText(lbl.toUpperCase(), {
        x: xInfo, y, w: wInfo, h: 0.25,
        fontSize: 8, color: C.dim, bold: true, charSpacing: 1,
      });
      s.addText(val, {
        x: xInfo, y: y + 0.24, w: wInfo, h: 0.38,
        fontSize: 15, color: C.white, bold: true,
      });
    });

    // Tabla de capacidad
    rect(s, xInfo, 5.35, wInfo, 0.04, C.border);
    s.addText("CAPACIDAD POR TIPO DE LIBRO (unidades por espacio)", {
      x: xInfo, y: 5.5, w: wInfo, h: 0.28,
      fontSize: 8, color: C.gray, bold: true, charSpacing: 1,
    });
    s.addTable(
      [
        ["16 págs", "24 págs", "48 págs", "80 págs", "96 págs"].map((t) => ({
          text: t,
          options: { bold: true, color: C.gray, fill: { color: C.card }, fontSize: 9, align: "center" as const },
        })),
        (["16p", "24p", "48p", "80p", "96p"] as const).map((k) => ({
          text: `${data.exhibidor.capacidadPorEspacio[k] ?? "—"} u`,
          options: { color: C.orange, fill: { color: C.bg }, fontSize: 16, bold: true, align: "center" as const },
        })),
      ],
      { x: xInfo, y: 5.85, w: wInfo, rowH: 0.5, border: { type: "solid" as const, color: C.border, pt: 1 } }
    );
  }

  // ── SLIDES 4+: PLANOGRAMA POR CARA ───────────────────────────────────────
  const caras = distribuir(data.productos, data.exhibidor, data.parametros.carasACotizar);

  caras.forEach((prods: ProductoConPortada[], ci) => {
    const s = pptx.addSlide();
    s.background = { color: C.bg };

    // Header
    rect(s, 0, 0, 13.33, 0.78, C.header);
    rect(s, 0, 0.74, 13.33, 0.05, C.orange);
    s.addText(`PLANOGRAMA — CARA ${ci + 1} DE ${data.parametros.carasACotizar}`, {
      x: 0.4, y: 0.18, w: 7, h: 0.45,
      fontSize: 13, color: C.white, bold: true, charSpacing: 2,
    });
    s.addText(data.exhibidor.nombre, {
      x: 0.4, y: 0.18, w: 12.5, h: 0.45,
      fontSize: 11, color: C.gray, align: "right",
    });

    if (prods.length === 0) {
      s.addText("Sin productos asignados a esta cara.", {
        x: 0.4, y: 3.5, w: 12, h: 0.5, fontSize: 14, color: C.dim, align: "center",
      });
      return;
    }

    // Thumbnail del exhibidor (izquierda)
    let xT = 0.4;
    let wT = 12.5;
    if (exhibData) {
      s.addImage({ data: exhibData, x: 0.3, y: 0.9, w: 3.1, h: 5.9,
        sizing: { type: "contain", w: 3.1, h: 5.9 } });
      xT = 3.65;
      wT = 9.3;
    }

    // Tabla de productos por bandeja
    // Columnas: Bandeja | Producto / Colección | SKU | Págs | Unid. | Precio
    const headerRow = [
      "Piso", "Producto / Colección", "SKU", "Págs", "Unid.", "Precio",
    ].map((t, i) => ({
      text: t,
      options: {
        bold: true, color: C.white, fill: { color: C.header }, fontSize: 9,
        align: (i === 0 || i >= 3 ? "center" : "left") as "center" | "left" | "right",
      },
    }));

    const dataRows = prods.map((p, i) => {
      const unidades = data.exhibidor.capacidadPorEspacio[capKey(p.paginas)] ?? 1;
      const fill = { color: i % 2 === 0 ? C.bg : C.card };
      const bandeja = i + 1;
      return [
        {
          text: `${bandeja}`,
          options: {
            color: C.orange, fill, fontSize: 12, bold: true, align: "center" as const,
          },
        },
        { text: p.coleccion, options: { color: C.white, fill, fontSize: 9 } },
        { text: p.sku, options: { color: C.dim, fill, fontSize: 8 } },
        {
          text: p.paginas > 0 ? `${p.paginas}p` : "Kit",
          options: { color: C.gray, fill, fontSize: 9, align: "center" as const },
        },
        {
          text: `${unidades} u`,
          options: { color: C.gold, fill, fontSize: 11, bold: true, align: "center" as const },
        },
        {
          text: `$${p.precio.toFixed(2)}`,
          options: { color: C.white, fill, fontSize: 9, align: "right" as const },
        },
      ];
    });

    // Miniaturas de portadas al lado de la tabla
    prods.forEach((p, i) => {
      if (!p.portada) return;
      const portadaData = readImg(p.portada);
      if (!portadaData) return;
      const rowH = 0.42;
      const yImg = 0.9 + i * rowH + 0.04;
      const xImg = xT - 0.72;
      s.addImage({
        data: portadaData,
        x: xImg,
        y: yImg,
        w: 0.28,
        h: rowH - 0.06,
        sizing: { type: "contain", w: 0.28, h: rowH - 0.06 },
      });
    });

    // Columnas más anchas si no hay imagen
    const colW = exhibData
      ? [0.55, 3.8, 1.7, 0.7, 1.15, 1.4]
      : [0.55, 5.2, 2.2, 0.8, 1.5, 1.5];

    s.addTable([headerRow, ...dataRows], {
      x: xT, y: 0.9, w: wT,
      rowH: 0.42,
      colW,
      border: { type: "solid" as const, color: C.border, pt: 1 },
    });

    // Totales resumen (pie de slide)
    const totalUnidades = prods.reduce((acc, p) => {
      return acc + (data.exhibidor.capacidadPorEspacio[capKey(p.paginas)] ?? 1);
    }, 0);

    rect(s, xT, 6.85, wT, 0.45, C.card);
    s.addText(
      `${prods.length} título${prods.length !== 1 ? "s" : ""}  ·  ${totalUnidades} unidades totales en esta cara`,
      { x: xT + 0.2, y: 6.9, w: wT - 0.4, h: 0.3, fontSize: 10, color: C.gray }
    );
  });

  // ── ÚLTIMO SLIDE: LISTADO DE PRECIOS ─────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: C.bg };

    const desc = data.parametros.descuento;
    const conDesc = desc > 0;

    // Header
    rect(s, 0, 0, 13.33, 0.78, C.header);
    rect(s, 0, 0.74, 13.33, 0.05, C.gold);
    s.addText("LISTADO DE PRECIOS", {
      x: 0.4, y: 0.18, w: 8, h: 0.45,
      fontSize: 13, color: C.white, bold: true, charSpacing: 2,
    });
    if (conDesc) {
      s.addText(`Descuento: ${desc}%`, {
        x: 0.4, y: 0.18, w: 12.5, h: 0.45,
        fontSize: 12, color: C.orange, align: "right", bold: true,
      });
    }

    const headerCols = [
      "SKU", "Producto / Colección", "Págs",
      "Precio normal",
      ...(conDesc ? [`Con -${desc}%`] : []),
    ].map((t, i) => ({
      text: t,
      options: {
        bold: true, color: C.white, fill: { color: C.header }, fontSize: 9,
        align: (i >= 3 ? "right" : i === 2 ? "center" : "left") as "left" | "center" | "right",
      },
    }));

    const priceRows = data.productos.map((p, i) => {
      const fill = { color: i % 2 === 0 ? C.bg : C.card };
      const precioDesc = p.precio * (1 - desc / 100);
      return [
        { text: p.sku, options: { color: C.dim, fill, fontSize: 8 } },
        { text: p.coleccion, options: { color: C.white, fill, fontSize: 9 } },
        {
          text: p.paginas > 0 ? `${p.paginas}p` : "Kit",
          options: { color: C.gray, fill, fontSize: 9, align: "center" as const },
        },
        {
          text: `$${p.precio.toFixed(2)}`,
          options: { color: C.white, fill, fontSize: 9, align: "right" as const },
        },
        ...(conDesc
          ? [{
              text: `$${precioDesc.toFixed(2)}`,
              options: { color: C.orange, fill, fontSize: 9, bold: true, align: "right" as const },
            }]
          : []),
      ];
    });

    const colW = conDesc ? [1.8, 5.5, 0.7, 2.0, 2.0] : [2.2, 7.8, 0.7, 1.8];

    s.addTable([headerCols, ...priceRows], {
      x: 0.4, y: 0.9, w: 12.5,
      rowH: 0.32,
      colW,
      border: { type: "solid" as const, color: C.border, pt: 1 },
    });
  }

  return pptx.write({ outputType: "nodebuffer" }) as Promise<Buffer>;
}
