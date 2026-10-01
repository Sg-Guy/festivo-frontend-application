import React from "react";
import { Check, RotateCw } from "lucide-react";

export default function ScanValidResult({ ticket, onNext }) {
  return (
    <div className="flex flex-col items-center text-center space-y-6 pt-2">
      {/* Icône Cercle Vert */}
      <div className="w-32 h-32 rounded-full border-4 border-[#34D399] bg-[#D1F3E2] flex items-center justify-center shadow-sm">
        <Check className="w-16 h-16 text-[#10B981] stroke-[3]" />
      </div>

      {/* Textes principaux */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-widest text-[#10B981] uppercase">
          Valide
        </h1>
        <p className="text-xl font-bold text-gray-900 pt-1">
          {ticket?.holder_name || "Kofi Mensah"}
        </p>
        <p className="text-sm font-medium text-gray-500">
          {ticket?.category || "VIP"} · {ticket?.code || "FTV-2026-001"}
        </p>
        <p className="text-xs text-gray-400 pt-0.5">
          Validé à {ticket?.scanned_at || "12:11:47"}
        </p>
      </div>

      {/* Carte Détails (Fond vert très pâle, bordure fine) */}
      <div className="w-full bg-[#E6F4EA]/60 border border-[#CEEAD6] rounded-3xl p-4 flex justify-between items-center text-left shadow-sm">
        <div>
          <p className="text-xs text-gray-500 font-medium">Catégorie</p>
          <p className="text-sm font-bold text-gray-900 mt-0.5">{ticket?.category || "VIP"}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 font-medium">Événement</p>
          <p className="text-sm font-bold text-gray-900 mt-0.5">{ticket?.event_title || "Afrobeats Night"}</p>
        </div>
      </div>

      {/* Bouton Scanner suivant */}
      <button
        onClick={onNext}
        className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
      >
        <RotateCw size={18} />
        Scanner suivant
      </button>
    </div>
  );
}