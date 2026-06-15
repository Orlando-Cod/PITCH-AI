import Link from "next/link";

const STATS = [
  { label: "Propuestas este mes", value: "—", accent: "#F0A82A" },
  { label: "Clientes activos",    value: "—", accent: "#6DB4E8" },
  { label: "Tiempo promedio",     value: "—", accent: "#8CC452" },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-end gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">Panel de propuestas</h1>
            <p className="text-slate-400 mt-1">Revisa el estado de tus propuestas o crea una nueva.</p>
          </div>
        </div>

        {/* CTA con gradiente de marca */}
        <Link
          href="/nueva-propuesta"
          className="block rounded-2xl p-6 mb-8 transition-all hover:scale-[1.01] overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a5f 50%, #92400e 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: "linear-gradient(135deg, #F0A82A22 0%, transparent 60%)" }}
          />
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20"
            style={{ background: "#F0A82A", transform: "translate(30%, -30%)" }} />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-white font-bold text-lg mb-1">Nueva Propuesta</div>
              <div className="text-blue-200 text-sm">Elige el exhibidor, selecciona productos y genera la presentación</div>
            </div>
            <div className="text-3xl text-white/80 font-light">→</div>
          </div>
        </Link>

        {/* Stats con accent de color */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 overflow-hidden relative"
              style={{ borderTopColor: s.accent, borderTopWidth: 2 }}
            >
              <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-slate-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Propuestas recientes */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Propuestas recientes</h2>
          <div className="text-center py-10 text-slate-600">
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl"
              style={{ background: "rgba(240,168,42,0.1)", border: "1px solid rgba(240,168,42,0.2)" }}>
              📋
            </div>
            <p className="text-sm text-slate-500">Aún no hay propuestas generadas.</p>
            <Link
              href="/nueva-propuesta"
              className="inline-block mt-4 text-sm font-medium transition-colors"
              style={{ color: "#F0A82A" }}
            >
              Crear primera propuesta →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
