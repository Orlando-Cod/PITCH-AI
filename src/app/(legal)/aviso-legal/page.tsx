import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal — Sicoben Ediciones",
};

export default function AvisoLegal() {
  return (
    <article className="prose-legal">
      <h1>Aviso Legal</h1>
      <p className="lead">
        Información legal sobre Sicoben Ediciones y la plataforma PITCH AI.
      </p>
      <p className="meta">Última actualización: junio de 2026</p>

      <h2>1. Identificación del titular</h2>
      <p>
        <strong>Razón social:</strong> Sicoben Ediciones<br />
        <strong>RUC:</strong> 155-000000-000000{" "}
        <span className="note">(por actualizar con RUC real)</span><br />
        <strong>País de constitución:</strong> República de Panamá<br />
        <strong>Actividad:</strong> Edición y distribución de libros infantiles<br />
        <strong>Correo de contacto:</strong>{" "}
        <a href="mailto:orlando.jaime@sicobenediciones.com">
          orlando.jaime@sicobenediciones.com
        </a>
      </p>

      <h2>2. Objeto y ámbito de aplicación</h2>
      <p>
        PITCH AI es una aplicación web de uso <strong>exclusivamente interno</strong>{" "}
        diseñada para que los ejecutivos de ventas de Sicoben Ediciones generen
        propuestas comerciales de displays de libros infantiles de forma automatizada.
      </p>
      <p>
        La plataforma opera en los mercados de Centroamérica y Sudamérica (excepto
        Brasil) donde Sicoben Ediciones tiene presencia comercial: Nicaragua, Panamá,
        Costa Rica, Guatemala, El Salvador, Honduras y países de América del Sur.
      </p>

      <h2>3. Propiedad intelectual</h2>
      <p>
        El software, diseño, código fuente, interfaces, textos, imágenes y demás
        elementos que componen PITCH AI son propiedad exclusiva de{" "}
        <strong>Sicoben Ediciones</strong> o de sus licenciantes, y están protegidos
        por las leyes de propiedad intelectual vigentes en la República de Panamá y
        los convenios internacionales aplicables.
      </p>
      <p>
        Queda expresamente prohibida su reproducción, distribución, comunicación
        pública o transformación sin autorización escrita de Sicoben Ediciones.
      </p>

      <h2>4. Marcas de terceros</h2>
      <p>
        PITCH AI puede mostrar imágenes y referencias a productos con licencias de
        terceros: Disney, Mattel, Hasbro, Universal Pictures, Paramount, Ludo
        Studio (Bluey) y otros. Dichas marcas y contenidos son propiedad de sus
        respectivos titulares. Su aparición en la plataforma se limita al uso
        interno de gestión comercial autorizado por los contratos de licencia
        vigentes entre Sicoben Ediciones y cada licenciante.
      </p>

      <h2>5. Exclusión de responsabilidad</h2>
      <p>
        Sicoben Ediciones no garantiza la exactitud o integridad de los datos del
        catálogo en todo momento, especialmente durante la Fase 1 del proyecto
        donde se usan datos simulados. El usuario es responsable de verificar
        la información antes de usarla en propuestas reales.
      </p>
      <p>
        Sicoben Ediciones no se responsabiliza por daños derivados del uso incorrecto
        de la plataforma, accesos no autorizados por incumplimiento de las medidas
        de seguridad por parte del usuario, ni por la disponibilidad de servicios
        de terceros (Supabase, Vercel, Resend).
      </p>

      <h2>6. Protección de datos</h2>
      <p>
        El tratamiento de datos personales se realiza conforme a la{" "}
        <strong>Ley N.° 81 de 26 de marzo de 2019</strong> de la República de Panamá.
        Consulta nuestra{" "}
        <a href="/privacidad">Política de Privacidad</a> para más información.
      </p>

      <h2>7. Ley aplicable</h2>
      <p>
        Este aviso legal se rige por la legislación vigente en la{" "}
        <strong>República de Panamá</strong>. Para cualquier controversia derivada
        del uso de PITCH AI, las partes se someten a los tribunales competentes
        de la Ciudad de Panamá, renunciando expresamente a cualquier otro fuero
        que pudiera corresponderles.
      </p>

      <h2>8. Contacto</h2>
      <p>
        Para cualquier consulta legal relacionada con esta plataforma:{" "}
        <a href="mailto:orlando.jaime@sicobenediciones.com">
          orlando.jaime@sicobenediciones.com
        </a>
      </p>
    </article>
  );
}
