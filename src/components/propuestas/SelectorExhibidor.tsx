"use client";

import { useState } from "react";
import { EXHIBIDORES, type Exhibidor } from "@/lib/data/exhibidores";

const COLORES = {
  blue: {
    border: "border-[#00A9E0]",
    bg: "bg-[#00A9E0]/6",
    badge: "bg-[#00A9E0]/12 text-[#007BAA]",
    tag: "bg-[#00A9E0]",
    check: "bg-[#00A9E0]",
    glow: "shadow-[#00A9E0]/15",
    text: "text-[#007BAA]",
    row: "bg-[#00A9E0]/8",
  },
  orange: {
    border: "border-[#FA4616]",
    bg: "bg-[#FA4616]/6",
    badge: "bg-[#FA4616]/12 text-[#C53510]",
    tag: "bg-[#FA4616]",
    check: "bg-[#FA4616]",
    glow: "shadow-[#FA4616]/15",
    text: "text-[#C53510]",
    row: "bg-[#FA4616]/8",
  },
  green: {
    border: "border-[#84BD00]",
    bg: "bg-[#84BD00]/6",
    badge: "bg-[#84BD00]/12 text-[#5A7F00]",
    tag: "bg-[#84BD00]",
    check: "bg-[#84BD00]",
    glow: "shadow-[#84BD00]/15",
    text: "text-[#5A7F00]",
    row: "bg-[#84BD00]/8",
  },
  purple: {
    border: "border-[#84329B]",
    bg: "bg-[#84329B]/6",
    badge: "bg-[#84329B]/12 text-[#6B2880]",
    tag: "bg-[#84329B]",
    check: "bg-[#84329B]",
    glow: "shadow-[#84329B]/15",
    text: "text-[#6B2880]",
    row: "bg-[#84329B]/8",
  },
  red: {
    border: "border-[#FA4616]",
    bg: "bg-[#FA4616]/6",
    badge: "bg-[#FA4616]/12 text-[#C53510]",
    tag: "bg-[#FA4616]",
    check: "bg-[#FA4616]",
    glow: "shadow-[#FA4616]/15",
    text: "text-[#C53510]",
    row: "bg-[#FA4616]/8",
  },
  teal: {
    border: "border-[#00A499]",
    bg: "bg-[#00A499]/6",
    badge: "bg-[#00A499]/12 text-[#007870]",
    tag: "bg-[#00A499]",
    check: "bg-[#00A499]",
    glow: "shadow-[#00A499]/15",
    text: "text-[#007870]",
    row: "bg-[#00A499]/8",
  },
  indigo: {
    border: "border-[#84329B]",
    bg: "bg-[#84329B]/6",
    badge: "bg-[#84329B]/12 text-[#6B2880]",
    tag: "bg-[#84329B]",
    check: "bg-[#84329B]",
    glow: "shadow-[#84329B]/15",
    text: "text-[#6B2880]",
    row: "bg-[#84329B]/8",
  },
  slate: {
    border: "border-gray-400",
    bg: "bg-gray-100",
    badge: "bg-gray-100 text-gray-600",
    tag: "bg-gray-500",
    check: "bg-gray-500",
    glow: "shadow-gray-300/20",
    text: "text-gray-600",
    row: "bg-gray-50",
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
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

              {/* Lámina técnica del exhibidor */}
              <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ex.imagen ?? `/api/exhibidor-image/${ex.id}`}
                  alt={ex.nombre}
                  className="w-full h-full object-contain object-center p-3"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-100/60 via-transparent to-transparent" />
              </div>

              {/* Contenido */}
              <div className="px-5 pt-4 pb-5 space-y-4">
                {/* Nombre y dimensiones */}
                <div>
                  <p className="text-gray-400 text-xs">{ex.subtitulo}</p>
                  <h3 className="text-gray-900 font-bold text-base mt-0.5">{ex.nombre}</h3>
                  <p className="text-gray-400 text-xs font-mono mt-0.5">{ex.dimensiones}</p>
                </div>

                {/* Tabla de capacidad por formato */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Unidades por espacio según formato
                  </p>
                  <div className="grid grid-cols-5 gap-1">
                    {/* Headers */}
                    {FORMATOS.map((f) => (
                      <div key={f.key} className="text-center text-gray-400 text-xs py-1">
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
                    <li key={feat} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="text-gray-300 mt-0.5 shrink-0">·</span>
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
          <div className="mt-5 bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-gray-500 text-sm">Seleccionado: </span>
              <span className="text-gray-900 font-semibold text-sm">{ex.nombre}</span>
              <span className="text-gray-400 text-sm"> · {ex.dimensiones}</span>
            </div>
            <button
              type="button"
              onClick={() => seleccionar("")}
              className="text-gray-400 hover:text-[#00A9E0] text-xs transition-colors"
            >
              Cambiar
            </button>
          </div>
        );
      })()}
    </div>
  );
}
