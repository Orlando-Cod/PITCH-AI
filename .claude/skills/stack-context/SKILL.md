---
name: stack-context
description: Stack técnico del proyecto. Cargar antes de proponer librerías, servicios o patrones nuevos para no introducir tecnologías ajenas al proyecto.
triggers:
  - "qué librería"
  - "podríamos usar"
  - "instalar"
  - "agregar dependencia"
  - "nueva tecnología"
  - "qué opinas de usar"
---

# Stack de PITCH AI

## Core

- **Framework:** Next.js 15 (App Router, RSC por defecto)
- **Lenguaje:** TypeScript estricto — ningún `any` implícito; tipos propios en `src/types/index.ts`
- **Estilos:** Tailwind CSS v4 — clases utilitarias, NO CSS-in-JS, NO styled-components, NO módulos CSS
- **Componentes UI:** propios en `src/components/ui/` — NO instalar shadcn, Radix, MUI, Ant Design ni similares sin preguntar

## Backend / Datos

- **Base de datos:** Supabase (PostgreSQL) — cliente en `src/lib/supabase/`
- **ORM:** ninguno — se usa el cliente de Supabase directamente (`supabase.from(...)`)
- **Auth:** mock en Fase 1 (usuarios hardcodeados); Supabase Auth en Fase 2 — NO proponer Auth0, Clerk, NextAuth ni similares
- **API Routes:** Next.js App Router (`src/app/api/`) con runtime Node.js por defecto

## Servicios externos

- **Email transaccional:** Resend — helper en `src/lib/resend/` (o similar), clave `RESEND_API_KEY`
- **Hosting / Deploy:** Vercel — proyecto vinculado, variables de entorno gestionadas con `vercel env`
- **Imágenes dinámicas:** SVG generado en servidor via API route (`/api/exhibidor-image/[id]`)

## Generación de documentos (output principal)

- **PowerPoint (.pptx):** PptxGenJS — lógica en `src/lib/pptx/`
- **PDF:** Puppeteer (HTML → PDF) — Fase 2
- **HTML compartible:** export estático — Fase 3

## Datos

- **Fase 1 (actual):** datos mock en `src/lib/mock-data/` — productos, exhibidores, capacidades
- **Fase 2:** conexión a BD Maestra (Proyecto Ruth) y biblioteca de imágenes (Proyecto María)

## Variables de entorno

| Variable | Acceso | Descripción |
|----------|--------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Browser + Server | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser + Server | Clave anon pública |
| `SUPABASE_SECRET_KEY` | **Solo Server** — NUNCA `NEXT_PUBLIC_` | Clave service role |
| `RESEND_API_KEY` | **Solo Server** | Clave de Resend |

Siempre leer desde `process.env`. Las variables `NEXT_PUBLIC_*` son las únicas accesibles en el cliente.

---

# Reglas de arquitectura

1. **Server Components por defecto.** Usar `"use client"` solo cuando se necesiten eventos del DOM, hooks de estado/efecto, o APIs del navegador (localStorage, etc.).
2. **Imports absolutos con `@/`.** Nunca imports relativos con `../../`.
3. **NO proponer librerías nuevas sin preguntar primero.** Si una tarea se puede resolver con lo que ya está instalado, hacerlo así.
4. **Tailwind, no CSS custom.** Las clases utilitarias de Tailwind cubren el 99% de los casos; `globals.css` solo para estilos que Tailwind no puede expresar (e.g., `.prose-legal`).
5. **Paleta corporativa Sicoben:** Slate (`slate-700`, `slate-900`) · Blue (`blue-600`, `blue-700`) · Orange (`orange-500`, `orange-600`). No introducir colores fuera de esta paleta sin autorización.
6. **UI en español, código en inglés.** Textos visibles al usuario en español; nombres de variables, funciones y props en inglés.
