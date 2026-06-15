import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Sicoben Ediciones",
};

export default function TerminosCondiciones() {
  return (
    <article className="prose-legal">
      <h1>Términos y Condiciones de Uso</h1>
      <p className="lead">
        Estos términos regulan el uso de PITCH AI, la herramienta interna de
        Sicoben Ediciones para la generación de propuestas comerciales. Al acceder
        a la plataforma aceptas las condiciones descritas a continuación.
      </p>
      <p className="meta">Última actualización: junio de 2026</p>

      <h2>1. Qué es PITCH AI</h2>
      <p>
        PITCH AI es una aplicación web de uso exclusivamente interno desarrollada
        por y para <strong>Sicoben Ediciones</strong>. Su propósito es automatizar
        la creación de propuestas comerciales de displays de libros infantiles,
        reduciendo el tiempo de preparación de horas a minutos.
      </p>

      <h2>2. Quién puede usarla</h2>
      <p>
        El acceso está restringido a <strong>empleados y colaboradores autorizados</strong>{" "}
        de Sicoben Ediciones que cuenten con credenciales válidas. Está
        terminantemente prohibido:
      </p>
      <ul>
        <li>Compartir tus credenciales de acceso con personas no autorizadas.</li>
        <li>Acceder a la plataforma en nombre de otra persona sin autorización expresa.</li>
        <li>Usar la herramienta para fines distintos a los comerciales internos de Sicoben Ediciones.</li>
        <li>Intentar acceder a áreas o datos para los que no tienes permiso.</li>
      </ul>

      <h2>3. Uso correcto de la plataforma</h2>
      <p>
        Al usar PITCH AI te comprometes a:
      </p>
      <ul>
        <li>
          Ingresar información veraz sobre clientes y parámetros de propuesta.
        </li>
        <li>
          No introducir datos sensibles de terceros que no sean necesarios para
          generar la propuesta comercial.
        </li>
        <li>
          Mantener la confidencialidad de las propuestas generadas conforme a las
          políticas internas de Sicoben Ediciones.
        </li>
        <li>
          Reportar cualquier falla, error o comportamiento inesperado al equipo técnico.
        </li>
      </ul>

      <h2>4. Propiedad intelectual</h2>
      <p>
        Todo el software, diseño, lógica de negocio, plantillas y contenido de
        PITCH AI son propiedad de <strong>Sicoben Ediciones</strong>. Queda
        prohibido copiar, reproducir, distribuir o crear obras derivadas sin
        autorización escrita.
      </p>
      <p>
        Los datos del catálogo de productos, imágenes de portadas y precios son
        propiedad de Sicoben Ediciones o de sus licenciantes (Disney, Mattel,
        Hasbro, Universal, Paramount, Bluey, entre otros). Su uso está limitado
        al contexto de generación de propuestas internas.
      </p>

      <h2>5. Disponibilidad del servicio</h2>
      <p>
        Sicoben Ediciones hará su mejor esfuerzo para mantener PITCH AI disponible
        en horario laboral. Sin embargo, no garantizamos disponibilidad ininterrumpida.
        Pueden producirse interrupciones por mantenimiento, actualizaciones o
        circunstancias fuera de nuestro control.
      </p>

      <h2>6. Limitación de responsabilidad</h2>
      <p>
        PITCH AI es una herramienta de apoyo. La responsabilidad sobre las propuestas
        comerciales enviadas a clientes recae en el ejecutivo de ventas que las genera.
        Sicoben Ediciones no se hace responsable de decisiones comerciales tomadas
        con base en los datos generados por la plataforma si estos no han sido
        verificados previamente.
      </p>
      <p>
        Los datos del catálogo son datos mock en Fase 1 del proyecto. En producción,
        los datos provienen de la Base de Datos Maestra (Proyecto Ruth). Es
        responsabilidad del usuario verificar stock y precios antes de enviar
        una propuesta a un cliente.
      </p>

      <h2>7. Modificaciones</h2>
      <p>
        Sicoben Ediciones puede actualizar estos términos en cualquier momento. Los
        cambios significativos se notificarán con al menos 15 días de anticipación
        por correo corporativo. El uso continuado de la plataforma tras la
        notificación implica aceptación de los nuevos términos.
      </p>

      <h2>8. Ley aplicable y jurisdicción</h2>
      <p>
        Estos términos se rigen por las leyes de la{" "}
        <strong>República de Panamá</strong>. Cualquier disputa que no pueda
        resolverse de forma amistosa será sometida a los tribunales competentes
        de la Ciudad de Panamá.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Para consultas sobre estos términos, escríbenos a{" "}
        <a href="mailto:orlando.jaime@sicobenediciones.com">
          orlando.jaime@sicobenediciones.com
        </a>.
      </p>
    </article>
  );
}
