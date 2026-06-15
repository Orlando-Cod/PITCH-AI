import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "..", "src", "lib", "mock-data", "productos.ts");
let content = fs.readFileSync(file, "utf-8");

// Para cada sku: "XXXX", agrega portada: "/portadas/XXXX.svg" después de licencia: "...",
// Busca el patrón: sku: "SKU", y el bloque que sigue tiene licencia: "LICENCIA", al final
// Queremos agregar portada justo antes del cierre del objeto },

// Reemplaza: licencia: "XXXX",\n  }  →  licencia: "XXXX",\n    portada: "/portadas/SKU.svg",\n  }
// Necesitamos el SKU del mismo objeto

// Estrategia: para cada objeto de producto, encontrar el sku y agregar portada si no existe
const productRegex = /\{\s*\n\s*sku:\s*"([^"]+)"([\s\S]*?)licencia:\s*"[^"]+",\s*\n(\s*\})/g;

content = content.replace(productRegex, (match, sku, middle, closing) => {
  if (match.includes("portada:")) return match; // ya tiene portada
  const portadaPath = `/portadas/${sku.replace(/[^a-zA-Z0-9-]/g, "_")}.svg`;
  return match.replace(/licencia:\s*"([^"]+)",(\s*\n\s*\})/, (m, lic, end) => {
    return `licencia: "${lic}",\n    portada: "${portadaPath}",${end}`;
  });
});

fs.writeFileSync(file, content, "utf-8");
console.log("✓ Campo portada agregado a todos los productos");
