"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoSicoben from "@/components/ui/LogoSicoben";
import FooterLegal from "@/components/ui/FooterLegal";

const LICENCIA_LOGOS = [
  { src: "/licencias/disney.png",           alt: "Disney" },
  { src: "/licencias/mattel.png",           alt: "Mattel" },
  { src: "/licencias/hasbro.png",           alt: "Hasbro" },
  { src: "/licencias/universal.png",        alt: "Universal" },
  { src: "/licencias/paramount.png",        alt: "Paramount" },
  { src: "/licencias/bluey.png",            alt: "Bluey" },
  { src: "/licencias/sicoben-original.png", alt: "Sicoben" },
];

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
        {/* Borde superior con gradiente de marca */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #D4518C, #7C3FA0, #6DB4E8, #4EA8AA, #F0A82A, #CC5C42, #8CC452)" }} />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(109,180,232,0.18)" }} />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(240,168,42,0.14)" }} />
          <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(212,81,140,0.12)" }} />
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(140,196,82,0.10)" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-800/60 rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-col gap-1">
          <LogoSicoben size="lg" />
          <span className="text-slate-500 text-sm tracking-widest uppercase font-medium pl-1">
            Ediciones
          </span>
        </div>

        <div className="relative">
          <p className="text-sm uppercase tracking-widest mb-4 font-semibold" style={{ color: "#F0A82A" }}>
            Herramienta de ventas
          </p>
          <h2 className="text-4xl font-bold text-white leading-snug mb-6">
            Genera propuestas
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">
              de display
            </span>
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-sm">
            Elige el exhibidor, selecciona los productos y ajusta precios —
            la presentación queda lista para enviarse al cliente.
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-3">
          {[
            { icon: "📝", label: "PowerPoint editable", accent: "#F0A82A" },
            { icon: "📄", label: "PDF para correo o WhatsApp", accent: "#6DB4E8" },
            { icon: "🔗", label: "Link compartible", accent: "#8CC452" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-slate-800/60 rounded-xl p-3 text-center border border-slate-700/40"
              style={{ borderTopColor: item.accent, borderTopWidth: 2 }}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="text-slate-300 text-xs font-medium">{item.label}</div>
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
            <LogoSicoben size="md" className="block mb-1" />
            <p className="text-slate-500 text-xs tracking-widest uppercase mt-1">Ediciones</p>
          </div>

          {/* Logos de licencias */}
          <div className="flex items-center justify-center gap-3 mb-5 flex-wrap">
            {LICENCIA_LOGOS.map((logo) => (
              <div
                key={logo.alt}
                className="w-14 h-14 flex items-center justify-center rounded-xl bg-white border border-white/20 p-2"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
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
              Credenciales de prueba
            </p>
            <div className="space-y-1 text-xs text-slate-400 font-mono">
              <p>ventas@sicoben.com · sicoben2026</p>
              <p>admin@sicoben.com · sicoben2026</p>
            </div>
          </div>

          <FooterLegal />
        </div>
      </div>
    </div>
  );
}
