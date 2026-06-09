import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Bienvenido, Ejecutivo</h1>
          <p className="text-slate-400 mt-1">¿Qué propuesta generamos hoy?</p>
        </div>

        {/* Quick action */}
        <Link
          href="/nueva-propuesta"
          className="block bg-blue-600 hover:bg-blue-500 rounded-2xl p-6 mb-8 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold text-lg mb-1">
                Nueva Propuesta
              </div>
              <div className="text-blue-200 text-sm">
                Genera una propuesta comercial en menos de 10 minutos
              </div>
            </div>
            <div className="text-4xl">→</div>
          </div>
        </Link>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Propuestas este mes", value: "—" },
            { label: "Clientes activos", value: "—" },
            { label: "Tiempo promedio", value: "—" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5"
            >
              <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-slate-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Recent proposals placeholder */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Propuestas recientes</h2>
          <div className="text-center py-10 text-slate-600">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-sm">Aún no hay propuestas generadas.</p>
            <Link
              href="/nueva-propuesta"
              className="inline-block mt-4 text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Crear primera propuesta →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
