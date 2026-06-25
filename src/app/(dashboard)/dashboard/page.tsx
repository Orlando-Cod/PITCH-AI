import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  // Stats del mes actual
  const now = new Date();
  const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [{ count: totalMes }, { data: recientes }] = await Promise.all([
    supabase
      .from("propuestas")
      .select("*", { count: "exact", head: true })
      .gte("created_at", inicioMes),
    supabase
      .from("propuestas")
      .select("id, cliente, pais, exhibidor_nombre, num_productos, descuento, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  // Clientes únicos
  const { data: clientesData } = await supabase
    .from("propuestas")
    .select("cliente");
  const clientesUnicos = new Set(clientesData?.map((c) => c.cliente) ?? []).size;

  const STATS = [
    { label: "Propuestas este mes", value: totalMes ?? 0, accent: "#FA4616" },
    { label: "Clientes atendidos", value: clientesUnicos, accent: "#00A9E0" },
    { label: "Total propuestas", value: clientesData?.length ?? 0, accent: "#84BD00" },
  ];

  function formatFecha(iso: string) {
    return new Date(iso).toLocaleDateString("es-NI", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-end gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de propuestas</h1>
            <p className="text-gray-500 mt-1">Revisa el estado de tus propuestas o crea una nueva.</p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/nueva-propuesta"
          className="block rounded-2xl p-6 mb-8 transition-all hover:scale-[1.01] overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #FA4616 0%, #E31C79 50%, #84329B 100%)" }}
        >
          <div className="absolute inset-0 opacity-15" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)" }} />
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: "#ffffff", transform: "translate(30%, -30%)" }} />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-white font-bold text-lg mb-1">Nueva Propuesta</div>
              <div className="text-white/70 text-sm">Elige el exhibidor, selecciona productos y genera la presentación</div>
            </div>
            <div className="text-3xl text-white/80 font-light">→</div>
          </div>
        </Link>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-100 rounded-xl p-5 overflow-hidden relative shadow-sm"
              style={{ borderTopColor: s.accent, borderTopWidth: 2 }}
            >
              <div className="text-2xl font-bold text-gray-900 mb-1">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Propuestas recientes */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Propuestas recientes</h2>
            <Link href="/historial" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Ver todas →
            </Link>
          </div>

          {!recientes || recientes.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <div
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl"
                style={{ background: "rgba(250,70,22,0.06)", border: "1px solid rgba(250,70,22,0.15)" }}
              >
                📋
              </div>
              <p className="text-sm text-gray-400">Aún no hay propuestas generadas.</p>
              <Link
                href="/nueva-propuesta"
                className="inline-block mt-4 text-sm font-medium transition-colors"
                style={{ color: "#FA4616" }}
              >
                Crear primera propuesta →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {recientes.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-lg">📋</div>
                  <div className="flex-1 min-w-0">
                    <span className="text-gray-800 text-sm font-medium truncate block">{p.cliente}</span>
                    <span className="text-gray-500 text-xs">
                      {p.exhibidor_nombre} · {p.num_productos} productos
                      {p.descuento > 0 ? ` · ${p.descuento}% dto.` : ""}
                    </span>
                  </div>
                  <span className="text-gray-400 text-xs shrink-0">{formatFecha(p.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
