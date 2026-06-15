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

  // ── Lógica de descarga (reutilizable) ────────────────────────────────────
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

      // Guardar en historial (fire-and-forget)
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

  // ── Guardar y empezar nueva ───────────────────────────────────────────────
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

  // ── Estructura de slides para la vista previa ─────────────────────────────
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
            <div key={c.titulo} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl mb-2">{c.icon}</div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{c.titulo}</p>
              <p className="text-white font-semibold mt-1 truncate">{c.valor}</p>
              <p className="text-slate-500 text-xs mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Estructura de slides */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Estructura — {totalSlides} slides
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {slideStructure.map((s) => (
              <div
                key={s.n}
                className="flex-shrink-0 w-[100px] bg-slate-900 border border-slate-800 rounded-xl p-3 text-center"
              >
                <div className="text-xs text-slate-600 font-mono mb-1">#{s.n}</div>
                <div className="text-xl mb-1">{s.icon}</div>
                <p className="text-white text-xs font-semibold leading-tight">{s.label}</p>
                <p className="text-slate-500 text-xs mt-0.5 leading-tight">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Descuento info */}
        {(parametros.descuento ?? 0) > 0 && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
            <p className="text-orange-300 text-sm font-medium">
              Descuento {parametros.descuento}% aplicado — la lista de precios mostrará precio normal y precio con descuento.
            </p>
          </div>
        )}

        {/* Éxito */}
        {descargado && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <p className="text-green-300 text-sm font-medium">
              Presentación descargada y guardada en el historial.
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col items-center gap-4 pt-4">
          {/* Generar PPT */}
          <button
            type="button"
            onClick={handleGenerar}
            disabled={generando || guardandoParaNueva}
            className="bg-orange-500 hover:bg-orange-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold px-12 py-4 rounded-2xl text-base transition-colors shadow-lg shadow-orange-500/20 flex items-center gap-3"
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
              color: "#6DB4E8",
              borderColor: "rgba(109,180,232,0.3)",
              background: "rgba(109,180,232,0.06)",
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
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-3xl mb-3 text-center">📋</div>
            <h3 className="text-lg font-bold text-white mb-2 text-center">
              ¿Empezar una presentación nueva?
            </h3>
            <p className="text-slate-400 text-sm text-center mb-6 leading-relaxed">
              ¿Quieres guardar la presentación actual antes de empezar una nueva?
            </p>

            <div className="flex flex-col gap-3">
              {/* Guardar y empezar */}
              <button
                type="button"
                onClick={handleGuardarYNueva}
                className="w-full py-3 px-5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #F0A82A, #CC5C42)",
                  boxShadow: "0 4px 14px rgba(240,168,42,0.25)",
                }}
              >
                ⬇️ Guardar y empezar nueva
              </button>

              {/* Sin guardar */}
              <button
                type="button"
                onClick={handleNuevaSinGuardar}
                className="w-full py-3 px-5 rounded-xl text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                Empezar nueva sin guardar
              </button>

              {/* Cancelar */}
              <button
                type="button"
                onClick={() => setMostrarConfirmacion(false)}
                className="w-full py-2.5 px-5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors"
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
