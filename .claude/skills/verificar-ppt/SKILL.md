---
description: Verifica que la generación de PPT funciona correctamente después de cambios en el wizard o el generador. Activar cuando el usuario diga "verificar el PPT", "probar la generación", "asegúrate que el PPT funciona", "testear el generador", o después de modificar archivos en lib/pptx/ o el wizard de propuestas.
name: Verificar generación de PPT
---

# Skill: Verificar generación de PPT

Después de cualquier cambio en el generador o el wizard, sigue estos pasos para confirmar que todo funciona.

## Estructura de slides que SIEMPRE debe respetarse

El orden es fijo e inamovible (definido en el MASTERPLAN):

1. **Portada** — Logo Sicoben, cliente, fecha
2. **Separador** — Nombre y datos del exhibidor
3. **Ficha técnica** — Espacios, caras, dimensiones, capacidad por formato
4. **Planograma(s)** — Uno por cara cotizada, con productos y unidades
5. **Listado de precios** — Todos los productos con precio normal y descuento

## Paso 1 — TypeScript limpio

```bash
npx tsc --noEmit
```

Si hay errores, corrígelos antes de continuar. No tiene sentido probar si el código no compila.

## Paso 2 — Revisar el código del generador

Leer `src/lib/pptx/generador.ts` y verificar:
- Que la función `generarPropuestaPptx` exporta correctamente
- Que `pptx.write({ outputType: "nodebuffer" })` es el último paso
- Que el orden de slides es: portada → separador → ficha → planograma(s) → precios
- Que `distribuir()` asigna productos a caras correctamente

## Paso 3 — Revisar el API route

Leer `src/app/api/generar-pptx/route.ts` y verificar:
- Que tiene `export const runtime = "nodejs"`
- Que el Content-Type es `application/vnd.openxmlformats-officedocument.presentationml.presentation`
- Que retorna `new Uint8Array(buffer)` (no Buffer directamente)

## Paso 4 — Revisar VistaPrevia

Leer `src/components/propuestas/VistaPrevia.tsx` y verificar:
- Que el fetch apunta a `/api/generar-pptx`
- Que el body incluye `{ exhibidor, productos, parametros }`
- Que el download usa `URL.createObjectURL(blob)`

## Paso 5 — Build de producción (opcional pero recomendado antes de publicar)

```bash
npm run build
```

Si el build falla, hay un problema que no detecta TypeScript solo.

## Qué reportar al usuario

- Si todo pasa: "✓ El generador de PPT está correcto. TypeScript limpio, estructura de slides válida, API route configurado."
- Si algo falla: Indicar exactamente qué archivo y qué línea tiene el problema.

## Archivos clave a conocer

- `src/lib/pptx/generador.ts` — Lógica de generación
- `src/app/api/generar-pptx/route.ts` — Endpoint de descarga
- `src/components/propuestas/VistaPrevia.tsx` — UI del paso 4
- `src/components/propuestas/PasosPropuesta.tsx` — Wizard completo
