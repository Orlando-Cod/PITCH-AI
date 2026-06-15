import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";

interface Propuesta {
  id: string;
  cliente: string;
  pais: string;
  tipo_cliente: string;
  exhibidor_nombre: string;
  num_productos: number;
  num_caras: number;
  descuento: number;
  licencias: string[];
  created_at: string;
}

function formatFecha(iso: string) {
  return new Date(iso).toLocaleDateString("es-NI", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function HistorialPage() {
  const supabase = await createSupabaseServerClient();
  const { data: propuestas, error } = await supabase
    .from("propuestas")
    .select("id, cliente, pais, tipo_cliente, exhibidor_nombre, num_productos, num_caras, descuento, licencias, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Historial de Propuestas</h1>
            <p className="text-slate-400 mt-1 text-sm">
              Todas las propuestas generadas, ordenadas por fecha.
            </p>
          </div>
          <Link
            href="/nueva-propuesta"
            className="text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-colors"
            style={{ background: "linear-gradient(135deg, #F0A82A, #CC5C42)" }}
          >
            + Nueva propuesta
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-300 text-sm">
              Error cargando el historial. Asegúrate de que la tabla `propuestas` existe en Supabase.
            </p>
          </div>
        )}

        {!error && (!propuestas || propuestas.length === 0) && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center py-16">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-white font-semibold text-lg mb-2">
              Aún no hay propuestas
            </h2>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
              Cada vez que generes un PPT, quedará registrado aquí con cliente, fecha y detalles.
            </p>
            <Link
              href="/nueva-propuesta"
              className="inline-block text-sm font-semibold px-6 py-2.5 rounded-xl text-white"
              style={{ background: "linear-gradient(135deg, #F0A82A, #CC5C42)" }}
            >
              Crear primera propuesta →
            </Link>
          </div>
        )}

        {propuestas && propuestas.length > 0 && (
          <div className="space-y-3">
            {(propuestas as Propuesta[]).map((p) => (
              <div
                key={p.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-5 hover:border-slate-700 transition-colors"
              >
                {/* Ícono */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: "rgba(240,168,42,0.12)", border: "1px solid rgba(240,168,42,0.25)" }}
                >
                  📋
                </div>

                {/* Info principal */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-semibold truncate">{p.cliente}</p>
                    {p.pais && (
                      <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full shrink-0">
                        {p.pais}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mt-0.5">
                    {p.exhibidor_nombre} · {p.num_productos} producto{p.num_productos !== 1 ? "s" : ""} · {p.num_caras} cara{p.num_caras !== 1 ? "s" : ""}
                    {p.descuento > 0 && ` · ${p.descuento}% dto.`}
                  </p>
                  {p.licencias && p.licencias.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-1.5">
                      {p.licencias.map((lic) => (
                        <span
                          key={lic}
                          className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                        >
                          {lic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fecha */}
                <div className="text-right shrink-0">
                  <p className="text-slate-500 text-xs">{formatFecha(p.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
