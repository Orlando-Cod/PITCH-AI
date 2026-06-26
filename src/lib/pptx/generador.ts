import pptxgen from "pptxgenjs";
import path from "path";
import fs from "fs";
import type { Producto } from "@/types";

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

// ── Paleta oficial Sicoben (manual de marca) ──────────────────────────────────
const C = {
  white:      "FFFFFF",
  nearBlack:  "1A1A2E",
  gray:       "6B7280",
  lightGray:  "F8F9FA",
  border:     "E5E7EB",
  darkBg:     "111827",
  // Colores de marca
  orange:     "FA4616", // PANTONE 172C — acento primario
  magenta:    "E31C79", // PANTONE 213C
  cyan:       "00A9E0", // PANTONE 2995C
  teal:       "00A499", // PANTONE 3272C
  amber:      "FFA300", // PANTONE 137C
  purple:     "84329B", // PANTONE 2593C
  green:      "84BD00", // PANTONE 376C
  yellow:     "FFCD00", // PANTONE 116C
  cyanDark:   "0077B6",
  orangeDark: "D93A0D",
} as const;

// Orden de colores para la tira lateral
const STRIP = [C.orange, C.magenta, C.cyan, C.teal, C.amber, C.purple, C.green];
const STRIP_W = 0.18; // ancho en pulgadas

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

type Slide = ReturnType<InstanceType<typeof pptxgen>["addSlide"]>;

// Rectángulo de color sólido
function rect(s: Slide, x: number, y: number, w: number, h: number, color: string, transparency = 0) {
  s.addText("", { x, y, w, h, fill: { color, transparency }, line: { color, width: 0 }, fontSize: 1, color });
}

// Tira lateral multicolor de marca (izquierda de cada slide)
function brandStrip(s: Slide) {
  const bandH = 7.5 / STRIP.length;
  STRIP.forEach((color, i) => rect(s, 0, i * bandH, STRIP_W, bandH, color));
}

// Header completo de slide: pill cyan con título + pill naranja con subtítulo
function slideHeader(s: Slide, title: string, subtitle: string) {
  const x = STRIP_W + 0.12;
  const w = 13.33 - x - 0.15;
  // Pill azul
  rect(s, x, 0.18, w, 0.75, C.cyan);
  s.addText(title, { x: x + 0.2, y: 0.18, w: w - 0.3, h: 0.75,
    fontSize: 15, color: C.white, bold: true, valign: "middle" });
  // Pill naranja subtítulo
  rect(s, x, 1.05, 7.8, 0.45, C.orange);
  s.addText(subtitle, { x: x + 0.2, y: 1.05, w: 7.6, h: 0.45,
    fontSize: 12, color: C.white, bold: true, valign: "middle" });
}

// Distribuye productos en caras del exhibidor
function distribuir(
  productos: ProductoConPortada[],
  exhibidor: PropuestaInput["exhibidor"],
  carasACotizar: number
): ProductoConPortada[][] {
  const porCara = Math.floor(exhibidor.espacios / exhibidor.caras);
  const caras: ProductoConPortada[][] = Array.from({ length: carasACotizar }, () => []);
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

  const logoData  = readImg("/licencias/sicoben-original.png");
  const exhibData = data.exhibidor.imagen ? readImg(data.exhibidor.imagen) : null;
  const year      = new Date().getFullYear();
  const periodo   = data.parametros.temporada ?? String(year);
  const bandejasPorCara = Math.floor(data.exhibidor.espacios / data.exhibidor.caras);

  // ── SLIDE 1: PORTADA ──────────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: C.white };
    brandStrip(s);

    // Panel derecho — gradiente de marca (naranja → magenta → morado)
    const rx = 5.4;
    rect(s, rx, 0, 13.33 - rx, 7.5, C.orange);
    rect(s, rx, 0, 13.33 - rx, 3.8, C.magenta, 30);
    rect(s, rx, 3.2, 13.33 - rx, 4.3, C.purple, 25);

    // Círculos bokeh de marca en el panel derecho
    s.addText("", { x: 6.0, y: -0.8, w: 4.5, h: 4.5, fill: { color: C.white, transparency: 88 }, line: { color: C.white, width: 0 }, fontSize: 1, color: C.white });
    s.addText("", { x: 9.5, y: 2.5, w: 3.2, h: 3.2, fill: { color: C.yellow, transparency: 82 }, line: { color: C.yellow, width: 0 }, fontSize: 1, color: C.yellow });
    s.addText("", { x: 5.6, y: 4.5, w: 2.8, h: 2.8, fill: { color: C.cyan, transparency: 80 }, line: { color: C.cyan, width: 0 }, fontSize: 1, color: C.cyan });

    // Logo Sicoben en panel derecho
    if (logoData) {
      s.addImage({ data: logoData, x: 10.0, y: 6.3, w: 3.0, h: 1.0,
        sizing: { type: "contain", w: 3.0, h: 1.0 } });
    }

    // ── Contenido panel izquierdo ──
    // Tagline
    s.addText("Lee para crecer y vive para soñar..!", {
      x: 0.35, y: 0.5, w: 4.9, h: 0.5,
      fontSize: 10, color: C.orange, italic: true, bold: true,
    });

    // "PROPUESTA"
    s.addText("PROPUESTA", {
      x: 0.35, y: 1.15, w: 4.9, h: 0.55,
      fontSize: 20, color: C.nearBlack, bold: true, charSpacing: 3,
    });

    // "Libros Infantiles" — grande
    s.addText("Libros Infantiles", {
      x: 0.35, y: 1.7, w: 4.9, h: 1.2,
      fontSize: 38, color: C.nearBlack, bold: true,
    });

    // Año / temporada
    s.addText(periodo, {
      x: 0.35, y: 2.9, w: 4.9, h: 0.65,
      fontSize: 24, color: C.orange, bold: true,
    });

    // Línea divisoria
    rect(s, 0.35, 3.65, 4.8, 0.04, C.border);

    // Nombre del cliente
    s.addText(data.parametros.cliente, {
      x: 0.35, y: 3.8, w: 4.9, h: 1.3,
      fontSize: 26, color: C.nearBlack, bold: true,
    });

    // País · Tipo cliente
    s.addText(`${data.parametros.pais}  ·  ${data.parametros.tipoCliente}`, {
      x: 0.35, y: 5.15, w: 4.9, h: 0.4,
      fontSize: 11, color: C.gray,
    });

    // Iconos educativos decorativos
    s.addText("ABC", { x: 0.35, y: 6.0, w: 1.1, h: 0.55, fontSize: 16, color: C.purple, bold: true, italic: true });
    s.addText("123", { x: 1.5,  y: 6.0, w: 1.1, h: 0.55, fontSize: 16, color: C.cyan,   bold: true });
    s.addText("★",   { x: 2.7,  y: 6.0, w: 0.8, h: 0.55, fontSize: 18, color: C.amber,  bold: true });
    s.addText("✦",   { x: 3.5,  y: 6.0, w: 0.8, h: 0.55, fontSize: 16, color: C.orange, bold: true });
  }

  // ── SLIDE 2: SEPARADOR EXHIBIDOR ──────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: C.white };
    brandStrip(s);

    // "123" decorativo superior
    s.addText("123", {
      x: 5.0, y: 0.15, w: 3.3, h: 0.85,
      fontSize: 46, bold: true, align: "center", color: C.cyan,
    });

    // Bombilla ícono
    s.addText("💡", { x: 9.8, y: 0.2, w: 1.0, h: 0.75, fontSize: 28, align: "center" });

    // Logo Sicoben
    if (logoData) {
      s.addImage({ data: logoData, x: 5.0, y: 1.05, w: 3.3, h: 1.05,
        sizing: { type: "contain", w: 3.3, h: 1.05 } });
    } else {
      s.addText("sicoben", { x: 4.5, y: 1.1, w: 4.3, h: 1.0,
        fontSize: 44, bold: true, align: "center", color: C.orange });
    }

    // Pill azul grande: "MUEBLE EXHIBIDOR N° 1"
    rect(s, 0.9, 2.25, 11.5, 1.25, C.cyan);
    s.addText("MUEBLE EXHIBIDOR N°  1", {
      x: 0.9, y: 2.25, w: 11.5, h: 1.25,
      fontSize: 40, color: C.white, bold: true, align: "center", valign: "middle",
    });

    // Pill ámbar: subtítulo del exhibidor
    rect(s, 2.1, 3.65, 9.1, 0.68, C.amber);
    s.addText(data.exhibidor.subtitulo.toUpperCase(), {
      x: 2.1, y: 3.65, w: 9.1, h: 0.68,
      fontSize: 17, color: C.white, bold: true, align: "center", valign: "middle",
    });

    // Logo del cliente (texto por ahora)
    s.addText(data.parametros.cliente, {
      x: 0.35, y: 4.55, w: 12.7, h: 0.95,
      fontSize: 30, color: C.nearBlack, bold: true, align: "center",
    });
    s.addText(`${data.parametros.pais}  ·  ${data.parametros.tipoCliente}`, {
      x: 0.35, y: 5.6, w: 12.7, h: 0.4,
      fontSize: 13, color: C.gray, align: "center",
    });

    // Íconos decorativos
    s.addText("ABC",  { x: 1.0, y: 0.5, w: 1.5, h: 0.7, fontSize: 28, color: C.purple, bold: true, italic: true });
    s.addText("🚀",   { x: 1.0, y: 5.9, w: 0.9, h: 0.7, fontSize: 24 });
    s.addText("🧪",   { x: 11.4, y: 5.9, w: 0.9, h: 0.7, fontSize: 24 });
  }

  // ── SLIDE 3: FICHA TÉCNICA ────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: C.white };
    brandStrip(s);

    const tituloHeader = `${data.exhibidor.nombre.toUpperCase()} | ${data.parametros.carasACotizar} CARA${data.parametros.carasACotizar > 1 ? "S" : ""} | ${data.exhibidor.espacios} ESPACIOS`;
    slideHeader(s, tituloHeader, "PROPUESTA MIX DE LIBROS INFANTILES");

    // Imagen exhibidor
    if (exhibData) {
      s.addImage({ data: exhibData, x: 0.3, y: 1.6, w: 4.3, h: 5.65,
        sizing: { type: "contain", w: 4.3, h: 5.65 } });
    }

    const xInfo = exhibData ? 4.9 : 0.35;
    const wInfo = exhibData ? 8.2 : 12.75;

    // Labels de pisos (flechas rojas en el PDF → usamos etiquetas naranjas)
    if (exhibData && bandejasPorCara <= 4) {
      for (let p = 1; p <= bandejasPorCara; p++) {
        const yLabel = 1.65 + ((p - 1) / bandejasPorCara) * 5.5;
        rect(s, 0.22, yLabel + 0.05, 0.06, 0.35, C.orange);
        s.addText(`Piso N° ${p}`, {
          x: 0.32, y: yLabel, w: 2.0, h: 0.45,
          fontSize: 9, color: C.orange, bold: true,
        });
        s.addText(`${bandejasPorCara} bandejas`, {
          x: 0.32, y: yLabel + 0.28, w: 2.2, h: 0.3,
          fontSize: 7, color: C.gray,
        });
      }
    }

    // Especificaciones
    const specs: [string, string][] = [
      ["Tipo de mueble",   data.exhibidor.subtitulo],
      ["Espacios totales", `${data.exhibidor.espacios} espacios`],
      ["Caras a cotizar",  `${data.parametros.carasACotizar} cara${data.parametros.carasACotizar > 1 ? "s" : ""}`],
      ["Pisos por cara",   `${bandejasPorCara} bandejas exhibidoras`],
      ["Dimensiones",      data.exhibidor.dimensiones],
    ];

    specs.forEach(([lbl, val], i) => {
      const y = 1.65 + i * 0.74;
      s.addText(lbl.toUpperCase(), {
        x: xInfo, y, w: wInfo, h: 0.26,
        fontSize: 7.5, color: C.gray, bold: true, charSpacing: 1,
      });
      rect(s, xInfo, y + 0.25, wInfo, 0.38, C.lightGray);
      s.addText(val, { x: xInfo + 0.12, y: y + 0.25, w: wInfo - 0.2, h: 0.38,
        fontSize: 13, color: C.nearBlack, bold: true, valign: "middle" });
    });

    // Tabla de capacidad por tipo
    s.addText("CAPACIDAD POR TIPO DE LIBRO (unidades por espacio)", {
      x: xInfo, y: 5.45, w: wInfo, h: 0.28,
      fontSize: 7.5, color: C.gray, bold: true,
    });
    s.addTable(
      [
        ["16 págs", "24 págs", "48 págs", "80 págs", "96 págs"].map((t) => ({
          text: t,
          options: { bold: true, color: C.white, fill: { color: C.cyan }, fontSize: 10, align: "center" as const },
        })),
        (["16p", "24p", "48p", "80p", "96p"] as const).map((k) => ({
          text: `${data.exhibidor.capacidadPorEspacio[k] ?? "—"} u`,
          options: { color: C.orange, fill: { color: C.white }, fontSize: 16, bold: true, align: "center" as const },
        })),
      ],
      { x: xInfo, y: 5.8, w: wInfo, rowH: 0.55,
        border: { type: "solid" as const, color: C.border, pt: 1 } }
    );

    // Burbuja verde: "X Caras  X x X = XX Espacios"
    rect(s, 8.8, 1.05, 4.2, 0.62, C.green);
    s.addText(
      `${data.parametros.carasACotizar} Cara${data.parametros.carasACotizar > 1 ? "s" : ""}  ·  ${data.exhibidor.espacios} Espacios`,
      { x: 8.8, y: 1.05, w: 4.2, h: 0.62,
        fontSize: 14, color: C.white, bold: true, align: "center", valign: "middle" }
    );
  }

  // ── SLIDES 4+: PLANOGRAMA POR CARA ───────────────────────────────────────
  const caras = distribuir(data.productos, data.exhibidor, data.parametros.carasACotizar);

  caras.forEach((prods: ProductoConPortada[], ci) => {
    const s = pptx.addSlide();
    s.background = { color: C.white };
    brandStrip(s);

    const tituloHeader = `${data.exhibidor.nombre.toUpperCase()} | ${data.parametros.carasACotizar} CARA${data.parametros.carasACotizar > 1 ? "S" : ""} | ${data.exhibidor.espacios} ESPACIOS`;
    slideHeader(s, tituloHeader, "PROPUESTA MIX DE LIBROS INFANTILES");

    // Burbuja verde: "Cara X de Y"
    rect(s, 9.5, 1.05, 3.65, 0.62, C.green);
    s.addText(`Cara ${ci + 1} de ${data.parametros.carasACotizar}`, {
      x: 9.5, y: 1.05, w: 3.65, h: 0.62,
      fontSize: 18, color: C.white, bold: true, align: "center", valign: "middle",
    });

    if (prods.length === 0) {
      s.addText("Sin productos asignados a esta cara.", {
        x: 0.35, y: 3.5, w: 12.7, h: 0.5,
        fontSize: 14, color: C.gray, align: "center",
      });
      return;
    }

    // Imagen exhibidor izquierda
    let xT = STRIP_W + 0.12;
    let wT = 13.33 - xT - 0.15;
    if (exhibData) {
      s.addImage({ data: exhibData, x: STRIP_W + 0.05, y: 1.65, w: 2.9, h: 5.65,
        sizing: { type: "contain", w: 2.9, h: 5.65 } });
      xT = STRIP_W + 3.15;
      wT = 13.33 - xT - 0.15;
    }

    // Header de tabla
    const headerRow = [
      "Piso", "Colección / Producto", "SKU", "Págs", "Unid.", "Precio",
    ].map((t, i) => ({
      text: t,
      options: {
        bold: true, color: C.white, fill: { color: C.cyanDark }, fontSize: 9,
        align: (i === 0 || i >= 3 ? "center" : "left") as "center" | "left" | "right",
      },
    }));

    const dataRows = prods.map((p, i) => {
      const unidades = data.exhibidor.capacidadPorEspacio[capKey(p.paginas)] ?? 1;
      const fill = { color: i % 2 === 0 ? C.white : C.lightGray };
      return [
        { text: `${i + 1}`, options: { color: C.orange, fill, fontSize: 12, bold: true, align: "center" as const } },
        { text: p.coleccion, options: { color: C.nearBlack, fill, fontSize: 9 } },
        { text: p.sku, options: { color: C.gray, fill, fontSize: 8 } },
        { text: p.paginas > 0 ? `${p.paginas}p` : "Kit", options: { color: C.gray, fill, fontSize: 9, align: "center" as const } },
        { text: `${unidades} u`, options: { color: C.teal, fill, fontSize: 11, bold: true, align: "center" as const } },
        { text: `$${p.precio.toFixed(2)}`, options: { color: C.nearBlack, fill, fontSize: 9, align: "right" as const } },
      ];
    });

    // Miniaturas de portadas
    prods.forEach((p, i) => {
      if (!p.portada) return;
      const portadaData = readImg(p.portada);
      if (!portadaData) return;
      const rowH = 0.42;
      s.addImage({
        data: portadaData,
        x: xT - 0.38, y: 1.65 + i * rowH + 0.03,
        w: 0.3, h: rowH - 0.06,
        sizing: { type: "contain", w: 0.3, h: rowH - 0.06 },
      });
    });

    const colW = exhibData ? [0.55, 3.6, 1.7, 0.7, 1.15, 1.4] : [0.55, 5.2, 2.2, 0.8, 1.5, 1.5];
    s.addTable([headerRow, ...dataRows], {
      x: xT, y: 1.65, w: wT, rowH: 0.42, colW,
      border: { type: "solid" as const, color: C.border, pt: 1 },
    });

    // Footer resumen
    const totalUnidades = prods.reduce(
      (acc, p) => acc + (data.exhibidor.capacidadPorEspacio[capKey(p.paginas)] ?? 1), 0
    );
    rect(s, xT, 7.12, wT, 0.33, C.lightGray);
    s.addText(
      `${prods.length} título${prods.length !== 1 ? "s" : ""}  ·  ${totalUnidades} unidades en esta cara  ·  ${data.parametros.pais}`,
      { x: xT + 0.15, y: 7.15, w: wT - 0.3, h: 0.27, fontSize: 8.5, color: C.gray }
    );

    // Logo Sicoben pequeño abajo derecha
    if (logoData) {
      s.addImage({ data: logoData, x: 10.8, y: 7.05, w: 2.3, h: 0.38,
        sizing: { type: "contain", w: 2.3, h: 0.38 } });
    }
  });

  // ── ÚLTIMO SLIDE: LISTADO DE PRECIOS ─────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: C.white };
    brandStrip(s);

    const desc    = data.parametros.descuento;
    const conDesc = desc > 0;

    // Pill azul header
    rect(s, STRIP_W + 0.12, 0.18, 13.33 - STRIP_W - 0.27, 0.75, C.cyan);
    s.addText("LISTADO DE PRECIOS", {
      x: STRIP_W + 0.32, y: 0.18, w: 8.0, h: 0.75,
      fontSize: 16, color: C.white, bold: true, valign: "middle",
    });
    if (conDesc) {
      rect(s, 9.5, 0.25, 3.65, 0.6, C.orange);
      s.addText(`Descuento: ${desc}%`, {
        x: 9.5, y: 0.25, w: 3.65, h: 0.6,
        fontSize: 14, color: C.white, bold: true, align: "center", valign: "middle",
      });
    }

    const headerCols = [
      "SKU", "Producto / Colección", "Págs",
      "Precio normal",
      ...(conDesc ? [`Con -${desc}%`] : []),
    ].map((t, i) => ({
      text: t,
      options: {
        bold: true, color: C.white, fill: { color: C.cyanDark }, fontSize: 9,
        align: (i >= 3 ? "right" : i === 2 ? "center" : "left") as "left" | "center" | "right",
      },
    }));

    const priceRows = data.productos.map((p, i) => {
      const fill      = { color: i % 2 === 0 ? C.white : C.lightGray };
      const precioDesc = p.precio * (1 - desc / 100);
      return [
        { text: p.sku, options: { color: C.gray, fill, fontSize: 8 } },
        { text: p.coleccion, options: { color: C.nearBlack, fill, fontSize: 9 } },
        { text: p.paginas > 0 ? `${p.paginas}p` : "Kit", options: { color: C.gray, fill, fontSize: 9, align: "center" as const } },
        { text: `$${p.precio.toFixed(2)}`, options: { color: C.nearBlack, fill, fontSize: 9, align: "right" as const } },
        ...(conDesc ? [{
          text: `$${precioDesc.toFixed(2)}`,
          options: { color: C.orange, fill, fontSize: 9, bold: true, align: "right" as const },
        }] : []),
      ];
    });

    const colW = conDesc ? [1.8, 5.3, 0.7, 2.0, 2.0] : [2.2, 7.6, 0.7, 2.2];
    s.addTable([headerCols, ...priceRows], {
      x: STRIP_W + 0.12, y: 1.0, w: 13.33 - STRIP_W - 0.27,
      rowH: 0.32, colW,
      border: { type: "solid" as const, color: C.border, pt: 1 },
    });
  }

  // ── SLIDE FINAL: CIERRE ───────────────────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: C.darkBg };

    // Tiras de color de marca como franjas horizontales decorativas
    const bandH = 7.5 / STRIP.length;
    STRIP.forEach((color, i) => {
      // Franja izquierda pequeña
      rect(s, 0, i * bandH, 0.18, bandH, color);
      // Franja derecha pequeña
      rect(s, 13.15, i * bandH, 0.18, bandH, color);
      // Círculo bokeh decorativo
      const cx = (i % 4) * 3.0 + 0.5;
      const cy = Math.floor(i / 4) * 4 - 0.5;
      rect(s, cx, cy, 2.5, 2.5, color, 78);
    });

    // Frase principal
    s.addText("LEE PARA CRECER", {
      x: 0.5, y: 1.5, w: 12.3, h: 1.6,
      fontSize: 62, color: C.white, bold: true, align: "center",
    });
    s.addText("Y VIVE PARA SOÑAR", {
      x: 0.5, y: 3.1, w: 12.3, h: 1.6,
      fontSize: 58, color: C.orange, bold: true, align: "center",
    });

    // Logo Sicoben centrado
    if (logoData) {
      s.addImage({ data: logoData, x: 5.5, y: 5.6, w: 2.4, h: 0.85,
        sizing: { type: "contain", w: 2.4, h: 0.85 } });
    }

    // Cliente abajo
    s.addText(data.parametros.cliente, {
      x: 0.5, y: 6.65, w: 12.3, h: 0.55,
      fontSize: 14, color: C.gray, align: "center",
    });
  }

  return pptx.write({ outputType: "nodebuffer" }) as Promise<Buffer>;
}
