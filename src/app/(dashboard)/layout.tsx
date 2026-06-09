import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center font-bold text-xs text-white">
            P
          </div>
          <span className="font-semibold text-white text-sm">
            PITCH <span className="text-orange-400">AI</span>
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {[
            { href: "/dashboard", label: "Dashboard", icon: "◻" },
            { href: "/nueva-propuesta", label: "Nueva Propuesta", icon: "+" },
            { href: "/historial", label: "Historial", icon: "↺" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm"
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-300 transition-colors text-sm"
          >
            <span>↩</span> Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
