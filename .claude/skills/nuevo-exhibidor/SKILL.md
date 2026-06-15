---
description: Agrega un nuevo tipo de exhibidor al proyecto — datos, capacidad por formato de libro y foto real. Activar cuando el usuario diga "agregar un exhibidor", "nuevo display", "tengo un mueble nuevo", "nuevo tipo de exhibidor", "añadir exhibidor".
name: Nuevo exhibidor
---

# Skill: Agregar un nuevo exhibidor

Esta skill guía el proceso completo de agregar un nuevo tipo de exhibidor. Hay **3 archivos** que siempre se deben tocar en conjunto.

## Datos que necesitas recopilar del usuario

Antes de escribir código, pregunta (o infiere del contexto):

1. **ID único** — kebab-case, ej: `metalico-24`, `carton-12`, `colgante-6`
2. **Nombre** — ej: "Metálico 24 Espacios"
3. **Subtítulo** — ej: "Exhibidor de Pared"
4. **Número de espacios** (total)
5. **Número de caras** (1, 2 o 4)
6. **Dimensiones** — formato "largo × ancho × alto cm"
7. **Tipo** — `"metalico"` | `"metalico-giratorio"` | `"carton"`
8. **Descripción corta** — 1-2 oraciones del beneficio comercial
9. **Características** — lista de 3-5 puntos
10. **Capacidad por espacio** según formato de libro:
    - 16 páginas → ¿cuántas unidades?
    - 24 páginas → ¿cuántas unidades?
    - 48 páginas → ¿cuántas unidades?
    - 80 páginas → ¿cuántas unidades?
    - 96 páginas → ¿cuántas unidades?
11. **Color de acento** — `"blue"` | `"orange"` | `"green"`
12. **Foto real** — el usuario debe proporcionar una imagen JPG o PNG

## Archivos a modificar

### 1. `src/lib/data/exhibidores.ts`
Agrega el objeto exhibidor al array `EXHIBIDORES` siguiendo exactamente esta estructura:

```typescript
{
  id: "<id>",
  nombre: "<nombre>",
  subtitulo: "<subtitulo>",
  espacios: <número>,
  caras: <número>,
  dimensiones: "<largo × ancho × alto cm>",
  tipo: "<tipo>",
  descripcion: "<descripcion>",
  caracteristicas: [
    "<caracteristica 1>",
    "<caracteristica 2>",
    // ...
  ],
  capacidadPorEspacio: {
    "16p": <n>,
    "24p": <n>,
    "48p": <n>,
    "80p": <n>,
    "96p": <n>,
  },
  color: "<blue|orange|green>",
},
```

### 2. `public/exhibidores/<id>.png`
- El nombre del archivo DEBE coincidir exactamente con el `id` del exhibidor
- Si el usuario proporciona la imagen, cópiala a esta ruta
- Si no hay imagen disponible todavía, avisa que el selector mostrará un error hasta que se agregue

### 3. Verificación
```bash
npx tsc --noEmit
```
Corregir cualquier error de tipos antes de continuar.

## Commit

```
feat: add exhibidor <id> — <nombre>
```

Commitear en `staging`. Nunca en `main`.

## Nota sobre `SelectorExhibidor.tsx`
No es necesario modificarlo — el componente ya lee de `EXHIBIDORES` dinámicamente y la imagen la carga por convención de nombre (`/exhibidores/<id>.png`).
