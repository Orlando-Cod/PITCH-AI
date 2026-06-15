---
description: Agrega nuevos productos al catálogo mock de PITCH AI siguiendo el schema exacto de tipos. Activar cuando el usuario diga "agregar productos", "nuevos libros", "actualizar inventario", "nueva colección", "hay productos nuevos", "agregar al catálogo".
name: Actualizar catálogo de productos
---

# Skill: Actualizar catálogo de productos

Durante la Fase 1, todos los productos viven en `src/lib/mock-data/productos.ts`. Esta skill asegura que se agreguen con el schema correcto.

## Schema obligatorio de cada producto

Todos los campos deben seguir **exactamente** los tipos en `src/types/index.ts`:

```typescript
{
  sku: string,           // Ej: "SB-COL-001" — identificador único
  upc: string,           // Código de barras UPC
  hsCode: string,        // Código arancelario HS
  categoria: CategoriaProducto,  // Ver valores válidos abajo
  coleccion: string,     // Nombre de la colección/serie
  descripcion: string,   // Descripción corta del producto
  paginas: number,       // 0 para packs/kits sin páginas definidas
  dimensiones: string,   // Ej: "19.7 x 27 cm"
  portadas: number,      // Número de variantes de portada en el SKU
  moq: number,           // Mínimo de orden (unidades)
  precio: number,        // Precio unitario en USD (sin símbolo)
  stock: number,         // Inventario disponible actual
  tapaDura?: boolean,    // Solo si aplica
  tieneStickers?: boolean,
  licenciado?: boolean,  // true si tiene licencia Disney u otra
}
```

## Valores válidos para `categoria`

Copiar **exactamente** uno de estos strings (mayúsculas, con espacios):

```
"LIBRO DE COLOREAR"
"LIBRO DE LECTURA"
"LIBRO DE ACTIVIDADES"
"LIBRO DE ACTIVIDADES CON STICKERS"
"PASATIEMPOS"
"PACKS"
"JUEGOS DIDACTICOS"
"LIBRO DE COLOREAR CON AGUA"
"LIBRO DE COLOREAR CON LECTURA"
```

El mapeo a grupos de UI (`Lectura`, `Colorear`, `Actividades`, `Pasatiempos`, `Packs`) está definido en `GRUPO_CATEGORIA` en `src/types/index.ts` — no hace falta tocarlo.

## Dónde agregar los productos

En `src/lib/mock-data/productos.ts`, dentro del array `PRODUCTOS`. Agregar al final del grupo que corresponda según categoría, o crear un comentario separador nuevo si es una colección nueva:

```typescript
// ── Nueva Colección: <nombre> ─────────────────────────
{ sku: "...", ... },
{ sku: "...", ... },
```

## Verificaciones obligatorias

1. **TypeScript**: `npx tsc --noEmit` — no debe haber errores de tipo
2. **SKUs únicos**: Verificar que ningún SKU se repita en el array
3. **Stock > 0** para que aparezcan en el catálogo con el filtro por defecto

## Fuentes de datos aceptadas

El usuario puede proporcionar los datos como:
- PDF del formato de pedido (extraer datos manualmente)
- Tabla en el chat
- Lista de texto plano

Si faltan campos (como UPC o hsCode), usar `""` como placeholder y avisarle al usuario.

## Commit

```
feat: add <N> products to catalog — <colección>
```

En `staging`. Nunca en `main`.
