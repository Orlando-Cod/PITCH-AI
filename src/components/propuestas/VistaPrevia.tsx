"use client";

import { useState } from "react";
import type { Producto } from "@/types";
import type { Exhibidor } from "@/lib/data/exhibidores";
import type { FormParametrosData } from "./FormParametros";

interface Props {
  exhibidor: Exhibidor;
  productos: Producto[];
  parametros: Partial<FormParametrosData>;
}

export default function VistaPrevia({ exhibidor, productos, parametros }: Props) {
  const [generando, setGenerando] = useState(false);
  const [error, setError] = useState("");
  const [descargado, setDescargado] = useState(false);

  const caras = parametros.carasACotizar ?? 1;
  const espaciosPorCara = Math.floor(exhibidor.espacios / exhibidor.caras);
  const totalSlides = 3 + caras + 1;

  async function handleGenerar() {
    setGenerando(true);
    setError("");
    setDescargado(false);
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
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado");
    } finally {
      setGenerando(false);
    }
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
            Presentación descargada correctamente. Revisa tu carpeta de descargas.
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Botón generar */}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={handleGenerar}
          disabled={generando}
          className="bg-orange-500 hover:bg-orange-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold px-12 py-4 rounded-2xl text-base transition-colors shadow-lg shadow-orange-500/20 flex items-center gap-3"
        >
          {generando ? (
            <><span className="inline-block animate-spin">⏳</span> Generando presentación...</>
          ) : (
            <>⬇️ Generar y descargar PPT</>
          )}
        </button>
      </div>
    </div>
  );
}
