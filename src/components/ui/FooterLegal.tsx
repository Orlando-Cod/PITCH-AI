import Link from "next/link";

export default function FooterLegal() {
  return (
    <footer className="border-t border-gray-200 mt-auto">
      <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-gray-400 text-xs">
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
              className="text-xs text-gray-400 hover:text-[#00A9E0] transition-colors"
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
