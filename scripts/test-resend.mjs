// Script de prueba para verificar la integración con Resend.
// Uso: node --env-file=.env.local scripts/test-resend.mjs

import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error("Error: RESEND_API_KEY no encontrada en .env.local");
  process.exit(1);
}

const resend = new Resend(apiKey);

const { data, error } = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: ["orlando.jaime@sicobenediciones.com"],
  subject: "MCP funcionando",
  text: "Prueba desde PITCH AI — Resend integrado correctamente.",
  html: "<p>Prueba desde <strong>PITCH AI</strong> — Resend integrado correctamente.</p>",
});

if (error) {
  console.error("Error al enviar:", JSON.stringify(error, null, 2));
  process.exit(1);
}

console.log("Email enviado exitosamente");
console.log("ID:", data.id);
