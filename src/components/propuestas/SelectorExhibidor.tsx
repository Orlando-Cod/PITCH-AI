"use client";

import Image from "next/image";
import { useState } from "react";
import { EXHIBIDORES, type Exhibidor } from "@/lib/data/exhibidores";

const COLORES = {
  blue: {
    border: "border-blue-500",
    bg: "bg-blue-500/10",
    badge: "bg-blue-500/20 text-blue-300",
    tag: "bg-blue-600",
    check: "bg-blue-500",
    glow: "shadow-blue-500/20",
    text: "text-blue-400",
    row: "bg-blue-500/10",
  },
  orange: {
    border: "border-orange-500",
    bg: "bg-orange-500/10",
    badge: "bg-orange-500/20 text-orange-300",
    tag: "bg-orange-500",
    check: "bg-orange-500",
    glow: "shadow-orange-500/20",
    text: "text-orange-400",
    row: "bg-orange-500/10",
  },
  green: {
    border: "border-emerald-500",
    bg: "bg-emerald-500/10",
    badge: "bg-emerald-500/20 text-emerald-300",
    tag: "bg-emerald-600",
    check: "bg-emerald-500",
    glow: "shadow-emerald-500/20",
    text: "text-emerald-400",
    row: "bg-emerald-500/10",
  },
} as const;

const FORMATOS: { key: keyof Exhibidor["capacidadPorEspacio"]; label: string }[] = [
  { key: "16p", label: "16 pág" },
  { key: "24p", label: "24 pág" },
  { key: "48p", label: "48 pág" },
  { key: "80p", label: "80 pág" },
  { key: "96p", label: "96 pág" },
];

interface Props {
  valor?: string;
  onChange?: (id: string) => void;
}

export default function SelectorExhibidor({ valor, onChange }: Props) {
  const [seleccionado, setSeleccionado] = useState<string>(valor ?? "");

  function seleccionar(id: string) {
    setSeleccionado(id);
    onChange?.(id);
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {EXHIBIDORES.map((ex) => {
          const activo = seleccionado === ex.id;
          const c = COLORES[ex.color as keyof typeof COLORES];

          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => seleccionar(ex.id)}
              className={`relative text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden
                ${activo
                  ? `${c.border} ${c.bg} shadow-xl ${c.glow}`
                  : "border-slate-700 bg-slate-800/40 hover:border-slate-500 hover:bg-slate-800/70"
                }`}
            >
              {/* Check de selección */}
              {activo && (
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full ${c.check} flex items-center justify-center z-10`}>
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Badge de espacios */}
              <div className={`absolute top-3 left-3 ${c.tag} text-white text-xs font-bold px-2 py-0.5 rounded-full z-10`}>
                {ex.espacios} espacios
              </div>

              {/* Foto real del exhibidor */}
              <div className="relative w-full h-52 bg-slate-900 overflow-hidden">
                <Image
                  src={`/exhibidores/${ex.id}.png`}
                  alt={ex.nombre}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              </div>

              {/* Contenido */}
              <div className="px-5 pt-4 pb-5 space-y-4">
                {/* Nombre y dimensiones */}
                <div>
                  <p className="text-slate-400 text-xs">{ex.subtitulo}</p>
                  <h3 className="text-white font-bold text-base mt-0.5">{ex.nombre}</h3>
                  <p className="text-slate-500 text-xs font-mono mt-0.5">{ex.dimensiones}</p>
                </div>

                {/* Tabla de capacidad por formato */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Unidades por espacio según formato
                  </p>
                  <div className="grid grid-cols-5 gap-1">
                    {/* Headers */}
                    {FORMATOS.map((f) => (
                      <div key={f.key} className="text-center text-slate-600 text-xs py-1">
                        {f.label}
                      </div>
                    ))}
                    {/* Valores */}
                    {FORMATOS.map((f) => (
                      <div
                        key={f.key}
                        className={`text-center font-bold text-sm py-1.5 rounded-lg ${c.row} ${c.text}`}
                      >
                        {ex.capacidadPorEspacio[f.key]}u
                      </div>
                    ))}
                  </div>
                </div>

                {/* Características */}
                <ul className="space-y-1">
                  {ex.caracteristicas.slice(0, 3).map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-slate-600 mt-0.5 shrink-0">·</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Caras disponibles */}
                {ex.caras > 1 && (
                  <div className={`${c.badge} rounded-lg px-3 py-1.5 text-xs font-medium text-center`}>
                    {ex.caras} caras · {ex.espacios / ex.caras} espacios por cara
                  </div>
                )}
              </div>

              {/* Barra inferior de selección */}
              {activo && <div className={`h-1 w-full ${c.tag}`} />}
            </button>
          );
        })}
      </div>

      {/* Confirmación de selección */}
      {seleccionado && (() => {
        const ex = EXHIBIDORES.find((e) => e.id === seleccionado)!;
        return (
          <div className="mt-5 bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-sm">Seleccionado: </span>
              <span className="text-white font-semibold text-sm">{ex.nombre}</span>
              <span className="text-slate-500 text-sm"> · {ex.dimensiones}</span>
            </div>
            <button
              type="button"
              onClick={() => seleccionar("")}
              className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
            >
              Cambiar
            </button>
          </div>
        );
      })()}
    </div>
  );
}
