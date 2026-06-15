import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — Sicoben Ediciones",
};

export default function PoliticaPrivacidad() {
  return (
    <article className="prose-legal">
      <h1>Política de Privacidad</h1>
      <p className="lead">
        En Sicoben Ediciones nos tomamos en serio la privacidad de las personas que
        usan nuestras herramientas internas. Esta política explica qué datos recogemos
        en PITCH AI, para qué los usamos y cómo los protegemos.
      </p>
      <p className="meta">Última actualización: junio de 2026</p>

      <h2>1. Quién es responsable de tus datos</h2>
      <p>
        <strong>Sicoben Ediciones</strong><br />
        RUC: 155-000000-000000 <span className="note">(por actualizar con RUC real)</span><br />
        República de Panamá<br />
        Correo de contacto:{" "}
        <a href="mailto:orlando.jaime@sicobenediciones.com">
          orlando.jaime@sicobenediciones.com
        </a>
      </p>

      <h2>2. A quién aplica esta política</h2>
      <p>
        PITCH AI es una herramienta de uso <strong>exclusivamente interno</strong>:
        solo pueden acceder ejecutivos y personal autorizado de Sicoben Ediciones.
        No está disponible para el público general ni para clientes externos.
      </p>

      <h2>3. Qué datos recogemos y para qué</h2>

      <h3>Datos de acceso</h3>
      <p>
        Para que puedas iniciar sesión recogemos tu correo electrónico corporativo y
        una contraseña. Estos datos se usan únicamente para autenticarte y no se
        comparten con terceros fuera de los servicios descritos en la sección 5.
      </p>

      <h3>Datos de trabajo</h3>
      <p>
        Al generar propuestas comerciales, introduces información como nombres de
        clientes, países, precios y configuraciones de productos. Estos datos se
        almacenan para que puedas consultar el historial de propuestas generadas.
        No contienen datos personales de terceros ajenos a Sicoben Ediciones.
      </p>

      <h3>Datos técnicos</h3>
      <p>
        Como cualquier aplicación web, nuestros servidores registran automáticamente
        información básica de acceso: dirección IP, tipo de navegador, páginas
        visitadas y fecha/hora. Estos datos se usan para mantener la seguridad y el
        correcto funcionamiento del sistema.
      </p>

      <h2>4. Por cuánto tiempo conservamos tus datos</h2>
      <p>
        Los datos de acceso y las propuestas generadas se conservan mientras tu
        cuenta esté activa. Si tu cuenta es desactivada, los datos se eliminan en un
        plazo máximo de 90 días, salvo que la ley exija conservarlos por más tiempo.
      </p>

      <h2>5. Servicios de terceros que usamos</h2>
      <p>
        Para operar PITCH AI usamos los siguientes proveedores externos. Cada uno
        actúa como encargado del tratamiento y cuenta con sus propias políticas de
        privacidad:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> — base de datos y autenticación. Almacena tus
          credenciales y el historial de propuestas. Infraestructura en la nube con
          estándares de seguridad SOC 2.
        </li>
        <li>
          <strong>Resend</strong> — envío de correos electrónicos transaccionales
          (notificaciones del sistema). Solo recibe la dirección de destino y el
          contenido del mensaje.
        </li>
        <li>
          <strong>Vercel</strong> — alojamiento y despliegue de la aplicación. Procesa
          las solicitudes web y puede registrar datos de acceso técnicos.
        </li>
      </ul>
      <p>
        No vendemos ni cedemos tus datos a terceros con fines comerciales o
        publicitarios.
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        De acuerdo con la{" "}
        <strong>Ley N.° 81 de 26 de marzo de 2019</strong> de la República de Panamá
        (Protección de Datos Personales), tienes derecho a:
      </p>
      <ul>
        <li>Acceder a los datos que tenemos sobre ti.</li>
        <li>Solicitar la corrección de datos incorrectos.</li>
        <li>Pedir la eliminación de tus datos cuando ya no sean necesarios.</li>
        <li>Oponerte a determinados tratamientos.</li>
      </ul>
      <p>
        Para ejercer cualquiera de estos derechos, escríbenos a{" "}
        <a href="mailto:orlando.jaime@sicobenediciones.com">
          orlando.jaime@sicobenediciones.com
        </a>{" "}
        indicando tu nombre y la solicitud concreta.
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas razonables para proteger tus datos: conexiones
        cifradas (HTTPS/TLS), contraseñas almacenadas con hash seguro y acceso
        restringido solo al personal autorizado. Ningún sistema es 100% seguro, pero
        hacemos todo lo razonablemente posible para proteger tu información.
      </p>

      <h2>8. Cambios a esta política</h2>
      <p>
        Si hacemos cambios significativos a esta política, te lo notificaremos por
        correo corporativo con al menos 15 días de anticipación. La fecha de última
        actualización siempre aparece al inicio de este documento.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Para cualquier pregunta sobre privacidad, escríbenos a{" "}
        <a href="mailto:orlando.jaime@sicobenediciones.com">
          orlando.jaime@sicobenediciones.com
        </a>.
      </p>
    </article>
  );
}
