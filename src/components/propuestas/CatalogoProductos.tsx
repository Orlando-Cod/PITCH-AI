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
  "Disney":           "#6DB4E8",
  "Mattel":           "#D4518C",
  "Hasbro":           "#7C3FA0",
  "Universal":        "#F0A82A",
  "Paramount":        "#CC5C42",
  "Bluey":            "#4EA8AA",
  "Sicoben Original": "#8CC452",
};

function etiquetaPageCount(paginas: number): string {
  if (paginas === 0) return "Kit";
  return `${paginas} pág`;
}

function colorCategoria(grupo: GrupoCategoria): string {
  const m: Record<GrupoCategoria, string> = {
    Lectura:     "bg-blue-500/20 text-blue-300 border-blue-500/30",
    Colorear:    "bg-purple-500/20 text-purple-300 border-purple-500/30",
    Actividades: "bg-green-500/20 text-green-300 border-green-500/30",
    Pasatiempos: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    Packs:       "bg-orange-500/20 text-orange-300 border-orange-500/30",
  };
  return m[grupo] ?? "bg-slate-500/20 text-slate-300";
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

  // Vista agrupada cuando hay múltiples licencias seleccionadas
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
        className={`relative text-left rounded-xl border p-4 transition-all duration-150 ${
          sinStock
            ? "opacity-40 cursor-not-allowed border-slate-700 bg-slate-800/20"
            : seleccionado
            ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
            : "border-slate-700/60 bg-slate-800/40 hover:border-slate-500 hover:bg-slate-800/70"
        }`}
      >
        {seleccionado && (
          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border mb-2 ${colorCategoria(grupoP)}`}>
          {grupoP}
        </span>

        <p className="text-white text-sm font-semibold leading-tight mb-1 pr-6">
          {p.coleccion}
        </p>

        <p className="text-slate-500 text-xs font-mono mb-3">{p.sku}</p>

        <div className="flex items-end justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>📄 {etiquetaPageCount(p.paginas)}</span>
              {p.portadas > 1 && <span>· {p.portadas} portadas</span>}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>📦 Stock: <span className={p.stock < 50 ? "text-yellow-400" : "text-green-400"}>{p.stock}</span></span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-white font-bold text-base">${p.precio.toFixed(2)}</span>
            <p className="text-slate-500 text-xs">MOQ {p.moq}</p>
          </div>
        </div>

        <div className="flex gap-1 mt-2 flex-wrap">
          {p.tapaDura && (
            <span className="text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">Tapa dura</span>
          )}
          {p.tieneStickers && (
            <span className="text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">+ Stickers</span>
          )}
          {p.licencia !== "Sicoben Original" && (
            <span className="text-xs bg-orange-900/40 text-orange-300 px-1.5 py-0.5 rounded">{p.licencia}</span>
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
          <span className="text-slate-500">Mostrando:</span>
          {licenciasSeleccionadas.map((lic) => (
            <span
              key={lic}
              className="font-medium px-2 py-0.5 rounded-full"
              style={{
                color: LICENCIA_COLOR[lic] ?? "#64748b",
                background: `${LICENCIA_COLOR[lic] ?? "#64748b"}18`,
                border: `1px solid ${LICENCIA_COLOR[lic] ?? "#64748b"}40`,
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
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Buscar por colección o SKU..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <select
          value={filtroPrecio}
          onChange={(e) => setFiltroPrecio(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
        >
          <option value="">Todos los precios</option>
          {Object.entries(PRECIO_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer whitespace-nowrap">
          <input
            type="checkbox"
            checked={soloConStock}
            onChange={(e) => setSoloConStock(e.target.checked)}
            className="accent-blue-500"
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
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {g.label}
              <span className={`ml-1.5 text-xs ${activo ? "text-blue-200" : "text-slate-600"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Resumen de selección ── */}
      {seleccionados.length > 0 && (
        <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl px-4 py-2.5 flex items-center justify-between">
          <span className="text-blue-300 text-sm font-medium">
            {seleccionados.length} producto{seleccionados.length !== 1 ? "s" : ""} seleccionado{seleccionados.length !== 1 ? "s" : ""}
          </span>
          {maxSeleccion && (
            <span className="text-blue-400 text-xs">
              {seleccionados.length} / {maxSeleccion}
            </span>
          )}
        </div>
      )}

      {/* ── Grid de productos ── */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center py-12 text-slate-600">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-sm">Sin productos para estos filtros.</p>
        </div>
      ) : productosPorLicencia ? (
        // Vista agrupada por licencia (cuando hay 2+ licencias seleccionadas)
        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-1">
          {Object.entries(productosPorLicencia).map(([lic, prods]) => {
            if (prods.length === 0) return null;
            const color = LICENCIA_COLOR[lic as Licencia] ?? "#64748b";
            return (
              <div key={lic}>
                <div className="flex items-center gap-2 mb-3 sticky top-0 bg-slate-950/95 backdrop-blur-sm py-1.5">
                  <span className="text-sm font-semibold" style={{ color }}>{lic}</span>
                  <span className="text-xs text-slate-500">
                    {prods.length} producto{prods.length !== 1 ? "s" : ""}
                  </span>
                  <div className="flex-1 h-px ml-1" style={{ background: `${color}30` }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {prods.map((p) => renderCard(p))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Vista plana (1 licencia o sin filtro de licencia)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[560px] overflow-y-auto pr-1">
          {productosFiltrados.map((p) => renderCard(p))}
        </div>
      )}
    </div>
  );
}
