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
  // Unidades que caben por espacio según páginas del libro
  capacidadPorEspacio: {
    "16p": number;
    "24p": number;
    "48p": number;
    "80p": number;
    "96p": number;
  };
  color: string; // color de acento para la tarjeta
}

export const EXHIBIDORES: Exhibidor[] = [
  {
    id: "metalico-9",
    nombre: "Metálico 9 Espacios",
    subtitulo: "Exhibidor Vertical",
    espacios: 9,
    caras: 1,
    dimensiones: "159.5 × 29.5 × 45 cm",
    tipo: "metalico",
    descripcion:
      "Diseño compacto y vertical que maximiza la cantidad de títulos exhibidos utilizando el mínimo espacio en piso.",
    caracteristicas: [
      "Diseño compacto y vertical",
      "Punto de venta listo para usar",
      "Estructura de alta resistencia",
      "Adaptado para diferentes formatos y grosores",
    ],
    capacidadPorEspacio: {
      "16p": 5,
      "24p": 4,
      "48p": 3,
      "80p": 2,
      "96p": 1,
    },
    color: "blue",
  },
  {
    id: "metalico-16",
    nombre: "Metálico 16 Espacios",
    subtitulo: "Exhibidor Giratorio 360°",
    espacios: 16,
    caras: 4,
    dimensiones: "137 × 54 × 21 cm",
    tipo: "metalico-giratorio",
    descripcion:
      "Exhibición 360° en cuatro caras. Sistema giratorio que invita al cliente a navegar por los títulos, aumentando la compra por impulso.",
    caracteristicas: [
      "Exhibición 360° en 4 caras",
      "Sistema giratorio interactivo",
      "Base en cruz antivuelco",
      "Ruedas para moverlo con libertad",
      "Cabezal de marca visible",
    ],
    capacidadPorEspacio: {
      "16p": 5,
      "24p": 4,
      "48p": 3,
      "80p": 2,
      "96p": 1,
    },
    color: "orange",
  },
  {
    id: "carton-8",
    nombre: "Cartón 8 Espacios",
    subtitulo: "Exhibidor de Piso",
    espacios: 8,
    caras: 1,
    dimensiones: "141.1 × 79 × 16.5 cm",
    tipo: "carton",
    descripcion:
      "Ligero y práctico. Inclinación ergonómica para que los libros no se caigan y las portadas queden en el ángulo de visión ideal.",
    caracteristicas: [
      "Inclinación ergonómica anti-caída",
      "Fácil de armar, mover y ubicar",
      "Impresión a todo color en laterales",
      "Ideal para colecciones específicas",
    ],
    capacidadPorEspacio: {
      "16p": 6,
      "24p": 5,
      "48p": 3,
      "80p": 2,
      "96p": 1,
    },
    color: "green",
  },
];
