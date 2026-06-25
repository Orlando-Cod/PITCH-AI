"use client";

import { useState } from "react";
import type { Producto } from "@/types";
import type { Exhibidor } from "@/lib/data/exhibidores";
import type { FormParametrosData } from "./FormParametros";

interface Props {
  exhibidor: Exhibidor;
  productos: Producto[];
  parametros: Partial<FormParametrosData>;
  onNuevaPropuesta: () => void;
}

export default function VistaPrevia({ exhibidor, productos, parametros, onNuevaPropuesta }: Props) {
  const [generando, setGenerando] = useState(false);
  const [error, setError] = useState("");
  const [descargado, setDescargado] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [guardandoParaNueva, setGuardandoParaNueva] = useState(false);

  const caras = parametros.carasACotizar ?? 1;
  const espaciosPorCara = Math.floor(exhibidor.espacios / exhibidor.caras);
  const totalSlides = 3 + caras + 1;

  async function descargarPPT(): Promise<void> {
    setGenerando(true);
    setError("");
    try {
      const res = await fetch("/api/generar-pptx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exhibidor, productos, parametros }),
      });
      if (!res.ok) throw new Error("Error al generar la presentación");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Propuesta-${(parametros.cliente ?? "Sicoben").replace(/[^a-zA-Z0-9]/g, "_")}.pptx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDescargado(true);

      const licencias = [...new Set(productos.map((p) => p.licencia))];
      fetch("/api/guardar-propuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: parametros.cliente ?? "",
          pais: parametros.pais ?? "",
          tipoCliente: parametros.tipoCliente ?? "",
          exhibidorId: exhibidor.id,
          exhibidorNombre: exhibidor.nombre,
          numProductos: productos.length,
          numCaras: caras,
          descuento: parametros.descuento ?? 0,
          licencias,
        }),
      }).catch(() => {});
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado");
      throw e;
    } finally {
      setGenerando(false);
    }
  }

  async function handleGenerar() {
    setDescargado(false);
    await descargarPPT().catch(() => {});
  }

  async function handleGuardarYNueva() {
    setMostrarConfirmacion(false);
    if (!descargado) {
      setGuardandoParaNueva(true);
      try {
        await descargarPPT();
      } catch {
        // Aunque falle la descarga, continuamos al reset
      } finally {
        setGuardandoParaNueva(false);
      }
    }
    onNuevaPropuesta();
  }

  function handleNuevaSinGuardar() {
    setMostrarConfirmacion(false);
    onNuevaPropuesta();
  }

  const slideStructure = [
    { n: 1, icon: "🏢", label: "Portada", desc: "Logo · Cliente · Fecha" },
    { n: 2, icon: "🗄️", label: "Exhibidor", desc: exhibidor.nombre },
    { n: 3, icon: "📋", label: "Ficha técnica", desc: "Espacios · Dimensiones" },
    ...Array.from({ length: caras }, (_, i) => ({
      n: 4 + i,
      icon: "📊",
      label: `Cara ${i + 1}`,
      desc: `${Math.min(productos.length, espaciosPorCara)} productos`,
    })),
    { n: totalSlides, icon: "💲", label: "Precios", desc: `${productos.length} títulos` },
  ];

  return (
    <>
      <div className="space-y-8">
        {/* Resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "🗄️", titulo: "Exhibidor", valor: exhibidor.nombre, sub: `${exhibidor.espacios} espacios · ${caras} cara${caras > 1 ? "s" : ""}` },
            { icon: "📚", titulo: "Productos", valor: `${productos.length} títulos`, sub: `~${productos.length * espaciosPorCara} unidades totales` },
            { icon: "🏬", titulo: "Cliente", valor: parametros.cliente ?? "—", sub: `${parametros.pais ?? "—"} · ${parametros.tipoCliente ?? "—"}` },
          ].map((c) => (
            <div key={c.titulo} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="text-2xl mb-2">{c.icon}</div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{c.titulo}</p>
              <p className="text-gray-900 font-semibold mt-1 truncate">{c.valor}</p>
              <p className="text-gray-400 text-xs mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Estructura de slides */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Estructura — {totalSlides} slides
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {slideStructure.map((s) => (
              <div
                key={s.n}
                className="flex-shrink-0 w-[100px] bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm"
              >
                <div className="text-xs text-gray-400 font-mono mb-1">#{s.n}</div>
                <div className="text-xl mb-1">{s.icon}</div>
                <p className="text-gray-800 text-xs font-semibold leading-tight">{s.label}</p>
                <p className="text-gray-400 text-xs mt-0.5 leading-tight">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Descuento info */}
        {(parametros.descuento ?? 0) > 0 && (
          <div className="rounded-xl p-4 border" style={{ background: "rgba(250,70,22,0.05)", borderColor: "rgba(250,70,22,0.2)" }}>
            <p className="text-sm font-medium" style={{ color: "#C53510" }}>
              Descuento {parametros.descuento}% aplicado — la lista de precios mostrará precio normal y precio con descuento.
            </p>
          </div>
        )}

        {/* Éxito */}
        {descargado && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-green-700 text-sm font-medium">
              Presentación descargada y guardada en el historial.
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col items-center gap-4 pt-4">
          {/* Generar PPT */}
          <button
            type="button"
            onClick={handleGenerar}
            disabled={generando || guardandoParaNueva}
            className="font-bold px-12 py-4 rounded-2xl text-base transition-colors text-white flex items-center gap-3 disabled:cursor-not-allowed"
            style={
              generando || guardandoParaNueva
                ? { background: "#E5E7EB", color: "#9CA3AF", boxShadow: "none" }
                : { background: "#FA4616", boxShadow: "0 4px 16px rgba(250,70,22,0.25)" }
            }
          >
            {generando && !guardandoParaNueva ? (
              <><span className="inline-block animate-spin">⏳</span> Generando presentación...</>
            ) : (
              <>⬇️ Generar y descargar PPT</>
            )}
          </button>

          {/* Nueva propuesta */}
          <button
            type="button"
            onClick={() => setMostrarConfirmacion(true)}
            disabled={generando || guardandoParaNueva}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-semibold border transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              color: "#007BAA",
              borderColor: "rgba(0,169,224,0.3)",
              background: "rgba(0,169,224,0.05)",
            }}
          >
            {guardandoParaNueva ? (
              <><span className="inline-block animate-spin">⏳</span> Guardando...</>
            ) : (
              <>✦ Generar una presentación nueva</>
            )}
          </button>
        </div>
      </div>

      {/* ── Modal de confirmación ─────────────────────────────────────────────── */}
      {mostrarConfirmacion && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-3xl mb-3 text-center">📋</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
              ¿Empezar una presentación nueva?
            </h3>
            <p className="text-gray-500 text-sm text-center mb-6 leading-relaxed">
              ¿Quieres guardar la presentación actual antes de empezar una nueva?
            </p>

            <div className="flex flex-col gap-3">
              {/* Guardar y empezar */}
              <button
                type="button"
                onClick={handleGuardarYNueva}
                className="w-full py-3 px-5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #FA4616, #E31C79)",
                  boxShadow: "0 4px 14px rgba(250,70,22,0.2)",
                }}
              >
                ⬇️ Guardar y empezar nueva
              </button>

              {/* Sin guardar */}
              <button
                type="button"
                onClick={handleNuevaSinGuardar}
                className="w-full py-3 px-5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors"
              >
                Empezar nueva sin guardar
              </button>

              {/* Cancelar */}
              <button
                type="button"
                onClick={() => setMostrarConfirmacion(false)}
                className="w-full py-2.5 px-5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
