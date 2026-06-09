"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Credenciales mock para Fase 1 (sin Supabase aún)
const MOCK_USERS = [
  { email: "admin@sicoben.com", password: "sicoben2026", nombre: "Administrador" },
  { email: "ventas@sicoben.com", password: "sicoben2026", nombre: "Ejecutivo de Ventas" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const user = MOCK_USERS.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password
    );

    setTimeout(() => {
      if (user) {
        router.push("/dashboard");
      } else {
        setError("Correo o contraseña incorrectos.");
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* ── Panel izquierdo — branding ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-800/60 rounded-full blur-3xl" />
        </div>

        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center font-bold text-white">
            P
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            PITCH <span className="text-orange-400">AI</span>
          </span>
          <span className="text-slate-500 text-sm">· Sicoben Ediciones</span>
        </div>

        <div className="relative">
          <p className="text-slate-400 text-sm uppercase tracking-widest mb-4 font-medium">
            Herramienta de ventas
          </p>
          <h2 className="text-4xl font-bold text-white leading-snug mb-6">
            Genera propuestas
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">
              en minutos
            </span>
          </h2>
          <p className="text-slate-400 leading-relaxed max-w-sm">
            Configura el display, elige la colección y precio objetivo — el
            sistema selecciona los productos disponibles y construye la
            presentación lista para compartir con tu cliente.
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-3">
          {[
            { icon: "📝", label: "PowerPoint editable" },
            { icon: "📄", label: "PDF para enviar" },
            { icon: "🔗", label: "Link HTML" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center"
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="text-slate-400 text-xs">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Panel derecho — formulario ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="lg:hidden fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-sm">
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center font-bold text-xl mx-auto mb-3">
              P
            </div>
            <h1 className="text-xl font-bold text-white">
              PITCH <span className="text-orange-400">AI</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Sicoben Ediciones</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div className="mb-7">
              <h2 className="text-xl font-bold text-white">Bienvenido</h2>
              <p className="text-slate-500 text-sm mt-1">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@sicoben.com"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-900/20 border border-red-800/40 rounded-lg px-4 py-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors"
              >
                {loading ? "Entrando..." : "Iniciar sesión"}
              </button>
            </form>
          </div>

          {/* Credenciales de prueba visibles en Fase 1 */}
          <div className="mt-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wider">
              Acceso de prueba (Fase 1)
            </p>
            <div className="space-y-1 text-xs text-slate-400 font-mono">
              <p>ventas@sicoben.com · sicoben2026</p>
              <p>admin@sicoben.com · sicoben2026</p>
            </div>
          </div>

          <p className="text-center text-slate-600 text-xs mt-4">
            Uso interno exclusivo — Sicoben Ediciones © 2026
          </p>
        </div>
      </div>
    </div>
  );
}
