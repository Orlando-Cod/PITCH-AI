import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/ui/CookieBanner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PITCH AI — Sicoben Ediciones",
  description:
    "Genera propuestas comerciales de displays de libros en minutos, no en horas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${nunito.variable} h-full`}>
      <body className="min-h-full antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
