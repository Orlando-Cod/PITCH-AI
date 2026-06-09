// ── Categorías de productos ───────────────────────────────────────────────────
export type CategoriaProducto =
  | "LIBRO DE COLOREAR"
  | "LIBRO DE LECTURA"
  | "LIBRO DE ACTIVIDADES"
  | "LIBRO DE ACTIVIDADES CON STICKERS"
  | "PASATIEMPOS"
  | "PACKS"
  | "JUEGOS DIDACTICOS"
  | "LIBRO DE COLOREAR CON AGUA"
  | "LIBRO DE COLOREAR CON LECTURA";

// Grupos simplificados para filtros de UI
export type GrupoCategoria =
  | "Lectura"
  | "Colorear"
  | "Actividades"
  | "Pasatiempos"
  | "Packs";

export const GRUPO_CATEGORIA: Record<CategoriaProducto, GrupoCategoria> = {
  "LIBRO DE LECTURA": "Lectura",
  "LIBRO DE COLOREAR": "Colorear",
  "LIBRO DE COLOREAR CON LECTURA": "Colorear",
  "LIBRO DE COLOREAR CON AGUA": "Colorear",
  "LIBRO DE ACTIVIDADES": "Actividades",
  "LIBRO DE ACTIVIDADES CON STICKERS": "Actividades",
  "PASATIEMPOS": "Pasatiempos",
  "PACKS": "Packs",
  "JUEGOS DIDACTICOS": "Packs",
};

// ── Producto ──────────────────────────────────────────────────────────────────
export interface Producto {
  sku: string;
  upc: string;
  hsCode: string;
  categoria: CategoriaProducto;
  coleccion: string;
  descripcion: string;
  paginas: number;       // Determina cuántas unidades caben por espacio en el exhibidor
  dimensiones: string;   // ej: "19.7 x 27 cm"
  portadas: number;      // Número de variantes de portada
  moq: number;           // Mínimo de orden
  precio: number;        // Precio unitario en USD
  stock: number;         // Inventario disponible
  tapaDura?: boolean;
  tieneStickers?: boolean;
  licenciado?: boolean;  // Disney u otra licencia externa
}

// ── Exhibidor ─────────────────────────────────────────────────────────────────
export type TipoExhibidor = "metalico" | "metalico-giratorio" | "carton";

export interface Exhibidor {
  id: string;
  nombre: string;
  subtitulo: string;
  espacios: number;
  caras: number;
  dimensiones: string;
  tipo: TipoExhibidor;
  descripcion: string;
  caracteristicas: string[];
  capacidadPorEspacio: Record<"16p" | "24p" | "48p" | "80p" | "96p", number>;
  color: "blue" | "orange" | "green";
}

// ── Propuesta ─────────────────────────────────────────────────────────────────
export type TipoCliente = "Retailer" | "Distribuidor" | "Aliado Comercial";
export type Descuento = 0 | 5 | 10 | 20;
export type Pais = "Nicaragua" | "Panamá" | "Costa Rica" | "Guatemala" | "El Salvador" | "Honduras";

export interface ParametrosPropuesta {
  cliente: string;
  pais: Pais;
  tipoCliente: TipoCliente;
  exhibidorId: string;
  carasACotizar: number;
  colecciones: GrupoCategoria[];
  precioObjetivo: number;        // Precio máximo por unidad ($)
  descuento: Descuento;
  soloLicenciados?: boolean;
  temporada?: string;
  observaciones?: string;
}

export interface ItemPropuesta {
  producto: Producto;
  unidadesPorEspacio: number;
  cara: number;
  bandeja: number;
}

export interface Propuesta {
  id: string;
  parametros: ParametrosPropuesta;
  items: ItemPropuesta[];
  creadaEn: string;
  ejecutivo: string;
  estado: "borrador" | "generada" | "enviada";
}
