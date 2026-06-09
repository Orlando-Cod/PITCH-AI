import type { Producto } from "@/types";

export const PRODUCTOS: Producto[] = [
  // ── NOVEDADES Q2 — LIBROS DE COLOREAR ────────────────────────────────────
  {
    sku: "MM-S-C-2757", upc: "6014417712757", hsCode: "EN REVISION",
    categoria: "LIBRO DE COLOREAR", coleccion: "COLOR EN CALMA",
    descripcion: "Libro de Colorear con 2 Portadas: Vol. 1, Vol.2. 48 páginas 19.7 x 27 cm",
    paginas: 48, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.25, stock: 91,
  },
  {
    sku: "MM-S-C-3747", upc: "6014417713747", hsCode: "EN REVISION",
    categoria: "LIBRO DE COLOREAR", coleccion: "DISEÑO Y DESCANSO",
    descripcion: "Libro de Colorear con 2 Portadas: Vol. 1, Vol.2. 48 páginas 19.7 x 27 cm",
    paginas: 48, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.25, stock: 100,
  },
  {
    sku: "MM-S-C-4782", upc: "6014417714782", hsCode: "EN REVISION",
    categoria: "LIBRO DE COLOREAR", coleccion: "PATRONES Y PLENITUD",
    descripcion: "Libro de Colorear con 2 Portadas: Vol. 1, Vol.2. 48 páginas 19.7 x 27 cm",
    paginas: 48, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.25, stock: 90,
  },
  {
    sku: "MM-S-C-1705", upc: "6014417711705", hsCode: "EN REVISION",
    categoria: "LIBRO DE COLOREAR", coleccion: "RITMO DE LINEAS",
    descripcion: "Libro de Colorear con 2 Portadas: Vol. 1, Vol.2. 48 páginas 19.7 x 27 cm",
    paginas: 48, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.25, stock: 97,
  },

  // ── LIBROS DE LECTURA ─────────────────────────────────────────────────────
  {
    sku: "BP-S-L-1038", upc: "9789962201038", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "CUENTOS CLÁSICOS 6 EN 1",
    descripcion: "Libro de Lectura: La Sirenita, El Patito Feo, La Bella Durmiente, La Bella y la Bestia, Ricitos de Oro, Alicia. 96 páginas 21 x 28 cm Tapa Dura Full Color",
    paginas: 96, dimensiones: "21 x 28 cm", portadas: 1, moq: 24, precio: 4.79, stock: 38, tapaDura: true,
  },
  {
    sku: "MM-S-L-7410", upc: "6014417477410", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "CUENTO PARA DESPERTAR",
    descripcion: "Lectura + Exhibidor con 4 Portadas: El pelo, El fósforo, El murmullo, El rayo. 40 páginas. Tapa dura.",
    paginas: 40, dimensiones: "Varios tamaños", portadas: 4, moq: 48, precio: 3.84, stock: 121, tapaDura: true,
  },
  {
    sku: "MM-S-L-6499", upc: "6014417476499", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "GENTE COMO TU QUE CAMBIO AL MUNDO 2",
    descripcion: "6 Portadas: Temple Grandin, Marie Curie, Benjamin Franklin, Muhammad Alí, Martin Luther King Jr, Malala. 40 páginas. Tapa dura. 20x20cm.",
    paginas: 40, dimensiones: "20 x 20 cm", portadas: 6, moq: 60, precio: 3.84, stock: 143, tapaDura: true,
  },
  {
    sku: "BP-S-L-1429", upc: "6014417431429", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "CUENTOS CLASICOS",
    descripcion: "Libro de Lectura con 6 Portadas: La Bella Durmiente, La Sirenita, La Bella y la Bestia, El Patito Feo, Alicia, Ricitos de Oro. 16 páginas 21 x 28 cm",
    paginas: 16, dimensiones: "21 x 28 cm", portadas: 6, moq: 24, precio: 0.95, stock: 472,
  },
  {
    sku: "MM-S-L-7066", upc: "6014417027066", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "CUENTOS QUE DEBES SABER",
    descripcion: "4 Portadas: Hermanos Grimm y Perrault, Cuentos que Debes Saber, Esopo, Jean de la Fontaine. 24 páginas 18 x 23.5 cm",
    paginas: 24, dimensiones: "18 x 23.5 cm", portadas: 4, moq: 24, precio: 2.00, stock: 60,
  },
  {
    sku: "MM-S-L-3248", upc: "6499853233248", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "LEE CON PICTOGRAMAS",
    descripcion: "4 Portadas: El Libro de la Selva, Jack y las Habichuelas Mágicas, La Caperucita Roja, Rapunzel. 16 páginas 21 x 28 cm",
    paginas: 16, dimensiones: "21 x 28 cm", portadas: 4, moq: 96, precio: 0.93, stock: 95,
  },
  {
    sku: "MM-S-L-3866", upc: "8944513383866", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "HISTORIAS DE GALORE",
    descripcion: "4 Portadas: Historias de Aventura, Historias de Princesas, Noches de Arabia, Cuentos para niñas. 16 páginas 21 x 28 cm",
    paginas: 16, dimensiones: "21 x 28 cm", portadas: 4, moq: 24, precio: 0.93, stock: 225,
  },
  {
    sku: "MM-S-L-0459", upc: "6014417470459", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "FABULAS DE ESOPO",
    descripcion: "4 Portadas: León y el pequeño ratón, Los dos viajeros y el Oso, El Buey y la Rana, El malvado lobo y los pequeños cabritos. 16 páginas 21.5 x 27.9 cm",
    paginas: 16, dimensiones: "21.5 x 27.9 cm", portadas: 4, moq: 24, precio: 0.93, stock: 219,
  },
  {
    sku: "MM-S-L-4978", upc: "6014416914978", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "YO DEBO",
    descripcion: "4 Portadas: Yo Debo Ser Fuerte, Yo Debo Decir la Verdad, Yo Debo Ayudar, Yo Debo Agradecer. 16 páginas 20 x 20 cm",
    paginas: 16, dimensiones: "20 x 20 cm", portadas: 4, moq: 96, precio: 0.82, stock: 228,
  },
  {
    sku: "BN-S-L-3634", upc: "6014417613634", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "HACIENDO CAMINO",
    descripcion: "3 Portadas: Un Mal Día Para Oso, Un Pequeño Punto, La Mejor Rastreadora De Osos. 36 páginas 18 x 21 cm",
    paginas: 36, dimensiones: "18 x 21 cm", portadas: 3, moq: 24, precio: 3.49, stock: 284,
  },
  {
    sku: "MM-S-L-4000", upc: "6499852854000", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "HISTORIAS DE LA GRANJA",
    descripcion: "4 Portadas: Coco la Cerdita Voladora, La Idea de Pato, Casper el Cachorro, El Conejo Oreo. 16 páginas 21 x 28 cm",
    paginas: 16, dimensiones: "21 x 28 cm", portadas: 4, moq: 96, precio: 0.93, stock: 156,
  },
  {
    sku: "MM-S-L-1955", upc: "6014416991955", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "CRECIENDO EN FAMILIA",
    descripcion: "6 Portadas: Aprenden a ser valientes, A manejar la ira, A perdonar, A respetar, A ser amables, A ser pacientes. 24 páginas 18 x 23.5 cm",
    paginas: 24, dimensiones: "18 x 23.5 cm", portadas: 6, moq: 24, precio: 2.00, stock: 603,
  },
  {
    sku: "MM-S-PU-8478", upc: "6014417488478", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "POP UP",
    descripcion: "4 Portadas: Rapunzel, Blanca Nieves, El Gato con Botas, El Patito Feo. 6 páginas 26 x 20 cm Cartulina satinada 3D",
    paginas: 6, dimensiones: "26 x 20 cm", portadas: 4, moq: 24, precio: 4.79, stock: 141,
  },
  {
    sku: "BP-S-L-8540", upc: "6014417518540", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "CUENTOS DE BIBLIOTECA",
    descripcion: "4 Portadas: Una amistad inesperada, Mi aventura como caballero, El Director del Circo, Mi tobogán mágico. 24 páginas 20 x 20 cm",
    paginas: 24, dimensiones: "20 x 20 cm", portadas: 4, moq: 24, precio: 0.93, stock: 774,
  },
  {
    sku: "BP-S-L-9578", upc: "6014417519578", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "INCREIBLES CONOCIMIENTOS",
    descripcion: "4 Portadas: Animales Adorables, Criaturas Marinas, Mundo de Dinosaurios, Extraños y Maravillosos. 16 páginas 21 x 28 cm",
    paginas: 16, dimensiones: "21 x 28 cm", portadas: 4, moq: 24, precio: 0.93, stock: 931,
  },
  {
    sku: "BP-S-L-9546", upc: "6014417529546", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "CUENTOS DE LA BIBLIA",
    descripcion: "4 Portadas: Vol. 1, Vol.2, Vol. 3, Vol. 4. 16 páginas 21.5 x 28 cm",
    paginas: 16, dimensiones: "21.5 x 28 cm", portadas: 4, moq: 24, precio: 0.93, stock: 472,
  },
  {
    sku: "MM-S-L-2014", upc: "8944513362014", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "BIENESTAR",
    descripcion: "6 Portadas: Mantenerse en Forma, Decir No no es Malo, Respeto, Soluciono mis problemas, Nunca me rindo, Buenos Modales. 16 páginas 21 x 28 cm",
    paginas: 16, dimensiones: "21 x 28 cm", portadas: 6, moq: 24, precio: 0.93, stock: 678,
  },
  {
    sku: "BN-S-L-5423", upc: "6014417475423", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "PASOS DE GIGANTES",
    descripcion: "3 Portadas: Lufi dice ¡Ouch!, El oso que miraba fijamente, ¡Perrito Tonto!. 36 páginas 18 x 21 cm",
    paginas: 36, dimensiones: "18 x 21 cm", portadas: 3, moq: 24, precio: 3.49, stock: 375,
  },
  {
    sku: "BN-S-L-5430", upc: "6014417475430", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "CONECTANDO",
    descripcion: "4 Portadas: La Barba del Leñador, Roqui esta perdido, Por el río del sueño. 36 páginas 20 x 20 cm",
    paginas: 36, dimensiones: "20 x 20 cm", portadas: 4, moq: 24, precio: 3.49, stock: 339,
  },
  {
    sku: "IG-S-L-5610", upc: "6014417655610", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "SUEÑA EN GRANDE 2",
    descripcion: "4 Portadas: el poder del amor, le tienes miedo a la oscuridad, atrapame si puedes, el rey de la timidez. 24 páginas 25 x 25 cm",
    paginas: 24, dimensiones: "25 x 25 cm", portadas: 4, moq: 24, precio: 1.46, stock: 224,
  },
  {
    sku: "IG-S-L-6624", upc: "6014417656624", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "SUEÑA EN GRANDE 4",
    descripcion: "4 Portadas: la varita magica del hada chispita, la carrera de ida y vuelta a la luna, el pirata peter y su loro, en sus marcas listos fuera. 24 páginas 25 x 25 cm",
    paginas: 24, dimensiones: "25 x 25 cm", portadas: 4, moq: 24, precio: 1.46, stock: 175,
  },
  {
    sku: "IG-S-L-0644", upc: "6014417670644", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "SUEÑA EN GRANDE 10",
    descripcion: "3 Portadas: detective ted, es hora de un abrazo, hora de dormir. 24 páginas 21 x 25 cm",
    paginas: 24, dimensiones: "21 x 25 cm", portadas: 3, moq: 24, precio: 1.20, stock: 120,
  },
  {
    sku: "IG-S-L-0620", upc: "6014417670620", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "SUEÑA EN GRANDE 9",
    descripcion: "3 Portadas: mi familia divertida, hay un monstruo debajo de mi cama, una princesa no muy perfecta. 24 páginas 21 x 25 cm",
    paginas: 24, dimensiones: "21 x 25 cm", portadas: 3, moq: 24, precio: 1.20, stock: 120,
  },
  {
    sku: "IG-S-L-2655", upc: "6014417672655", hsCode: "49030000",
    categoria: "LIBRO DE LECTURA", coleccion: "CUANDO SEA GRANDE",
    descripcion: "3 Portadas: cuando sea grande quiero ser ingeniero, astronauta, veterinario. 24 páginas 21 x 25 cm",
    paginas: 24, dimensiones: "21 x 25 cm", portadas: 3, moq: 24, precio: 2.78, stock: 168,
  },

  // ── LIBROS DE ACTIVIDADES ─────────────────────────────────────────────────
  {
    sku: "BP-S-A-0673", upc: "9789962200673", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "CAMINO A LA ESCRITURA",
    descripcion: "Libro de Actividades con 1 Portada. 96 páginas 197x270mm",
    paginas: 96, dimensiones: "19.7 x 27 cm", portadas: 1, moq: 24, precio: 3.39, stock: 60,
  },
  {
    sku: "BP-S-A-0666", upc: "9789962200666", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES CON STICKERS", coleccion: "MANOS A LA OBRA NIVEL 1",
    descripcion: "Libro de Actividades con stickers. 120 páginas 197x270mm",
    paginas: 120, dimensiones: "19.7 x 27 cm", portadas: 1, moq: 24, precio: 3.49, stock: 68, tieneStickers: true,
  },
  {
    sku: "BP-S-A-0727", upc: "9789962200727", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES CON STICKERS", coleccion: "MANOS A LA OBRA NIVEL 2",
    descripcion: "Libro de Actividades con stickers. 120 páginas 197x270mm",
    paginas: 120, dimensiones: "19.7 x 27 cm", portadas: 1, moq: 24, precio: 3.81, stock: 53, tieneStickers: true,
  },
  {
    sku: "MM-S-AC-0560", upc: "6014417590560", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "90 RETOS MENTALES PARA CHICOS LISTOS",
    descripcion: "2 Portadas: VOL.1 VOL.2. 96 páginas 197x270mm",
    paginas: 96, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.76, stock: 36,
  },
  {
    sku: "MM-S-AS-8506", upc: "6014417578506", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "ABREMENTE LABERINTOS",
    descripcion: "2 Portadas: Laberintos en Español, Laberintos en Inglés. 48 páginas 27x19.7cm",
    paginas: 48, dimensiones: "27 x 19.7 cm", portadas: 2, moq: 24, precio: 1.25, stock: 29,
  },
  {
    sku: "MM-S-AS-6514", upc: "6014417526514", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "ABREMENTE 2 PUNTO A PUNTO Y DIFERENCIAS",
    descripcion: "2 Portadas: Punto a Punto, Diferencias. 48 páginas 27x19.7cm",
    paginas: 48, dimensiones: "27 x 19.7 cm", portadas: 2, moq: 24, precio: 1.25, stock: 94,
  },
  {
    sku: "BP-S-AS-5432", upc: "6014417455432", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES CON STICKERS", coleccion: "ME DIVIERTO Y APRENDO COLORES Y ABC",
    descripcion: "2 Portadas: Colores, Abecedario. 48 pág. + 2 de stickers 19.7 x 27 cm",
    paginas: 48, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.60, stock: 57, tieneStickers: true,
  },
  {
    sku: "MM-S-A-0567", upc: "9789962200567", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "CREANDO PALABRAS",
    descripcion: "1 Portada: Creando Palabras. 96 páginas 19.7 x 27 cm",
    paginas: 96, dimensiones: "19.7 x 27 cm", portadas: 1, moq: 24, precio: 2.30, stock: 7,
  },
  {
    sku: "MM-S-A-0642", upc: "9789962200642", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "DESAFÍA TU MENTE",
    descripcion: "1 Portada: Desafía tu Mente. 96 páginas 19.7 x 27 cm Full Color",
    paginas: 96, dimensiones: "19.7 x 27 cm", portadas: 1, moq: 24, precio: 2.30, stock: 29,
  },
  {
    sku: "MM-S-A-7390", upc: "6014417377390", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "ABREMENTE SOPAS DE LETRAS",
    descripcion: "2 Portadas: Sopas de Letras en Español, Sopas de Letras en Inglés. 48 páginas 19.7 x 27 cm",
    paginas: 48, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.25, stock: 125,
  },
  {
    sku: "MM-S-CS-5418", upc: "6014417455418", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES CON STICKERS", coleccion: "COMIENZO A COLOREAR",
    descripcion: "2 Portadas: Alimentos, Animales. 48 pág. + 2 de stickers 19.7 x 27 cm",
    paginas: 48, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.60, stock: 144, tieneStickers: true,
  },
  {
    sku: "MM-S-AS-5590", upc: "6014417555590", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "JUGANDO + STICKERS",
    descripcion: "4 Portadas: Dinosaurios, Princesas y Sirenas, Animales Marinos, Granja. 24 pág. + 1 de stickers 19.7 x 27 cm",
    paginas: 24, dimensiones: "19.7 x 27 cm", portadas: 4, moq: 24, precio: 1.00, stock: 345, tieneStickers: true,
  },
  {
    sku: "MM-S-AS-4321", upc: "6014417364321", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES CON STICKERS", coleccion: "ME DIVIERTO Y APRENDO FORMAS Y NUMEROS",
    descripcion: "2 Portadas: Números, Formas. 48 pág. + 2 de stickers 19.7 x 27 cm",
    paginas: 48, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.60, stock: 226, tieneStickers: true,
  },
  {
    sku: "BP-S-A-7345", upc: "6014417377345", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "INCREIBLES ACTV PARA NIÑOS INTELIGENTES",
    descripcion: "2 Portadas: Vol.1, Vol.2. 64 páginas 19.7 x 27 cm Full Color",
    paginas: 64, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.60, stock: 94,
  },
  {
    sku: "BP-S-A-5320", upc: "6014417345320", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "MI PRIMEROS TRAZOS",
    descripcion: "2 Portadas: Vol.1, Vol.2. 48 páginas 19.7 x 27 cm",
    paginas: 48, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.25, stock: 111,
  },
  {
    sku: "BR-S-A-5862", upc: "9789807455862", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "APRENDO EN CASA",
    descripcion: "2 Portadas: Vol.1, Vol.2. 64 páginas 21 x 28 cm Full Color",
    paginas: 64, dimensiones: "21 x 28 cm", portadas: 2, moq: 24, precio: 1.64, stock: 32,
  },
  {
    sku: "BR-S-A-8564", upc: "9789962818564", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "PEQUEÑOS GENIOS (MATEMATICA Y HABILIDADES CON TIJERA)",
    descripcion: "2 Portadas: Habilidad con las tijeras, Matemáticas para los pequeños. 48 páginas 19.7 x 27 cm",
    paginas: 48, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.25, stock: 269,
  },
  {
    sku: "BR-S-A-8830", upc: "9789962818830", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "JUMBO",
    descripcion: "3 Portadas: Nivel 1, Nivel 2, Nivel 3. 96 páginas 20 x 27 cm Papel Prensa",
    paginas: 96, dimensiones: "20 x 27 cm", portadas: 3, moq: 24, precio: 1.26, stock: 166,
  },
  {
    sku: "BR-S-S-5411", upc: "9789807455411", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES CON STICKERS", coleccion: "ANIMALES DIVERTIDOS (BALLENA Y JIRAFA)",
    descripcion: "2 Portadas: Ballena, Jirafa. 32 pág. + 4 de stickers 22 x 28 cm",
    paginas: 32, dimensiones: "22 x 28 cm", portadas: 2, moq: 24, precio: 1.64, stock: 259, tieneStickers: true,
  },
  {
    sku: "MM-S-AS-0323", upc: "6014417360323", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES CON STICKERS", coleccion: "COMIENZO A COLOREAR ESCUELA GRANJA",
    descripcion: "2 Portadas: La Escuela, La Granja. 48 pág. + 2 de stickers 19.7 x 27 cm",
    paginas: 48, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.60, stock: 135, tieneStickers: true,
  },
  {
    sku: "BR-S-S-5141", upc: "6014417155141", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES CON STICKERS", coleccion: "ME VISTO",
    descripcion: "2 Portadas: Me Visto Niñas Bonitas, Me Visto Oficios. 32 pág. + 4 de stickers 21 x 28 cm",
    paginas: 32, dimensiones: "21 x 28 cm", portadas: 2, moq: 24, precio: 1.64, stock: 258, tieneStickers: true,
  },
  {
    sku: "BR-S-S-6193", upc: "6014417156193", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES CON STICKERS", coleccion: "CREA CARITAS (GRACIOSAS Y BONITAS)",
    descripcion: "2 Portadas: Crea Caras Bonitas, Graciosas. 32 pág. + 4 de stickers 20 x 27 cm",
    paginas: 32, dimensiones: "20 x 27 cm", portadas: 2, moq: 24, precio: 1.64, stock: 194, tieneStickers: true,
  },
  {
    sku: "MM-S-CS-4697", upc: "6014417674697", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES CON STICKERS", coleccion: "SUPER BLOCK DE STICKERS",
    descripcion: "2 Portadas. 8 páginas 197x270mm",
    paginas: 8, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 2.10, stock: 129, tieneStickers: true,
  },
  {
    sku: "BR-S-CS-0271", upc: "6014417270271", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES CON STICKERS", coleccion: "PEGA Y COLOREA",
    descripcion: "4 Portadas: La Granja, Los Animales, Alimentos, La Ciudad. 48 pág. + 2 de stickers 19.7 x 27 cm",
    paginas: 48, dimensiones: "19.7 x 27 cm", portadas: 4, moq: 24, precio: 1.60, stock: 553, tieneStickers: true,
  },
  {
    sku: "BR-S-AS-5994", upc: "6014416965994", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES CON STICKERS", coleccion: "PRACTICO EN CASA",
    descripcion: "4 Portadas: Colores, Abecedario, Formas, Números. 48 pág. + 2 de stickers 21 x 28 cm",
    paginas: 48, dimensiones: "21 x 28 cm", portadas: 4, moq: 24, precio: 1.60, stock: 408, tieneStickers: true,
  },
  {
    sku: "BP-S-A-4338", upc: "6014417364338", hsCode: "49030000",
    categoria: "LIBRO DE ACTIVIDADES", coleccion: "JUGANDO A ESCRIBIR",
    descripcion: "2 Portadas: Abecedario, Números. 48 páginas 19.7 x 27 cm",
    paginas: 48, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.25, stock: 252,
  },

  // ── LIBROS DE COLOREAR (catálogo principal) ───────────────────────────────
  {
    sku: "MM-S-C-8766", upc: "6014417718766", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "SUPER LIBRO DE COLOREAR",
    descripcion: "Libro de Colorear con 2 Portadas. 80 páginas 197x270mm",
    paginas: 80, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.12, stock: 73,
  },
  {
    sku: "BP-S-C-0136", upc: "6014417180136", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "YO COLOREO",
    descripcion: "4 Portadas: Unicornios, Universo, Sirena, Pirata. 24 páginas 19.7 x 27 cm",
    paginas: 24, dimensiones: "19.7 x 27 cm", portadas: 4, moq: 24, precio: 0.77, stock: 372,
  },
  {
    sku: "BP-S-CS-9217", upc: "6014417229217", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "MI PRIMER LIBRO DE COLOREAR",
    descripcion: "4 Portadas: Cohete, Mariposa, Flor, Oso. 24 pág. + 1 de stickers 19.7 x 27 cm",
    paginas: 24, dimensiones: "19.7 x 27 cm", portadas: 4, moq: 24, precio: 0.91, stock: 267, tieneStickers: true,
  },
  {
    sku: "MM-S-C-3479", upc: "6014417423479", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "SUPER LIBRO DE COLOREAR (DINOSAURIOS)",
    descripcion: "2 Portadas: Dinosaurios, Super cute. 80 páginas 19.7 x 27 cm Papel Prensa",
    paginas: 80, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 0.96, stock: 360,
  },
  {
    sku: "MM-S-C-3528", upc: "6014417543528", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "COLOREAR CON DINOSAURIOS",
    descripcion: "2 Portadas: Colorea Dinosaurios. 24 páginas 19.7 x 27 cm",
    paginas: 24, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 0.77, stock: 332,
  },
  {
    sku: "MM-S-C-5494", upc: "6014417455494", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "AVENTURAS CON COLORES",
    descripcion: "4 Portadas: Princesas, Dinosaurios, La Granja, Unicornio. 16 páginas 19.7 x 27 cm",
    paginas: 16, dimensiones: "19.7 x 27 cm", portadas: 4, moq: 96, precio: 0.71, stock: 269,
  },
  {
    sku: "MM-S-C-8474", upc: "6014417428474", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "MANDALAS PAZ Y COLOR",
    descripcion: "1 Portada: Paz y Color Pequeños. 96 páginas 19.7 x 27 cm",
    paginas: 96, dimensiones: "19.7 x 27 cm", portadas: 1, moq: 24, precio: 2.23, stock: 256,
  },
  {
    sku: "MM-S-C-6550", upc: "6014417546550", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "ARTE PARA EL ALMA MANDALAS",
    descripcion: "2 Portadas: Amor, Animales. 24 páginas 19.7 x 27 cm",
    paginas: 24, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 0.77, stock: 271,
  },
  {
    sku: "MM-S-C-6543", upc: "6014417546543", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "RELAJATE CON MANDALAS Y FLORES",
    descripcion: "2 Portadas: Flores, Tatuajes. 24 páginas 19.7 x 27 cm",
    paginas: 24, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 0.77, stock: 352,
  },
  {
    sku: "MM-S-C-5515", upc: "6014417545515", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "ENCUENTRA LA PAZ EN EL ARTE MANDALAS",
    descripcion: "2 Portadas: Vol. 1, Vol.2. 80 páginas 19.7 x 27 cm",
    paginas: 80, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 1.53, stock: 457,
  },
  {
    sku: "BP-S-C-9318", upc: "6014417379318", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "MANDALAS ANIMALES Y TATUAJES",
    descripcion: "Libro de Colorear - 24 páginas - Blanco y Negro - 21x27cm",
    paginas: 24, dimensiones: "21 x 27 cm", portadas: 1, moq: 24, precio: 0.77, stock: 63,
  },
  {
    sku: "BP-S-C-9349", upc: "6014417379349", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "MANDALAS AMOR Y NATURALEZA",
    descripcion: "Libro de Colorear - 24 páginas - Blanco y Negro - 21x27cm",
    paginas: 24, dimensiones: "21 x 27 cm", portadas: 1, moq: 24, precio: 0.77, stock: 145,
  },
  {
    sku: "BP-S-A-7212", upc: "6014417237212", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "MI PRIMER LIBRO DE TRABAJO",
    descripcion: "2 Portadas: Trazos, Abecedario. 24 páginas 19.7 x 27 cm",
    paginas: 24, dimensiones: "19.7 x 27 cm", portadas: 2, moq: 24, precio: 0.81, stock: 222,
  },
  {
    sku: "BP-S-C-4219", upc: "6014417254219", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR", coleccion: "COLOREA DINOSAURIOS",
    descripcion: "1 Portada: Colorea Dinosaurios. 24 páginas 19.7 x 27 cm",
    paginas: 24, dimensiones: "19.7 x 27 cm", portadas: 1, moq: 24, precio: 0.77, stock: 119,
  },
  {
    sku: "BP-S-CL-2523", upc: "6014417522523", hsCode: "49030000",
    categoria: "LIBRO DE COLOREAR CON LECTURA", coleccion: "CUENTOS PARA COLOREAR",
    descripcion: "4 Portadas: La Bella Durmiente, La Sirenita, La Bella y la Bestia, El Patito Feo. 16 páginas 21 x 28 cm",
    paginas: 16, dimensiones: "21 x 28 cm", portadas: 4, moq: 24, precio: 0.65, stock: 492,
  },

  // ── PASATIEMPOS ───────────────────────────────────────────────────────────
  {
    sku: "MM-S-CR-8582", upc: "6014417578582", hsCode: "49030000",
    categoria: "PASATIEMPOS", coleccion: "CRUCIGRAMAS #2",
    descripcion: "2 Portadas: Crucigramas. 100 páginas. 24x16.50cm. Papel Prensa",
    paginas: 100, dimensiones: "24 x 16.5 cm", portadas: 2, moq: 24, precio: 0.95, stock: 298,
  },
  {
    sku: "BR-S-CR-9039", upc: "6014417029039", hsCode: "49030000",
    categoria: "PASATIEMPOS", coleccion: "DESAFIANTES CRUCIGRAMAS",
    descripcion: "2 Portadas: Vol. 1, Vol.2. 80 páginas 20 x 26 cm Papel Prensa",
    paginas: 80, dimensiones: "20 x 26 cm", portadas: 2, moq: 24, precio: 0.90, stock: 120,
  },

  // ── PACKS / MINIPACKS ─────────────────────────────────────────────────────
  {
    sku: "MM-S-PRO-0533A", upc: "6014417550533", hsCode: "49030000",
    categoria: "PACKS", coleccion: "PACK DIVERSION PRINCESAS Y DINOSAURIOS",
    descripcion: "Libro 24 pág. colorear + 4 lápices de colores + hoja de stickers + Rompecabezas",
    paginas: 24, dimensiones: "Varios", portadas: 1, moq: 24, precio: 2.15, stock: 101,
  },
  {
    sku: "MM-S-PRO-0533B", upc: "6014417550533", hsCode: "49030000",
    categoria: "PACKS", coleccion: "PACK DIVERSION FORMAS Y COLORES",
    descripcion: "Libro 24 pág. colorear + 4 lápices de colores + hoja de stickers + Rompecabezas asociativos",
    paginas: 24, dimensiones: "Varios", portadas: 1, moq: 24, precio: 2.15, stock: 106,
  },
  {
    sku: "MM-S-PRO-0533C", upc: "6014417550533", hsCode: "49030000",
    categoria: "PACKS", coleccion: "PACK DIVERSION CUPCAKES Y ANIMALES DEL MAR",
    descripcion: "Libro 24 pág. colorear + 4 lápices de colores + hoja de stickers + Rompecabezas",
    paginas: 24, dimensiones: "Varios", portadas: 1, moq: 24, precio: 2.15, stock: 128,
  },
  {
    sku: "NV-S-PME-2225", upc: "6014417222225", hsCode: "9503008900",
    categoria: "PACKS", coleccion: "MASCOTAS DINO PACK CON DIVERSION (MEMO Y DOMINO)",
    descripcion: "Libro 24 pág. colorear + 4 lápices + hoja de stickers + Juego de Memoria o Dominó",
    paginas: 24, dimensiones: "Varios", portadas: 1, moq: 24, precio: 2.15, stock: 189,
  },
  {
    sku: "NJ-S-CK-9533", upc: "6014417589533", hsCode: "EN REVISION",
    categoria: "PACKS", coleccion: "CREATIVE KIT DINOSAURS",
    descripcion: "1 Libro de Colorear + 4 Poster de Color + 3 Páginas de Stickers + 2 Tarjetas Armables + 6 Creyones",
    paginas: 0, dimensiones: "Varios", portadas: 1, moq: 12, precio: 4.26, stock: 174,
  },
  {
    sku: "NJ-S-CK-9519", upc: "6014417589519", hsCode: "EN REVISION",
    categoria: "PACKS", coleccion: "CREATIVE KIT CUTE DREAMS",
    descripcion: "1 Libro de Colorear + 4 Poster de Color + 3 Páginas de Stickers + 2 Tarjetas Armables + 6 Creyones",
    paginas: 0, dimensiones: "Varios", portadas: 1, moq: 12, precio: 4.26, stock: 249,
  },
];

// ── Helpers de filtrado ───────────────────────────────────────────────────────

/** Todos los productos con stock disponible */
export function productosConStock(): Producto[] {
  return PRODUCTOS.filter((p) => p.stock > 0);
}

/** Filtrar por precio máximo y stock */
export function filtrarProductos(opts: {
  precioMaximo?: number;
  categorias?: string[];
  soloConStock?: boolean;
}): Producto[] {
  return PRODUCTOS.filter((p) => {
    if (opts.soloConStock && p.stock === 0) return false;
    if (opts.precioMaximo !== undefined && p.precio > opts.precioMaximo) return false;
    if (opts.categorias && opts.categorias.length > 0) {
      if (!opts.categorias.includes(p.categoria)) return false;
    }
    return true;
  });
}
