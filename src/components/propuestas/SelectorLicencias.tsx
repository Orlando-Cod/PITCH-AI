"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { LICENCIAS, type Licencia } from "@/types";
import { PRODUCTOS } from "@/lib/mock-data/productos";

const CONFIG: Record<Licencia, { color: string; bg: string; border: string; logo: string }> = {
  "Disney":           { color: "#6DB4E8", bg: "rgba(109,180,232,0.12)", border: "rgba(109,180,232,0.35)", logo: "/licencias/disney.png" },
  "Mattel":           { color: "#D4518C", bg: "rgba(212,81,140,0.12)",  border: "rgba(212,81,140,0.35)",  logo: "/licencias/mattel.png" },
  "Hasbro":           { color: "#7C3FA0", bg: "rgba(124,63,160,0.12)",  border: "rgba(124,63,160,0.35)",  logo: "/licencias/hasbro.png" },
  "Universal":        { color: "#F0A82A", bg: "rgba(240,168,42,0.12)",  border: "rgba(240,168,42,0.35)",  logo: "/licencias/universal.png" },
  "Paramount":        { color: "#CC5C42", bg: "rgba(204,92,66,0.12)",   border: "rgba(204,92,66,0.35)",   logo: "/licencias/paramount.png" },
  "Bluey":            { color: "#4EA8AA", bg: "rgba(78,168,170,0.12)",  border: "rgba(78,168,170,0.35)",  logo: "/licencias/bluey.png" },
  "Sicoben Original": { color: "#8CC452", bg: "rgba(140,196,82,0.12)",  border: "rgba(140,196,82,0.35)",  logo: "/licencias/sicoben-original.png" },
};

interface Props {
  valor: Licencia[];
  onChange: (licencias: Licencia[]) => void;
}

function LogoLicencia({ src, alt, color }: { src: string; alt: string; color: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold shrink-0"
        style={{ background: `${color}22`, color }}
      >
        {alt[0]}
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-1.5 shrink-0">
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        className="object-contain w-full h-full"
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function SelectorLicencias({ valor, onChange }: Props) {
  const conteo = useMemo(() => {
    const counts: Partial<Record<Licencia, number>> = {};
    PRODUCTOS.forEach((p) => {
      if (p.stock > 0) {
        counts[p.licencia] = (counts[p.licencia] ?? 0) + 1;
      }
    });
    return counts;
  }, []);

  function toggle(lic: Licencia) {
    onChange(valor.includes(lic) ? valor.filter((l) => l !== lic) : [...valor, lic]);
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {LICENCIAS.map((lic) => {
          const cfg = CONFIG[lic];
          const count = conteo[lic] ?? 0;
          const activa = valor.includes(lic);
          const sinProductos = count === 0;

          return (
            <button
              key={lic}
              type="button"
              onClick={() => !sinProductos && toggle(lic)}
              disabled={sinProductos}
              className="relative text-left rounded-2xl border-2 p-4 transition-all duration-150"
              style={
                sinProductos
                  ? { borderColor: "#1e293b", background: "rgba(15,23,42,0.3)", opacity: 0.4, cursor: "not-allowed" }
                  : {
                      borderColor: activa ? cfg.color : "rgba(51,65,85,0.8)",
                      background: activa ? cfg.bg : "rgba(15,23,42,0.4)",
                      boxShadow: activa ? `0 0 20px ${cfg.bg}` : "none",
                    }
              }
            >
              {activa && (
                <div
                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: cfg.color }}
                >
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <LogoLicencia src={cfg.logo} alt={lic} color={cfg.color} />
                <p className="text-white font-semibold text-sm leading-tight">{lic}</p>
              </div>
              <p className="text-xs" style={{ color: count > 0 ? cfg.color : "#475569" }}>
                {count > 0 ? `${count} producto${count !== 1 ? "s" : ""} disponibles` : "Sin productos"}
              </p>

              {activa && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl"
                  style={{ background: cfg.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {valor.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 text-sm">Seleccionadas:</span>
            {valor.map((lic) => (
              <span
                key={lic}
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  color: CONFIG[lic].color,
                  background: CONFIG[lic].bg,
                  border: `1px solid ${CONFIG[lic].border}`,
                }}
              >
                {lic}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-slate-500 hover:text-slate-300 text-xs transition-colors ml-4 shrink-0"
          >
            Limpiar
          </button>
        </div>
      )}
    </div>
  );
}
