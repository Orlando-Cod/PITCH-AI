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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: "Error desconocido" }));
      setError(body.error ?? "Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Panel izquierdo — branding ── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FA4616 0%, #E31C79 45%, #84329B 100%)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "rgba(255,255,255,0.3)" }} />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(0,169,224,0.15)" }} />
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>

        <div className="relative flex flex-col gap-1">
          <LogoSicoben size="lg" variant="white" />
          <span className="text-white/80 text-sm tracking-widest uppercase font-semibold pl-1">
            Ediciones
          </span>
        </div>

        <div className="relative">
          <p className="text-sm uppercase tracking-widest mb-4 font-semibold text-white/80">
            Herramienta de ventas
          </p>
          <h2 className="text-4xl font-bold text-white leading-snug mb-6">
            Genera propuestas
            <br />
            <span className="text-white/80 font-extrabold">
              de display
            </span>
          </h2>
          <p className="text-white/70 leading-relaxed max-w-sm">
            Elige el exhibidor, selecciona los productos y ajusta precios —
            la presentación queda lista para enviarse al cliente.
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-3">
          {[
            { icon: "📝", label: "PowerPoint editable", accent: "rgba(255,255,255,0.6)" },
            { icon: "📄", label: "PDF para correo o WhatsApp", accent: "rgba(255,255,255,0.6)" },
            { icon: "🔗", label: "Link compartible", accent: "rgba(255,255,255,0.6)" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/10 rounded-xl p-3 text-center border border-white/20"
              style={{ borderTopColor: "rgba(255,255,255,0.5)", borderTopWidth: 2 }}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="text-white/80 text-xs font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Panel derecho — formulario ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="lg:hidden fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(250,70,22,0.06)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(0,169,224,0.06)" }} />
        </div>

        <div className="relative w-full max-w-sm">
          <div className="lg:hidden text-center mb-8">
            <LogoSicoben size="md" className="block mb-1" />
            <p className="text-gray-400 text-xs tracking-widest uppercase mt-1">Ediciones</p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-5 flex-wrap">
            {LICENCIA_LOGOS.map((logo) => (
              <div
                key={logo.alt}
                className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 p-2"
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

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="mb-7">
              <h2 className="text-xl font-bold text-gray-900">Bienvenido</h2>
              <p className="text-gray-500 text-sm mt-1">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@sicoben.com"
                  required
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[#1A1A2E] placeholder-gray-400 text-sm focus:outline-none focus:border-[#FA4616] focus:ring-2 focus:ring-[#FA4616]/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[#1A1A2E] placeholder-gray-400 text-sm focus:outline-none focus:border-[#FA4616] focus:ring-2 focus:ring-[#FA4616]/10 transition-all"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full font-semibold py-2.5 rounded-lg transition-colors text-white disabled:cursor-not-allowed"
                style={{
                  background: loading ? "#D1D5DB" : "#FA4616",
                  color: loading ? "#9CA3AF" : "#ffffff",
                }}
                onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#E03D13"; }}
                onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#FA4616"; }}
              >
                {loading ? "Entrando..." : "Iniciar sesión"}
              </button>
            </form>
          </div>

          <FooterLegal />
        </div>
      </div>
    </div>
  );
}
