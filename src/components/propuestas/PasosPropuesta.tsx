"use client";

import { useState } from "react";
import SelectorExhibidor from "./SelectorExhibidor";
import CatalogoProductos from "./CatalogoProductos";
import FormParametros, { type FormParametrosData, isFormValido } from "./FormParametros";
import VistaPrevia from "./VistaPrevia";
import { EXHIBIDORES } from "@/lib/data/exhibidores";
import { PRODUCTOS } from "@/lib/mock-data/productos";

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
  const [parametros, setParametros] = useState<Partial<FormParametrosData>>({});

  const exhibidor = EXHIBIDORES.find((e) => e.id === exhibidorId);
  const productos = PRODUCTOS.filter((p) => productosSeleccionados.includes(p.sku));

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

  const puedeAvanzar =
    (paso === 1 && !!exhibidorId) ||
    (paso === 2 && productosSeleccionados.length > 0) ||
    (paso === 3 && isFormValido(parametros));

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
              <h2 className="text-lg font-semibold text-white mb-1">Selecciona el exhibidor</h2>
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
              <h2 className="text-lg font-semibold text-white mb-1">Selecciona los productos</h2>
              <p className="text-slate-400 text-sm">
                Haz clic en cada producto para agregarlo. Filtra por categoría, precio o busca por nombre.
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

        {/* ── Paso 4: Vista previa y generación ── */}
        {paso === 4 && exhibidor && (
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
            />
          </div>
        )}

        {/* ── Navegación ── */}
        {paso < 4 && (
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
                disabled={!puedeAvanzar}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold px-8 py-2.5 rounded-xl text-sm transition-colors"
              >
                {paso === 3 ? "Ver propuesta →" : "Continuar →"}
              </button>
            </div>
          </div>
        )}

        {paso === 4 && (
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
