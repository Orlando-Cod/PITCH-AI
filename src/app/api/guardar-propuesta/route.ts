import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient, supabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { cliente, pais, tipoCliente, exhibidorId, exhibidorNombre, numProductos, numCaras, descuento, licencias } = body;

    const { error } = await supabaseAdmin.from("propuestas").insert({
      user_id: user.id,
      cliente: cliente ?? "",
      pais: pais ?? "",
      tipo_cliente: tipoCliente ?? "",
      exhibidor_id: exhibidorId ?? "",
      exhibidor_nombre: exhibidorNombre ?? "",
      num_productos: numProductos ?? 0,
      num_caras: numCaras ?? 1,
      descuento: descuento ?? 0,
      licencias: licencias ?? [],
    });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error guardando propuesta:", err);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
