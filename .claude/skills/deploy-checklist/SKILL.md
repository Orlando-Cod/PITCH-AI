---
name: deploy-checklist
description: Checklist obligatorio antes de subir a producción. Invocar siempre que el usuario vaya a hacer merge staging→main o push a producción.
triggers:
  - "publicar"
  - "subir a producción"
  - "merge a main"
  - "deploy"
  - "prod"
---

# Checklist pre-deploy — PITCH AI

Antes de mergear `staging → main`, verifica **en este orden**. Si algún paso falla, detén el proceso y corrige primero.

## 1. Build limpio

```bash
npm run build
```

- No debe haber errores de compilación ni de TypeScript.
- Warnings de tipo `Type error:` o `Cannot find module` son bloqueantes.
- Warnings de imagen, font o ESLint no críticos pueden pasar, pero documéntalos.

## 2. Type-check sin errores

```bash
npx tsc --noEmit
```

- Cero errores. Este proyecto usa tipos propios en `@/types` — ningún `any` implícito.

## 3. Sin logs de debug

Busca en el código fuente:

```bash
grep -r "console\.log\|console\.warn\|console\.error\|debugger" src/ --include="*.ts" --include="*.tsx"
```

- Elimina o comenta cualquier `console.log` que no sea un error de negocio real.
- Los `console.error` en rutas de API son aceptables si son informativos, no de debug.

## 4. Sin credenciales hardcodeadas

```bash
grep -r "sk_\|whsec_\|re_\|postgres://\|eyJ\|SUPABASE\|supabase" src/ --include="*.ts" --include="*.tsx"
```

Claves a nunca hardcodear en este proyecto:
- `RESEND_API_KEY` (prefijo `re_`)
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY` — **jamás con prefijo `NEXT_PUBLIC_`**
- Tokens JWT de Supabase (`eyJ…`)

## 5. Variables de entorno en Vercel

Verifica que toda variable nueva en `.env.local` esté también en Vercel:

```bash
vercel env ls
```

Compara con `.env.local`. Si hay una variable local que no aparece en Vercel → bloquear el deploy.

Para añadir una variable que falta:
```bash
vercel env add NOMBRE_VARIABLE production
vercel env add NOMBRE_VARIABLE preview
```

## 6. Sin migraciones de BD pendientes

- Este proyecto usa **Supabase (PostgreSQL)**.
- Si se modificaron tipos en `@/types/index.ts` que reflejan cambios de esquema real (Fase 2+), verificar que la migración esté aplicada en la BD de producción de Supabase.
- En Fase 1 (datos mock), este paso aplica solo si se conectó Supabase real.

## 7. Flujo principal probado en local

Prueba manual mínima antes de subir:

1. `npm run dev` — servidor arranca sin errores.
2. Login con `ventas@sicoben.com` / `sicoben2026`.
3. Crear una propuesta nueva: elegir exhibidor → configurar parámetros → revisar catálogo → generar.
4. Verificar que la exportación PPT descarga sin errores.
5. Las 3 páginas legales (`/privacidad`, `/terminos`, `/aviso-legal`, `/cookies`) cargan correctamente.
6. El banner de cookies aparece en primera visita y guarda preferencia en localStorage.

## 8. .gitignore cubre lo sensible

Confirma que estos archivos **nunca** se van a commitear:

```
.env.local
.env*.local
.vercel/
```

```bash
git status --short
```

Si `.env.local` o cualquier archivo con claves aparece en la lista → **no hacer push**.

---

## Resultado

| Paso | Estado |
|------|--------|
| 1. Build | ✅ / ❌ |
| 2. TypeScript | ✅ / ❌ |
| 3. Sin console.log | ✅ / ❌ |
| 4. Sin credenciales | ✅ / ❌ |
| 5. Env vars en Vercel | ✅ / ❌ |
| 6. Migraciones BD | ✅ / N/A |
| 7. Flujo principal | ✅ / ❌ |
| 8. .gitignore | ✅ / ❌ |

**Solo si todos los ✅ → proceder con `/publicar`.**
