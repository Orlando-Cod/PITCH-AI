"use client";

import { useState } from "react";
import SelectorExhibidor from "./SelectorExhibidor";
import CatalogoProductos from "./CatalogoProductos";

const PASOS = [
  { n: 1, label: "Exhibidor" },
  { n: 2, label: "Productos" },
  { n: 3, label: "Parámetros" },
  { n: 4, label: "Generar" },
];

export default function PasosPropuesta() {
  const [paso, setPaso] = useState(1);
  const [exhibidorId, setExhibidorId] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState<string[]>([]);

  function toggleProducto(sku: string) {
    setProductosSeleccionados((prev) =>
      prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku]
    );
  }

  function avanzar() {
    if (paso < 4) setPaso(paso + 1);
  }

  function retroceder() {
    if (paso > 1) setPaso(paso - 1);
  }

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Nueva Propuesta</h1>
          <p className="text-slate-400 mt-1 text-sm">
            Completa los pasos para generar la propuesta automáticamente.
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="flex items-center gap-2 mb-10">
          {PASOS.map((p, i) => (
            <div key={p.n} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => p.n < paso && setPaso(p.n)}
                className="flex items-center gap-2"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    p.n === paso
                      ? "bg-blue-600 text-white"
                      : p.n < paso
                      ? "bg-green-600 text-white"
                      : "bg-slate-800 text-slate-500 border border-slate-700"
                  }`}
                >
                  {p.n < paso ? "✓" : p.n}
                </div>
                <span
                  className={`text-sm transition-colors ${
                    p.n === paso
                      ? "text-white font-medium"
                      : p.n < paso
                      ? "text-green-400"
                      : "text-slate-600"
                  }`}
                >
                  {p.label}
                </span>
              </button>
              {i < PASOS.length - 1 && <div className="w-8 h-px bg-slate-700 mx-1" />}
            </div>
          ))}
        </div>

        {/* ── Paso 1: Exhibidor ── */}
        {paso === 1 && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">
                Selecciona el exhibidor
              </h2>
              <p className="text-slate-400 text-sm">
                Elige el tipo de mueble que irá en el punto de venta del cliente.
              </p>
            </div>
            <SelectorExhibidor valor={exhibidorId} onChange={setExhibidorId} />
          </div>
        )}

        {/* ── Paso 2: Productos ── */}
        {paso === 2 && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">
                Selecciona los productos
              </h2>
              <p className="text-slate-400 text-sm">
                Haz clic en cada producto para agregarlo a la propuesta.
                Puedes filtrar por categoría, precio o buscar por nombre.
              </p>
            </div>
            <CatalogoProductos
              seleccionados={productosSeleccionados}
              onToggle={toggleProducto}
            />
          </div>
        )}

        {/* ── Paso 3: Parámetros ── */}
        {paso === 3 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center py-16">
            <div className="text-5xl mb-4">⚙️</div>
            <h2 className="text-white font-semibold text-lg mb-2">Parámetros de la propuesta</h2>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              Aquí irá el formulario de cliente, país, precio objetivo, descuento y observaciones.
            </p>
            <div className="mt-6 bg-slate-800 rounded-xl p-4 text-left max-w-sm mx-auto">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Resumen</p>
              <p className="text-slate-300 text-sm">Exhibidor: <span className="text-white">{exhibidorId || "—"}</span></p>
              <p className="text-slate-300 text-sm">Productos seleccionados: <span className="text-white">{productosSeleccionados.length}</span></p>
            </div>
          </div>
        )}

        {/* ── Paso 4: Generar ── */}
        {paso === 4 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center py-16">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-white font-semibold text-lg mb-2">Generar propuesta</h2>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              El sistema construirá los slides automáticamente con diseño corporativo
              Sicoben y los productos seleccionados.
            </p>
          </div>
        )}

        {/* ── Botones de navegación ── */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={retroceder}
            disabled={paso === 1}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Atrás
          </button>

          <div className="flex items-center gap-3">
            {paso === 2 && productosSeleccionados.length > 0 && (
              <span className="text-slate-400 text-sm">
                {productosSeleccionados.length} producto{productosSeleccionados.length !== 1 ? "s" : ""} listo{productosSeleccionados.length !== 1 ? "s" : ""}
              </span>
            )}
            <button
              type="button"
              onClick={avanzar}
              disabled={
                (paso === 1 && !exhibidorId) ||
                (paso === 2 && productosSeleccionados.length === 0) ||
                paso === 4
              }
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors"
            >
              {paso === 3 ? "Generar Propuesta →" : "Continuar →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
