# MASTERPLAN: PITCH AI — Autogeneración de Propuestas Visuales de Displays
### Sicoben Ediciones | Módulo 10

---

## Descripción General

### ¿Qué problema resuelve tu producto?
Mi producto es una plataforma web interna para ejecutivos de ventas de Sicoben Ediciones que permite generar automáticamente propuestas comerciales visuales (presentaciones) para clientes retailers y distribuidores en minutos, con solo ingresar parámetros simples como tipo de display, colección de libros y precio objetivo.

El problema que resuelve es que actualmente cada propuesta se construye manualmente: el ejecutivo selecciona productos del catálogo revisando inventario, filtra por precio y categoría, diseña una presentación en PowerPoint eligiendo imágenes y cantidades, y finalmente genera el PDF. Este proceso toma varias horas por propuesta, es propenso a errores, no garantiza consistencia visual de marca, y no optimiza el inventario disponible.

### ¿Quién es tu usuario ideal?
- **Perfil:** Ejecutivo(a) de Ventas de Sicoben Ediciones, maneja múltiples cuentas de retailers y distribuidores simultáneamente en distintos países (Nicaragua, Panamá y región centroamericana)
- **Problema principal:** Pierde horas creando presentaciones manualmente para cada cliente, con riesgo de incluir productos sin stock o precios incorrectos
- **Cómo lo resuelve actualmente:** Construye cada PPT a mano en PowerPoint, consultando inventario por separado y eligiendo imágenes una a una
- **Por qué tu solución es mejor:** En menos de 10 minutos tiene una propuesta lista, con diseño de marca consistente, productos con stock real y exportada en PPT, PDF o HTML para compartir al instante

### ¿Qué hace tu producto exactamente?
PITCH AI es una herramienta web que automatiza la creación de propuestas comerciales de displays de libros infantiles. El ejecutivo ingresa parámetros básicos (tipo de display, colección, precio objetivo, cliente, país, descuento negociado), y el sistema consulta automáticamente la base de datos maestra de productos, filtra por inventario disponible, precio y temporada, y genera una presentación ejecutiva completa con diseño corporativo de Sicoben, imágenes de portadas actualizadas, planograma por bandeja y listado de precios con descuentos.

El resultado final es una propuesta lista para presentar al cliente, exportable en tres formatos: PowerPoint editable, PDF para enviar por correo/WhatsApp, y HTML como link compartible desde cualquier dispositivo.

---

## Funcionalidades Principales (MVP)

1. [x] Formulario de configuración de propuesta (parámetros del ejecutivo)
2. [x] Motor de filtrado de productos por precio, stock, categoría, páginas y temporada
3. [x] Optimización automática del mix de productos por bandeja/cara de display
4. [x] Generación automática de presentación con diseño de marca Sicoben
5. [x] Estructura de slides: portada → separador display → ficha técnica → planograma por caras
6. [x] Exportación en PowerPoint (.pptx)
7. [x] Exportación en PDF
8. [x] Exportación en HTML (link compartible)
9. [x] Editor visual post-generación (cambiar productos, ajustar cantidades, editar textos)
10. [x] Listado de precios con precio normal y precio con descuento (5%, 10%, 20%) visible simultáneamente
11. [x] Generación de fichas técnicas por producto (recurso didáctico para negociación)
12. [x] Catálogo editable para distribuidores (con campo de código interno del distribuidor)
13. [x] Historial de propuestas generadas por cliente
14. [x] Login de usuarios (acceso exclusivo para ejecutivos internos)
15. [x] Integración con Base de Datos Maestra de productos (Proyecto Ruth)
16. [x] Integración con Biblioteca de Imágenes en la Nube de portadas aprobadas (Proyecto María)
17. [x] Recomendación de productos basada en historial de compras del cliente
18. [x] Responsive: funciona en computadora, tablet y celular (navegador web)

---

## Flujo del Usuario (Happy Path)

1. El ejecutivo entra al sistema desde su navegador (computadora, tablet o celular)
2. Hace login con su usuario y contraseña
3. Hace clic en **"Nueva Propuesta"**
4. Llena el formulario de configuración en menos de 2 minutos:
   - Nombre del cliente (ej: "Walmart Nicaragua")
   - País de destino
   - Tipo de cliente (Retailer / Distribuidor / Aliado Comercial)
   - Tipo de display (tubular 16 espacios, piso 8 espacios, colgante, etc.)
   - Número de caras a cotizar (1, 2, 3 o 4)
   - Colecciones/categorías (Lectura, Colorear, Actividades, Stickers, Temprana Edad, Mix)
   - Páginas por libro (16, 24, 48, 80, 96, Cartón Duro)
   - Precio objetivo por unidad ($)
   - Precio al distribuidor o % de descuento negociado (5%, 10%, 20%)
   - Licenciados / No licenciados / Mix
   - Temporada (Back to School, Navidad, Todo el año, etc.)
   - Observaciones adicionales (texto libre)
5. El sistema consulta la BD Maestra (Proyecto Ruth) y filtra productos disponibles según los parámetros
6. El sistema genera un mix recomendado de productos, optimizado por bandeja y cara del display
7. El ejecutivo revisa el planograma propuesto en pantalla
8. Si desea, ajusta el mix: cambia productos, modifica cantidades, reordena bandejas (drag & drop)
9. Hace clic en **"Generar Propuesta"**
10. El sistema construye automáticamente todos los slides con imágenes de portadas (desde Biblioteca de María), unidades por espacio y diseño de marca Sicoben
11. El ejecutivo previsualiza la presentación completa en pantalla
12. Selecciona el formato de exportación: **PPT / PDF / HTML**
13. Descarga el archivo o copia el link para compartir con el cliente
14. La propuesta queda guardada en el historial del cliente para consulta futura

---

## Flujo del Administrador

1. Accede al panel de administración con credenciales especiales
2. Ve la lista de ejecutivos registrados y puede agregar/desactivar usuarios
3. Monitorea las propuestas generadas (por ejecutivo, por cliente, por período)
4. Gestiona los tipos de displays disponibles y su configuración de bandejas
5. Actualiza las plantillas de diseño y colores de marca cuando sea necesario
6. Revisa el estado de la sincronización con la BD Maestra (Proyecto Ruth) y la Biblioteca de Imágenes (Proyecto María)

---

## Referencias Visuales

- **Presentación PRODIMPA Q2 2026** (archivo adjunto en el proyecto) — Esta es la referencia principal de estructura y diseño. El sistema debe replicar exactamente este formato: portada corporativa, slides de separador de mueble exhibidor, ficha técnica de caras/bandejas, y planograma visual con productos.

**Paleta de colores:** Slate / Blue / Orange (colores corporativos Sicoben Ediciones)  
**Estilo general:** Corporativo ejecutivo, limpio, con fondo bokeh suave relacionado a libros e infancia  
**Tipografía:** Fuentes corporativas de alta legibilidad  
**Regla de títulos:** Máximo 40 caracteres por título de slide

---

## Integraciones Externas

| Servicio | Propósito | Prioridad |
|----------|-----------|-----------|
| Base de Datos Maestra (Proyecto Ruth) | SKU, nombre, categoría, páginas, precio, stock, MOQ, temporada | MVP — Fase 2 |
| Biblioteca de Imágenes en la Nube (Proyecto María) | Portadas aprobadas en alta resolución por SKU | MVP — Fase 2 |
| PptxGenJS | Generación de archivos .pptx programáticamente | MVP |
| Puppeteer | Renderizado de HTML a PDF de alta fidelidad | MVP |
| Sistema de autenticación | Login de usuarios internos | MVP |

> **Nota sobre integraciones:** Durante el desarrollo del MVP se usarán datos mock (simulados) hasta que los Proyectos Ruth y María estén listos para conectarse vía API REST o acceso directo a base de datos.

---

## Stack Tecnológico

- **Frontend:** React.js + TailwindCSS (responsive, web y móvil)
- **Backend:** Node.js + Express (lógica de negocio y generación de archivos)
- **Base de datos:** PostgreSQL (historial de propuestas, clientes, configuraciones)
- **Generación PPT:** PptxGenJS
- **Generación PDF:** Puppeteer (HTML → PDF)
- **Output HTML:** Componentes React exportados como HTML estático con link compartible
- **Almacenamiento de imágenes:** Integración con Biblioteca en la Nube de María (Google Drive API / AWS S3 / Cloudinary — por definir)
- **Hosting:** Vercel / Railway / VPS (accesible desde cualquier dispositivo sin instalación)
- **Idioma:** Español

---

## Modelo de Negocio

- [x] **Uso interno** — La herramienta es para uso exclusivo del equipo de ventas de Sicoben Ediciones. No genera ingresos directos, pero su valor se mide en horas de trabajo ahorradas y en el incremento de propuestas enviadas a clientes por período.

**Valor estimado:** Reducción de 3-4 horas a menos de 10 minutos por propuesta. Si un ejecutivo genera 5 propuestas por semana, se ahorran aproximadamente 15-20 horas semanales de trabajo por ejecutivo.

---

## Estructura de la Presentación Generada

El sistema replica exactamente este formato (basado en la presentación PRODIMPA):

| Slide | Contenido |
|-------|-----------|
| 1 | Portada: Logo Sicoben, nombre del cliente, trimestre/año |
| 2 | Separador: "MUEBLE EXHIBIDOR N°X — DISPLAY [TIPO]" |
| 3 | Ficha técnica del display: caras, pisos, bandejas, capacidad por tipo de libro |
| 4-5 | Planograma cara 1 y cara 2: imagen del display con productos por bandeja y unidades |
| 6-7 | Planograma cara 3 y cara 4 |
| 8+ | Se repite el ciclo si hay más de un display |
| Último | Listado de precios: SKU, nombre, precio normal, precio con descuento |

---

## Outputs Adicionales (Fase 3)

- **Ficha técnica por producto:** Imagen de portada + descripción + páginas + precio + datos clave. Uso del vendedor como material didáctico en la negociación con el cliente.
- **Catálogo editable para distribuidores:** El distribuidor puede indicar su número de código interno por producto.
- **Generación de imágenes en alta resolución:** Extraídas de la Biblioteca en la Nube según la última compra del cliente.
- **Listado de precios con descuentos diferenciados:** 5%, 10% y 20% en una misma vista, siempre mostrando el precio normal para que la diferencia sea visible.

---

## Fuera del Alcance (MVP)

- Portal externo para que los clientes (distribuidores) vean sus propuestas directamente
- Firma electrónica de propuestas
- Integración con CRM o sistema de pedidos
- IA generativa para crear imágenes de libros que no existan en la biblioteca
- App nativa para iOS o Android (el MVP es web responsive)
- Módulo de analíticas de propuestas aceptadas vs. rechazadas
- Multilenguaje (el sistema es solo en español en el MVP)

---

## Fases de Desarrollo

### Fase 1 — MVP (8-12 semanas)
- Formulario de parámetros completo
- Motor de filtrado y selección con datos mock
- Generación de presentación PPT con diseño de marca Sicoben
- Exportación en PPT y PDF
- Login básico de usuarios
- Acceso web responsive

### Fase 2 — Integración (4-6 semanas)
- Conexión con Base de Datos Maestra (Proyecto Ruth) vía API
- Conexión con Biblioteca de Imágenes (Proyecto María)
- Historial de propuestas por cliente
- Editor visual post-generación (drag & drop de productos)

### Fase 3 — Funcionalidades Avanzadas (4-6 semanas)
- Exportación HTML como link compartible
- Fichas técnicas por producto
- Catálogo editable para distribuidores
- Listado de precios con descuentos diferenciados
- Recomendación por historial de compras del cliente
- Panel de administración completo

---

## Criterios de Aceptación del MVP

El MVP se considera listo cuando:

- [ ] Un ejecutivo puede configurar y generar una propuesta completa sin ayuda en menos de 10 minutos
- [ ] La presentación generada replica el formato y diseño de las propuestas PRODIMPA actuales
- [ ] Solo se muestran productos con stock disponible
- [ ] La exportación en PPT y PDF funciona correctamente en todos los formatos
- [ ] El sistema es accesible desde navegador web en computadora, tablet y celular
- [ ] Al menos 2 ejecutivos de ventas prueban el sistema y aprueban su uso

---

## Notas Adicionales

- El proyecto de inventario de **Ruth** y la biblioteca de imágenes de **María** son dependencias críticas para la Fase 2. Durante el MVP se trabajará con datos simulados (mock data) que replican la estructura esperada, para no bloquear el desarrollo.
- El formato de la presentación está documentado y validado con base en el archivo **"Propuestas - Varias - PRODIMPA - Q2 2026.pptx"** entregado como referencia.
- La capacidad por bandeja varía según el tipo de libro: libros de 24 páginas caben más unidades por espacio que libros de 80 páginas. Esta lógica debe estar configurada en el sistema por tipo de producto.
- El sistema debe manejar múltiples países (Nicaragua, Panamá, Centroamérica) con posibilidad de tener precios diferenciados por mercado en el futuro.

---

*MASTERPLAN v1.0 — Junio 2026 | Sicoben Ediciones — PITCH AI Módulo 10*
