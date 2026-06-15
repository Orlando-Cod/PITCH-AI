"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoSicoben from "@/components/ui/LogoSicoben";
import FooterLegal from "@/components/ui/FooterLegal";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "⊞" },
  { href: "/nueva-propuesta", label: "Nueva Propuesta", icon: "＋", highlight: true },
  { href: "/historial", label: "Historial", icon: "◷" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        {/* Barra de color de marca en la parte superior */}
        <div
          className="h-1 shrink-0"
          style={{ background: "linear-gradient(90deg, #D4518C, #7C3FA0, #6DB4E8, #4EA8AA, #F0A82A, #CC5C42, #8CC452)" }}
        />

        <div className="h-16 flex flex-col items-start justify-center px-5 border-b border-slate-800">
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

        <div className="p-3 border-t border-slate-800">
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-300 transition-colors text-sm"
          >
            <span>↩</span> Cerrar Sesión
          </Link>
        </div>

        <FooterLegal />
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
