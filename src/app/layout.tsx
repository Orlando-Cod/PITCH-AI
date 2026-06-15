import type { Metadata } from "next";
import { Geist, Nunito } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/ui/CookieBanner";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["900"],
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
    <html lang="es" className={`${geist.variable} ${nunito.variable} h-full`}>
      <body className="min-h-full antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
