"use client";

import { useState, useMemo } from "react";
import { PRODUCTOS } from "@/lib/mock-data/productos";
import { GRUPO_CATEGORIA, type GrupoCategoria, type Producto, type Licencia } from "@/types";

const GRUPOS: { key: GrupoCategoria | "Todos"; label: string }[] = [
  { key: "Todos", label: "Todos" },
  { key: "Lectura", label: "Lectura" },
  { key: "Colorear", label: "Colorear" },
  { key: "Actividades", label: "Actividades" },
  { key: "Pasatiempos", label: "Pasatiempos" },
  { key: "Packs", label: "Packs" },
];

const PRECIO_LABELS: Record<string, string> = {
  "0-1": "Hasta $1.00",
  "1-2": "$1.00 – $2.00",
  "2-5": "$2.00 – $5.00",
  "5+": "Más de $5.00",
};

const LICENCIA_COLOR: Partial<Record<Licencia, string>> = {
  "Disney":           "#00A9E0",
  "Mattel":           "#E31C79",
  "Hasbro":           "#84329B",
  "Universal":        "#FA4616",
  "Paramount":        "#C53510",
  "Bluey":            "#00A499",
  "Sicoben Original": "#84BD00",
};

function etiquetaPageCount(paginas: number): string {
  if (paginas === 0) return "Kit";
  return `${paginas} pág`;
}

function colorCategoria(grupo: GrupoCategoria): string {
  const m: Record<GrupoCategoria, string> = {
    Lectura:     "bg-[#00A9E0]/10 text-[#007BAA] border-[#00A9E0]/30",
    Colorear:    "bg-[#84329B]/10 text-[#6B2880] border-[#84329B]/30",
    Actividades: "bg-[#84BD00]/10 text-[#5A7F00] border-[#84BD00]/30",
    Pasatiempos: "bg-[#FFA300]/10 text-[#CC8200] border-[#FFA300]/30",
    Packs:       "bg-[#FA4616]/10 text-[#C53510] border-[#FA4616]/30",
  };
  return m[grupo] ?? "bg-gray-100 text-gray-600";
}

interface Props {
  seleccionados: string[];
  onToggle: (sku: string) => void;
  maxSeleccion?: number;
  licenciasSeleccionadas?: Licencia[];
}

export default function CatalogoProductos({ seleccionados, onToggle, maxSeleccion, licenciasSeleccionadas }: Props) {
  const [grupo, setGrupo] = useState<GrupoCategoria | "Todos">("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [filtroPrecio, setFiltroPrecio] = useState<string>("");
  const [soloConStock, setSoloConStock] = useState(true);

  const productosFiltrados = useMemo(() => {
    return PRODUCTOS.filter((p) => {
      if (soloConStock && p.stock === 0) return false;

      if (licenciasSeleccionadas && licenciasSeleccionadas.length > 0) {
        if (!licenciasSeleccionadas.includes(p.licencia)) return false;
      }

      if (grupo !== "Todos") {
        const g = GRUPO_CATEGORIA[p.categoria];
        if (g !== grupo) return false;
      }

      if (busqueda.trim()) {
        const q = busqueda.toLowerCase();
        if (
          !p.coleccion.toLowerCase().includes(q) &&
          !p.sku.toLowerCase().includes(q) &&
          !p.descripcion.toLowerCase().includes(q)
        )
          return false;
      }

      if (filtroPrecio) {
        const [min, max] = filtroPrecio.split("-").map(Number);
        if (filtroPrecio === "5+") {
          if (p.precio < 5) return false;
        } else {
          if (p.precio < min || p.precio > max) return false;
        }
      }

      return true;
    });
  }, [grupo, busqueda, filtroPrecio, soloConStock, licenciasSeleccionadas]);

  const conteoGrupo = useMemo(() => {
    const counts: Record<string, number> = { Todos: 0 };
    PRODUCTOS.forEach((p) => {
      if (soloConStock && p.stock === 0) return;
      if (licenciasSeleccionadas && licenciasSeleccionadas.length > 0) {
        if (!licenciasSeleccionadas.includes(p.licencia)) return;
      }
      const g = GRUPO_CATEGORIA[p.categoria];
      counts[g] = (counts[g] ?? 0) + 1;
      counts["Todos"] = (counts["Todos"] ?? 0) + 1;
    });
    return counts;
  }, [soloConStock, licenciasSeleccionadas]);

  const productosPorLicencia = useMemo<Record<string, Producto[]> | null>(() => {
    if (!licenciasSeleccionadas || licenciasSeleccionadas.length <= 1) return null;
    const grupos: Record<string, Producto[]> = {};
    licenciasSeleccionadas.forEach((lic) => {
      grupos[lic] = productosFiltrados.filter((p) => p.licencia === lic);
    });
    return grupos;
  }, [licenciasSeleccionadas, productosFiltrados]);

  function toggleProducto(p: Producto) {
    const estaSeleccionado = seleccionados.includes(p.sku);
    if (!estaSeleccionado && maxSeleccion && seleccionados.length >= maxSeleccion) return;
    onToggle(p.sku);
  }

  function renderCard(p: Producto) {
    const seleccionado = seleccionados.includes(p.sku);
    const grupoP = GRUPO_CATEGORIA[p.categoria];
    const sinStock = p.stock === 0;

    return (
      <button
        key={p.sku}
        type="button"
        onClick={() => !sinStock && toggleProducto(p)}
        disabled={sinStock}
        className={`relative text-left rounded-xl border transition-all duration-150 overflow-hidden ${
          sinStock
            ? "opacity-40 cursor-not-allowed border-gray-200 bg-gray-50"
            : seleccionado
            ? "border-[#00A9E0] shadow-md"
            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
        }`}
        style={seleccionado ? { background: "rgba(0,169,224,0.04)" } : undefined}
      >
        {/* Check de selección */}
        {seleccionado && (
          <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
            style={{ background: "#00A9E0" }}>
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        {/* Portada del libro */}
        {p.portada ? (
          <div className="w-full h-32 bg-gray-100 overflow-hidden flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.portada}
              alt={p.coleccion}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-3xl">
            📚
          </div>
        )}

        {/* Info */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className={`inline-block text-xs font-medium px-1.5 py-0.5 rounded-full border ${colorCategoria(grupoP)}`}>
              {grupoP}
            </span>
            {p.licencia !== "Sicoben Original" && (
              <span className="text-xs font-medium" style={{ color: LICENCIA_COLOR[p.licencia] ?? "#6B7280" }}>
                {p.licencia}
              </span>
            )}
          </div>

          <p className="text-gray-900 text-sm font-semibold leading-tight mb-1 pr-5 line-clamp-2">
            {p.coleccion}
          </p>

          <div className="flex items-center justify-between mt-2">
            <div className="space-y-0.5">
              <div className="text-xs text-gray-400">{etiquetaPageCount(p.paginas)}{p.portadas > 1 ? ` · ${p.portadas} portadas` : ""}</div>
              <div className="text-xs">
                Stock: <span className={p.stock < 50 ? "font-medium" : "font-medium"} style={{ color: p.stock < 50 ? "#D97706" : "#16A34A" }}>{p.stock}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-gray-900 font-bold text-base">${p.precio.toFixed(2)}</span>
              <p className="text-gray-400 text-xs">MOQ {p.moq}</p>
            </div>
          </div>

          {(p.tapaDura || p.tieneStickers) && (
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {p.tapaDura && <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Tapa dura</span>}
              {p.tieneStickers && <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">+ Stickers</span>}
            </div>
          )}
        </div>
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Indicador de licencias activas */}
      {licenciasSeleccionadas && licenciasSeleccionadas.length > 0 && (
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="text-gray-400">Mostrando:</span>
          {licenciasSeleccionadas.map((lic) => (
            <span
              key={lic}
              className="font-medium px-2 py-0.5 rounded-full"
              style={{
                color: LICENCIA_COLOR[lic] ?? "#6B7280",
                background: `${LICENCIA_COLOR[lic] ?? "#6B7280"}12`,
                border: `1px solid ${LICENCIA_COLOR[lic] ?? "#6B7280"}30`,
              }}
            >
              {lic}
            </span>
          ))}
        </div>
      )}

      {/* ── Controles ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Buscar por colección o SKU..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00A9E0] transition-colors"
          />
        </div>

        <select
          value={filtroPrecio}
          onChange={(e) => setFiltroPrecio(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#00A9E0]"
        >
          <option value="">Todos los precios</option>
          {Object.entries(PRECIO_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer whitespace-nowrap">
          <input
            type="checkbox"
            checked={soloConStock}
            onChange={(e) => setSoloConStock(e.target.checked)}
            className="accent-[#FA4616]"
          />
          Solo con stock
        </label>
      </div>

      {/* ── Tabs de grupo ── */}
      <div className="flex gap-1 flex-wrap">
        {GRUPOS.map((g) => {
          const count = conteoGrupo[g.key] ?? 0;
          const activo = grupo === g.key;
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => setGrupo(g.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activo
                  ? "text-white"
                  : "bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-200"
              }`}
              style={activo ? { background: "#FA4616" } : undefined}
            >
              {g.label}
              <span className={`ml-1.5 text-xs ${activo ? "text-white/70" : "text-gray-400"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Resumen de selección ── */}
      {seleccionados.length > 0 && (
        <div className="rounded-xl px-4 py-2.5 flex items-center justify-between border"
          style={{ background: "rgba(0,169,224,0.06)", borderColor: "rgba(0,169,224,0.2)" }}>
          <span className="text-sm font-medium" style={{ color: "#007BAA" }}>
            {seleccionados.length} producto{seleccionados.length !== 1 ? "s" : ""} seleccionado{seleccionados.length !== 1 ? "s" : ""}
          </span>
          {maxSeleccion && (
            <span className="text-xs" style={{ color: "#00A9E0" }}>
              {seleccionados.length} / {maxSeleccion}
            </span>
          )}
        </div>
      )}

      {/* ── Grid de productos ── */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-sm">Sin productos para estos filtros.</p>
        </div>
      ) : productosPorLicencia ? (
        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-1">
          {Object.entries(productosPorLicencia).map(([lic, prods]) => {
            if (prods.length === 0) return null;
            const color = LICENCIA_COLOR[lic as Licencia] ?? "#6B7280";
            return (
              <div key={lic}>
                <div className="flex items-center gap-2 mb-3 sticky top-0 bg-white/95 backdrop-blur-sm py-1.5">
                  <span className="text-sm font-semibold" style={{ color }}>{lic}</span>
                  <span className="text-xs text-gray-400">
                    {prods.length} producto{prods.length !== 1 ? "s" : ""}
                  </span>
                  <div className="flex-1 h-px ml-1" style={{ background: `${color}25` }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {prods.map((p) => renderCard(p))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[560px] overflow-y-auto pr-1">
          {productosFiltrados.map((p) => renderCard(p))}
        </div>
      )}
    </div>
  );
}
