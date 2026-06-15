"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LogoSicoben from "@/components/ui/LogoSicoben";
import FooterLegal from "@/components/ui/FooterLegal";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "⊞" },
  { href: "/nueva-propuesta", label: "Nueva Propuesta", icon: "＋", highlight: true },
  { href: "/historial", label: "Historial", icon: "◷" },
];

const EJECUTIVOS = [
  { nombre: "Joaquin Samudio",  iniciales: "JS", color: "#6DB4E8" },
  { nombre: "Omar Martinez",    iniciales: "OM", color: "#F0A82A" },
  { nombre: "Johnluis Lanz",    iniciales: "JL", color: "#8CC452" },
];

const CLIENTES: { nombre: string; tipo: "Retailer" | "Distribuidor" }[] = [
  { nombre: "Walmart Nicaragua",  tipo: "Retailer"     },
  { nombre: "La Colonia",         tipo: "Retailer"     },
  { nombre: "Librería Hispamer",  tipo: "Distribuidor" },
];

const FAVORITAS: { cliente: string; exhibidor: string; fecha: string }[] = [
  { cliente: "Walmart Nicaragua", exhibidor: "Exhibidor 96 espacios", fecha: "Jun 2026" },
  { cliente: "La Colonia",        exhibidor: "Exhibidor 48 espacios", fecha: "May 2026" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [ejecutivosAbierto, setEjecutivosAbierto] = useState(true);
  const [clientesAbierto, setClientesAbierto] = useState(false);
  const [favoritasAbierto, setFavoritasAbierto] = useState(false);

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0">
        <div
          className="h-1 shrink-0"
          style={{ background: "linear-gradient(90deg, #D4518C, #7C3FA0, #6DB4E8, #4EA8AA, #F0A82A, #CC5C42, #8CC452)" }}
        />

        <div className="h-16 flex flex-col items-start justify-center px-5 border-b border-slate-700">
          <LogoSicoben size="sm" />
          <span className="text-slate-600 text-xs tracking-widest uppercase leading-none mt-0.5">
            Ediciones
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-1 pt-4">
          {NAV_ITEMS.map((item) => {
            const activo = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 border-l-2 ${
                  activo
                    ? "bg-blue-600/15 text-white border-orange-500"
                    : item.highlight
                    ? "text-orange-400 border-transparent hover:text-orange-300 hover:bg-orange-500/10"
                    : "text-slate-400 border-transparent hover:text-white hover:bg-slate-800/70"
                }`}
              >
                <span className={`text-base ${activo ? "text-orange-400" : ""}`}>{item.icon}</span>
                {item.label}
                {item.highlight && !activo && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Ejecutivos de Ventas ── */}
        <div className="border-t border-slate-700">
          <button
            type="button"
            onClick={() => setEjecutivosAbierto((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
          >
            <span>Ejecutivos</span>
            <span className={`transition-transform duration-200 ${ejecutivosAbierto ? "rotate-180" : ""}`}>
              ▾
            </span>
          </button>
          {ejecutivosAbierto && (
            <div className="px-3 pb-3 space-y-1">
              {EJECUTIVOS.map((ej) => (
                <div key={ej.nombre} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-700/40 transition-colors">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: `${ej.color}22`, color: ej.color, border: `1px solid ${ej.color}44` }}
                  >
                    {ej.iniciales}
                  </div>
                  <span className="text-slate-300 text-xs truncate">{ej.nombre}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Clientes ── */}
        <div className="border-t border-slate-700">
          <button
            type="button"
            onClick={() => setClientesAbierto((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
          >
            <span>Clientes</span>
            <span className={`transition-transform duration-200 ${clientesAbierto ? "rotate-180" : ""}`}>
              ▾
            </span>
          </button>
          {clientesAbierto && (
            <div className="px-3 pb-3 space-y-1">
              {CLIENTES.map((cl) => (
                <div key={cl.nombre} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-700/40 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-0.5"
                    style={{ background: cl.tipo === "Retailer" ? "#6DB4E8" : "#F0A82A" }}
                  />
                  <div className="min-w-0">
                    <p className="text-slate-300 text-xs truncate">{cl.nombre}</p>
                    <p className="text-slate-600 text-[10px]">{cl.tipo}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Propuestas Favoritas ── */}
        <div className="border-t border-slate-700">
          <button
            type="button"
            onClick={() => setFavoritasAbierto((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <span style={{ color: "#F0A82A" }}>★</span> Favoritas
            </span>
            <span className={`transition-transform duration-200 ${favoritasAbierto ? "rotate-180" : ""}`}>
              ▾
            </span>
          </button>
          {favoritasAbierto && (
            <div className="px-3 pb-3 space-y-1">
              {FAVORITAS.length === 0 ? (
                <p className="text-slate-600 text-xs px-2 py-1">Sin favoritas aún.</p>
              ) : (
                FAVORITAS.map((fav, i) => (
                  <div key={i} className="flex items-start gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-700/40 transition-colors cursor-pointer group">
                    <span className="text-[10px] mt-0.5 shrink-0" style={{ color: "#F0A82A" }}>★</span>
                    <div className="min-w-0">
                      <p className="text-slate-300 text-xs truncate group-hover:text-white transition-colors">{fav.cliente}</p>
                      <p className="text-slate-600 text-[10px] truncate">{fav.exhibidor}</p>
                      <p className="text-slate-700 text-[10px]">{fav.fecha}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="p-3 border-t border-slate-700">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-300 transition-colors text-sm"
          >
            <span>↩</span> Cerrar Sesión
          </button>
        </div>

        <FooterLegal />
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
