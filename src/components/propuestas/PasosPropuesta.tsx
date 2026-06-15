"use client";

import { useState } from "react";
import SelectorExhibidor from "./SelectorExhibidor";
import SelectorLicencias from "./SelectorLicencias";
import CatalogoProductos from "./CatalogoProductos";
import FormParametros, { type FormParametrosData, isFormValido } from "./FormParametros";
import VistaPrevia from "./VistaPrevia";
import { EXHIBIDORES } from "@/lib/data/exhibidores";
import { PRODUCTOS } from "@/lib/mock-data/productos";
import type { Licencia } from "@/types";

const PASOS = [
  { n: 1, label: "Exhibidor" },
  { n: 2, label: "Licencias" },
  { n: 3, label: "Productos" },
  { n: 4, label: "Parámetros" },
  { n: 5, label: "Generar" },
];

export default function PasosPropuesta() {
  const [paso, setPaso] = useState(1);
  const [exhibidorId, setExhibidorId] = useState("");
  const [licenciasSeleccionadas, setLicenciasSeleccionadas] = useState<Licencia[]>([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState<string[]>([]);
  const [parametros, setParametros] = useState<Partial<FormParametrosData>>({});

  const exhibidor = EXHIBIDORES.find((e) => e.id === exhibidorId);
  const productos = PRODUCTOS.filter((p) => productosSeleccionados.includes(p.sku));

  function toggleProducto(sku: string) {
    setProductosSeleccionados((prev) =>
      prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku]
    );
  }

  function handleLicencias(nuevas: Licencia[]) {
    setLicenciasSeleccionadas(nuevas);
    // Limpiar productos que ya no corresponden a las licencias seleccionadas
    setProductosSeleccionados((prev) =>
      prev.filter((sku) => {
        const p = PRODUCTOS.find((x) => x.sku === sku);
        return p && nuevas.includes(p.licencia);
      })
    );
  }

  function avanzar() {
    if (paso < 5) setPaso(paso + 1);
  }

  function retroceder() {
    if (paso > 1) setPaso(paso - 1);
  }

  const puedeAvanzar =
    (paso === 1 && !!exhibidorId) ||
    (paso === 2 && licenciasSeleccionadas.length > 0) ||
    (paso === 3 && productosSeleccionados.length > 0) ||
    (paso === 4 && isFormValido(parametros));

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Nueva Propuesta</h1>
          <p className="text-slate-400 mt-1 text-sm">
            Selecciona exhibidor, productos y datos del cliente.
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {PASOS.map((p, i) => (
            <div key={p.n} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => p.n < paso && setPaso(p.n)}
                className="flex items-center gap-2"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    p.n === paso
                      ? "text-white shadow-lg"
                      : p.n < paso
                      ? "text-white"
                      : "bg-slate-800 text-slate-500 border border-slate-700"
                  }`}
                  style={
                    p.n === paso
                      ? { background: "#F0A82A", boxShadow: "0 0 12px rgba(240,168,42,0.4)" }
                      : p.n < paso
                      ? { background: "#8CC452" }
                      : undefined
                  }
                >
                  {p.n < paso ? "✓" : p.n}
                </div>
                <span
                  className={`text-sm transition-colors ${
                    p.n === paso
                      ? "text-white font-semibold"
                      : p.n < paso
                      ? "font-medium"
                      : "text-slate-600"
                  }`}
                  style={p.n < paso ? { color: "#8CC452" } : undefined}
                >
                  {p.label}
                </span>
              </button>
              {i < PASOS.length - 1 && (
                <div
                  className="w-6 h-px mx-1 transition-all"
                  style={{ background: i < paso - 1 ? "#8CC452" : "#1e293b" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Paso 1: Exhibidor ── */}
        {paso === 1 && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">Selecciona el exhibidor</h2>
              <p className="text-slate-400 text-sm">
                Elige el tipo de mueble que irá en el punto de venta del cliente.
              </p>
            </div>
            <SelectorExhibidor valor={exhibidorId} onChange={setExhibidorId} />
          </div>
        )}

        {/* ── Paso 2: Licencias ── */}
        {paso === 2 && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">Selecciona las licencias</h2>
              <p className="text-slate-400 text-sm">
                Elige una o más licencias. El catálogo del siguiente paso mostrará solo los productos correspondientes.
              </p>
            </div>
            <SelectorLicencias valor={licenciasSeleccionadas} onChange={handleLicencias} />
          </div>
        )}

        {/* ── Paso 3: Productos ── */}
        {paso === 3 && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">Selecciona los productos</h2>
              <p className="text-slate-400 text-sm">
                Haz clic en cada producto para agregarlo. Filtra por categoría, precio o busca por nombre.
              </p>
            </div>
            <CatalogoProductos
              seleccionados={productosSeleccionados}
              onToggle={toggleProducto}
              licenciasSeleccionadas={licenciasSeleccionadas}
            />
          </div>
        )}

        {/* ── Paso 4: Parámetros ── */}
        {paso === 4 && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">Parámetros de la propuesta</h2>
              <p className="text-slate-400 text-sm">
                Completa los datos del cliente y las condiciones comerciales.
              </p>
            </div>
            <FormParametros
              exhibidorId={exhibidorId}
              valor={parametros}
              onChange={setParametros}
            />
          </div>
        )}

        {/* ── Paso 5: Vista previa y generación ── */}
        {paso === 5 && exhibidor && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">Revisar y generar</h2>
              <p className="text-slate-400 text-sm">
                Revisa el resumen y descarga el archivo PowerPoint listo para presentar.
              </p>
            </div>
            <VistaPrevia
              exhibidor={exhibidor}
              productos={productos}
              parametros={parametros}
              onNuevaPropuesta={() => {
                setExhibidorId("");
                setLicenciasSeleccionadas([]);
                setProductosSeleccionados([]);
                setParametros({});
                setPaso(1);
              }}
            />
          </div>
        )}

        {/* ── Navegación ── */}
        {paso < 5 && (
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
              {paso === 3 && productosSeleccionados.length > 0 && (
                <span className="text-slate-400 text-sm">
                  {productosSeleccionados.length} producto{productosSeleccionados.length !== 1 ? "s" : ""} listo{productosSeleccionados.length !== 1 ? "s" : ""}
                </span>
              )}
              <button
                type="button"
                onClick={avanzar}
                disabled={!puedeAvanzar}
                className="disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold px-8 py-2.5 rounded-xl text-sm transition-all"
                style={
                  puedeAvanzar
                    ? { background: "linear-gradient(135deg, #F0A82A, #CC5C42)", boxShadow: "0 4px 14px rgba(240,168,42,0.3)" }
                    : undefined
                }
              >
                {paso === 4 ? "Ver propuesta →" : "Continuar →"}
              </button>
            </div>
          </div>
        )}

        {paso === 5 && (
          <div className="mt-8">
            <button
              type="button"
              onClick={retroceder}
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              ← Volver a parámetros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
