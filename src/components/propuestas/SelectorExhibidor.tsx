"use client";

import { useState } from "react";
import { EXHIBIDORES, type Exhibidor } from "@/lib/data/exhibidores";

// ── Ilustraciones SVG de cada tipo de exhibidor ──────────────────────────────

function IlustracionMetalico9() {
  return (
    <svg viewBox="0 0 80 140" className="w-full h-full" fill="none">
      {/* Estructura vertical */}
      <rect x="36" y="4" width="8" height="132" rx="2" fill="#64748b" />
      {/* Bandejas — 9 espacios */}
      {[12, 24, 36, 48, 60, 72, 84, 96, 108].map((y, i) => (
        <g key={i}>
          <rect x="12" y={y} width="56" height="10" rx="1.5" fill="#475569" />
          <rect x="14" y={y + 1} width="52" height="7" rx="1" fill="#38bdf8" opacity="0.5" />
        </g>
      ))}
      {/* Base */}
      <rect x="20" y="132" width="40" height="4" rx="2" fill="#475569" />
      {/* Cabezal */}
      <rect x="18" y="2" width="44" height="8" rx="2" fill="#0ea5e9" />
      <text x="40" y="8" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">sicoben</text>
    </svg>
  );
}

function IlustracionMetalico16() {
  return (
    <svg viewBox="0 0 120 140" className="w-full h-full" fill="none">
      {/* Poste central */}
      <rect x="57" y="10" width="6" height="110" rx="2" fill="#64748b" />
      {/* Cabezal circular */}
      <ellipse cx="60" cy="10" rx="18" ry="8" fill="#0ea5e9" />
      <text x="60" y="12" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">sicoben</text>
      {/* Cara 1 — izquierda */}
      <rect x="8" y="25" width="46" height="8" rx="1.5" fill="#475569" />
      <rect x="8" y="40" width="46" height="8" rx="1.5" fill="#475569" />
      <rect x="8" y="55" width="46" height="8" rx="1.5" fill="#475569" />
      <rect x="8" y="70" width="46" height="8" rx="1.5" fill="#475569" />
      {/* Libros cara 1 */}
      {[25, 40, 55, 70].map((y, i) => (
        <rect key={i} x="10" y={y + 1} width="42" height="6" rx="1" fill="#fb923c" opacity="0.5" />
      ))}
      {/* Cara 2 — derecha */}
      <rect x="66" y="25" width="46" height="8" rx="1.5" fill="#475569" />
      <rect x="66" y="40" width="46" height="8" rx="1.5" fill="#475569" />
      <rect x="66" y="55" width="46" height="8" rx="1.5" fill="#475569" />
      <rect x="66" y="70" width="46" height="8" rx="1.5" fill="#475569" />
      {[25, 40, 55, 70].map((y, i) => (
        <rect key={i} x="68" y={y + 1} width="42" height="6" rx="1" fill="#fb923c" opacity="0.5" />
      ))}
      {/* Base en cruz */}
      <rect x="30" y="120" width="60" height="6" rx="3" fill="#475569" />
      <rect x="52" y="110" width="16" height="16" rx="3" fill="#475569" />
      {/* Ruedas */}
      <circle cx="34" cy="128" r="4" fill="#334155" />
      <circle cx="86" cy="128" r="4" fill="#334155" />
      {/* Indicador giratorio */}
      <path d="M 48 90 Q 60 82 72 90" stroke="#fb923c" strokeWidth="2" fill="none" strokeDasharray="3,2" />
      <polygon points="72,87 72,93 76,90" fill="#fb923c" />
    </svg>
  );
}

function IlustracionCarton8() {
  return (
    <svg viewBox="0 0 100 140" className="w-full h-full" fill="none">
      {/* Cuerpo principal con ligera inclinación */}
      <rect x="10" y="10" width="80" height="120" rx="3" fill="#475569" />
      {/* Diseño impreso lateral */}
      <rect x="10" y="10" width="12" height="120" rx="3" fill="#f97316" />
      {/* Cabezal Sicoben */}
      <rect x="10" y="10" width="80" height="14" rx="3" fill="#0ea5e9" />
      <text x="50" y="20" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">sicoben</text>
      {/* 8 espacios en 2 columnas × 4 filas */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1].map((col) => (
          <g key={`${row}-${col}`}>
            <rect
              x={26 + col * 36}
              y={30 + row * 26}
              width="30"
              height="20"
              rx="2"
              fill="#334155"
            />
            <rect
              x={28 + col * 36}
              y={32 + row * 26}
              width="26"
              height="16"
              rx="1.5"
              fill="#22d3ee"
              opacity="0.4"
            />
          </g>
        ))
      )}
      {/* Base */}
      <rect x="5" y="128" width="90" height="6" rx="2" fill="#334155" />
    </svg>
  );
}

function IlustracionExhibidor({ tipo }: { tipo: Exhibidor["tipo"] }) {
  if (tipo === "metalico") return <IlustracionMetalico9 />;
  if (tipo === "metalico-giratorio") return <IlustracionMetalico16 />;
  return <IlustracionCarton8 />;
}

// ── Colores de acento por exhibidor ──────────────────────────────────────────

const COLORES = {
  blue: {
    border: "border-blue-500",
    bg: "bg-blue-500/10",
    badge: "bg-blue-500/20 text-blue-300",
    tag: "bg-blue-600",
    check: "bg-blue-500",
    glow: "shadow-blue-500/20",
  },
  orange: {
    border: "border-orange-500",
    bg: "bg-orange-500/10",
    badge: "bg-orange-500/20 text-orange-300",
    tag: "bg-orange-500",
    check: "bg-orange-500",
    glow: "shadow-orange-500/20",
  },
  green: {
    border: "border-emerald-500",
    bg: "bg-emerald-500/10",
    badge: "bg-emerald-500/20 text-emerald-300",
    tag: "bg-emerald-600",
    check: "bg-emerald-500",
    glow: "shadow-emerald-500/20",
  },
} as const;

// ── Componente principal ──────────────────────────────────────────────────────

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
              className={`relative text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden group
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

              {/* Tag de espacios */}
              <div className={`absolute top-3 left-3 ${c.tag} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                {ex.espacios} espacios
              </div>

              {/* Ilustración */}
              <div className="flex items-end justify-center h-44 pt-10 pb-4 px-6">
                <IlustracionExhibidor tipo={ex.tipo} />
              </div>

              {/* Contenido */}
              <div className="px-5 pb-5">
                <p className="text-slate-400 text-xs mb-0.5">{ex.subtitulo}</p>
                <h3 className="text-white font-bold text-base mb-1">{ex.nombre}</h3>
                <p className="text-slate-500 text-xs mb-3 font-mono">{ex.dimensiones}</p>

                <p className="text-slate-400 text-xs leading-relaxed mb-4">{ex.descripcion}</p>

                {/* Características */}
                <ul className="space-y-1.5">
                  {ex.caracteristicas.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-slate-600 mt-0.5 shrink-0">•</span>
                      {c}
                    </li>
                  ))}
                </ul>

                {/* Fila de caras */}
                {ex.caras > 1 && (
                  <div className={`mt-4 ${COLORES[ex.color as keyof typeof COLORES].badge} rounded-lg px-3 py-1.5 text-xs font-medium text-center`}>
                    {ex.caras} caras · {ex.espacios / ex.caras} espacios por cara
                  </div>
                )}
              </div>

              {/* Indicador de selección bottom */}
              {activo && (
                <div className={`h-1 w-full ${c.tag} mt-auto`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Info de selección */}
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
