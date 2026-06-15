import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "..", "public", "portadas");
fs.mkdirSync(outputDir, { recursive: true });

// Colores por licencia
const LICENSE_COLORS = {
  "Disney":           { from: "#1565C0", to: "#1E88E5", strip: "#FFC107" },
  "Mattel":           { from: "#AD1457", to: "#E91E63", strip: "#FF80AB" },
  "Hasbro":           { from: "#4527A0", to: "#7E57C2", strip: "#E040FB" },
  "Universal":        { from: "#BF360C", to: "#F57C00", strip: "#FFCA28" },
  "Paramount":        { from: "#1A237E", to: "#3949AB", strip: "#82B1FF" },
  "Bluey":            { from: "#0277BD", to: "#0288D1", strip: "#81D4FA" },
  "Sicoben Original": { from: "#1B5E20", to: "#2E7D32", strip: "#A5D6A7" },
};

// Override de color para Sicoben según categoría
const CAT_COLORS = {
  "LIBRO DE COLOREAR":                  { from: "#00695C", to: "#00897B", strip: "#80CBC4" },
  "LIBRO DE LECTURA":                   { from: "#1565C0", to: "#1976D2", strip: "#90CAF9" },
  "LIBRO DE ACTIVIDADES":               { from: "#E65100", to: "#EF6C00", strip: "#FFCC80" },
  "LIBRO DE ACTIVIDADES CON STICKERS":  { from: "#880E4F", to: "#C2185B", strip: "#F48FB1" },
  "LIBRO DE COLOREAR CON LECTURA":      { from: "#4A148C", to: "#6A1B9A", strip: "#CE93D8" },
  "PASATIEMPOS":                        { from: "#37474F", to: "#546E7A", strip: "#B0BEC5" },
  "PACKS":                              { from: "#BF360C", to: "#D84315", strip: "#FF8A65" },
};

const CAT_LABEL = {
  "LIBRO DE COLOREAR":                  "Colorear",
  "LIBRO DE LECTURA":                   "Lectura",
  "LIBRO DE ACTIVIDADES":               "Actividades",
  "LIBRO DE ACTIVIDADES CON STICKERS":  "Actividades + Stickers",
  "LIBRO DE COLOREAR CON LECTURA":      "Colorear + Lectura",
  "PASATIEMPOS":                        "Pasatiempos",
  "PACKS":                              "Pack",
  "JUEGOS DIDACTICOS":                  "Juegos",
};

// Divide texto en líneas de máximo N caracteres
function wrapText(text, max = 16) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const candidate = cur ? cur + " " + w : w;
    if (candidate.length <= max) { cur = candidate; }
    else { if (cur) lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 4);
}

function makeSVG({ sku, coleccion, categoria, licencia, precio }) {
  const isOriginal = licencia === "Sicoben Original";
  const palette = isOriginal
    ? (CAT_COLORS[categoria] || LICENSE_COLORS["Sicoben Original"])
    : (LICENSE_COLORS[licencia] || LICENSE_COLORS["Sicoben Original"]);

  const lines = wrapText(coleccion);
  const totalH = lines.length * 20;
  const startY = 148 - totalH / 2;
  const textEls = lines.map((l, i) =>
    `<text x="105" y="${startY + i * 20}" text-anchor="middle" fill="white"
       font-family="Arial,sans-serif" font-size="${lines.length > 2 ? 12 : 13}"
       font-weight="bold">${l}</text>`
  ).join("\n  ");

  const licLabel = licencia === "Sicoben Original" ? "SICOBEN" : licencia.toUpperCase();
  const catLabel = (CAT_LABEL[categoria] || categoria).toUpperCase();

  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="280" viewBox="0 0 200 280">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.from}"/>
      <stop offset="100%" stop-color="${palette.to}"/>
    </linearGradient>
  </defs>

  <!-- Fondo -->
  <rect width="200" height="280" fill="url(#g)" rx="3"/>

  <!-- Lomo del libro -->
  <rect x="0" y="0" width="12" height="280" fill="rgba(0,0,0,0.30)" rx="3"/>

  <!-- Franja superior de color -->
  <rect x="12" y="0" width="188" height="38" fill="rgba(0,0,0,0.22)"/>

  <!-- Strip de color (licencia) -->
  <rect x="12" y="0" width="5" height="38" fill="${palette.strip}" opacity="0.85"/>

  <!-- Nombre licencia -->
  <text x="106" y="24" text-anchor="middle" fill="rgba(255,255,255,0.95)"
        font-family="Arial,sans-serif" font-size="10" font-weight="bold" letter-spacing="2">${licLabel}</text>

  <!-- Círculos decorativos -->
  <circle cx="170" cy="78" r="38" fill="rgba(255,255,255,0.06)"/>
  <circle cx="35"  cy="215" r="30" fill="rgba(0,0,0,0.10)"/>
  <circle cx="175" cy="230" r="18" fill="rgba(255,255,255,0.05)"/>

  <!-- Línea acento izquierda -->
  <rect x="17" y="110" width="3" height="60" fill="${palette.strip}" opacity="0.6" rx="2"/>

  <!-- Nombre de colección -->
  ${textEls}

  <!-- Franja inferior -->
  <rect x="12" y="242" width="188" height="38" fill="rgba(0,0,0,0.25)"/>

  <!-- Categoría -->
  <text x="106" y="257" text-anchor="middle" fill="rgba(255,255,255,0.65)"
        font-family="Arial,sans-serif" font-size="8" letter-spacing="1">${catLabel}</text>

  <!-- SKU -->
  <text x="106" y="272" text-anchor="middle" fill="rgba(255,255,255,0.35)"
        font-family="Arial,sans-serif" font-size="7">${sku}</text>

  <!-- Precio -->
  <rect x="136" y="5" width="58" height="20" rx="10" fill="rgba(255,255,255,0.18)"/>
  <text x="165" y="19" text-anchor="middle" fill="white"
        font-family="Arial,sans-serif" font-size="10" font-weight="bold">$${precio.toFixed(2)}</text>
</svg>`;
}

// Lista de productos (extraída de mock-data/productos.ts)
const PRODUCTOS = [
  { sku:"MM-S-C-2757",    coleccion:"COLOR EN CALMA",                                categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:1.25 },
  { sku:"MM-S-C-3747",    coleccion:"DISEÑO Y DESCANSO",                             categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:1.25 },
  { sku:"MM-S-C-4782",    coleccion:"PATRONES Y PLENITUD",                           categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:1.25 },
  { sku:"MM-S-C-1705",    coleccion:"RITMO DE LINEAS",                               categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:1.25 },
  { sku:"BP-S-L-1038",    coleccion:"CUENTOS CLÁSICOS 6 EN 1",                       categoria:"LIBRO DE LECTURA",                  licencia:"Disney",           precio:4.79 },
  { sku:"MM-S-L-7410",    coleccion:"CUENTO PARA DESPERTAR",                         categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:3.84 },
  { sku:"MM-S-L-6499",    coleccion:"GENTE COMO TU QUE CAMBIO AL MUNDO 2",          categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:3.84 },
  { sku:"BP-S-L-1429",    coleccion:"CUENTOS CLASICOS",                              categoria:"LIBRO DE LECTURA",                  licencia:"Disney",           precio:0.95 },
  { sku:"MM-S-L-7066",    coleccion:"CUENTOS QUE DEBES SABER",                       categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:2.00 },
  { sku:"MM-S-L-3248",    coleccion:"LEE CON PICTOGRAMAS",                           categoria:"LIBRO DE LECTURA",                  licencia:"Disney",           precio:0.93 },
  { sku:"MM-S-L-3866",    coleccion:"HISTORIAS DE GALORE",                           categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:0.93 },
  { sku:"MM-S-L-0459",    coleccion:"FABULAS DE ESOPO",                              categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:0.93 },
  { sku:"MM-S-L-4978",    coleccion:"YO DEBO",                                       categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:0.82 },
  { sku:"BN-S-L-3634",    coleccion:"HACIENDO CAMINO",                               categoria:"LIBRO DE LECTURA",                  licencia:"Bluey",            precio:3.49 },
  { sku:"MM-S-L-4000",    coleccion:"HISTORIAS DE LA GRANJA",                        categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:0.93 },
  { sku:"MM-S-L-1955",    coleccion:"CRECIENDO EN FAMILIA",                          categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:2.00 },
  { sku:"MM-S-PU-8478",   coleccion:"POP UP",                                        categoria:"LIBRO DE LECTURA",                  licencia:"Disney",           precio:4.79 },
  { sku:"BP-S-L-8540",    coleccion:"CUENTOS DE BIBLIOTECA",                         categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:0.93 },
  { sku:"BP-S-L-9578",    coleccion:"INCREIBLES CONOCIMIENTOS",                      categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:0.93 },
  { sku:"BP-S-L-9546",    coleccion:"CUENTOS DE LA BIBLIA",                          categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:0.93 },
  { sku:"MM-S-L-2014",    coleccion:"BIENESTAR",                                     categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:0.93 },
  { sku:"BN-S-L-5423",    coleccion:"PASOS DE GIGANTES",                             categoria:"LIBRO DE LECTURA",                  licencia:"Bluey",            precio:3.49 },
  { sku:"BN-S-L-5430",    coleccion:"CONECTANDO",                                    categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:3.49 },
  { sku:"IG-S-L-5610",    coleccion:"SUEÑA EN GRANDE 2",                             categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:1.46 },
  { sku:"IG-S-L-6624",    coleccion:"SUEÑA EN GRANDE 4",                             categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:1.46 },
  { sku:"IG-S-L-0644",    coleccion:"SUEÑA EN GRANDE 10",                            categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:1.20 },
  { sku:"IG-S-L-0620",    coleccion:"SUEÑA EN GRANDE 9",                             categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:1.20 },
  { sku:"IG-S-L-2655",    coleccion:"CUANDO SEA GRANDE",                             categoria:"LIBRO DE LECTURA",                  licencia:"Sicoben Original", precio:2.78 },
  { sku:"BP-S-A-0673",    coleccion:"CAMINO A LA ESCRITURA",                         categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:3.39 },
  { sku:"BP-S-A-0666",    coleccion:"MANOS A LA OBRA NIVEL 1",                       categoria:"LIBRO DE ACTIVIDADES CON STICKERS", licencia:"Sicoben Original", precio:3.49 },
  { sku:"BP-S-A-0727",    coleccion:"MANOS A LA OBRA NIVEL 2",                       categoria:"LIBRO DE ACTIVIDADES CON STICKERS", licencia:"Sicoben Original", precio:3.81 },
  { sku:"MM-S-AC-0560",   coleccion:"90 RETOS MENTALES PARA CHICOS LISTOS",          categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:1.76 },
  { sku:"MM-S-AS-8506",   coleccion:"ABREMENTE LABERINTOS",                          categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:1.25 },
  { sku:"MM-S-AS-6514",   coleccion:"ABREMENTE PUNTO A PUNTO Y DIFERENCIAS",         categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:1.25 },
  { sku:"BP-S-AS-5432",   coleccion:"ME DIVIERTO Y APRENDO COLORES Y ABC",           categoria:"LIBRO DE ACTIVIDADES CON STICKERS", licencia:"Sicoben Original", precio:1.60 },
  { sku:"MM-S-A-0567",    coleccion:"CREANDO PALABRAS",                              categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:2.30 },
  { sku:"MM-S-A-0642",    coleccion:"DESAFIA TU MENTE",                              categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:2.30 },
  { sku:"MM-S-A-7390",    coleccion:"ABREMENTE SOPAS DE LETRAS",                     categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:1.25 },
  { sku:"MM-S-CS-5418",   coleccion:"COMIENZO A COLOREAR",                           categoria:"LIBRO DE ACTIVIDADES CON STICKERS", licencia:"Sicoben Original", precio:1.60 },
  { sku:"MM-S-AS-5590",   coleccion:"JUGANDO + STICKERS",                            categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:1.00 },
  { sku:"MM-S-AS-4321",   coleccion:"ME DIVIERTO Y APRENDO FORMAS Y NUMEROS",        categoria:"LIBRO DE ACTIVIDADES CON STICKERS", licencia:"Sicoben Original", precio:1.60 },
  { sku:"BP-S-A-7345",    coleccion:"INCREIBLES ACTV PARA NIÑOS INTELIGENTES",       categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:1.60 },
  { sku:"BP-S-A-5320",    coleccion:"MI PRIMEROS TRAZOS",                            categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:1.25 },
  { sku:"BR-S-A-5862",    coleccion:"APRENDO EN CASA",                               categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:1.64 },
  { sku:"BR-S-A-8564",    coleccion:"PEQUEÑOS GENIOS MATEMATICA Y TIJERA",           categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:1.25 },
  { sku:"BR-S-A-8830",    coleccion:"JUMBO",                                         categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:1.26 },
  { sku:"BR-S-S-5411",    coleccion:"ANIMALES DIVERTIDOS BALLENA Y JIRAFA",          categoria:"LIBRO DE ACTIVIDADES CON STICKERS", licencia:"Sicoben Original", precio:1.64 },
  { sku:"MM-S-AS-0323",   coleccion:"COMIENZO A COLOREAR ESCUELA GRANJA",            categoria:"LIBRO DE ACTIVIDADES CON STICKERS", licencia:"Sicoben Original", precio:1.60 },
  { sku:"BR-S-S-5141",    coleccion:"ME VISTO",                                      categoria:"LIBRO DE ACTIVIDADES CON STICKERS", licencia:"Mattel",           precio:1.64 },
  { sku:"BR-S-S-6193",    coleccion:"CREA CARITAS GRACIOSAS Y BONITAS",              categoria:"LIBRO DE ACTIVIDADES CON STICKERS", licencia:"Sicoben Original", precio:1.64 },
  { sku:"MM-S-CS-4697",   coleccion:"SUPER BLOCK DE STICKERS",                       categoria:"LIBRO DE ACTIVIDADES CON STICKERS", licencia:"Sicoben Original", precio:2.10 },
  { sku:"BR-S-CS-0271",   coleccion:"PEGA Y COLOREA",                                categoria:"LIBRO DE ACTIVIDADES CON STICKERS", licencia:"Sicoben Original", precio:1.60 },
  { sku:"BR-S-AS-5994",   coleccion:"PRACTICO EN CASA",                              categoria:"LIBRO DE ACTIVIDADES CON STICKERS", licencia:"Sicoben Original", precio:1.60 },
  { sku:"BP-S-A-4338",    coleccion:"JUGANDO A ESCRIBIR",                            categoria:"LIBRO DE ACTIVIDADES",              licencia:"Sicoben Original", precio:1.25 },
  { sku:"MM-S-C-8766",    coleccion:"SUPER LIBRO DE COLOREAR",                       categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:1.12 },
  { sku:"BP-S-C-0136",    coleccion:"YO COLOREO",                                    categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:0.77 },
  { sku:"BP-S-CS-9217",   coleccion:"MI PRIMER LIBRO DE COLOREAR",                   categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:0.91 },
  { sku:"MM-S-C-3479",    coleccion:"SUPER LIBRO DE COLOREAR DINOSAURIOS",           categoria:"LIBRO DE COLOREAR",                 licencia:"Universal",        precio:0.96 },
  { sku:"MM-S-C-3528",    coleccion:"COLOREAR CON DINOSAURIOS",                      categoria:"LIBRO DE COLOREAR",                 licencia:"Universal",        precio:0.77 },
  { sku:"MM-S-C-5494",    coleccion:"AVENTURAS CON COLORES",                         categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:0.71 },
  { sku:"MM-S-C-8474",    coleccion:"MANDALAS PAZ Y COLOR",                          categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:2.23 },
  { sku:"MM-S-C-6550",    coleccion:"ARTE PARA EL ALMA MANDALAS",                    categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:0.77 },
  { sku:"MM-S-C-6543",    coleccion:"RELAJATE CON MANDALAS Y FLORES",                categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:0.77 },
  { sku:"MM-S-C-5515",    coleccion:"ENCUENTRA LA PAZ EN EL ARTE MANDALAS",          categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:1.53 },
  { sku:"BP-S-C-9318",    coleccion:"MANDALAS ANIMALES Y TATUAJES",                  categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:0.77 },
  { sku:"BP-S-C-9349",    coleccion:"MANDALAS AMOR Y NATURALEZA",                    categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:0.77 },
  { sku:"BP-S-A-7212",    coleccion:"MI PRIMER LIBRO DE TRABAJO",                    categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:0.81 },
  { sku:"BP-S-C-4219",    coleccion:"COLOREA DINOSAURIOS",                           categoria:"LIBRO DE COLOREAR",                 licencia:"Sicoben Original", precio:0.77 },
  { sku:"BP-S-CL-2523",   coleccion:"CUENTOS PARA COLOREAR",                         categoria:"LIBRO DE COLOREAR CON LECTURA",     licencia:"Disney",           precio:0.65 },
  { sku:"MM-S-CR-8582",   coleccion:"CRUCIGRAMAS 2",                                 categoria:"PASATIEMPOS",                       licencia:"Sicoben Original", precio:0.95 },
  { sku:"BR-S-CR-9039",   coleccion:"DESAFIANTES CRUCIGRAMAS",                       categoria:"PASATIEMPOS",                       licencia:"Sicoben Original", precio:0.90 },
  { sku:"MM-S-PRO-0533A", coleccion:"PACK DIVERSION PRINCESAS Y DINOSAURIOS",        categoria:"PACKS",                             licencia:"Sicoben Original", precio:2.15 },
  { sku:"MM-S-PRO-0533B", coleccion:"PACK DIVERSION FORMAS Y COLORES",               categoria:"PACKS",                             licencia:"Mattel",           precio:2.15 },
  { sku:"MM-S-PRO-0533C", coleccion:"PACK DIVERSION CUPCAKES Y ANIMALES DEL MAR",    categoria:"PACKS",                             licencia:"Sicoben Original", precio:2.15 },
  { sku:"NV-S-PME-2225",  coleccion:"MASCOTAS DINO PACK CON DIVERSION",              categoria:"PACKS",                             licencia:"Universal",        precio:2.15 },
  { sku:"NJ-S-CK-9533",   coleccion:"CREATIVE KIT DINOSAURS",                        categoria:"PACKS",                             licencia:"Sicoben Original", precio:4.26 },
  { sku:"NJ-S-CK-9519",   coleccion:"CREATIVE KIT CUTE DREAMS",                      categoria:"PACKS",                             licencia:"Sicoben Original", precio:4.26 },
];

let count = 0;
for (const p of PRODUCTOS) {
  const filename = p.sku.replace(/[^a-zA-Z0-9-]/g, "_") + ".svg";
  fs.writeFileSync(path.join(outputDir, filename), makeSVG(p), "utf-8");
  count++;
}
console.log(`✓ ${count} portadas SVG generadas en public/portadas/`);
