import Link from "next/link";
import LogoSicoben from "@/components/ui/LogoSicoben";

const PAGINAS = [
  { href: "/privacidad", label: "Privacidad" },
  { href: "/terminos", label: "Términos" },
  { href: "/aviso-legal", label: "Aviso Legal" },
  { href: "/cookies", label: "Cookies" },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
          <Link href="/login" className="shrink-0">
            <LogoSicoben size="xs" />
          </Link>
          <nav className="flex items-center gap-1 overflow-x-auto">
            {PAGINAS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors whitespace-nowrap px-2 py-1 rounded-md hover:bg-slate-800"
              >
                {p.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Sicoben Ediciones. Uso interno exclusivo.
          </p>
          <nav className="flex items-center gap-4">
            {PAGINAS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
              >
                {p.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
