import Link from "next/link";

export default function FooterLegal() {
  return (
    <footer className="border-t border-slate-800/60 mt-auto">
      <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-slate-600 text-xs">
          © {new Date().getFullYear()} Sicoben Ediciones
        </p>
        <nav className="flex items-center gap-3">
          {[
            { href: "/privacidad", label: "Privacidad" },
            { href: "/terminos", label: "Términos" },
            { href: "/aviso-legal", label: "Aviso" },
            { href: "/cookies", label: "Cookies" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
              target="_blank"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
