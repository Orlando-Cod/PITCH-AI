import { NextRequest, NextResponse } from "next/server";
import { generarPropuestaPptx, type PropuestaInput } from "@/lib/pptx/generador";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const data: PropuestaInput = await req.json();
    const buffer = await generarPropuestaPptx(data);
    const filename = `Propuesta-${data.parametros.cliente.replace(/[^a-zA-Z0-9]/g, "_")}.pptx`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("Error generando PPTX:", err);
    return NextResponse.json({ error: "Error al generar la presentación" }, { status: 500 });
  }
}
