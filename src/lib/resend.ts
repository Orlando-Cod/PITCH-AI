import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  const { data, error } = await resend.emails.send({
    from: "PITCH AI <onboarding@resend.dev>",
    to,
    subject,
    html,
  });

  if (error) throw new Error(error.message);
  return data;
}
