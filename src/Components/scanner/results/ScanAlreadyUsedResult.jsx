import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ScanAlreadyUsedResult({ onRetry }) {
  return (
    <div className="flex flex-col items-center text-center space-y-6 pt-6">
      {/* Icône Cercle Jaune */}
      <div className="w-32 h-32 rounded-full border-4 border-[#FCD34D] bg-[#FEF3D6] flex items-center justify-center shadow-sm">
        <AlertCircle className="w-16 h-16 text-[#F59E0B] stroke-[2.5]" />
      </div>

      {/* Textes principaux */}
      <div className="space-y-3">
        <h1 className="text-3xl font-black tracking-widest text-[#F59E0B] uppercase">
          Déjà utilisé
        </h1>
        <p className="text-sm text-gray-600 max-w-[260px] mx-auto leading-relaxed">
          Ce billet a déjà été scanné.
        </p>
      </div>

      {/* Bouton Réessayer */}
      <button
        onClick={onRetry}
        className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] mt-8"
      >
        <RotateCcw size={18} />
        Réessayer
      </button>
    </div>
  );
}