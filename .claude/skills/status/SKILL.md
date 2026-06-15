---
description: Muestra un resumen rápido del estado del proyecto — rama actual, cambios pendientes, TypeScript, variables de entorno y servidor. Activar cuando el usuario diga "cómo está el proyecto", "status", "qué falta", "revisa todo", "estado del proyecto", "dónde estamos".
name: Estado del proyecto
---

# Skill: Estado del proyecto

Genera un diagnóstico rápido del estado actual de PITCH AI. Ejecuta estos checks en orden y presenta un resumen claro.

## Checks a ejecutar

### 1. Rama y git
```bash
git branch --show-current
git status --short
git log --oneline -3
```

Verificar:
- ¿Estás en `staging`? (debería ser siempre así)
- ¿Hay cambios sin commitear?
- ¿Cuál fue el último commit?

### 2. TypeScript
```bash
npx tsc --noEmit 2>&1
```

Reportar: limpio o número de errores.

### 3. Variables de entorno requeridas
Leer `.env.local` y verificar que existen estas variables (sin mostrar los valores):

| Variable | Requerida para |
|----------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase cliente |
| `SUPABASE_SECRET_KEY` | Supabase admin |
| `RESEND_API_KEY` | Emails |

### 4. Archivos críticos del proyecto
Verificar que existen:
- `src/lib/mock-data/productos.ts` — catálogo de productos
- `src/lib/data/exhibidores.ts` — tipos de exhibidores
- `src/lib/pptx/generador.ts` — generador de PPT
- `src/app/api/generar-pptx/route.ts` — endpoint de descarga
- `public/exhibidores/` — fotos de exhibidores

### 5. Fase actual del proyecto
Recordar al usuario en qué fase está el proyecto:

- **Fase 1 (activa):** Mock data, wizard completo, generación PPT/descarga
- **Fase 2 (pendiente):** Conexión con Proyecto Ruth (BD Maestra) y Proyecto María (imágenes)
- **Fase 3 (pendiente):** Export HTML, fichas técnicas, catálogo distribuidores

## Formato del reporte

Presentar como tabla o lista con íconos:
- ✓ = OK
- ⚠ = Advertencia (funciona pero hay algo a mejorar)
- ✗ = Error (requiere atención)

Ejemplo:
```
ESTADO DE PITCH AI
──────────────────
✓ Rama: staging
✓ TypeScript: sin errores
✓ Git: limpio (último commit: feat: show real exhibidor photos)
✓ Env vars: todas presentes
⚠ Supabase: configurado pero sin tablas reales (Fase 2 pendiente)
✓ Resend: configurado
✓ Archivos críticos: todos presentes

FASE ACTUAL: 1 — Mock data + Wizard + PPT
SIGUIENTE PASO: Conectar Supabase con tablas reales (Proyecto Ruth)
```
