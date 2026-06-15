export default function HistorialPage() {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Historial de Propuestas</h1>
          <p className="text-slate-400 mt-1">
            Todas las propuestas generadas, organizadas por cliente.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center py-16">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-white font-semibold text-lg mb-2">
            Historial de propuestas
          </h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Cada propuesta queda guardada aquí con su cliente, fecha y estado.
            Podrás descargarla o editarla en cualquier momento.
          </p>
        </div>
      </div>
    </div>
  );
}
