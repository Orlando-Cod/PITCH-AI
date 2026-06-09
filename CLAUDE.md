# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

**PITCH AI** — Herramienta interna de Sicoben Ediciones para generar propuestas comerciales de displays de libros infantiles automáticamente. Reemplaza la creación manual de presentaciones en PowerPoint que toma 3-4 horas por propuesta.

Lee @DOCS/MASTERPLAN.md antes de cualquier implementación. Es el documento de referencia principal.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Estilos:** Tailwind CSS
- **Base de datos / Auth:** Supabase (PostgreSQL)
- **Generación PPT:** PptxGenJS
- **Generación PDF:** Puppeteer (HTML → PDF)
- **Idioma de la UI:** Español

## Comandos

```bash
npm run dev       # Servidor de desarrollo en localhost:3000
npm run build     # Build de producción
npm run lint      # ESLint
npx tsc --noEmit  # Type-check sin compilar
```

Para correr un solo test de archivo específico:
```bash
npm test -- --testPathPattern=<archivo>
```

## Code Style

- Componentes en `PascalCase`, archivos en `kebab-case`
- Imports absolutos con `@/` (ej: `@/components/ui/Button`)
- Español para textos de UI, inglés para nombres de variables y funciones
- No usar `any` en TypeScript — usar tipos propios en `@/types`

## Arquitectura

```
app/
  (auth)/login/         # Única puerta de entrada — no hay landing pública
  (dashboard)/
    nueva-propuesta/    # Formulario de parámetros + motor de filtrado
    historial/          # Propuestas guardadas por cliente
    admin/              # Panel de administración
  page.tsx              # Redirige a /login
components/
  ui/                   # Componentes genéricos reutilizables
  propuestas/           # Componentes específicos del dominio
lib/
  supabase/             # Cliente y helpers de Supabase
  mock-data/            # Datos simulados hasta que Proyectos Ruth y María estén listos
  pptx/                 # Lógica de generación de presentaciones
types/                  # Tipos TypeScript del dominio (Propuesta, Producto, Display, etc.)
```

## Reglas de dominio importantes

- **Datos mock obligatorios en Fase 1:** Proyectos Ruth (BD Maestra) y María (imágenes) no están disponibles todavía. Toda la lógica de productos debe usar datos en `lib/mock-data/` que replican la estructura real esperada.
- **Estructura de slides fija:** Portada → Separador display → Ficha técnica → Planograma por caras → Listado de precios. No alterar este orden.
- **Capacidad por bandeja varía por tipo de libro:** libros de 24 páginas caben más unidades por espacio que libros de 80 páginas. Esta lógica vive en `lib/display-config.ts`.
- **Multi-país:** Nicaragua, Panamá, Centroamérica. Precios diferenciados por mercado en Fase 2.

## Paleta de colores (Sicoben corporativo)

- Primary: Slate (`slate-700`, `slate-900`)
- Accent: Blue (`blue-600`, `blue-700`)
- Highlight: Orange (`orange-500`, `orange-600`)
- Fondo secciones: bokeh suave relacionado a libros

## Ramas Git

Este proyecto tiene exactamente **dos ramas**. Nunca crear otras sin instrucción explícita del usuario.

| Rama | Propósito | Alias que el usuario puede usar |
|------|-----------|---------------------------------|
| `main` | Producción — lo que los usuarios ven online | "producción", "prod", "main", "online", "la web", "publicar", "subir a producción", "lo que los usuarios van a ver" |
| `staging` | Desarrollo — donde se prueban los cambios | "desarrollo", "development", "dev", "staging", "ambiente de prueba", "entorno de pruebas" |

**Reglas:**
- Todos los commits van en `staging` por defecto.
- Solo se mergea `staging → main` cuando el usuario pide publicar o subir a producción.
- Si el usuario pide crear una rama para una funcionalidad concreta, crearla a partir de `staging` — no de `main`.

## Workflow

- Antes de implementar una funcionalidad, revisar si existen patrones similares en `components/` o `lib/`
- Al generar propuestas: validar siempre que los productos tengan stock > 0 antes de incluirlos
- IMPORTANT: Las exportaciones PPT/PDF/HTML son el output principal — cualquier cambio en la estructura de slides requiere validar los tres formatos
