import { EXHIBIDORES } from "@/lib/data/exhibidores";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ex = EXHIBIDORES.find((e) => e.id === id);
  if (!ex) return new NextResponse("Not found", { status: 404 });

  const cols = ex.tipo === "metalico-giratorio" ? 4 : ex.tipo === "carton" ? 2 : 3;
  const rows = Math.ceil(ex.espacios / cols);

  const GRID_X = 30;
  const GRID_Y = 108;
  const GRID_W = 360;
  const GRID_H = 360;
  const GAP = 6;
  const cellW = (GRID_W - GAP * (cols - 1)) / cols;
  const cellH = (GRID_H - GAP * (rows - 1)) / rows;

  const cells: { x: number; y: number; w: number; h: number; n: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n = r * cols + c + 1;
      if (n > ex.espacios) break;
      cells.push({
        x: GRID_X + c * (cellW + GAP),
        y: GRID_Y + r * (cellH + GAP),
        w: cellW,
        h: cellH,
        n,
      });
    }
  }

  const capacidades = [
    { label: "16 Pág.", val: ex.capacidadPorEspacio["16p"] },
    { label: "24 Pág.", val: ex.capacidadPorEspacio["24p"] },
    { label: "48 Pág.", val: ex.capacidadPorEspacio["48p"] },
    { label: "80 Pág.", val: ex.capacidadPorEspacio["80p"] },
    { label: "96 Pág.", val: ex.capacidadPorEspacio["96p"] },
  ];

  const IX = 420; // info panel x

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#0F172A"/>

  <!-- Header azul -->
  <rect x="0" y="0" width="800" height="56" fill="#2563EB"/>
  <text x="20" y="37" font-family="Arial,sans-serif" font-size="19" font-weight="bold" fill="white">${escXml(ex.nombre.toUpperCase())} | ${ex.caras} ${ex.caras === 1 ? "CARA" : "CARAS"} | ${ex.espacios} ESPACIOS</text>

  <!-- Subtítulo naranja -->
  <rect x="0" y="56" width="400" height="32" fill="#F97316"/>
  <text x="20" y="77" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="white">${escXml(ex.subtitulo.toUpperCase())}</text>

  <!-- Celdas del exhibidor -->
  ${cells
    .map(
      (cell) => `
  <rect x="${r(cell.x)}" y="${r(cell.y)}" width="${r(cell.w)}" height="${r(cell.h)}" rx="4" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
  <text x="${r(cell.x + cell.w / 2)}" y="${r(cell.y + cell.h / 2 + 5)}" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#64748B">${cell.n}</text>`
    )
    .join("")}

  <!-- Panel capacidades -->
  <rect x="${IX}" y="100" width="355" height="28" rx="3" fill="#1E293B"/>
  <rect x="${IX}" y="100" width="4" height="28" fill="#2563EB"/>
  <text x="${IX + 12}" y="119" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="#93C5FD">CAPACIDAD POR ESPACIO</text>

  ${capacidades
    .map(
      (cap, i) => `
  <rect x="${IX}" y="${136 + i * 42}" width="355" height="34" rx="4" fill="#1E293B"/>
  <text x="${IX + 12}" y="${158 + i * 42}" font-family="Arial,sans-serif" font-size="14" fill="#CBD5E1">${cap.label}</text>
  <text x="${IX + 343}" y="${158 + i * 42}" text-anchor="end" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#F97316">${cap.val} uds.</text>`
    )
    .join("")}

  <!-- Dimensiones -->
  <rect x="${IX}" y="358" width="355" height="52" rx="4" fill="#1E293B"/>
  <rect x="${IX}" y="358" width="4" height="52" fill="#F97316"/>
  <text x="${IX + 12}" y="376" font-family="Arial,sans-serif" font-size="10" fill="#94A3B8">DIMENSIONES</text>
  <text x="${IX + 12}" y="398" font-family="Arial,sans-serif" font-size="15" font-weight="bold" fill="white">${escXml(ex.dimensiones)}</text>

  <!-- Logo sicoben -->
  <text x="780" y="480" text-anchor="end" font-family="Arial,sans-serif" font-size="22" font-weight="900" fill="#2563EB">sico<tspan fill="#F97316">ben</tspan></text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function r(n: number) {
  return Math.round(n * 10) / 10;
}

function escXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
