import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies — Sicoben Ediciones",
};

export default function PoliticaDeCookies() {
  return (
    <article className="prose-legal">
      <h1>Política de Cookies</h1>
      <p className="lead">
        Esta página explica qué cookies usa PITCH AI, para qué sirve cada una
        y cómo puedes gestionar tus preferencias en cualquier momento.
      </p>
      <p className="meta">Última actualización: junio de 2026</p>

      <h2>1. ¿Qué es una cookie?</h2>
      <p>
        Una cookie es un pequeño archivo de texto que un sitio web guarda en tu
        navegador cuando lo visitas. Sirve para recordar información entre
        sesiones: que has iniciado sesión, qué preferencias has configurado, o
        cómo navegas por la plataforma.
      </p>

      <h2>2. Tipos de cookies que usamos</h2>

      <h3>Cookies esenciales — siempre activas</h3>
      <p>
        Son imprescindibles para que la plataforma funcione. Sin ellas no
        podrías iniciar sesión ni navegar de forma segura. No requieren tu
        consentimiento y no pueden desactivarse.
      </p>
      <table className="cookies-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Proveedor</th>
            <th>Propósito</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>sb-access-token</code></td>
            <td>Supabase</td>
            <td>Sesión de usuario autenticado</td>
            <td>1 hora</td>
          </tr>
          <tr>
            <td><code>sb-refresh-token</code></td>
            <td>Supabase</td>
            <td>Renovación automática de sesión</td>
            <td>60 días</td>
          </tr>
          <tr>
            <td><code>sicoben-cookie-consent</code></td>
            <td>Sicoben Ediciones</td>
            <td>Guarda tus preferencias de cookies (localStorage)</td>
            <td>Hasta que borres el almacenamiento local</td>
          </tr>
        </tbody>
      </table>

      <h3>Cookies de analítica — opcionales</h3>
      <p>
        Nos ayudan a entender cómo se usa la plataforma: qué funciones se usan
        más, dónde surgen errores, cuánto tiempo tarda una acción. Esta
        información nos permite mejorar la herramienta. Actualmente esta
        categoría está reservada para integraciones futuras (por ejemplo,
        Vercel Analytics).
      </p>
      <table className="cookies-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Proveedor</th>
            <th>Propósito</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4} className="text-center text-slate-600 italic py-3">
              Sin cookies de analítica activas actualmente
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Cookies de marketing — opcionales</h3>
      <p>
        Permiten personalizar comunicaciones internas y medir la efectividad
        de notificaciones por correo (a través de Resend). Actualmente esta
        categoría no está activa.
      </p>
      <table className="cookies-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Proveedor</th>
            <th>Propósito</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4} className="text-center text-slate-600 italic py-3">
              Sin cookies de marketing activas actualmente
            </td>
          </tr>
        </tbody>
      </table>

      <h2>3. Proveedores de servicios</h2>
      <p>
        Algunos proveedores pueden instalar sus propias cookies al prestarnos
        servicio:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> — autenticación y base de datos. Instala
          cookies de sesión esenciales.
        </li>
        <li>
          <strong>Vercel</strong> — alojamiento de la aplicación. Puede
          registrar datos técnicos de acceso sin usar cookies de terceros
          visibles.
        </li>
        <li>
          <strong>Resend</strong> — envío de correos transaccionales. No
          instala cookies directamente en el navegador.
        </li>
      </ul>

      <h2>4. Cómo gestionar tus preferencias</h2>
      <p>
        Puedes cambiar o revocar tu consentimiento en cualquier momento de
        dos formas:
      </p>
      <ul>
        <li>
          <strong>Desde el banner de cookies:</strong> aparece la primera vez
          que visitas la plataforma. Si ya lo cerraste, borra el elemento{" "}
          <code>sicoben-cookie-consent</code> de tu localStorage (Herramientas
          de desarrollador → Application → Local Storage) y recarga la página.
        </li>
        <li>
          <strong>Desde tu navegador:</strong> puedes bloquear o eliminar
          cookies desde la configuración de privacidad de Chrome, Firefox,
          Safari o Edge. Ten en cuenta que bloquear cookies esenciales puede
          impedir el inicio de sesión.
        </li>
      </ul>

      <h2>5. Base legal</h2>
      <p>
        El uso de cookies esenciales se basa en el <strong>interés legítimo</strong>{" "}
        de mantener la seguridad y funcionalidad de la plataforma. El uso de
        cookies opcionales (analítica y marketing) se basa en tu{" "}
        <strong>consentimiento explícito</strong>, de acuerdo con la{" "}
        <strong>Ley N.° 81 de 2019</strong> de la República de Panamá.
      </p>

      <h2>6. Cambios a esta política</h2>
      <p>
        Si añadimos nuevas cookies o cambiamos su propósito, actualizaremos
        esta página y volveremos a solicitar tu consentimiento cuando sea
        necesario.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Para cualquier pregunta sobre el uso de cookies, escríbenos a{" "}
        <a href="mailto:orlando.jaime@sicobenediciones.com">
          orlando.jaime@sicobenediciones.com
        </a>.
      </p>
    </article>
  );
}
