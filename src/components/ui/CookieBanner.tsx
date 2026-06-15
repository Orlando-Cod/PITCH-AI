"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "sicoben-cookie-consent";

type ConsentData = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
};

function saveConsent(analytics: boolean, marketing: boolean) {
  const data: ConsentData = {
    essential: true,
    analytics,
    marketing,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useCookieConsent(): ConsentData | null {
  const stored =
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  if (!stored) return null;
  try {
    return JSON.parse(stored) as ConsentData;
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  if (!visible) return null;

  function acceptAll() {
    saveConsent(true, true);
    setVisible(false);
  }

  function rejectAll() {
    saveConsent(false, false);
    setVisible(false);
  }

  function saveCustom() {
    saveConsent(analytics, marketing);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Preferencias de cookies"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
    >
      <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
        {/* Panel de personalización — se expande encima del mensaje principal */}
        {customizing && (
          <div className="border-b border-slate-800 p-5 space-y-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Personaliza tus preferencias
            </p>

            {/* Esenciales — bloqueadas */}
            <ToggleRow
              label="Cookies esenciales"
              description="Necesarias para que el sistema funcione: sesión de usuario y seguridad. No se pueden desactivar."
              checked={true}
              locked
              onChange={() => {}}
            />

            {/* Analítica */}
            <ToggleRow
              label="Cookies de analítica"
              description="Nos ayudan a entender cómo se usa la plataforma para mejorarla (páginas visitadas, tiempo en pantalla)."
              checked={analytics}
              onChange={setAnalytics}
            />

            {/* Marketing */}
            <ToggleRow
              label="Cookies de marketing"
              description="Permiten personalizar contenido y comunicaciones comerciales según tu actividad en la plataforma."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        )}

        {/* Mensaje + acciones */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-sm text-slate-400 flex-1 leading-relaxed">
            Usamos cookies para mantener tu sesión activa y mejorar tu experiencia.{" "}
            <Link href="/cookies" className="text-slate-300 underline underline-offset-2 hover:text-white transition-colors" target="_blank">
              Política de cookies
            </Link>{" "}
            ·{" "}
            <Link href="/privacidad" className="text-slate-300 underline underline-offset-2 hover:text-white transition-colors" target="_blank">
              Privacidad
            </Link>
          </p>

          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
            {/* Rechazar — igual de prominente que Aceptar (GDPR) */}
            <button
              onClick={rejectAll}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 transition-all"
            >
              Rechazar todo
            </button>

            <button
              onClick={() => setCustomizing((v) => !v)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 transition-all"
            >
              {customizing ? "Ocultar" : "Personalizar"}
            </button>

            {customizing ? (
              <button
                onClick={saveCustom}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                Guardar preferencias
              </button>
            ) : (
              <button
                onClick={acceptAll}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                Aceptar todo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Toggle row helper ────────────────────────────────── */
function ToggleRow({
  label,
  description,
  checked,
  locked = false,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-300">
          {label}
          {locked && (
            <span className="ml-2 text-xs text-slate-600 font-normal">
              Siempre activas
            </span>
          )}
        </p>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={locked}
        onClick={() => !locked && onChange(!checked)}
        className={[
          "mt-0.5 relative shrink-0 w-10 h-6 rounded-full transition-colors duration-200",
          locked
            ? "bg-slate-700 cursor-not-allowed"
            : checked
            ? "bg-blue-600 cursor-pointer"
            : "bg-slate-700 cursor-pointer hover:bg-slate-600",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
            checked ? "translate-x-5" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}
