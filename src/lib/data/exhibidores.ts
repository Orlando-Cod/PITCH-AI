export type TipoExhibidor =
  | "metalico"
  | "metalico-giratorio"
  | "carton"
  | "ristra";

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
  imagen?: string; // ruta en /public, ej: "/exhibidores/metalico-16.png"
  // Unidades que caben por espacio según páginas del libro
  capacidadPorEspacio: {
    "16p": number;
    "24p": number;
    "48p": number;
    "80p": number;
    "96p": number;
  };
  color: string;
}

export const EXHIBIDORES: Exhibidor[] = [
  {
    id: "metalico-9",
    nombre: "Metálico 9 Espacios",
    subtitulo: "Exhibidor Vertical de Piso",
    espacios: 9,
    caras: 1,
    dimensiones: "170 × 44.5 × 28.5 cm",
    tipo: "metalico",
    descripcion:
      "Diseñado para exhibir 9 colecciones diferentes. Su diseño para pequeños espacios maximiza visibilidad y accesibilidad. Capacidad total de 432 unidades.",
    caracteristicas: [
      "Capacidad total: 432 unidades (24–48 por espacio)",
      "Ideal para pequeños espacios en punto de venta",
      "Robusto, compacto y altamente llamativo",
      "Maximiza visibilidad y accesibilidad",
      "Material: metal resistente",
    ],
    capacidadPorEspacio: {
      "16p": 72,
      "24p": 48,
      "48p": 48,
      "80p": 24,
      "96p": 24,
    },
    color: "blue",
  },
  {
    id: "metalico-16",
    nombre: "Metálico 16 Espacios",
    subtitulo: "Display Tubular Giratorio 4 Caras",
    espacios: 16,
    caras: 4,
    dimensiones: "137 × 54 × 21 cm",
    tipo: "metalico-giratorio",
    descripcion:
      "Display tubular giratorio con 4 caras y 4 pisos de 4 bandejas cada uno. Exhibición 360° que invita al cliente a navegar por los títulos.",
    caracteristicas: [
      "4 caras × 4 pisos = 16 espacios totales",
      "Ruedas para reposicionarlo con libertad",
      "Cabezal de marca SICOBEN visible",
      "Exhibición 360° — compra por impulso",
      "Sistema giratorio interactivo",
    ],
    imagen: "/exhibidores/metalico-16.png",
    capacidadPorEspacio: {
      "16p": 72,
      "24p": 48,
      "48p": 48,
      "80p": 24,
      "96p": 24,
    },
    color: "orange",
  },
  {
    id: "carton-8",
    nombre: "Cartón 8 Espacios",
    subtitulo: "Display Exhibidor de Piso — Modelo 2025",
    espacios: 8,
    caras: 2,
    dimensiones: "150 × 48 × 30 cm",
    tipo: "carton",
    descripcion:
      "Exhibidor de piso con capacidad máxima de 480 libros. Recomendado en pasillos de alto tráfico, cachetes de góndola y frente a cajas para alta rotación.",
    caracteristicas: [
      "8 espacios — 2 caras × 4 pisos",
      "Profundidad por espacio: 18.5 cm",
      "Capacidad máxima: 480 unidades (libros 16 pág.)",
      "Ubicar en pasillos de alto tráfico o frente a checkout",
      "Fácil de armar y reposicionar",
    ],
    imagen: "/exhibidores/carton-8.png",
    capacidadPorEspacio: {
      "16p": 60,
      "24p": 48,
      "48p": 36,
      "80p": 24,
      "96p": 24,
    },
    color: "green",
  },
  {
    id: "tubular-colgante",
    nombre: "Tubular Colgante Giratorio",
    subtitulo: "Display de Ganchos — Giratorio 4 Caras",
    espacios: 12,
    caras: 4,
    dimensiones: "120 × 30 × 30 cm",
    tipo: "metalico-giratorio",
    descripcion:
      "Rack giratorio de metal con ganchos para colgar libros, stickers y productos planos. Exposición 360° ideal para artículos de impulso en cajas y mostradores.",
    caracteristicas: [
      "12 ganchos — 4 caras × 3 niveles",
      "Giratorio — acceso 360° al producto",
      "Compacto: ocupa solo 30 × 30 cm de piso",
      "Ideal para stickers, coloring books y libros planos",
      "Material: metal lacado negro",
    ],
    imagen: "/exhibidores/tubular-colgante.png",
    capacidadPorEspacio: {
      "16p": 8,
      "24p": 6,
      "48p": 4,
      "80p": 3,
      "96p": 3,
    },
    color: "slate",
  },
  {
    id: "colgante-carton-4",
    nombre: "Colgante Cartón 4 Espacios",
    subtitulo: "Display de Pared — Cartón Impreso",
    espacios: 4,
    caras: 1,
    dimensiones: "60 × 60 × 12 cm",
    tipo: "carton",
    descripcion:
      "Display de pared en cartón con 4 compartimentos (2×2). Ligero, fácil de instalar y personalizable con gráficos de marca. Ideal para cachetes de estantería y puntos secundarios.",
    caracteristicas: [
      "4 compartimentos — 2 filas × 2 columnas",
      "Se cuelga directo en estantería o pared",
      "Impreso con identidad visual Sicoben",
      "Montaje sin herramientas",
      "Material: cartón corrugado de alta resistencia",
    ],
    imagen: "/exhibidores/colgante-carton-4.png",
    capacidadPorEspacio: {
      "16p": 36,
      "24p": 24,
      "48p": 18,
      "80p": 12,
      "96p": 10,
    },
    color: "purple",
  },
  {
    id: "pallet-carton-12",
    nombre: "Pallet Cartón 12 Espacios",
    subtitulo: "Exhibidor de Piso — Alto Volumen",
    espacios: 12,
    caras: 1,
    dimensiones: "80 × 80 × 70 cm",
    tipo: "carton",
    descripcion:
      "Display de piso tipo pallet, con 12 espacios en 3 filas de 4 columnas. Alta capacidad para lanzamientos, temporadas y puntos de venta con volumen elevado.",
    caracteristicas: [
      "12 espacios — 3 filas × 4 columnas",
      "Branding completo en frente y lateral",
      "Capacidad total estimada: 500+ unidades",
      "Ideal para lanzamientos y temporadas altas",
      "Material: cartón de doble pared, alta resistencia",
    ],
    imagen: "/exhibidores/pallet-carton-12.jpg",
    capacidadPorEspacio: {
      "16p": 72,
      "24p": 48,
      "48p": 36,
      "80p": 24,
      "96p": 20,
    },
    color: "red",
  },
  {
    id: "pdqs-carton",
    nombre: "PDQS Cartón",
    subtitulo: "Display de Mostrador — Cartón Impreso",
    espacios: 1,
    caras: 1,
    dimensiones: "30 × 20 × 25 cm",
    tipo: "carton",
    descripcion:
      "Caja-exhibidor individual para mostrador o cachete de góndola. Se coloca sobre cualquier superficie plana. Ideal para producto de impulso junto a caja o en mostrador de farmacia.",
    caracteristicas: [
      "Unidad individual — 1 espacio de producto",
      "Coloca en mostrador, checkout o cachete",
      "Impreso con gráfica de colección",
      "Sin montaje — listo para usar",
      "Material: cartón compacto impreso",
    ],
    imagen: "/exhibidores/pdqs-carton.png",
    capacidadPorEspacio: {
      "16p": 20,
      "24p": 16,
      "48p": 12,
      "80p": 8,
      "96p": 6,
    },
    color: "teal",
  },
  {
    id: "ristra-colgante",
    nombre: "Ristra Colgante",
    subtitulo: "Exhibidor Colgante en Tira",
    espacios: 10,
    caras: 1,
    dimensiones: "90 × 5 × 3 cm",
    tipo: "ristra",
    descripcion:
      "Tira plástica transparente con 10 clips para colgar libros y coloring books directamente desde estanterías o vigas. Muy bajo costo, fácil de reposicionar.",
    caracteristicas: [
      "10 clips a lo largo de la tira",
      "Cuelga desde cualquier borde de estantería",
      "Transparente — no compite con el producto",
      "Reposicionable sin herramientas",
      "Material: plástico rígido transparente",
    ],
    imagen: "/exhibidores/ristra-colgante.png",
    capacidadPorEspacio: {
      "16p": 3,
      "24p": 2,
      "48p": 1,
      "80p": 1,
      "96p": 1,
    },
    color: "indigo",
  },
];
