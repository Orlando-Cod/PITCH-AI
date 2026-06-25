"use client";

import { type Pais, type TipoCliente, type Descuento, type Licencia, LICENCIAS } from "@/types";
import { EXHIBIDORES } from "@/lib/data/exhibidores";

const PAISES: Pais[] = ["Nicaragua", "Panamá", "Costa Rica", "Guatemala", "El Salvador", "Honduras"];
const TIPOS_CLIENTE: TipoCliente[] = ["Retailer", "Distribuidor", "Aliado Comercial"];
const DESCUENTOS: { value: Descuento; label: string }[] = [
  { value: 0, label: "Sin descuento" },
  { value: 5, label: "5%" },
  { value: 10, label: "10%" },
  { value: 20, label: "20%" },
];
const TEMPORADAS = ["Todo el año", "Back to School", "Navidad", "Día del Niño", "Verano", "Semana Santa"];

export type FormParametrosData = {
  cliente: string;
  pais: Pais;
  tipoCliente: TipoCliente;
  carasACotizar: number;
  precioObjetivo: number;
  descuento: Descuento;
  licencias?: Licencia[];
  temporada?: string;
  observaciones?: string;
};

export function isFormValido(f: Partial<FormParametrosData>): boolean {
  return !!(
    f.cliente?.trim() &&
    f.pais &&
    f.tipoCliente &&
    f.carasACotizar &&
    f.precioObjetivo !== undefined &&
    f.precioObjetivo > 0 &&
    f.descuento !== undefined
  );
}

interface Props {
  exhibidorId: string;
  valor: Partial<FormParametrosData>;
  onChange: (v: Partial<FormParametrosData>) => void;
}

const input =
  "w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#1A1A2E] placeholder-gray-400 focus:outline-none focus:border-[#FA4616] focus:ring-2 focus:ring-[#FA4616]/10 transition-colors";
const label = "block text-xs font-semibold text-[#1A1A2E] mb-1.5";

export default function FormParametros({ exhibidorId, valor, onChange }: Props) {
  const exhibidor = EXHIBIDORES.find((e) => e.id === exhibidorId);
  const maxCaras = exhibidor?.caras ?? 1;

  function set<K extends keyof FormParametrosData>(field: K, value: FormParametrosData[K]) {
    onChange({ ...valor, [field]: value });
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <label className={label}>Nombre del cliente *</label>
        <input
          type="text"
          placeholder="Ej: Walmart Nicaragua"
          value={valor.cliente ?? ""}
          onChange={(e) => set("cliente", e.target.value)}
          className={input}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>País *</label>
          <select
            value={valor.pais ?? ""}
            onChange={(e) => set("pais", e.target.value as Pais)}
            className={input}
          >
            <option value="">Seleccionar país</option>
            {PAISES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Tipo de cliente *</label>
          <select
            value={valor.tipoCliente ?? ""}
            onChange={(e) => set("tipoCliente", e.target.value as TipoCliente)}
            className={input}
          >
            <option value="">Seleccionar tipo</option>
            {TIPOS_CLIENTE.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Caras a cotizar *</label>
          <select
            value={valor.carasACotizar ?? ""}
            onChange={(e) => set("carasACotizar", Number(e.target.value))}
            className={input}
          >
            <option value="">Seleccionar</option>
            {Array.from({ length: maxCaras }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "cara" : "caras"}</option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">
            El exhibidor tiene {maxCaras} {maxCaras === 1 ? "cara" : "caras"} disponible{maxCaras > 1 ? "s" : ""}
          </p>
        </div>
        <div>
          <label className={label}>Precio objetivo por unidad ($) *</label>
          <input
            type="number"
            placeholder="Ej: 1.50"
            min="0.01"
            step="0.01"
            value={valor.precioObjetivo ?? ""}
            onChange={(e) => set("precioObjetivo", parseFloat(e.target.value))}
            className={input}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Descuento negociado *</label>
          <select
            value={valor.descuento ?? ""}
            onChange={(e) => set("descuento", Number(e.target.value) as Descuento)}
            className={input}
          >
            <option value="">Seleccionar</option>
            {DESCUENTOS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Temporada</label>
          <select
            value={valor.temporada ?? ""}
            onChange={(e) => set("temporada", e.target.value)}
            className={input}
          >
            <option value="">Seleccionar temporada</option>
            {TEMPORADAS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Filtro de licencias */}
      <div>
        <label className={label}>Licencias</label>
        <p className="text-xs text-gray-400 mb-2">
          Deja vacío para incluir todas las licencias disponibles.
        </p>
        <div className="flex flex-wrap gap-2">
          {LICENCIAS.map((lic) => {
            const activa = (valor.licencias ?? []).includes(lic);
            return (
              <button
                key={lic}
                type="button"
                onClick={() => {
                  const actual = valor.licencias ?? [];
                  set(
                    "licencias",
                    activa ? actual.filter((l) => l !== lic) : [...actual, lic]
                  );
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  activa
                    ? "text-white border-[#FA4616]"
                    : "bg-gray-50 border-gray-200 text-gray-500 hover:border-[#FA4616]/40 hover:text-[#FA4616]"
                }`}
                style={activa ? { background: "#FA4616" } : undefined}
              >
                {lic}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className={label}>Observaciones adicionales</label>
        <textarea
          rows={3}
          placeholder="Notas especiales, requerimientos del cliente, etc."
          value={valor.observaciones ?? ""}
          onChange={(e) => set("observaciones", e.target.value)}
          className={`${input} resize-none`}
        />
      </div>
    </div>
  );
}
